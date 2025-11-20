import { useEffect, useState, useRef } from "react";
import { useNotesStore, type Note } from "../store/note";
import { useCollaborationStore } from "../store/collaboration";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  Edit3, Trash2, ArrowLeft, Tag, FileText, Users, Lock, Globe, 
  MessageCircle, Send, X, 
  ImageIcon, Eye,
    RefreshCw, 
  Upload, AlertCircle, CheckCircle, ChevronLeft, ChevronRight, 
  Clock, ImageOff, 
  Copy, Check, Info 
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
import ImageViewModal from "../components/ImageViewModal";

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
  url?: string;
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
    comments,
    pagination,
    loading: collaborationsLoading,
    addOrUpdateComment,
    deleteComment,
    fetchCollaborations
  } = useCollaborationStore();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(10); // Bisa disesuaikan

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
  const [] = useState<{[key: string]: number;}>({});
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Tambahkan state ini di bagian state lainnya
  const [commentError, setCommentError] = useState<string | null>(null);

  // burger action note
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Tambahkan state untuk status copy
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // handle state modal collaboration
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);

  // Fungsi untuk copy code
  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(code);
      setTimeout(() => setCopiedCodeId(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setErr(null);
      if (!id) throw new Error("Note ID is required");
      const noteData = await fetchNoteById(id);
      setNote(noteData);

      // Load comments with pagination
      await fetchCollaborations(parseInt(id), currentPage, commentsPerPage);
    } catch (error: any) {
      setErr(error.response.meta.message);
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
  }, [id, fetchNoteById, currentPage]);
  
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
  
  // Load comments when page changes
  const loadComments = async (page: number) => {
    if (!id) return;
    try {
      setCommentError(null);
      await fetchCollaborations(parseInt(id), page, commentsPerPage);
    } catch (error: any) {
      setCommentError(error.message || "Failed to load comments");
    }
  };

  const handleAddComment = async () => {
    if (!id || !body.trim()) return;
    try {
      setCommentError(null);
      await addOrUpdateComment(parseInt(id), body, thumbnail ?? undefined);
      setBody("");
      setThumbnail(null);
      // Refresh comments and go to first page to see new comment
      setCurrentPage(1);
      await loadComments(1);
    } catch (error: any) {
      console.log(error)
      setCommentError(error.message || "Failed to add comment");
    }
  };

  const handleEditComment = async () => {
    if (!editCommentText.trim() || !editingCommentId) return;
    if (!id) return;

    setCommentError(null);

    try {
      await addOrUpdateComment(
        parseInt(id),
        editCommentText,
        editThumbnail ?? undefined,
        editingCommentId
      );
      setEditingCommentId(null);
      setEditCommentText("");
      setEditThumbnail(null);
      setEditMode(false)
      // Reload current page
      await loadComments(currentPage);
    } catch (error: any) {
      console.error("Edit comment error:", error);
      setCommentError(error.message || "Failed to edit comment");
    }
  };

  const handleDeleteComment = async (collabId: string, noteId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus catatan harian ini?")) return;
    try {
      setCommentError(null);
      await deleteComment(collabId, noteId);
      // Reload current page, or go to previous page if current page becomes empty
      const remainingComments = comments.length - 1;
      const maxPage = Math.ceil(remainingComments / commentsPerPage) || 1;
      const targetPage = currentPage > maxPage ? maxPage : currentPage;
      
      if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
      }
      await loadComments(targetPage);
    } catch (error: any) {
      setCommentError(error.message || "Failed to delete comment");
    }
  };

  const handlePageChange = async (page: number) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    await loadComments(page);
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
          // for (let progress = 0; progress <= 100; progress += 10) {
          //   setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
          //   await new Promise((resolve) => setTimeout(resolve, 50));
          // }
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
      // setUploadProgress({});
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

  // Pagination component
  const PaginationComponent = () => {
    if (!pagination || pagination.total_page <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    const totalPages = pagination.total_page;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-between mt-6 p-4 bg-gray-700 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>
            Showing {((currentPage - 1) * commentsPerPage) + 1} to {Math.min(currentPage * commentsPerPage, pagination.total_data)} of {pagination.total_data} comments
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || collaborationsLoading}
            className="flex items-center space-x-1 px-3 py-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {startPage > 1 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-3 py-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  1
                </button>
                {startPage > 2 && <span className="text-gray-400">...</span>}
              </>
            )}

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={collaborationsLoading}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-3 py-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || collaborationsLoading}
            className="flex items-center space-x-1 px-3 py-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  function getInitials(name: string): string {
    return name
      .trim() // buang spasi depan-belakang
      .split(/\s+/) // pisah berdasarkan spasi
      .map(word => word.charAt(0).toUpperCase()) // ambil huruf pertama, uppercase
      .join('');
  }

  const [imgError, setImgError] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleViewImage = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setViewModalOpen(true);
  };

  const handleRedirectStudyTracker = () => {
    if (!note) return;
    navigate('/study_tracker', { 
      state: { noteId: note.id, }
    });
  }

  // Check permissions for note
  const canEditNote = note?.is_editable === true;
  const canDeleteNote = note?.is_deletable === true;

  const handleLeaveCollaboration = async (noteId: number) => {
    if (!confirm("Apakah Anda yakin ingin keluar dari kolaborasi note ini?")) {
      return;
    }

    try {
      await apiClient("/collaborations/leave", "DELETE", {
        noteId: noteId
      });

      alert("Berhasil keluar dari kolaborasi!");
      // Refresh data atau redirect ke halaman notes
      navigate("/");
    } catch (error: any) {
      console.error("Error leaving collaboration:", error);
      alert(error.response?.meta?.message || "Gagal keluar dari kolaborasi");
    }
  };

  const handleKickCollaborator = async (noteId: number, userId: number, username: string) => {
    if (!confirm(`Apakah Anda yakin ingin mengeluarkan ${username} dari kolaborasi?`)) {
      return;
    }

    try {
      await apiClient("/collaborations", "DELETE", {
        noteId: noteId,
        userId: userId.toString()
      });

      alert(`Berhasil mengeluarkan ${username} dari kolaborasi!`);
      // Refresh data notes
      loadData();
      setShowCollaborationModal(false);
    } catch (error: any) {
      console.error("Error kicking collaborator:", error);
      alert(error.response?.meta?.message || "Gagal mengeluarkan collaborator");
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
              <div className="px-6 pt-6">
                <div className="flex flex-col space-y-3">
                  {/* Bagian 1: User Info & Action Buttons */}
                  <div className="flex justify-between items-start">
                    {/* User Info */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(note.user_owner?.username || "")}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-200 font-medium text-sm truncate">
                          {note.user_owner?.username || note.username || 'Unknown user'}
                        </h3>
                        <div className="flex gap-2 text-xs text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(note.created_at) || 'No date'}</span>
                          </div>
                          <span>{formatDate(note.created_at) !== formatDate(note.updated_at)
                              ? '(Edited)'
                              : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                      {(canEditNote || canDeleteNote || note.type === "tracker") && (
                      <div className="flex items-center space-x-3">
                        {/* Tampilkan generate_code jika ada */}
                        {note.generate_code && (
                          <div className="flex items-center space-x-2">
                            {copiedCodeId === note.generate_code && (
                              <span className="text-xs text-green-400 animate-pulse">Copied!</span>
                            )}
                            <div className="flex items-center space-x-1 bg-gray-700 px-2 py-2 rounded-md border border-gray-600 justify-center">
                              <span className="text-sm text-gray-300 font-mono">
                                {note.generate_code}
                              </span>
                              <button
                                onClick={() => handleCopyCode(note.generate_code!)}
                                className="p-1 text-gray-400 bg-gray-700 hover:text-gray-200 hover:bg-gray-600 rounded transition-colors"
                                title="Copy code"
                              >
                                {copiedCodeId === note.generate_code ? (
                                  <Check className="w-3 h-3 text-green-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                        {/* Desktop View - All buttons visible */}
                        <div className="hidden md:flex items-center space-x-3">
                          {canEditNote && (
                            <Link
                              to={`/notes/${note.id}/edit`}
                              className="flex items-center space-x-2 px-2 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span className="text-sm">Edit</span>
                            </Link>
                          )}
                          {canDeleteNote && (
                            <button
                              onClick={onDelete}
                              disabled={deleting}
                              className="flex items-center space-x-2 px-2 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-red-500/25 disabled:opacity-50"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span className="text-sm">{deleting ? "Deleting..." : "Delete"}</span>
                            </button>
                          )}
                          {note.type === "tracker" && (
                            <button
                              onClick={handleRedirectStudyTracker}
                              className="flex items-center space-x-2 px-2 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-400 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span className="text-sm">Study Tracker</span>
                            </button>
                          )}
                        </div>

                        {/* Mobile View - Dropdown menu */}
                        <div className="md:hidden relative">
                          <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex items-center justify-center w-10 h-10 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <span className="text-gray-300 text-4xl">⋯</span>
                          </button>

                          {/* Dropdown Menu */}
                          {isMobileMenuOpen && (
                            <div className="absolute right-0 top-12 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 py-2">
                              {note.type === "tracker" && (
                                <button
                                  onClick={() => {
                                    handleRedirectStudyTracker();
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors w-full text-left"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                  <span>Study Tracker</span>
                                </button>
                              )}
                              {canEditNote && (
                                <Link
                                  to={`/notes/${note.id}/edit`}
                                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <Edit3 className="w-4 h-4" />
                                  <span>Edit Note</span>
                                </Link>
                              )}
                              {canDeleteNote && (
                                <button
                                  onClick={() => {
                                    onDelete();
                                    setIsMobileMenuOpen(false);
                                  }}
                                  disabled={deleting}
                                  className="flex items-center space-x-3 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors w-full text-left disabled:opacity-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>{deleting ? "Deleting..." : "Delete Note"}</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bagian 2: Title dan Tags */}
                  <div className="space-y-3">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-100">{note.title}</h1>
                    
                    {/* Tags - Pindah ke bawah judul */}
                    {note.tags?.length ? (
                      <div className="flex flex-wrap gap-2">
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
                    
                    {/* Metadata Row - Type, Visibility, Collaboration Button */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Type Badge */}
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium ${
                          note.type === 'tracker' 
                            ? 'bg-orange-900/50 text-orange-300 border border-orange-700' 
                            : 'bg-blue-900/50 text-blue-300 border border-blue-700'
                        }`}>
                          {note.type === 'tracker' ? (
                            <RefreshCw className="w-3 h-3" />
                          ) : (
                            <FileText className="w-3 h-3" />
                          )}
                          <span className="capitalize">{note.type?.replace('_', ' ')}</span>
                        </span>
                      </div>

                      {/* Visibility Badge */}
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium ${
                          note.visibility === 'public' 
                            ? 'bg-green-900/50 text-green-300 border border-green-700' 
                            : note.visibility === 'private'
                            ? 'bg-purple-900/50 text-purple-300 border border-purple-700'
                            : 'bg-blue-900/50 text-blue-300 border border-blue-700'
                        }`}>
                          {note.visibility === 'public' ? (
                            <Globe className="w-3 h-3" />
                          ) : note.visibility === 'private' ? (
                            <Lock className="w-3 h-3" />
                          ) : (
                            <Users className="w-3 h-3" />
                          )}
                          <span className="capitalize">{note.visibility}</span>
                        </span>
                      </div>

                      {/* Collaboration Button - SELALU TAMPIL untuk private dan collaboration */}
                      <button
                        onClick={() => setShowCollaborationModal(true)}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-900/50 text-indigo-300 border border-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-800/50 transition-colors"
                      >
                        <Users className="w-3 h-3" />
                        <span>Collaborators</span>
                        <span className="bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {1 + (Array.isArray(note.user_collaborators) ? note.user_collaborators.length : 0)}
                        </span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              {/* Note Content */}
              <div className="p-6 border-b border-gray-700 space-y-2">
                {/* Bagian 3: Body Content */}
                {note.body ? (
                  <div className="prose prose-invert max-w-none">
                    <div 
                      className="ql-editor whitespace-pre-wrap text-gray-300 leading-relaxed font-sans"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.body) }}
                    />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">This note is empty</p>
                    <p className="text-gray-500 text-sm mt-2">Click Edit to add content</p>
                  </div>
                )}

                {/* Bagian 4: Thumbnail Image */}
                {note.thumbnail && (
                  <div className="rounded-lg overflow-hidden relative">
                    {imgError ? (
                      <div className="w-full h-32 flex flex-col items-center justify-center bg-gray-800 text-gray-300 text-xs">
                        <ImageOff className="w-6 h-6 mb-1 opacity-80" />
                        <span>Image failed to load</span>
                      </div>
                    ) : (
                      <div className="relative inline-block overflow-hidden rounded-lg flex-shrink-0">
                        <img 
                          src={`https://minio-s3.radarku.online/radarku-bucket/notes_app/${note.thumbnail}`}
                          alt="Note thumbnail"
                          className="object-contain hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={() => setImgError(true)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                          <div 
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-xs"
                            onClick={() => {
                              handleViewImage(`https://minio-s3.radarku.online/radarku-bucket/notes_app/${note.thumbnail}`)
                            }}
                          >
                            <Eye className="w-3 h-3 inline mr-1" />
                            View
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Comments Section */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-300">Catatan Harian</h3>
                  <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                    {pagination?.total_data || comments.length}
                  </span>
                </div>

                {/* Add Comment Form */}
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
                          className="flex items-center space-x-2 px-2 py-2 bg-gray-600 text-gray-300 rounded-full hover:bg-gray-500 transition-colors"
                          title="Add thumbnail"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleAddComment}
                      disabled={!body.trim() || collaborationsLoading}
                      className="flex items-center space-x-2 px-2 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {collaborationsLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Error Message untuk Komentar */}
                  {commentError && (
                    <div className="mt-4 p-2 bg-red-900/50 border border-red-700 rounded-lg relative">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-red-200 text-sm flex-1">{commentError}</p>
                        <button
                          onClick={() => setCommentError(null)}
                          className="text-red-400 hover:text-red-300 transition-colors bg-transparent p-1 rounded-full"
                          title="Close error message"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Comments List */}
                {collaborationsLoading && comments.length === 0 ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => {
                      // Check permissions for each comment
                      const canEditComment = comment.is_maker === true;
                      const canDeleteComment = comment.is_maker === true;

                      return (
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
                                <div className="flex gap-2 text-gray-400 text-sm">
                                  <p>
                                    {formatDate(comment.created_at)}
                                  </p>
                                  <span>{formatDate(comment.created_at) !== formatDate(comment.updated_at)
                                      ? '(Edited)'
                                      : ''}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Edit/Delete Buttons - Conditional based on permissions */}
                            {editingCommentId !== String(comment.id) && (canEditComment || canDeleteComment) && (
                              <div className="flex space-x-1">
                                {canEditComment && (
                                  <button
                                    onClick={() => {
                                      setEditingCommentId(String(comment.id));
                                      setEditCommentText(comment.body || '');
                                      setEditThumbnail(comment.thumbnail || null);
                                      setEditMode(true);
                                    }}
                                    className="text-gray-400 hover:text-blue-400 p-1"
                                    title="Edit comment"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                )}
                                {canDeleteComment && (
                                  <button
                                    onClick={() => handleDeleteComment(String(comment.id),comment.note_id)}
                                    className="text-gray-400 hover:text-red-400 p-1"
                                    title="Delete comment"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Comment Thumbnail */}
                          {comment.thumbnail && editMode==false && (
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

                          {editingCommentId === String(comment.id) && (
                            // Thumbnail Editor Section
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
                                  disabled={!editCommentText.trim() || collaborationsLoading}
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
                      );
                    })}

                    {comments.length === 0 && !collaborationsLoading && (
                      <div className="text-center py-8 text-gray-400">
                        <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No comments yet. Be the first to comment!</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Pagination Component */}
                <PaginationComponent />
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

      {/* Collaboration Modal */}
      {showCollaborationModal && note && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-100">Collaborators</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Note: {note.title}
                </p>
              </div>
              <button
                onClick={() => setShowCollaborationModal(false)}
                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow">
              {/* Note Owner */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-300 mb-3">Note Owner</h3>
                <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {getInitials(note.user_owner?.username || "")}
                    </div>
                    <div>
                      <p className="text-gray-100 font-medium text-lg">
                        {note.user_owner?.username || 'Unknown user'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {note.user_owner?.user_fullname || 'No full name'}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-900/50 text-blue-300 border border-blue-700 rounded-full text-sm">
                    Owner
                  </span>
                </div>
              </div>

              {/* Current Collaborators */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-300">
                    Collaborators ({Array.isArray(note.user_collaborators) ? note.user_collaborators.length : 0})
                  </h3>
                </div>
                
                {Array.isArray(note.user_collaborators) && note.user_collaborators.length > 0 ? (
                  <div className="space-y-3">
                    {note.user_collaborators.map((collaborator: any, index: number) => (
                      <div key={collaborator.id || index} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {getInitials(collaborator.username || collaborator.user_fullname || 'U')}
                          </div>
                          <div>
                            <p className="text-gray-100 font-medium">
                              {collaborator.username || 'Unknown User'}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {collaborator.user_fullname || 'No full name'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {/* Role Badge */}
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            collaborator.is_owner 
                              ? 'bg-purple-900/50 text-purple-300 border border-purple-700'
                              : 'bg-green-900/50 text-green-300 border border-green-700'
                          }`}>
                            {collaborator.is_owner ? 'Owner' : 'Collaborator'}
                          </span>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            {/* Leave Button - hanya untuk collaborator yang can_leave dan bukan owner */}
                            {!collaborator.is_owner && collaborator.can_leave && (
                              <button
                                onClick={() => handleLeaveCollaboration(note.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors text-sm"
                                title="Leave collaboration"
                              >
                                Leave
                              </button>
                            )}

                            {/* Kick Button - hanya untuk owner yang can_kick dan bukan diri sendiri */}
                            {note.is_deletable && !collaborator.is_owner && (
                              <button
                                onClick={() => handleKickCollaborator(note.id, collaborator.user_id, collaborator.username)}
                                className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors text-sm"
                                title="Kick collaborator"
                              >
                                Kick
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400 bg-gray-700/50 rounded-lg">
                    <Users className="w-16 h-16 mx-auto mb-3 opacity-50" />
                    <p className="text-lg">No collaborators</p>
                    <p className="text-sm mt-1">No collaborators have been added to this note yet.</p>
                  </div>
                )}
              </div>

              {/* Info untuk user current */}
              <div className="border-t border-gray-700 pt-6">
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-blue-300 font-medium mb-1">Collaboration Info</h4>
                      <p className="text-blue-200 text-sm">
                        {note.user_owner?.can_kick 
                          ? "Sebagai pemilik, Anda dapat menghapus kolaborator dari catatan ini."
                          : note.user_collaborators?.some((collab: any) => collab.can_leave && !collab.is_owner)
                          ? "Anda dapat meninggalkan kolaborasi ini jika Anda tidak lagi ingin berkolaborasi pada catatan ini"
                          : "Anda tidak dapat meninggalkan kolaborasi ini karena Anda adalah pemilik catatan atau sedang menjalankan study tracker."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex justify-between items-center">
              <div className="text-gray-400 text-sm">
                Total: {1 + (Array.isArray(note.user_collaborators) ? note.user_collaborators.length : 0)} people
              </div>
              <button
                onClick={() => setShowCollaborationModal(false)}
                className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
    )}

      {/* Image View Modal */}
      <ImageViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        imageUrl={selectedImageUrl}
        fileName={note?.thumbnail} // gunakan nama file sebagai fileName
      />
    </div>
  );
}

export default NoteDetail;