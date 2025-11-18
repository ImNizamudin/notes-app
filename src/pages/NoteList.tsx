import { useEffect, useState } from "react";
import { useNotesStore } from "../store/note";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";
import { Plus, Search, Grid, List, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import { apiClient } from "../api/client"; // Pastikan import apiClient

function NoteList() {
    const { notes, fetchNotes, loading } = useNotesStore((state) => state);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const [isRotating, setIsRotating] = useState(false);
    const [joinLoading, setJoinLoading] = useState(false);
    const [joinError, setJoinError] = useState<string | null>(null);
    const [joinSuccess, setJoinSuccess] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handlePlusClick = () => {
        setIsRotating(true);
        setTimeout(() => {
            setShowCreateModal(true);
            setIsRotating(false);
        }, 300);
    };

    const handleAddNote = () => {
        setShowCreateModal(false);
    };

    const handleJoinClick = () => {
        setShowCreateModal(false);
        setShowJoinModal(true);
        setJoinError(null);
        setJoinSuccess(false);
    };

    const handleJoinNote = async () => {
        if (!joinCode.trim()) {
            setJoinError("Please enter a note code");
            return;
        }

        setJoinLoading(true);
        setJoinError(null);
        setJoinSuccess(false);

        try {
            await apiClient("/collaborations/join", "POST", {
                code: joinCode.trim()
            });

            // Jika berhasil
            setJoinSuccess(true);
            
            // Refresh notes list untuk menampilkan note yang baru dijoin
            setTimeout(() => {
                fetchNotes();
                setJoinCode("");
                setShowJoinModal(false);
                setJoinSuccess(false);
            }, 1500);

        } catch (error: any) {
            console.error("Join note error:", error);
            setJoinError(
                error.response?.meta?.message || 
                error.message || 
                "Failed to join note. Please check the code and try again."
            );
        } finally {
            setJoinLoading(false);
        }
    };

    const closeAllModals = () => {
        setShowCreateModal(false);
        setShowJoinModal(false);
        setJoinError(null);
        setJoinSuccess(false);
        setJoinCode("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && joinCode.trim()) {
            handleJoinNote();
        }
    };

    return(
        <div className="min-h-screen bg-gray-900">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-100 mb-2">My Notes</h1>
                            <p className="text-gray-400">
                                {notes.length} {notes.length === 1 ? 'note' : 'notes'} in total
                            </p>
                        </div>
                        
                        {/* View Controls */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-gray-800 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'grid' 
                                            ? 'bg-gray-600 text-white' 
                                            : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'list' 
                                            ? 'bg-gray-600 text-white' 
                                            : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl text-gray-600 mb-6">
                            <FileText className="w-16 h-16 mx-auto" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-400 mb-4">
                            {searchTerm ? 'No notes found' : 'No notes yet'}
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            {searchTerm 
                                ? 'Try adjusting your search terms or create a new note.' 
                                : 'Start organizing your thoughts by creating your first note.'
                            }
                        </p>
                        
                        {/* Create Button for Empty State */}
                        <button
                            onClick={handlePlusClick}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Your First Note</span>
                        </button>
                    </div>
                ) : (
                    <div className={`${
                        viewMode === 'grid' 
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr'
                            : 'space-y-4'
                    }`}>
                        {filteredNotes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={{
                                    ...note,
                                    id: String(note.id),
                                    created_at: note.createdAt,
                                    updated_at: note.updatedAt,
                                    total_daily_notes: note.total_daily_notes ?? 0,
                                    total_daily_notes_mine: note.total_daily_notes_mine ?? 0,
                                    type: note.type,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button 
                    onClick={handlePlusClick}
                    className={`bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25 ${
                        isRotating ? 'rotate-45' : ''
                    }`}
                >
                    <Plus className="w-6 h-6" />
                </button>
            </div>

            {/* Create Options Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-75 transition-opacity duration-300"
                        onClick={closeAllModals}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 opacity-100 w-80 mx-4">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-100 mb-6 text-center">
                                Create Note
                            </h3>
                            
                            <div className="space-y-4">
                                {/* Add Note Option */}
                                <Link
                                    to="/notes/new"
                                    onClick={handleAddNote}
                                    className="flex items-center space-x-4 p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-200 hover:scale-105 group cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                        <Plus className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-100 font-semibold text-lg">Add Note</p>
                                        <p className="text-gray-400 text-sm">Create new note</p>
                                    </div>
                                </Link>

                                {/* Join Note Option */}
                                <button
                                    onClick={handleJoinClick}
                                    className="flex items-center space-x-4 p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all duration-200 hover:scale-105 group w-full text-left"
                                >
                                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-100 font-semibold text-lg">Join Note</p>
                                        <p className="text-gray-400 text-sm">Join with code</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Join Note Modal */}
            {showJoinModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-75 transition-opacity duration-300"
                        onClick={closeAllModals}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 opacity-100 w-96 mx-4">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-100">Join Note</h3>
                                <button
                                    onClick={closeAllModals}
                                    className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
                                    disabled={joinLoading}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {/* Success Message */}
                                {joinSuccess && (
                                    <div className="bg-green-900/50 border border-green-700 rounded-xl p-4 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <p className="text-green-200">Successfully joined the note!</p>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {joinError && (
                                    <div className="bg-red-900/50 border border-red-700 rounded-xl p-4 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <AlertCircle className="w-5 h-5 text-red-400" />
                                            <p className="text-red-200">{joinError}</p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Enter Note Code
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Paste code here..."
                                        value={joinCode}
                                        onChange={(e) => setJoinCode(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        disabled={joinLoading || joinSuccess}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400 disabled:opacity-50"
                                    />
                                </div>
                                
                                <button
                                    onClick={handleJoinNote}
                                    disabled={!joinCode.trim() || joinLoading || joinSuccess}
                                    className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                                >
                                    {joinLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Joining...</span>
                                        </>
                                    ) : joinSuccess ? (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Success!</span>
                                        </>
                                    ) : (
                                        <span>Join Note</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NoteList;