import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNotesStore, type Note } from "../store/note";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Edit3, Trash2, ArrowLeft, Calendar, Tag, FileText } from "lucide-react";

function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getNote = useNotesStore((s) => s.getNote);
  const fetchNoteById = useNotesStore((s) => s.fetchNoteById);
  const deleteNote = useNotesStore((s) => s.deleteNote);

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const local = getNote(id);
    if (local) {
      setNote(local);
      setLoading(false);
    } else {
      fetchNoteById(id)
        .then((data) => setNote(data))
        .catch((e) => setErr(e.message || "Gagal memuat note"))
        .finally(() => setLoading(false));
    }
  }, [id, getNote, fetchNoteById]);

  const onDelete = async () => {
    if (!id) return;
    if (!confirm("Hapus note ini?")) return;
    setDeleting(true);
    try {
      await deleteNote(id);
      navigate("/");
    } catch (e: any) {
      setErr(e.message || "Gagal menghapus note");
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

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
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
                      <span>{deleting ? "Menghapus..." : "Hapus"}</span>
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
              <div className="p-6">
                {note.body ? (
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed font-sans">
                      {note.body}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">This note is empty</p>
                    <p className="text-gray-500 text-sm mt-2">Click Edit to add content</p>
                  </div>
                )}
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