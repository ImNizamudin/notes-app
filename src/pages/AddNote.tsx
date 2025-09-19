import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNotesStore } from "../store/note";
import { useNavigate } from "react-router-dom";
import { 
  Save, X, ArrowLeft, FileText, Tag, Type, 
  ImageIcon, Plus, Trash2, Upload, AlertCircle, 
  CheckCircle, Download, Eye, RefreshCw, Lock, Globe 
} from "lucide-react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import { apiClient } from "../api/client";

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

// Interface untuk file gallery
interface GalleryFile {
  id: string;
  created_at: string;
  updated_at: string;
  uploader_id: number;
  name: string;
  path: string;
  size: number;
  mime: string;
  tags: string[];
}

interface GalleryResponse {
  files: GalleryFile[];
  total_maximum: number;
  total_usage: number;
  page: {
    current_page: number;
    total_data: number;
    limit: number;
    total_page: number;
  };
  meta: {
    message: string;
    code: number;
  };
}

function AddNote() {
  const navigate = useNavigate();
  const addNote = useNotesStore((s) => s.addNote);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [type, setType] = useState<"private" | "default">("default"); // State baru untuk type
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"gallery" | "upload">("gallery");
  const [galleryFiles, setGalleryFiles] = useState<GalleryFile[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch gallery files
  useEffect(() => {
    if (showMediaModal) {
      fetchGalleryFiles();
    }
  }, [showMediaModal]);

  const fetchGalleryFiles = async () => {
    setLoadingGallery(true);
    try {
      const response: GalleryResponse = await apiClient("/files/notes_app", "GET");
      setGalleryFiles(response.files || []);
    } catch (error: any) {
      console.error("Error fetching gallery files:", error);
      setUploadError(error.response?.meta?.message || "Failed to load gallery files");
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles(prev => [...prev, ...newFiles]);
    setUploadError(null);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadError("Please select at least one file to upload");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fieldName = `thumbnail_${i + 1}`;

        try {
          const formData = new FormData();
          formData.append("fields", fieldName);
          formData.append(fieldName, file);

          // Simulate progress
          for (let progress = 0; progress <= 100; progress += 10) {
            setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
            await new Promise(resolve => setTimeout(resolve, 50));
          }

          await apiClient("/files/notes_app/bulk-upload", "POST", formData);
        } catch (fileError: any) {
          console.error(`Error uploading ${file.name}:`, fileError);
          setUploadError(
            `Failed to upload ${file.name}: ${
              fileError.response?.meta?.message || fileError.message
            }`
          );
        }
      }

      setSelectedFiles([]);
      setUploadSuccess(`Successfully uploaded ${selectedFiles.length} file(s)`);
      
      // Refresh gallery after upload
      await fetchGalleryFiles();
    } catch (err: any) {
      setUploadError(err.response?.meta?.message || "Failed to upload files");
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImageFile = (mimeType: string) => {
    return mimeType.startsWith('image/');
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

      await addNote({
        title,
        body,
        tags,
        type, // Tambahkan type ke data yang dikirim
        thumbnail: thumbnail || undefined,
      });

      navigate("/");
    } catch (e: any) {
      setErr(e.message || "Gagal menambahkan note");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || body.trim() || tagsInput.trim() || thumbnail) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const handleEditorChange = (content: string) => {
    setBody(content);
  };

  const handleSelectThumbnail = (fileName: string) => {
    setThumbnail(fileName);
    setShowMediaModal(false);
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
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
                required
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

            {/* Type - Dropdown baru */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center space-x-2 mb-3">
                {type === "private" ? (
                  <Lock className="w-5 h-5 text-gray-400" />
                ) : (
                  <Globe className="w-5 h-5 text-gray-400" />
                )}
                <label className="text-sm font-medium text-gray-300">Visibility</label>
              </div>
              <select
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={type}
                onChange={(e) => setType(e.target.value as "private" | "default")}
                required
              >
                <option value="default">Public (Default)</option>
                <option value="private">Private</option>
              </select>
              <p className="text-gray-400 text-sm mt-2">
                {type === "private" 
                  ? "Only you can see this note" 
                  : "This note will be visible to everyone"}
              </p>
            </div>

            {/* Thumbnail */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center space-x-2 mb-3">
                <ImageIcon className="w-5 h-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-300">Thumbnail</label>
              </div>
              
              {thumbnail ? (
                <div className="relative">
                  <img 
                    src={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${thumbnail}`}
                    alt="Thumbnail preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveThumbnail}
                    className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowMediaModal(true)}
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-gray-200 hover:border-gray-500 transition-colors"
                >
                  <Plus className="w-6 h-6 mr-2" />
                  Add Thumbnail
                </button>
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

        {/* Media Modal */}
        {showMediaModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-100">Select Thumbnail</h2>
                <button
                  onClick={() => setShowMediaModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-700">
                <div className="flex">
                  <button
                    className={`px-6 py-3 font-medium ${activeTab === "gallery" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-gray-200"}`}
                    onClick={() => setActiveTab("gallery")}
                  >
                    Gallery
                  </button>
                  <button
                    className={`px-6 py-3 font-medium ${activeTab === "upload" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-gray-200"}`}
                    onClick={() => setActiveTab("upload")}
                  >
                    Upload New
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto flex-grow">
                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-300">Your Uploaded Images</h3>
                      <button
                        onClick={fetchGalleryFiles}
                        disabled={loadingGallery}
                        className="flex items-center space-x-2 px-3 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${loadingGallery ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>
                    </div>

                    {loadingGallery ? (
                      <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    ) : galleryFiles.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No images found. Upload some images to get started!</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryFiles.map((file) => (
                          isImageFile(file.mime) && (
                            <div
                              key={file.id}
                              className="cursor-pointer group bg-gray-700 rounded-lg p-3"
                              onClick={() => handleSelectThumbnail(file.name)}
                            >
                              <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-600 group-hover:border-blue-500 transition-colors">
                                <img
                                  src={`https://minio-s3.radarku.online/radarku-bucket/${file.path}/${file.name}`}
                                  alt={file.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="mt-2">
                                <p className="text-sm text-gray-300 truncate">{file.name}</p>
                                <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Upload Tab */}
                {activeTab === "upload" && (
                  <>
                    <h3 className="text-lg font-medium text-gray-300 mb-4">Upload New Image</h3>
                    
                    {/* File Input */}
                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center mb-6">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                      
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Drag & drop images here or</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                        disabled={uploading}
                      >
                        Browse Images
                      </button>
                      <p className="text-gray-400 text-sm mt-2">
                        Supports JPG, PNG, GIF, and other image formats
                      </p>
                    </div>

                    {/* Selected Files */}
                    {selectedFiles.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-md font-medium text-gray-300 mb-3">Selected Images ({selectedFiles.length})</h4>
                        <div className="space-y-3">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={file.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-100 text-sm font-medium truncate">{file.name}</p>
                                  <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeSelectedFile(index)}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                                disabled={uploading}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Upload Button */}
                        <button
                          onClick={handleUpload}
                          disabled={uploading}
                          className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {uploading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5" />
                              <span>Upload {selectedFiles.length} Image(s)</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Upload Messages */}
                    {uploadError && (
                      <div className="bg-red-900/50 border border-red-700 rounded-xl p-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <p className="text-red-200">{uploadError}</p>
                        </div>
                      </div>
                    )}

                    {uploadSuccess && (
                      <div className="bg-green-900/50 border border-green-700 rounded-xl p-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <p className="text-green-200">{uploadSuccess}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-700 flex justify-end">
                <button
                  onClick={() => setShowMediaModal(false)}
                  className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddNote;