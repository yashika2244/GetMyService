import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Mail,
  ShieldCheck,
  Edit3,
  LogOut,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
  UserCheck,
} from "lucide-react";

const ProfileHeader = ({
  user,
  isOwnProfile,
  onLogout,
  memberSince,
}) => {
  const navigate = useNavigate();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (!user?.email) return;
    navigator.clipboard.writeText(user.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Initials generator
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-8">
      {/* COVER / BANNER AREA */}
      <div className="relative h-44 sm:h-52 md:h-60 bg-gradient-to-r from-[#071A33] via-[#0d2a52] to-[#1769FF] overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#3B82F6] rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        {/* Back navigation button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-medium transition duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Status pill on cover */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071A33]/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Verified Account</span>
        </div>
      </div>

      {/* PROFILE HEADER CONTENT & AVATAR */}
      <div className="px-6 pb-6 pt-0 relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-16 mb-4 gap-4">
          {/* AVATAR */}
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-md bg-[#071A33] text-white flex items-center justify-center overflow-hidden font-bold text-3xl select-none">
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={user.name || "User Avatar"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-[#EAF2FF] tracking-wider">
                  {getInitials(user?.name)}
                </span>
              )}
            </div>

            {/* Online indicator */}
            <span
              className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm"
              title="Active now"
            ></span>
          </div>

          {/* ACTION BUTTONS (Edit & Logout) */}
          <div className="flex flex-wrap items-center gap-3">
            {isOwnProfile && (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/update_user/${user?._id}`)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onLogout}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50/70 hover:bg-red-100 text-red-600 text-sm font-semibold transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* USER INFO & METADATA */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#071A33] tracking-tight">
              {user?.name || "User Profile"}
            </h1>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF2FF] text-[#1769FF]"
              title="Verified User"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{user?.role === "service-provider" ? "Service Provider" : "Customer"}</span>
            </span>
          </div>

          {/* Meta items: Email, Location, Join Date */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-sm text-slate-500">
            {user?.email && (
              <div className="inline-flex items-center gap-1.5 text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{user.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-slate-400 hover:text-[#1769FF] transition p-0.5"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}

            {user?.location && (
              <div className="inline-flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{user.location}</span>
              </div>
            )}

            {memberSince && (
              <div className="inline-flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Member since {memberSince}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
