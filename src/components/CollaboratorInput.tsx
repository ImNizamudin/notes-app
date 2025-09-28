import { useState, useEffect } from "react";
import apiClient from "../api/client";
import { useCollaborationStore } from "../store/collaboration";
import { Users, PlusCircle, X, Search, UserPlus, UserMinus } from "lucide-react";

interface CollaboratorInputProps {
  noteId: number;
}

interface User {
  id: string;
  username: string;
  fullname: string;
}

export default function CollaboratorInput({ noteId }: CollaboratorInputProps) {
  const { 
    collaborators, 
    loading, 
    error,
    fetchCollaborators, 
    createCollaboration, 
    deleteCollaboration
  } = useCollaborationStore();
  
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch collaborators ketika component mount
  useEffect(() => {
    fetchCollaborators(noteId);
  }, [noteId, fetchCollaborators]);

  // Clear success message setelah 3 detik
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (q.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const res = await apiClient(`/user?username=${q}`, "GET");
      
      let users: User[] = [];
      
      if (Array.isArray(res)) {
        users = res;
      } else if (res && res.data && Array.isArray(res.data)) {
        users = res.data;
      } else if (res && res.users && Array.isArray(res.users)) {
        users = res.users;
      }
      
      // Filter out users yang sudah menjadi collaborator
      const existingCollaboratorIds = collaborators.map(user => user.id);
      const filteredUsers = users.filter(user => 
        !existingCollaboratorIds.includes(user.id)
      );
      
      setSearchResults(filteredUsers);
    } catch (e) {
      console.error("Search failed", e);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddCollab = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (selectedUserId) {
      try {
        await createCollaboration(selectedUserId, noteId);
        
        const addedUser = searchResults.find(user => user.id === selectedUserId);
        const username = addedUser?.username || selectedUserId;
        
        setSuccessMessage(`✅ Successfully added ${username} as collaborator!`);
        setSelectedUserId("");
        setQuery("");
        setSearchResults([]);
        
        fetchCollaborators(noteId);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        alert(`Failed to add collaborator: ${errorMessage}`);
      }
    }
  };

  const handleRemoveCollab = async (userId: string) => {
    const userToRemove = collaborators.find(user => user.id === userId);
    const username = userToRemove?.username || userId;
    
    const isConfirmed = window.confirm(
      `Are you sure you want to remove ${username} from collaborators?`
    );
    
    if (!isConfirmed) return;
    
    try {
      await deleteCollaboration(userId, noteId);
      setSuccessMessage(`✅ Successfully removed ${username} from collaborators!`);
      fetchCollaborators(noteId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Failed to remove collaborator: ${errorMessage}`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddCollab();
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-sm">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Current Collaborators Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-300 mb-4 flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-400" />
          <span>Current Collaborators</span>
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {collaborators.length}
          </span>
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : collaborators.length > 0 ? (
          <div className="space-y-3">
            {collaborators.map((user) => (
              <div key={user.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-gray-100 font-medium">{user.username}</div>
                    {user.fullname && (
                      <div className="text-gray-400 text-sm">{user.fullname}</div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveCollab(user.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove collaborator"
                  type="button"
                >
                  <UserMinus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-6 text-center">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No collaborators yet. Add someone to collaborate on this note.</p>
          </div>
        )}
      </div>

      {/* Add Collaborator Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-300 mb-4 flex items-center space-x-2">
          <UserPlus className="w-5 h-5 text-green-400" />
          <span>Add New Collaborator</span>
        </h3>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users by username..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg pl-10 pr-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {isSearching && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
              <span className="text-gray-400">Searching...</span>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
              {searchResults.map((user) => (
                <div 
                  key={user.id} 
                  className={`p-3 cursor-pointer transition-colors border-b border-gray-600 last:border-b-0 ${
                    selectedUserId === user.id 
                      ? 'bg-blue-500/20 border-l-4 border-l-blue-500' 
                      : 'hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-xs">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-100">{user.username}</div>
                      {user.fullname && (
                        <div className="text-sm text-gray-400">{user.fullname}</div>
                      )}
                    </div>
                    {selectedUserId === user.id && (
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {query.length >= 2 && !isSearching && searchResults.length === 0 && (
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 text-center">
              <p className="text-gray-400">No users found matching "{query}"</p>
            </div>
          )}

          {selectedUserId && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddCollab();
              }}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Collaborator</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}