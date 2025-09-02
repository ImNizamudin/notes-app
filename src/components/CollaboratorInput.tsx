import { useState, useEffect } from "react";
import apiClient from "../api/client";
import { useCollaborationStore } from "../store/collaboration";
import { Users, PlusCircle, X } from "lucide-react";

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
    console.log("Fetching collaborators for noteId:", noteId);
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
    // Prevent default form submission behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (selectedUserId) {
      try {
        await createCollaboration(selectedUserId, noteId);
        
        // Dapatkan username user yang ditambahkan untuk notifikasi
        const addedUser = searchResults.find(user => user.id === selectedUserId);
        const username = addedUser?.username || selectedUserId;
        
        setSuccessMessage(`✅ Successfully added ${username} as collaborator!`);
        setSelectedUserId("");
        setQuery("");
        setSearchResults([]);
        
        // Refresh collaborators list
        fetchCollaborators(noteId);
      } catch (error) {
        alert(`Failed to add collaborator: ${error.message}`);
      }
    }
  };

  const handleRemoveCollab = async (userId: string) => {
    // Konfirmasi sebelum menghapus
    const userToRemove = collaborators.find(user => user.id === userId);
    const username = userToRemove?.username || userId;
    
    const isConfirmed = window.confirm(
      `Are you sure you want to remove ${username} from collaborators?`
    );
    
    if (!isConfirmed) return;
    
    try {
      await deleteCollaboration(userId, noteId);
      setSuccessMessage(`✅ Successfully removed ${username} from collaborators!`);
      
      // Refresh collaborators list
      fetchCollaborators(noteId);
    } catch (error) {
      alert(`Failed to remove collaborator: ${error.message}`);
    }
  };

  // Handle form submission to prevent page reload
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddCollab();
  };

  return (
    <div className="p-6 border-b border-gray-700">
      <div className="flex items-center space-x-2 mb-3">
        <Users className="w-5 h-5 text-gray-400" />
        <label className="text-sm font-medium text-gray-300">Collaborators</label>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-600 text-white p-3 rounded-lg mb-3">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-400 mb-3">{error}</div>
      )}

      {/* list collaborator */}
      {loading ? (
        <div className="text-gray-400 mb-3">Loading collaborators...</div>
      ) : collaborators.length > 0 ? (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            Collaborators on this note:
          </h4>
          {collaborators.map((user) => (
            <div key={user.id} className="flex items-center justify-between bg-gray-700 p-3 rounded mb-2">
              <div>
                <div className="text-gray-100 font-medium">{user.username}</div>
                {user.fullname && (
                  <div className="text-gray-400 text-sm">{user.fullname}</div>
                )}
              </div>
              <button
                onClick={() => handleRemoveCollab(user.id)}
                className="text-red-400 hover:text-red-300 p-1 transition-colors"
                title="Remove collaborator"
                type="button" // Important: prevent form submission
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 mb-3">No collaborators yet</div>
      )}

      {/* Search box untuk menambah collaborator baru */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Add Collaborator:</h4>
        
        {/* Wrap in form to handle enter key, but prevent default submission */}
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search users by username..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-2 placeholder-gray-400 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {isSearching && <div className="text-gray-400 mb-2">Searching...</div>}

        {searchResults.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg mb-3 max-h-48 overflow-y-auto">
            {searchResults.map((user) => (
              <div 
                key={user.id} 
                className={`p-3 cursor-pointer text-gray-100 hover:bg-gray-700 transition-colors ${
                  selectedUserId === user.id ? 'bg-gray-700' : ''
                }`}
                onClick={() => setSelectedUserId(user.id)}
              >
                <div className="font-medium">{user.username}</div>
                {user.fullname && (
                  <div className="text-sm text-gray-400">{user.fullname}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {query.length >= 2 && !isSearching && searchResults.length === 0 && (
          <div className="text-gray-400 mb-2">No users found</div>
        )}

        {selectedUserId && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddCollab();
            }}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
            type="button" // Important: prevent form submission
          >
            <PlusCircle className="w-4 h-4 mr-1" /> Add Collaborator
          </button>
        )}
      </div>
    </div>
  );
}