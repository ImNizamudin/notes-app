import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useNotesStore, type Note } from "../store/note";
import { useCollaborationStore } from "../store/collaboration";
import CollaboratorInput from "../components/CollaboratorInput";
import { Save, X, ArrowLeft, FileText, Tag, Type, Clock, Users, MinusCircle, PlusCircle } from "lucide-react";

function EditNote() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { createCollaboration, deleteCollaboration } = useCollaborationStore();
  const [collaboratorId, setCollaboratorId] = useState("");

  const getNote = useNotesStore((s) => s.getNote);
  const fetchNoteById = useNotesStore((s) => s.fetchNoteById);
  const updateNote = useNotesStore((s) => s.updateNote);

  const [initial, setInitial] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const local = getNote(id);
    if (local) {
      setInitial(local);
      setTitle(local.title);
      setBody(local.body);
      setTagsInput(local.tags.join(", "));
      setLoading(false);
    } else {
      fetchNoteById(id)
        .then((data) => {
          setInitial(data);
          setTitle(data.title);
          setBody(data.body);
          setTagsInput(data.tags?.join(", ") || "");
        })
        .catch((e) => setErr(e.message || "Gagal memuat note"))
        .finally(() => setLoading(false));
    }
  }, [id, fetchNoteById, getNote]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setErr(null);
    setSaving(true);
    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await updateNote(id, { title, body, tags });

      if (collaboratorId.trim()) {
        await createCollaboration(collaboratorId, parseInt(id));
      }

      navigate(`/notes/${id}`);
    } catch (e: any) {
      setErr(e.message || "Gagal menyimpan perubahan");
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = initial && (
    title !== initial.title ||
    body !== initial.body ||
    tagsInput !== initial.tags?.join(", ")
  );

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Edit Note</h1>
                <p className="text-gray-400 text-sm">Make changes to your note</p>
              </div>
            </div>
            
            {initial && (
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Last updated: {formatDate(initial.updated_at || initial.created_at)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          </div>
        ) : initial ? (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
              
              {/* Title Section */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center space-x-2 mb-3">
                  <Type className="w-5 h-5 text-gray-400" />
                  <label className="text-sm font-medium text-gray-300">Title</label>
                </div>
                <input
                  className="w-full bg-transparent border-none outline-none text-2xl font-bold text-gray-100 placeholder-gray-500"
                  placeholder="Enter note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {/* Tags Section */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <label className="text-sm font-medium text-gray-300">Tags</label>
                </div>
                <input
                  className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="Add tags separated by commas (e.g. work, ideas, project)"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
                {tagsInput && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tagsInput.split(',').map((tag, index) => {
                      const trimmedTag = tag.trim();
                      return trimmedTag ? (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 bg-blue-600/20 text-blue-300 text-sm px-3 py-1 rounded-lg border border-blue-500/30"
                        >
                          <Tag className="w-3 h-3" />
                          <span>{trimmedTag}</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              {id && <CollaboratorInput noteId={parseInt(id)} />}

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <label className="text-sm font-medium text-gray-300">Content</label>
                </div>
                <textarea
                  className="w-full bg-transparent border-none outline-none text-gray-100 placeholder-gray-500 resize-none min-h-[300px] leading-relaxed"
                  placeholder="Write your note content here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
              </div>

              {/* Changes Indicator */}
              {hasChanges && (
                <div className="px-6 pb-4">
                  <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-200 px-4 py-3 rounded-lg">
                    <p className="text-sm flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      <span>You have unsaved changes</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {err && (
                <div className="px-6 pb-4">
                  <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                    <p className="text-sm">{err}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="p-6 bg-gray-700/30 border-t border-gray-700 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center justify-center space-x-2 px-6 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={saving || !hasChanges}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
            <div className="text-center py-12">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <p className="text-red-400 text-lg font-medium mb-2">Error Loading Note</p>
              <p className="text-gray-400 mb-6">{err || "Note not found"}</p>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Notes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditNote;