import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Navbar from "../components/Navbar";
import { useNotesStore } from "../store/note";
import { useNavigate } from "react-router-dom";
import { Save, X, ArrowLeft, FileText, Tag, Type } from "lucide-react";

function AddNote() {
  const navigate = useNavigate();
  const addNote = useNotesStore((s) => s.addNote);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Enhanced configuration untuk Classic Editor
  const editorConfig = {
    toolbar: {
      items: [
        'heading', 
        '|',
        'bold', 'italic', 'underline', 'strikethrough', 'code',
        '|',
        'link', 'insertImage', 'mediaEmbed',
        '|',
        'bulletedList', 'numberedList', 'todoList',
        '|',
        'blockQuote', 'codeBlock', 'insertTable',
        '|',
        'undo', 'redo',
        '|',
        'alignment', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
        '|',
        'horizontalLine', 'pageBreak', 'specialCharacters'
      ],
      shouldNotGroupWhenFull: true
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
      ]
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://'
    },
    placeholder: "Write your amazing content here...",
    removePlugins: ['Markdown'],
    extraPlugins: []
  };

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
              <p className="text-gray-400 text-sm">Rich text editor with classic interface</p>
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
            </div>

            {/* Content - Enhanced Classic Editor */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-300">Content</label>
              </div>
              
              <div className="border border-gray-600 rounded-lg overflow-hidden">
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  data={body}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setBody(data);
                  }}
                />
              </div>
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

        {/* Custom CSS untuk Classic Editor */}
        <style>
          {`
            /* Reset default CKEditor styles */
            .ck.ck-editor {
              color: #f3f4f6 !important;
            }
            
            .ck.ck-editor__editable_inline {
              min-height: 400px;
              padding: 1.5rem;
              background: #374151 !important; /* Same as bg-gray-700 */
              color: #f3f4f6 !important; /* text-gray-100 */
              border: 1px solid #4b5563 !important; /* border-gray-600 */
              font-size: 16px;
              line-height: 1.6;
            }
            
            .ck.ck-editor__editable_inline:focus {
              outline: none;
              box-shadow: 0 0 0 2px #3b82f6 !important;
              border-color: #3b82f6 !important;
            }
            
            .ck.ck-toolbar {
              background: #4b5563 !important; /* bg-gray-600 */
              border: 1px solid #6b7280 !important; /* border-gray-500 */
              border-bottom: none !important;
              padding: 0.5rem;
              border-radius: 0.5rem 0.5rem 0 0;
            }
            
            .ck.ck-toolbar__separator {
              background-color: #6b7280 !important; /* border-gray-500 */
            }
            
            .ck.ck-button {
              color: #f3f4f6 !important; /* text-gray-100 */
              padding: 0.375rem 0.5rem;
              border-radius: 0.25rem;
              transition: all 0.2s;
            }
            
            .ck.ck-button:not(.ck-disabled):hover {
              background: #6b7280 !important; /* hover:bg-gray-500 */
              color: #ffffff !important;
            }
            
            .ck.ck-button.ck-on {
              background: #3b82f6 !important; /* bg-blue-500 */
              color: #ffffff !important;
            }
            
            .ck.ck-dropdown__panel {
              background: #374151 !important; /* bg-gray-700 */
              border: 1px solid #6b7280 !important; /* border-gray-500 */
              border-radius: 0.375rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            
            .ck.ck-list__item {
              color: #f3f4f6 !important; /* text-gray-100 */
              padding: 0.5rem 1rem;
            }
            
            .ck.ck-list__item:hover {
              background: #4b5563 !important; /* bg-gray-600 */
              color: #ffffff !important;
            }
            
            .ck.ck-input-text {
              background: #4b5563 !important; /* bg-gray-600 */
              border: 1px solid #6b7280 !important; /* border-gray-500 */
              color: #f3f4f6 !important; /* text-gray-100 */
              border-radius: 0.25rem;
            }
            
            .ck.ck-input-text:focus {
              border-color: #3b82f6 !important;
              box-shadow: 0 0 0 1px #3b82f6 !important;
            }
            
            /* Override semua text colors di content */
            .ck.ck-content {
              background: #374151 !important;
              color: #f3f4f6 !important;
            }
            
            .ck.ck-content * {
              color: #f3f4f6 !important;
            }
            
            .ck.ck-content h1, .ck.ck-content h2, .ck.ck-content h3, .ck.ck-content h4 {
              color: #f9fafb !important; /* text-gray-50 */
              margin: 1.5rem 0 1rem 0;
              font-weight: 600;
            }
            
            .ck.ck-content h1 { font-size: 2.25rem; }
            .ck.ck-content h2 { font-size: 1.875rem; }
            .ck.ck-content h3 { font-size: 1.5rem; }
            .ck.ck-content h4 { font-size: 1.25rem; }
            
            .ck.ck-content p {
              margin: 1rem 0;
              color: #f3f4f6 !important;
            }
            
            .ck.ck-content blockquote {
              border-left: 4px solid #3b82f6 !important;
              padding-left: 1.5rem;
              margin: 1.5rem 0;
              font-style: italic;
              color: #d1d5db !important; /* text-gray-300 */
              background: #4b5563 !important; /* bg-gray-600 */
              padding: 1rem;
              border-radius: 0.375rem;
            }
            
            .ck.ck-content ul, .ck.ck-content ol {
              padding-left: 2rem;
              margin: 1rem 0;
            }
            
            .ck.ck-content li {
              margin: 0.5rem 0;
              color: #f3f4f6 !important;
            }
            
            .ck.ck-content table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
              background: #4b5563 !important; /* bg-gray-600 */
            }
            
            .ck.ck-content table td, .ck.ck-content table th {
              border: 1px solid #6b7280 !important; /* border-gray-500 */
              padding: 0.75rem;
              color: #f3f4f6 !important;
            }
            
            .ck.ck-content table th {
              background: #374151 !important; /* bg-gray-700 */
              font-weight: 600;
            }
            
            .ck.ck-content code {
              background: #1f2937 !important; /* bg-gray-800 */
              color: #f3f4f6 !important;
              padding: 0.125rem 0.25rem;
              border-radius: 0.25rem;
              font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            }
            
            .ck.ck-content pre {
              background: #1f2937 !important; /* bg-gray-800 */
              color: #f3f4f6 !important;
              padding: 1rem;
              border-radius: 0.375rem;
              overflow-x: auto;
              margin: 1rem 0;
              border: 1px solid #374151 !important;
            }
            
            .ck.ck-content pre code {
              background: transparent !important;
              padding: 0;
            }
            
            .ck.ck-content a {
              color: #3b82f6 !important; /* text-blue-400 */
              text-decoration: underline;
            }
            
            .ck.ck-content a:hover {
              color: #2563eb !important; /* text-blue-500 */
            }
            
            .ck.ck-content img {
              max-width: 100%;
              height: auto;
              border-radius: 0.375rem;
              border: 1px solid #6b7280 !important;
            }
            
            /* Placeholder text color */
            .ck.ck-editor__editable_inline .ck-placeholder::before {
              color: #9ca3af !important; /* text-gray-400 */
            }
            
            /* Selection background */
            .ck.ck-editor__editable_inline ::selection {
              background: #3b82f6 !important;
              color: #ffffff !important;
            }
            
            /* Untuk dropdown items */
            .ck.ck-dropdown__panel .ck-button__label {
              color: #f3f4f6 !important;
            }
            
            /* Icon colors */
            .ck.ck-icon {
              color: #f3f4f6 !important;
            }
            
            .ck.ck-button:hover .ck.ck-icon {
              color: #ffffff !important;
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default AddNote;