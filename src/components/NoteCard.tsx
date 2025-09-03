import { Link } from "react-router-dom";
import { useNotesStore } from "../store/note";
import { Edit3, Trash2, Tag, Clock } from "lucide-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify  from "dompurify";

interface Props {
    note: {
        id: string;
        title: string;
        body: string;
        tags: string[];
        created_at?: string;
        updated_at?: string;
    }
}

function NoteCard({ note }: Props) {
    const deleteNote = useNotesStore((state) => state.deleteNote);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Hapus catatan ini?")) return;
        
        setIsDeleting(true);
        try {
            await deleteNote(note.id);
        } catch (error) {
            console.error("Error deleting note:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return '';
        }
    };

    const truncateText = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="group bg-gray-800 border border-gray-700 rounded-xl p-5 hover:shadow-xl hover:shadow-gray-900/20 transition-all duration-300 hover:border-gray-600 hover:-translate-y-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-100 line-clamp-2 flex-1 mr-2">
                    {note.title || 'Untitled Note'}
                </h2>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                        to={`/notes/${note.id}`}
                        className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-colors"
                        title="Edit"
                    >
                        <Edit3 className="w-4 h-4" />
                    </Link>
                    <button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* kemungkinan diganti thumbnail */}

            {/* Content Preview */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {truncateText(note.body) || 'No content'}
            </p>

            {/* <div 
                className="ql-editor text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: truncateText(DOMPurify.sanitize(note.body)) }}
            /> */}

            {/* Tags */}
            {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {note.tags.slice(0, 3).map((tag, index) => (
                        <span 
                            key={index} 
                            className="inline-flex items-center space-x-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md"
                        >
                            <Tag className="w-3 h-3" />
                            <span>{tag}</span>
                        </span>
                    ))}
                    {note.tags.length > 3 && (
                        <span className="inline-flex items-center bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md">
                            +{note.tags.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                <div className="flex items-center space-x-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(note.updated_at || note.created_at) || 'No date'}</span>
                </div>
                
                <div className="flex space-x-2">
                    <Link 
                        to={`/notes/${note.id}`}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                    >
                        View
                    </Link>
                    <button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-red-500/25 disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;