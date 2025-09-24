import { useEffect, useState } from "react";
import { useNotesStore } from "../store/note";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";
import { Plus, Search, Grid, List, FileText } from "lucide-react";

function NoteList() {
    const { notes, fetchNotes, loading } = useNotesStore((state) => state);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-900">
            {/* <Navbar /> */}

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
                        <Link
                            to="/notes/new"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Your First Note</span>
                        </Link>
                    </div>
                ) : (
                    <div className={`${
                        viewMode === 'grid' 
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
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
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <Link 
                to="/notes/new" 
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 hover:scale-110 hover:shadow-blue-500/25 z-40"
            >
                <Plus className="w-6 h-6" />
            </Link>
        </div>
    );
}

export default NoteList;