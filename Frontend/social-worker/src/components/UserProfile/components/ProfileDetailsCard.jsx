import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Hash,
  Copy,
  Check,
  Info,
} from "lucide-react";

const ProfileDetailsCard = ({ user, memberSince }) => {
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = () => {
    if (!user?._id) return;
    navigator.clipboard.writeText(user._id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const details = [
    {
      label: "Full Name",
      value: user?.name || "Not specified",
      icon: User,
    },
    {
      label: "Email Address",
      value: user?.email || "Not specified",
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: user?.phone ? String(user.phone) : "Not provided",
      icon: Phone,
    },
    {
      label: "Location",
      value: user?.location || "Not specified",
      icon: MapPin,
    },
    {
      label: "Age",
      value: user?.age ? `${user.age} years` : "Not specified",
      icon: Info,
    },
    {
      label: "Gender",
      value: user?.gender
        ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
        : "Not specified",
      icon: User,
    },
    {
      label: "Account Role",
      value: user?.role === "service-provider" ? "Service Provider" : "Customer / Client",
      icon: Shield,
    },
    {
      label: "Member Since",
      value: memberSince || "Active",
      icon: Calendar,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-8 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769FF] flex items-center justify-center">
            <Info className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-[#071A33]">
            Account & Profile Information
          </h2>
        </div>

        {user?._id && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
            <Hash className="w-3.5 h-3.5 text-slate-400" />
            <span>ID: {user._id.slice(0, 8)}...</span>
            <button
              onClick={handleCopyId}
              className="text-slate-400 hover:text-[#1769FF] transition p-0.5 ml-1"
              title="Copy User ID"
            >
              {copiedId ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* 2-COLUMN GRID ON DESKTOP, 1-COLUMN ON MOBILE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-100 bg-[#F8FAFC] flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-slate-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                <Icon className="w-4 h-4 text-[#1769FF]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-slate-400 block mb-0.5 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-[#071A33] truncate block">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileDetailsCard;
