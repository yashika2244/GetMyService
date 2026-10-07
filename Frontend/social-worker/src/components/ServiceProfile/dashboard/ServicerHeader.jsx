import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  ShieldCheck,
  Edit3,
  LogOut,
  ExternalLink,
  Copy,
  Check,
  ArrowLeft,
  Star,
  CheckCircle2,
  Clock,
  AlertCircle,
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  CalendarCheck,
  User,
} from "lucide-react";

const ServicerHeader = ({
  servicer,
  isOwnProfile,
  onLogout,
  activeTab,
  setActiveTab,
  conversationsCount = 0,
}) => {
  const navigate = useNavigate();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (!servicer?.email) return;
    navigator.clipboard.writeText(servicer.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getInitials = (name) => {
    if (!name) return "SP";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const approvalStatus = servicer?.isApproved || "approved";
  const approvalConfig = {
    approved: {
      label: "Verified Specialist",
      icon: CheckCircle2,
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
    pending: {
      label: "Under Verification",
      icon: Clock,
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    cancelled: {
      label: "Suspended",
      icon: AlertCircle,
      badge: "bg-red-50 text-red-700 border-red-200",
      dot: "bg-red-500",
    },
  }[approvalStatus] || {
    label: "Active Specialist",
    icon: ShieldCheck,
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  };

  const ApprovalIcon = approvalConfig.icon;

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    {
      id: "services",
      label: "Services",
      icon: Briefcase,
      count: servicer?.specialization?.length || 0,
    },
    {
      id: "bookings",
      label: "Client Inquiries",
      icon: MessageSquare,
      count: conversationsCount,
    },
    {
      id: "schedule",
      label: "Availability",
      icon: CalendarCheck,
      count: servicer?.timeSlots?.length || 0,
    },
    { id: "profile", label: "Profile & Bio", icon: User },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-6">
      {/* COVER AREA */}
      <div className="relative h-44 sm:h-52 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#2563EB] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#3B82F6] rounded-full blur-3xl opacity-25 pointer-events-none" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-medium transition duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-medium">
          <span className={`w-2 h-2 rounded-full ${approvalConfig.dot} animate-pulse`} />
          <ApprovalIcon className="w-3.5 h-3.5 text-white" />
          <span>{approvalConfig.label}</span>
        </div>
      </div>

      {/* HEADER CONTENT */}
      <div className="px-6 pb-6 pt-0 relative">
        {/* Top row: Avatar overlapping banner + Action buttons aligned on white background */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-14 sm:-mt-16 mb-4 gap-4">
          {/* AVATAR */}
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-lg bg-[#0F172A] text-white flex items-center justify-center overflow-hidden font-bold text-3xl select-none">
              {servicer?.photo ? (
                <img
                  src={servicer.photo}
                  alt={servicer.name || "Servicer Avatar"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-blue-100 tracking-wider">
                  {getInitials(servicer?.name)}
                </span>
              )}
            </div>
            <span
              className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm"
              title="Active now"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => navigate(`/Service-profile/${servicer?._id}`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Profile</span>
            </button>

            {isOwnProfile && (
              <>
                <button
                  onClick={() => navigate(`/update_service/${servicer?._id}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>

                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 bg-red-50/60 hover:bg-red-100 text-red-600 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* BASIC INFO: Name, Badges, Specializations, Location, Email (Always on white card background) */}
        <div className="space-y-2 mb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              {servicer?.name || "Service Provider"}
            </h1>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${approvalConfig.badge}`}
            >
              <ApprovalIcon className="w-3 h-3" />
              <span>{approvalConfig.label}</span>
            </span>
            {servicer?.averageRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{Number(servicer.averageRating).toFixed(1)}</span>
              </span>
            )}
          </div>

          {/* Specialization pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {Array.isArray(servicer?.specialization) &&
            servicer.specialization.length > 0 ? (
              servicer.specialization.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 capitalize"
                >
                  {spec}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">
                No specializations specified
              </span>
            )}
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-500 pt-0.5">
            {servicer?.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="capitalize">{servicer.location}</span>
              </span>
            )}
            {servicer?.email && (
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{servicer.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-slate-400 hover:text-blue-600 transition p-0.5 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </span>
            )}
          </div>
        </div>

        {/* DASHBOARD TAB NAVIGATION BAR */}
        <div className="border-t border-slate-100 pt-3 flex items-center overflow-x-auto no-scrollbar gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicerHeader;
