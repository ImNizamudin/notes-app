import { Link } from "react-router-dom";
import { useNotesStore } from "../store/note";
import { Edit3, Trash2, Tag, Clock, Eye, MessageCircle, UserCheck } from "lucide-react";
import { useState } from "react";

interface Props {
    note: {
        id: string;
        title: string;
        body: string;
        tags: string[];
        thumbnail?: string;
        created_at?: string;
        updated_at?: string;
        username?: string;
        is_editable?: boolean;
        is_deletable?: boolean;
        total_daily_notes: number;
        total_daily_notes_mine: number;
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

    const truncateText = (text: string, maxLength: number = 150) => {
        const plainText = text.replace(/<[^>]*>/g, '');
        if (plainText.length <= maxLength) return plainText;
        return plainText.substring(0, maxLength) + '...';
    };

    const canEdit = note.is_editable === true;
    const canDelete = note.is_deletable === true;

    return (
        <div className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gray-900/20 transition-all duration-300 hover:border-gray-600 flex flex-col h-full">
            
            {/* User Profile Header */}
            <div className="p-4 border-b border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {note.username}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h3 className="text-gray-200 font-medium text-sm truncate">
                                {note.username}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>{formatDate(note.updated_at || note.created_at) || 'No date'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                            to={`/notes/${note.id}`}
                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-md transition-colors"
                            title="View"
                        >
                            <Eye className="w-4 h-4" />
                        </Link>
                        
                        {canEdit && (
                            <Link 
                                to={`/notes/${note.id}/edit`}
                                className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded-md transition-colors"
                                title="Edit"
                            >
                                <Edit3 className="w-4 h-4" />
                            </Link>
                        )}
                        
                        {canDelete && (
                            <button 
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4 flex-grow flex flex-col">
                
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-100 mb-3 line-clamp-2 leading-tight flex-shrink-0">
                    {note.title || 'Untitled Note'}
                </h2>

                {/* Tags */}
                {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3 flex-shrink-0">
                        {note.tags.slice(0, 3).map((tag, index) => (
                            <span 
                                key={index} 
                                className="inline-flex items-center space-x-1 bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-600/30"
                            >
                                <Tag className="w-2.5 h-2.5" />
                                <span>{tag}</span>
                            </span>
                        ))}
                        {note.tags.length > 3 && (
                            <span className="inline-flex items-center bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                                +{note.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                <div className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                    {truncateText(note.body) || 'No content available'}
                </div>

                {note.thumbnail && (
                    <div className="relative overflow-hidden mb-4 rounded-lg flex-shrink-0">
                        <img 
                            src={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${note.thumbnail}`}
                            alt="Note thumbnail"
                            className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                            <Link
                                to={`/notes/${note.id}`}
                                className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-xs"
                            >
                                <Eye className="w-3 h-3 inline mr-1" />
                                View
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex-shrink-0"> {/* Tambahkan flex-shrink-0 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-gray-400 bg-gray-700/50 px-1 py-1 rounded-lg border border-gray-600">
                            <MessageCircle className="w-3 h-3" />
                            <span className="text-xs"> {note.total_daily_notes || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-blue-400 bg-gray-700/50 px-1 py-1 rounded-lg border border-gray-600">
                            <UserCheck className="w-3 h-3" />
                            <span className="text-xs"> {note.total_daily_notes_mine || 0}</span>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <Link 
                            to={`/notes/${note.id}`}
                            className="px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs rounded-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow hover:shadow-blue-500/20"
                        >
                            View
                        </Link>
                        
                        {canDelete && (
                            <button 
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-2 py-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs rounded-md hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow hover:shadow-red-500/20 disabled:opacity-50"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;