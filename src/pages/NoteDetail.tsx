import { useEffect, useState } from "react";
import { useNotesStore, type Note } from "../store/note";
import { useCollaborationStore } from "../store/collaboration";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Edit3, Trash2, ArrowLeft, Calendar, Tag, FileText, User, MessageCircle, Send, X, Type, ImageIcon, Eye } from "lucide-react";
import DOMPurify from "dompurify";

function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchNoteById = useNotesStore((s) => s.fetchNoteById);
  const deleteNote = useNotesStore((s) => s.deleteNote);

  const {
    collaborations, // Gunakan collaborations dari store, bukan dari note
    loading: collaborationsLoading, 
    addOrUpdateComment, 
    deleteComment,
    fetchCollaborations // Tambahkan fungsi untuk fetch collaborations
  } = useCollaborationStore();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  // State untuk komentar
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");

  // Filter hanya komentar yang memiliki body
  const collaborationsComment = collaborations.filter((c) => c.body);

  useEffect(() => {
    if (!id) {
      setErr("Note ID is required");
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setErr(null);
        
        // Load note data
        const noteData = await fetchNoteById(id);
        setNote(noteData);
        
        // Load collaborations data
        await fetchCollaborations(parseInt(id));
      } catch (error: any) {
        setErr(error.message || "Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, fetchNoteById, fetchCollaborations]);

  const onDelete = async () => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    setDeleting(true);
    try {
      await deleteNote(id);
      navigate("/");
    } catch (error: any) {
      setErr(error.message || "Failed to delete note");
      setDeleting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Fungsi untuk menambah komentar
  const handleAddComment = async () => {
    if (!id || !newComment.trim()) return;
    
    try {
      await addOrUpdateComment(parseInt(id), newComment);
      setNewComment("");
      // Tidak perlu memanggil fetchCollaborations lagi karena store sudah otomatis update
    } catch (error) {
      // Error sudah dihandle oleh store
    }
  };

  const handleEditComment = async () => {
    if (!editCommentText.trim()) return;
    if (!id) return;
    
    try {
      await addOrUpdateComment(parseInt(id), editCommentText);
      setEditingCommentId(null);
      setEditCommentText("");
    } catch (error) {
      // Error sudah dihandle oleh store
    }
  };

  const handleDeleteComment = async (collabId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus komentar ini?")) return;
    
    try {
      await deleteComment(collabId);
    } catch (error) {
      // Error sudah dihandle oleh store
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Note Details</h1>
              <p className="text-gray-400 text-sm">View and manage your note</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : err ? (
            <div className="text-center py-20">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <p className="text-red-400 text-lg font-medium mb-2">Error Loading Note</p>
              <p className="text-gray-400 mb-6">{err}</p>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Notes
              </button>
            </div>
          ) : note ? (
            <>
              {/* Note Header */}
              <div className="border-b border-gray-700 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-100 mb-3">{note.title}</h1>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Updated: {formatDate(note.updated_at || note.created_at)}</span>
                      </div>
                      {note.created_at && note.updated_at && note.created_at !== note.updated_at && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Created: {formatDate(note.created_at)}</span>
                        </div>
                      )}
                      {note.user_owner?.fullname && (
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>Author: {note.user_owner.fullname}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/notes/${note.id}/edit`}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={onDelete}
                      disabled={deleting}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-red-500/25 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{deleting ? "Deleting..." : "Delete"}</span>
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {note.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-1 bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-lg"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Note Content */}
              <div className="p-6 border-b border-gray-700">
                <div className="mb-4 text-sm text-gray-400 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Created by: {note.user_owner?.fullname || 'Unknown author'}</span>
                </div>

                {/* Thumbnail */}
                {note.thumbnail && (
                  <div className="mb-6 rounded-lg overflow-hidden border border-gray-600 relative">

                    <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2">
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Thumbnail</span>
                    </div>

                      <a
                        href={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${note.thumbnail}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-[0px] right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                        title="View image in new tab"
                      >
                        <Eye className="w-4 h-4" />
                      </a>

                    <img 
                      src={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${note.thumbnail}`}
                      alt="Note thumbnail"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                {note.body ? (
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed font-sans">
                      <div 
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.body) }}
                      />
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">This note is empty</p>
                    <p className="text-gray-500 text-sm mt-2">Click Edit to add content</p>
                    {note.user_owner?.fullname && (
                      <div className="mt-4 text-sm text-gray-500 flex items-center justify-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>Created by: {note.user_owner.fullname}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Comments Section */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-300">Comments</h3>
                  <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                    {collaborationsComment.length}
                  </span>
                  {collaborationsLoading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  )}
                </div>

                {/* Add Comment Form */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={collaborationsLoading}
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || collaborationsLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {collaborationsLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {collaborationsComment.map((collab) => {
                    return (
                      <div key={collab.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {collab.user?.username?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="text-gray-100 font-medium">
                                {collab.user?.fullname || collab.user?.username || 'Unknown User'}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {formatDate(collab.created_at)}
                              </p>
                            </div>
                          </div>
                          
                          {/* Edit/Delete Buttons (hanya untuk pemilik komentar) */}
                          <div className="flex space-x-1">
                            <button
                              onClick={() => {
                                setEditingCommentId(collab.id);
                                setEditCommentText(collab.body || '');
                              }}
                              className="text-gray-400 hover:text-blue-400 p-1"
                            >
                              <Type className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(collab.id)}
                              className="text-gray-400 hover:text-red-400 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {editingCommentId === collab.id ? (
                          <div className="flex space-x-2 mt-2">
                            <input
                              type="text"
                              value={editCommentText}
                              onChange={(e) => setEditCommentText(e.target.value)}
                              className="flex-1 bg-gray-600 border border-gray-500 text-gray-100 rounded-lg px-3 py-1"
                            />
                            <button
                              onClick={handleEditComment}
                              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-500"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="px-3 py-1 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-300">{collab.body}</p>
                        )}
                      </div>
                    )
                  })}

                  {collaborationsComment.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-600 text-6xl mb-4">📝</div>
              <p className="text-gray-400 text-lg">Note not found</p>
              <p className="text-gray-500 text-sm mt-2">The note you're looking for doesn't exist</p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Notes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteDetail;