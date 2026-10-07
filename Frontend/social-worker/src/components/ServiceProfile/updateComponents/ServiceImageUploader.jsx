import React, { useRef } from "react";
import { Camera, Image as ImageIcon, Trash2, Upload, CheckCircle2 } from "lucide-react";

const ServiceImageUploader = ({
  photoUrl,
  onImageSelect,
  onRemovePhoto,
  isUploading = false,
  hasNewFile = false,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file (JPEG, PNG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    onImageSelect(file, localPreview);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
            Service Profile Image
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload a clear, high-resolution photo representing your service or company
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Preview Container */}
        <div className="relative group shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center shadow-inner relative">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Service preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400">
                <ImageIcon className="w-8 h-8 mb-1" />
                <span className="text-[10px] font-semibold">No Image</span>
              </div>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mb-1" />
                <span>Uploading...</span>
              </div>
            )}
          </div>

          {hasNewFile && (
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md" title="New image ready to save">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-800">
              {hasNewFile
                ? "New Image Selected"
                : photoUrl
                ? "Current Profile Image"
                : "No Image Selected"}
            </h4>
            <p className="text-xs text-slate-500">
              Recommended: Square format (at least 400x400px), PNG, JPG or WEBP up to 5MB.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{photoUrl ? "Change Photo" : "Upload Photo"}</span>
            </button>

            {photoUrl && (
              <button
                type="button"
                onClick={onRemovePhoto}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceImageUploader;
