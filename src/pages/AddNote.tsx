import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../components/Navbar";
import { useNotesStore } from "../store/note";
import { useNavigate } from "react-router-dom";
import { Save, X, ArrowLeft, FileText, Tag, Type } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";

// Extract plain text dari HTML
const stripHtml = (html: string): string => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);

hljs.configure({
  languages: ["javascript", "typescript", "html", "css", "php", "python"],
});

// Quill toolbar configuration
const quillModules = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: [1, 2, 3, false] }, { font: [] }], // Normal/Heading + Font
    ["bold", "italic", "underline", "strike"], // Styles
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }], // List + Align
    ["link", "image", "formula", "code"], // Insert tools
  ],
};

const quillFormats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "formula",
  "code",
];

function AddNote() {
  const navigate = useNavigate();
  const addNote = useNotesStore((s) => s.addNote);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [plainTextBody, setPlainTextBody] = useState("");
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

      const note = await addNote({
        title,
        body: plainTextBody,
        tags,
      });

      navigate("/");
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

  const handleEditorChange = (content: string) => {
    setBody(content);
    setPlainTextBody(stripHtml(content));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Create New Note</h1>
              <p className="text-gray-400 text-sm">Rich text editor (Quill.js)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-300">Content</label>
              </div>

              <div className="bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
                <ReactQuill
                  value={body}
                  onChange={handleEditorChange}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your amazing content here..."
                  theme="snow"
                />
              </div>

              {plainTextBody && (
                <div className="mt-4 p-4 bg-gray-750 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Preview:</h4>
                  <p className="text-gray-400 text-sm">
                    {plainTextBody.substring(0, 100)}...
                  </p>
                </div>
              )}
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
                className="flex items-center px-6 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-colors"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4 mr-1" />
                {loading ? "Saving..." : "Save Note"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>
        {`
          .ql-toolbar.ql-snow {
            background: #1f2937; /* bg-gray-800 */
            border: 1px solid #374151; /* border-gray-700 */
          }

          .ql-container.ql-snow {
            background: #111827; /* bg-gray-900 */
            border: 1px solid #374151;
            color: #f9fafb; /* text-gray-100 */
            min-height: 300px; /* tinggi editor */
          }

          /* Icon toolbar lebih terang */
          .ql-toolbar .ql-stroke {
            stroke: #e5e7eb !important; /* text-gray-200 */
          }

          .ql-toolbar .ql-fill {
            fill: #e5e7eb !important;
          }

          .ql-toolbar .ql-picker {
            color: #e5e7eb !important;
          }

          /* Dropdown background */
          .ql-picker-options {
            background: #1f2937 !important;
            border: 1px solid #374151 !important;
          }
          
          .ql-editor code {
            background: #1e293b !important; /* bg-slate-800 */
            color: #f9fafb !important;      /* text-gray-100 */
            border-radius: 0.375rem;        /* rounded-md */
            padding: 0.5rem 0.75rem;        /* px-3 py-2 */
            font-family: monospace;
            white-space: pre-wrap;          /* biar nggak overflow */
          }
        `}
      </style>

    </div>
  );
}

export default AddNote;
