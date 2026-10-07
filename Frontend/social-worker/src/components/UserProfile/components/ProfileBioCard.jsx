import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Check, X, FileText, Tag, Sparkles } from "lucide-react";

const ProfileBioCard = ({
  bio,
  onSaveBio,
  isOwnProfile,
  user,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftBio, setDraftBio] = useState(bio || "");

  const handleSave = () => {
    onSaveBio(draftBio);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftBio(bio || "");
    setIsEditing(false);
  };

  // Derive relevant interest/account tags from actual user data
  const tags = [];
  if (user?.role) {
    tags.push(user.role === "service-provider" ? "Service Specialist" : "Verified Customer");
  }
  if (user?.location) {
    tags.push(user.location);
  }
  if (user?.gender) {
    tags.push(user.gender.charAt(0).toUpperCase() + user.gender.slice(1));
  }
  if (Array.isArray(user?.specialization) && user.specialization.length > 0) {
    user.specialization.forEach((spec) => tags.push(spec));
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-8 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769FF] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-[#071A33]">About & Summary</h2>
        </div>

        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1769FF] hover:text-[#1255d4] transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{bio ? "Edit Bio" : "Add Bio"}</span>
          </button>
        )}
      </div>

      {/* BIO CONTENT OR EDITOR */}
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <textarea
            value={draftBio}
            onChange={(e) => setDraftBio(e.target.value)}
            rows={4}
            maxLength={300}
            placeholder="Tell service providers a bit about yourself, requirements, or interests..."
            className="w-full p-3.5 rounded-xl border border-[#E2E8F0] text-sm text-[#071A33] placeholder-slate-400 focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/15 transition-all outline-none resize-none"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {draftBio.length}/300 characters
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#1769FF] hover:bg-[#1255d4] transition shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Bio</span>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div>
          {bio ? (
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {bio}
            </p>
          ) : (
            <div className="text-sm text-slate-400 italic">
              {isOwnProfile
                ? "No bio added yet. Add a short summary to help service specialists know your preferences."
                : "No bio added yet."}
            </div>
          )}
        </div>
      )}

      {/* TAGS / INTERESTS / CHIPS */}
      {tags.length > 0 && (
        <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Tags:
          </span>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#EAF2FF] text-[#1769FF] border border-blue-100 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileBioCard;
