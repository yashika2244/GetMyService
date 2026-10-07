import React, { useRef } from "react";
import { Camera, UploadCloud, Trash2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const ProfileImageEditor = ({
  photoUrl,
  userName = "User",
  onImageSelect,
  onRemovePhoto,
  isUploading,
  hasNewFile = false,
}) => {
  const fileInputRef = useRef(null);

  // Initials generator
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // File validation: Type and Size
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, or WEBP).");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size must be less than 5MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      // Create instant local preview URL
      const localPreview = URL.createObjectURL(file);
      if (onImageSelect) {
        onImageSelect(file, localPreview);
      }
      toast.info("Image selected! Click 'Save Changes' to update your profile picture.");
    } catch (err) {
      console.error("Error creating image preview:", err);
      toast.error("Could not preview selected image.");
    }

    // Reset input value so same file can be re-selected if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-6 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769FF] flex items-center justify-center">
          <Camera className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#071A33]">Profile Photo</h2>
          <p className="text-xs text-slate-500">
            Upload your picture to make your profile recognizable
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
        {/* AVATAR CONTAINER */}
        <div
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          title="Click to select new photo"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white shadow-md bg-[#071A33] text-white flex items-center justify-center overflow-hidden font-bold text-3xl select-none relative">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={userName}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="text-[#EAF2FF] tracking-wider text-2xl font-bold">
                {getInitials(userName)}
              </span>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#071A33]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white">
              <Camera className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-semibold tracking-wide">Change</span>
            </div>

            {/* Loading spinner overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-[#071A33]/70 flex flex-col items-center justify-center text-white z-10">
                <Loader2 className="w-6 h-6 animate-spin text-[#3B82F6]" />
                <span className="text-[10px] mt-1 font-medium">Uploading...</span>
              </div>
            )}
          </div>

          {/* Quick upload icon badge */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-[#1769FF] text-white flex items-center justify-center shadow-md border-2 border-white hover:bg-[#1255d4] transition">
            <Camera className="w-4 h-4" />
          </div>
        </div>

        {/* CONTROLS & INFO */}
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div>
            <div className="text-sm font-semibold text-[#071A33]">
              {hasNewFile
                ? "New Photo Selected (Pending Save)"
                : photoUrl
                ? "Custom Avatar Active"
                : "Default Initials Avatar"}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Recommended: Square JPG, PNG, or WEBP. Minimum 300x300px for best quality.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1769FF] hover:bg-[#1255d4] text-white transition shadow-xs disabled:opacity-60 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading Photo...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{photoUrl ? "Change Photo" : "Upload New Photo"}</span>
                </>
              )}
            </button>

            {photoUrl && (
              <button
                type="button"
                disabled={isUploading}
                onClick={onRemovePhoto}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition disabled:opacity-60 cursor-pointer"
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

export default ProfileImageEditor;
