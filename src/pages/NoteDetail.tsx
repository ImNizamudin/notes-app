import { useEffect, useState, useRef } from "react";
import { useNotesStore, type Note } from "../store/note";
import { useCollaborationStore } from "../store/collaboration";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Edit3,
  Trash2,
  ArrowLeft,
  Calendar,
  Tag,
  FileText,
  User,
  MessageCircle,
  Send,
  X,
  Type,
  ImageIcon,
  Eye,
  Plus,
  RefreshCw,
  Upload,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
    [{ header: [1, 2, 3, false] }, { font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
    ["link", "image", "formula", "code"],
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

function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchNoteById = useNotesStore((s) => s.fetchNoteById);
  const deleteNote = useNotesStore((s) => s.deleteNote);

  const {
    collaborations,
    comments,
    loading: collaborationsLoading,
    addOrUpdateComment,
    deleteComment,
    fetchCollaborations
  } = useCollaborationStore();

  console.log(comments)

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");

  const [body, setBody] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [editThumbnail, setEditThumbnail] = useState<string | null>(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"gallery" | "upload">("gallery");
  const [galleryFiles, setGalleryFiles] = useState<GalleryFile[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number;}>({});
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setErr(null);
      if (!id) throw new Error("Note ID is required");
      const noteData = await fetchNoteById(id);
      setNote(noteData);

      await fetchCollaborations(parseInt(id));
    } catch (error: any) {
      setErr(error.message || "Failed to load note");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setErr("Note ID is required");
      setLoading(false);
      return;
    }
    loadData();
  }, [id, fetchNoteById]);

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

  const handleAddComment = async () => {
    if (!id || !body.trim()) return;
    try {
      await addOrUpdateComment(parseInt(id), body, thumbnail ?? undefined);
      setBody("");
      setThumbnail(null);
      loadData();
    } catch (error: any) {
      setErr(error.message || "Failed to add comment");
    }
  };

  const handleEditComment = async () => {
    if (!editCommentText.trim() || !editingCommentId) return;
    if (!id) return;
    try {
      await addOrUpdateComment(
        parseInt(id),
        editCommentText,
        editThumbnail ?? undefined, // Gunakan editThumbnail
        editingCommentId
      );
      setEditingCommentId(null);
      setEditCommentText("");
      setEditThumbnail(null);
      loadData();
    } catch (error: any) {
      setErr(error.message || "Failed to edit comment");
    }
  };

  const handleDeleteComment = async (collabId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus komentar ini?")) return;
    try {
      await deleteComment(collabId);
      loadData();
    } catch (error: any) {
      setErr(error.message || "Failed to delete comment");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showMediaModal) {
      fetchGalleryFiles();
    }
  }, [showMediaModal]);

  const fetchGalleryFiles = async () => {
    setLoadingGallery(true);
    try {
      const response: GalleryResponse = await apiClient(
        "/files/notes_app",
        "GET"
      );
      setGalleryFiles(response.files || []);
    } catch (error: any) {
      console.error("Error fetching gallery files:", error);
      setUploadError(
        error.response?.meta?.message || "Failed to load gallery files"
      );
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setUploadError(null);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
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
          for (let progress = 0; progress <= 100; progress += 10) {
            setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
            await new Promise((resolve) => setTimeout(resolve, 50));
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
      await fetchGalleryFiles();
    } catch (err: any) {
      setUploadError(err.response?.meta?.message || "Failed to upload files");
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const isImageFile = (mimeType: string) => {
    return mimeType.startsWith("image/");
  };

  const handleEditorChange = (content: string) => {
    setBody(content);
  };

  const handleSelectThumbnail = (fileName: string) => {
    if (editingCommentId) {
      // Jika sedang edit mode, set editThumbnail
      setEditThumbnail(fileName);
    } else {
      // Jika sedang add mode, set thumbnail biasa
      setThumbnail(fileName);
    }
    setShowMediaModal(false);
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
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
                  <span>Created by: {note.user_owner?.username || 'Unknown author'}</span>
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
                    {comments.length}
                  </span>
                </div>

                {/* Add Comment Form - DESAIN BARU */}
                <div className="mb-6 bg-gray-700 rounded-lg p-4">
                  {/* Rich Text Editor */}
                  <div className="mb-4">
                    <div className="bg-gray-600 border border-gray-500 rounded-lg overflow-hidden">
                      <ReactQuill
                        value={body}
                        onChange={handleEditorChange}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Write your comment here..."
                        theme="snow"
                        className="auto-resize-quill"
                      />
                    </div>
                  </div>

                  {/* Thumbnail and Submit Button Row */}
                  <div className="flex items-center justify-between">
                    {/* Thumbnail Section */}
                    <div className="flex items-center space-x-3">
                      {thumbnail ? (
                        <div className="relative">
                          <a
                            href={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${thumbnail}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                            title="View image in new tab"
                          >
                            <img 
                              src={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${thumbnail}`}
                              alt="Thumbnail preview"
                              className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                            />
                          </a>
                          <button
                            type="button"
                            onClick={handleRemoveThumbnail}
                            className="absolute -top-2 -right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full"
                            title="Remove thumbnail"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowMediaModal(true)}
                          className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
                          title="Add thumbnail"
                        >
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-sm">Add Image</span>
                        </button>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleAddComment}
                      disabled={!body.trim() || collaborationsLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {collaborationsLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>Add Comment</span>
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {comment.user_name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-100 font-medium">
                              {comment.user_name || 'Unknown User'}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {formatDate(comment.created_at)}
                            </p>
                          </div>
                        </div>

                        {/* Edit/Delete Buttons */}
                        {editingCommentId !== String(comment.id) && (
                          <div className="flex space-x-1">
                            <button
                              onClick={() => {
                                setEditingCommentId(String(comment.id));
                                setEditCommentText(comment.body || '');
                                setEditThumbnail(comment.thumbnail || null);
                              }}
                              className="text-gray-400 hover:text-blue-400 p-1"
                              title="Edit comment"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(String(comment.id))}
                              className="text-gray-400 hover:text-red-400 p-1"
                              title="Delete comment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Comment Thumbnail */}
                      {comment.thumbnail && (
                        <div className="mb-3">
                          <a
                            href={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${comment.thumbnail}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                            title="View image in new tab"
                          >
                            <img 
                              src={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${comment.thumbnail}`}
                              alt="Comment thumbnail"
                              className="w-32 h-32 object-cover rounded-lg border border-gray-600 hover:opacity-90 transition-opacity"
                            />
                          </a>
                        </div>
                      )}

                      {editingCommentId === String(comment.id) ? (
                        <div className="space-y-4 mt-2">
                          {/* Editor untuk edit komentar */}
                          <div className="bg-gray-600 border border-gray-500 rounded-lg overflow-hidden">
                            <ReactQuill
                              value={editCommentText}
                              onChange={setEditCommentText}
                              modules={quillModules}
                              formats={quillFormats}
                              theme="snow"
                              className="auto-resize-quill"
                            />
                          </div>

                          {/* Thumbnail Editor Section */}
                          <div className="flex items-center space-x-3">
                            {editThumbnail ? (
                              <div className="relative">
                                <a
                                  href={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${editThumbnail}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block"
                                  title="View image in new tab"
                                >
                                  <img 
                                    src={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${editThumbnail}`}
                                    alt="Thumbnail preview"
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                                  />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => setEditThumbnail(null)}
                                  className="absolute -top-2 -right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full"
                                  title="Remove thumbnail"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setShowMediaModal(true)}
                                className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
                                title="Add thumbnail"
                              >
                                <ImageIcon className="w-4 h-4" />
                                <span className="text-sm">Change Image</span>
                              </button>
                            )}
                          </div>

                          {/* Action Buttons - DI KANAN */}
                          <div className="flex justify-end space-x-2 pt-2">
                            <button
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditCommentText("");
                                setEditThumbnail(null);
                              }}
                              className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleEditComment()}
                              disabled={!editCommentText.trim()}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="ql-editor text-gray-300"
                          dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(comment.body || '') 
                          }}
                        />
                      )}
                    </div>
                  ))}

                  {comments.length === 0 && (
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

      {/* Media Modal - SAMA DENGAN YANG DI ADDNOTE.TSX */}
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
  );
}

export default NoteDetail;