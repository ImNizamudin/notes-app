import { useState, useRef } from "react";
import { Upload, Image, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { apiClient } from "../api/client";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export default function Media() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
                formData.append("fields", fieldName); // field text
                formData.append(fieldName, file);     // file upload

                
                const response = await apiClient(
                    "/files/notes_app/bulk-upload",
                    "POST",
                    formData
                );

                // 🔹 Simulasi progress (karena fetch + FormData tidak ada progress event bawaan)
                for (let progress = 0; progress <= 100; progress += 10) {
                    setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                    await new Promise(resolve => setTimeout(resolve, 50));
                }

                // 🔹 Ambil hasil dari response API
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
                `Failed to upload ${file.name}: ${
                    fileError.response?.meta?.message || fileError.message
                }`
                );
            }
        }

        setUploadedFiles(prev => [...prev, ...results]);
        setSelectedFiles([]);
        setSuccess(`Successfully uploaded ${results.length} file(s)`);
    } catch (err: any) {
        setError(err.response?.meta?.message || "Failed to upload files");
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

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-100">Media Library</h1>
              <p className="text-gray-400">Upload and manage your media files</p>
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

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Uploaded Files ({uploadedFiles.length})</h2>
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