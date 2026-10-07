import React from "react";
import {
  MapPin,
  Mail,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const LiveProfilePreview = ({
  formData,
  photoUrl,
}) => {
  // Initials generator
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Calculate live completeness
  const fields = [
    Boolean(formData.name),
    Boolean(formData.email),
    Boolean(photoUrl),
    Boolean(formData.phone),
    Boolean(formData.location),
    Boolean(formData.age),
    Boolean(formData.gender),
    Boolean(formData.bio && formData.bio.trim().length > 0),
  ];
  const completedCount = fields.filter(Boolean).length;
  const completeness = Math.round((completedCount / fields.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden hover:shadow-md hover:border-blue-200 transition-all">
      {/* Header Label */}
      <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#1769FF]" />
          <span className="text-xs font-bold text-[#071A33] uppercase tracking-wider">
            Live Profile Preview
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Real-time
        </span>
      </div>

      {/* Mini Cover Banner */}
      <div className="h-20 bg-gradient-to-r from-[#071A33] via-[#0d2a52] to-[#1769FF] relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]"></div>
      </div>

      {/* Avatar & Header Info */}
      <div className="px-5 pb-5 pt-0 relative">
        <div className="flex items-end justify-between -mt-10 mb-3">
          <div className="w-16 h-16 rounded-2xl border-2 border-white shadow bg-[#071A33] text-white flex items-center justify-center overflow-hidden font-bold text-xl select-none">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="text-[#EAF2FF]">
                {getInitials(formData.name)}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1769FF] bg-[#EAF2FF] px-2.5 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3" />
            <span>{formData.role === "service-provider" ? "Specialist" : "Customer"}</span>
          </span>
        </div>

        {/* Name & Email */}
        <div className="space-y-1 mb-4">
          <h3 className="text-base font-bold text-[#071A33] truncate">
            {formData.name || "Your Name"}
          </h3>
          <div className="text-xs text-slate-500 flex items-center gap-1 truncate">
            <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="truncate">{formData.email || "email@example.com"}</span>
          </div>
          {formData.location && (
            <div className="text-xs text-slate-500 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span className="truncate">{formData.location}</span>
            </div>
          )}
        </div>

        {/* Bio Preview */}
        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-100 text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {formData.bio ? (
            formData.bio
          ) : (
            <span className="text-slate-400 italic">
              Your bio preview will appear here as you type...
            </span>
          )}
        </div>

        {/* Profile Strength Progress */}
        <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Profile Strength
            </span>
            <span className="font-bold text-[#071A33]">{completeness}%</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${completeness}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-400">
            {completedCount} of {fields.length} profile attributes completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveProfilePreview;
