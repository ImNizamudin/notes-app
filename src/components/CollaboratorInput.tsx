import { useState, useEffect } from "react";
import apiClient from "../api/client";
import { useCollaborationStore } from "../store/collaboration";
import { Users, PlusCircle, MinusCircle, X } from "lucide-react";

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
    fetchCollaborators, 
    createCollaboration, 
    deleteCollaboration 
  } = useCollaborationStore();
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch collaborators ketika component mount atau noteId berubah
  useEffect(() => {
    fetchCollaborators(noteId);
  }, [noteId, fetchCollaborators]);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (q.length < 2) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const res = await apiClient(`/users?username=${q}`, "GET");
      
      console.log("API Response:", res);
      
      let users: User[] = [];
      
      if (Array.isArray(res)) {
        users = res;
      } else if (res && res.data && Array.isArray(res.data)) {
        users = res.data;
      } else if (res && res.users && Array.isArray(res.users)) {
        users = res.users;
      }
      
      // Filter out users yang sudah menjadi collaborator
      const existingCollaboratorIds = collaborators.map(c => c.userId);
      const filteredUsers = users.filter(user => 
        !existingCollaboratorIds.includes(user.id) && 
        user.id !== selectedUserId
      );
      
      setResults(filteredUsers);
    } catch (e) {
      console.error("Search failed", e);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddCollab = async () => {
    if (selectedUserId) {
      try {
        await createCollaboration(selectedUserId, noteId);
        alert(`✅ Added collaborator: ${selectedUserId}`);
        setSelectedUserId("");
        setQuery("");
        setResults([]);
      } catch (error) {
        alert(`Failed to add collaborator: ${error.message}`);
      }
    }
  };

  const handleRemoveCollab = async (userId: string) => {
    try {
      await deleteCollaboration(userId, noteId);
      alert(`🗑 Removed collaborator`);
    } catch (error) {
      alert(`Failed to remove collaborator: ${error.message}`);
    }
  };

  return (
    <div className="p-6 border-b border-gray-700">
      <div className="flex items-center space-x-2 mb-3">
        <Users className="w-5 h-5 text-gray-400" />
        <label className="text-sm font-medium text-gray-300">Collaborator</label>
      </div>

      {/* Tampilkan list collaborator */}
      {loading ? (
        <div className="text-gray-400 mb-3">Loading collaborators...</div>
      ) : collaborators.length > 0 ? (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Current Collaborators:</h4>
          {collaborators.map((collab) => (
            <div key={collab.id} className="flex items-center justify-between bg-gray-700 p-2 rounded mb-2">
              <span className="text-gray-100">
                {collab.user?.username || `User ${collab.userId}`}
                {collab.user?.fullname && ` (${collab.user.fullname})`}
              </span>
              <button
                onClick={() => handleRemoveCollab(collab.userId)}
                className="text-red-400 hover:text-red-300"
                title="Remove collaborator"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 mb-3">No collaborators yet</div>
      )}

      {/* Search box */}
      <input
        type="text"
        placeholder="Search user by username..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 placeholder-gray-400 mb-3"
      />

      {/* Loading indicator */}
      {isSearching && <div className="text-gray-400 mb-3">Searching...</div>}

      {/* Select dropdown */}
      {results.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg mb-3">
          {results.map((user) => (
            <div 
              key={user.id} 
              className={`p-3 cursor-pointer text-gray-100 hover:bg-gray-700 ${
                selectedUserId === user.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => setSelectedUserId(user.id)}
            >
              {user.username} ({user.fullname})
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {query.length >= 2 && !isSearching && results.length === 0 && (
        <div className="text-gray-400 mb-3">No users found</div>
      )}

      {/* Action buttons */}
      {selectedUserId && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAddCollab}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
          >
            <PlusCircle className="w-4 h-4 mr-1" /> Add
          </button>
        </div>
      )}
    </div>
  );
}