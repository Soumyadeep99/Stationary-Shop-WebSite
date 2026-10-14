import React, { useRef, useState, useEffect, type ChangeEvent, type DragEvent } from "react";
import { Camera, Upload, X, Image as ImageIcon } from "lucide-react";

export interface ImageUploaderProps {
  currentImageUrl?: string;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageUrl,
  onImageSelect,
  onImageRemove,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFileSize, setSelectedFileSize] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs on unmount or when previewUrl changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    // Revoke previous blob if any
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    setSelectedFileName(file.name);
    setSelectedFileSize(formatFileSize(file.size));
    onImageSelect(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    // reset input so the same file could be selected again if needed
    e.target.value = "";
  };

  const handleRemove = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFileName(null);
    setSelectedFileSize(null);
    onImageRemove();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileProcess(file);
    }
  };

  const displayedImage = previewUrl || currentImageUrl;

  return (
    <div className="w-full space-y-3">
      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleInputChange}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {displayedImage ? (
        <div className="relative rounded-lg overflow-hidden border border-border bg-surface-card shadow-sm">
          <div className="relative aspect-video max-h-64 w-full bg-border-light flex items-center justify-center overflow-hidden">
            <img
              src={displayedImage}
              alt="Product preview"
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-surface-dark/70 hover:bg-surface-dark text-white transition-base cursor-pointer shadow"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {selectedFileName && (
            <div className="p-3 border-t border-border flex items-center justify-between text-xs text-text-secondary bg-surface">
              <span className="truncate max-w-[200px] sm:max-w-xs font-medium text-text-primary">
                {selectedFileName}
              </span>
              {selectedFileSize && <span>{selectedFileSize}</span>}
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-6 sm:p-8 rounded-lg border-2 border-dashed transition-base text-center ${
            isDragging
              ? "border-primary-600 bg-primary-50"
              : "border-border hover:border-primary-500 bg-surface"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">
            ছবি আপলোড করুন (Upload Image)
          </p>
          <p className="text-xs text-text-secondary mb-4">
            Drag and drop an image here, or choose an option below
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-surface-card hover:bg-surface text-text-primary text-sm font-medium transition-base cursor-pointer shadow-sm"
        >
          <Camera className="w-4 h-4 text-primary-600" />
          <span>Take Photo</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-surface-card hover:bg-surface text-text-primary text-sm font-medium transition-base cursor-pointer shadow-sm"
        >
          <Upload className="w-4 h-4 text-primary-600" />
          <span>Choose File</span>
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
