import { X, Download, ExternalLink } from "lucide-react";

interface ImageViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

export default function ImageViewModal({ 
  isOpen, 
  onClose, 
  imageUrl, 
  fileName, 
  fileSize, 
  uploadedAt 
}: ImageViewModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl max-h-[90vh] w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-100 truncate max-w-md">
              {fileName}
            </h3>
            <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
              {formatFileSize(fileSize)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleOpenInNewTab}
              className="p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 overflow-hidden flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={fileName}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          Uploaded: {new Date(uploadedAt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}

// Helper function untuk format file size
function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}