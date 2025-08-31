import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNotesStore } from "../store/note";
import { useNavigate } from "react-router-dom";
import { Save, X, ArrowLeft, FileText, Tag, Type } from "lucide-react";
import CollaboratorInput from "../components/CollaboratorInput";

function AddNote() {
  const navigate = useNavigate();
  const addNote = useNotesStore((s) => s.addNote);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const note = await addNote({ title, body, tags });
      navigate('/');
    } catch (e: any) {
      setErr(e.message || "Gagal menambahkan note");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || body.trim() || tagsInput.trim()) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        navigate(-1);
      }
    } else {
      navigate(-1);
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
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Create New Note</h1>
              <p className="text-gray-400 text-sm">Capture your thoughts and ideas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
            
            {/* Title */}
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

            {/* Tags */}
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
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-300">Content</label>
              </div>
              <textarea
                className="w-full bg-transparent border-none outline-none text-gray-100 placeholder-gray-500 resize-none min-h-[300px]"
                placeholder="Write your note content here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>

            {/* Error */}
            {err && (
              <div className="px-6 pb-4">
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                  <p className="text-sm">{err}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-6 bg-gray-700/30 border-t border-gray-700 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center px-6 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600"
              >
                <Save className="w-4 h-4 mr-1" />
                {loading ? "Saving..." : "Save Note"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
