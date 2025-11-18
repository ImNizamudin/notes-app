import { useState, useRef, useEffect } from "react";
import { Upload, Image, File, X, CheckCircle, AlertCircle, Download, Trash2, Eye, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { apiClient, apiClientWithPagination } from "../api/client";
import ImageViewModal from "../components/ImageViewModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

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
  url?: string; // We'll construct the URL
}

interface GalleryResponse {
  data: {
    files: GalleryFile[];
    total_maximum: number;
    total_usage: number;
  };
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

export default function Media() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<GalleryFile[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState<{ total: number; used: number }>({ total: 0, used: 0 });

  // modal view image
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<GalleryFile | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Pagination state from backend
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFiles, setTotalFiles] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gunakan ref untuk melacak apakah ini mount pertama
  // const isFirstMount = useRef(true);

// Hapus semua ref dan state complex, gunakan ini saja:
useEffect(() => {
  fetchGalleryFiles(currentPage);
}, [currentPage]);

const fetchGalleryFiles = async (page: number = 1) => {
  setLoadingGallery(true);
  try {
    const response: GalleryResponse = await apiClientWithPagination(`/files/notes_app?page=${page}&limit=10`, "GET");

    // Construct full URLs for each file
    const filesWithUrls = response.data.files.map(file => ({
      ...file,
      url: `${import.meta.env.VITE_API_URL}/upload/${file.path}/${file.name}`
    }));

    setGalleryFiles(filesWithUrls);
    setStorageInfo({
      total: response.data.total_maximum,
      used: response.data.total_usage
    });

    // Update pagination info from backend
    setCurrentPage(response.page.current_page);
    setTotalPages(response.page.total_page);
    setTotalFiles(response.page.total_data);
    setItemsPerPage(response.page.limit);

  } catch (err: any) {
    setError(err.response?.meta?.message || "Failed to fetch gallery files");
  } finally {
    setLoadingGallery(false);
  }
};

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles(prev => [...prev, ...newFiles]);
    setError(null);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one file to upload");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const results: UploadedFile[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fieldName = `thumbnail_${i + 1}`;

        try {
          const formData = new FormData();
          formData.append("fields", fieldName);
          formData.append(fieldName, file);

          const response = await apiClient(
            "/files/notes_app/bulk-upload",
            "POST",
            formData
          );

          // Simulate progress
          for (let progress = 0; progress <= 100; progress += 10) {
            setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
            await new Promise(resolve => setTimeout(resolve, 50));
          }

          const uploadedFile: UploadedFile = {
            id: response?.id || `file-${Date.now()}-${i}`,
            name: file.name,
            url: response?.url || URL.createObjectURL(file),
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
          };

          results.push(uploadedFile);
        } catch (fileError: any) {
          console.error(`Error uploading ${file.name}:`, fileError);
          setError(
            `Failed to upload ${file.name}: ${fileError.response?.meta?.message || fileError.message
            }`
          );
        }
      }

      setUploadedFiles(prev => [...prev, ...results]);
      setSelectedFiles([]);
      setSuccess(`Successfully uploaded ${results.length} file(s)`);

      // Refresh gallery after upload (reset to page 1)
      setCurrentPage(1);
      await fetchGalleryFiles(1);
    } catch (err: any) {
      setError(err.response?.meta?.message || "Failed to upload files");
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  // Fungsi untuk handle view image
  const handleViewImage = (file: GalleryFile) => {
    setSelectedFile(file);
    setViewModalOpen(true);
  };

  // Fungsi untuk handle delete confirmation
  const handleDeleteClick = (file: GalleryFile) => {
    setSelectedFile(file);
    setDeleteModalOpen(true);
  };

  // Fungsi untuk handle confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedFile) return;

    setDeleting(true);
    try {
      await apiClient(`/files/notes_app/${selectedFile.id}`, "DELETE");
      setSuccess(`File "${selectedFile.name}" deleted successfully`);
      setDeleteModalOpen(false);
      setSelectedFile(null);

      // Refresh gallery after delete
      const pageToFetch = currentPage;
      await fetchGalleryFiles(pageToFetch);
    } catch (err: any) {
      setError(err.response?.meta?.message || "Failed to delete file");
    } finally {
      setDeleting(false);
    }
  };

  // Fungsi untuk handle download
  const handleDownload = async (file: GalleryFile) => {
    const fileUrl = `https://minio-s3.radarku.online/radarku-bucket/${file.path}/${file.name}`;

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('Gagal mengambil file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end pages
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust start page if we're near the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      // Add visible pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatStoragePercentage = (used: number, total: number) => {
    if (total === 0) return '0%';
    const percentage = (used / total) * 100;
    return `${percentage.toFixed(1)}%`;
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (mimeType.startsWith('video/')) return <File className="w-5 h-5" />;
    if (mimeType.startsWith('audio/')) return <File className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const isImageFile = (mimeType: string) => {
    return mimeType.startsWith('image/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl flex items-center justify-center">
                <Image className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Media Library</h1>
                <p className="text-gray-400">Upload and manage your media files</p>
              </div>
            </div>

            {/* Storage Info */}
            <div className="text-right">
              <div className="text-sm text-gray-300">
                Storage: {formatFileSize(storageInfo.used)} / {formatFileSize(storageInfo.total)}
              </div>
              <div className="w-full h-2 bg-gray-600 rounded-full mt-1">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all"
                  style={{ width: formatStoragePercentage(storageInfo.used, storageInfo.total) }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {formatStoragePercentage(storageInfo.used, storageInfo.total)} used
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Upload Files</h2>

          {/* File Input */}
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center mb-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
              className="hidden"
            />

            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-2">Drag & drop files here or</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              disabled={uploading}
            >
              Browse Files
            </button>
            <p className="text-gray-400 text-sm mt-2">
              Supports images, videos, audio, and documents
            </p>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-300 mb-3">Selected Files ({selectedFiles.length})</h3>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-100 text-sm font-medium truncate">{file.name}</p>
                        <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      disabled={uploading}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          {selectedFiles.length > 0 && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Uploading... ({Object.keys(uploadProgress).length}/{selectedFiles.length})</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload {selectedFiles.length} File(s)</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Progress Indicators */}
        {uploading && selectedFiles.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6 mb-6">
            <h3 className="text-md font-medium text-gray-300 mb-4">Upload Progress</h3>
            <div className="space-y-3">
              {selectedFiles.map((file, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm truncate">{file.name}</span>
                    <span className="text-gray-400 text-sm">{uploadProgress[file.name] || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress[file.name] || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-200">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-700 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-200">{success}</p>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-100">
                Your Files ({totalFiles})
              </h2>
              {totalFiles > 0 && (
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages} • Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalFiles)} of {totalFiles}
                </span>
              )}
            </div>
            <button
              onClick={() => fetchGalleryFiles(currentPage)}
              disabled={loadingGallery}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loadingGallery ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {loadingGallery ? (
            <div className="flex flex-col items-center justify-center py-12">
              {/* SVG Spinner - lebih reliable di production */}
              <div className="relative">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <p className="mt-3 text-gray-400 text-sm">Loading files...</p>

              {/* Fallback CSS animation */}
              <style>
                {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
              </style>
            </div>
          ) : galleryFiles.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No files found. Upload some files to get started!</p>
            </div>
          ) : (
            <>
              {/* Files Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
                {galleryFiles.map((file) => (
                  <div key={file.id} className="bg-gray-700 rounded-lg p-3 group relative">
                    {/* File Preview */}
                    {isImageFile(file.mime) ? (
                      <div className="relative">
                        <img
                          src={`https://minio-s3.radarku.online/radarku-bucket/${file.path}/${file.name}`}
                          alt={file.name}
                          className="w-full h-32 object-cover rounded-lg mb-2 cursor-pointer"
                          loading="lazy"
                          onClick={() => handleViewImage(file)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => handleViewImage(file)}
                            className="p-2 bg-white bg-opacity-20 rounded-full mr-2 hover:bg-opacity-30 transition-colors"
                            title="View image"
                          >
                            <Eye className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() => handleDownload(file)}
                            className="p-2 bg-white bg-opacity-20 rounded-full mr-2 hover:bg-opacity-30 transition-colors"
                            title="Download file"
                          >
                            <Download className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(file)}
                            className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                            title="Delete file"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gray-600 rounded-lg flex items-center justify-center mb-2">
                        {getFileIcon(file.mime)}
                      </div>
                    )}

                    {/* File Info */}
                    <div className="flex items-center space-x-2 mb-2">
                      {getFileIcon(file.mime)}
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-100 text-sm font-medium truncate">
                          {file.name.split('/').pop()}
                        </p>
                        <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                      </div>
                    </div>

                    {/* File Metadata */}
                    <div className="text-xs text-gray-400 space-y-1">
                      <p>Uploaded: {new Date(file.created_at).toLocaleDateString()}</p>
                      <p>Type: {file.mime}</p>
                    </div>

                    {/* Action Buttons for non-image files */}
                    {!isImageFile(file.mime) && (
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-600">
                        <button
                          onClick={() => window.open(`https://minio-s3.radarku.online/radarku-bucket/${file.path}/${file.name}`, '_blank')}
                          className="text-blue-400 hover:text-blue-300 text-xs flex items-center"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleDownload(file)}
                          className="text-green-400 hover:text-green-300 text-xs flex items-center"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </button>
                        <button
                          onClick={() => handleDeleteClick(file)}
                          className="text-red-400 hover:text-red-300 text-xs flex items-center"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Image View Modal */}
              <ImageViewModal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                imageUrl={selectedFile ? `https://minio-s3.radarku.online/radarku-bucket/${selectedFile.path}/${selectedFile.name}` : ''}
                fileName={selectedFile?.name || ''}
                fileSize={selectedFile?.size || 0}
                uploadedAt={selectedFile?.created_at || ''}
              />

              {/* Delete Confirmation Modal */}
              <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => {
                  setDeleteModalOpen(false);
                  setSelectedFile(null);
                }}
                onConfirm={handleConfirmDelete}
                fileName={selectedFile?.name || ''}
                fileType={selectedFile ? (isImageFile(selectedFile.mime) ? 'image' : 'file') : 'file'}
                isLoading={deleting}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-2 text-sm text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {generatePageNumbers().map((page, index) => (
                      <div key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(page as number)}
                            className={`px-3 py-2 text-sm rounded-lg transition-colors ${currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                              }`}
                          >
                            {page}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-2 text-sm text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Recently Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Recently Uploaded ({uploadedFiles.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center space-x-3 mb-3">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-100 text-sm font-medium truncate">{file.name}</p>
                      <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                    </div>
                  </div>

                  {file.type.startsWith('image/') && (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </span>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}