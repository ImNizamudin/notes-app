// components/ImageViewModal.tsx
import { useState, useEffect } from "react";
import { X, Download, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  fileName?: string;
  fileSize?: number;
  uploadedAt?: string;
  // Optional: untuk gallery dengan multiple images
  images?: Array<{
    id: string;
    url: string;
    name: string;
    size?: number;
    created_at?: string;
  }>;
  currentImageIndex?: number;
  onNext?: () => void;
  onPrev?: () => void;
  showNavigation?: boolean;
}

export default function ImageViewModal({
  isOpen,
  onClose,
  imageUrl,
  fileName = "",
  fileSize = 0,
  uploadedAt = "",
  images = [],
  currentImageIndex = 0,
  onNext,
  onPrev,
  showNavigation = false
}: ImageViewModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Reset transformasi ketika modal dibuka
      setZoom(1);
      setRotation(0);
      setIsLoading(true);
      
      // Prevent body scroll ketika modal terbuka
      document.body.style.overflow = 'hidden';
    } else {
      // Allow body scroll ketika modal tertutup
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    // Reset transformasi ketika gambar berubah
    setZoom(1);
    setRotation(0);
    setIsLoading(true);
  }, [imageUrl]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        if (showNavigation && onPrev) onPrev();
        break;
      case 'ArrowRight':
        if (showNavigation && onNext) onNext();
        break;
      case '+':
      case '=':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
      case 'r':
        handleRotate();
        break;
      case '0':
        handleReset();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev]);

  if (!isOpen) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const canNavigate = showNavigation && images.length > 1;
  const hasNext = canNavigate && currentImageIndex < images.length - 1;
  const hasPrev = canNavigate && currentImageIndex > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Arrows */}
      {canNavigate && (
        <>
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 z-10 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-4 z-10 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </>
      )}

      {/* Image Container */}
      <div className="relative max-w-full max-h-full flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt={fileName}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            cursor: zoom > 1 ? 'grab' : 'default'
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          draggable={zoom > 1}
        />
      </div>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          {/* File Info */}
          <div className="text-white text-center mb-4">
            <h3 className="text-lg font-semibold truncate">{fileName}</h3>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-300 mt-1">
              {fileSize > 0 && (
                <span>{formatFileSize(fileSize)}</span>
              )}
              {uploadedAt && (
                <span>Uploaded: {new Date(uploadedAt).toLocaleDateString()}</span>
              )}
              {canNavigate && (
                <span>{currentImageIndex + 1} / {images.length}</span>
              )}
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-center space-x-4">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-lg p-2">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded disabled:opacity-50 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleReset}
                className="px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors text-sm"
                title="Reset (0)"
              >
                {Math.round(zoom * 100)}%
              </button>
              
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded disabled:opacity-50 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Rotation */}
            <button
              onClick={handleRotate}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              title="Rotate (R)"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading image...</p>
          </div>
        </div>
      )}
    </div>
  );
}