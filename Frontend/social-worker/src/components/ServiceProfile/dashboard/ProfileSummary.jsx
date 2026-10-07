import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  ShieldCheck,
  Edit3,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ProfileSummary = ({ servicer, isOwnProfile = false }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const aboutText =
    servicer?.about || servicer?.bio || "No professional summary provided.";

  const hasLongAbout = aboutText.length > 250;
  const displayedAbout =
    hasLongAbout && !isExpanded ? `${aboutText.slice(0, 250)}...` : aboutText;

  const experienceList = Array.isArray(servicer?.experience)
    ? servicer.experience
    : [];

  return (
    <div className="space-y-6 mb-6">
      {/* 1. Account Details Grid */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">
              Profile & Credential Details
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Personal, contact, and account identity information
            </p>
          </div>

          {isOwnProfile && (
            <button
              onClick={() => navigate(`/update_service/${servicer?._id}`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600" />
              <span>Edit Details</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Name */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>Full Name</span>
            </div>
            <p className="text-sm font-semibold text-slate-800">
              {servicer?.name || "Not provided"}
            </p>
          </div>

          {/* Email */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>Email Address</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 truncate">
              {servicer?.email || "Not provided"}
            </p>
          </div>

          {/* Phone */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              <span>Phone Number</span>
            </div>
            <p className="text-sm font-semibold text-slate-800">
              {servicer?.phone ? String(servicer.phone) : "Not specified"}
            </p>
          </div>

          {/* Location */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>Service Location</span>
            </div>
            <p className="text-sm font-semibold text-slate-800">
              {servicer?.location || "Not specified"}
            </p>
          </div>

          {/* Rate */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              <span>Consultation Rate</span>
            </div>
            <p className="text-sm font-semibold text-slate-800">
              ${servicer?.TicketPrice || servicer?.consultationFee || 0} / visit
            </p>
          </div>

          {/* Age / Gender */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>Age & Gender</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 capitalize">
              {servicer?.age ? `${servicer.age} yrs` : ""}{" "}
              {servicer?.gender ? `• ${servicer.gender}` : "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Professional Bio / About */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-3">
          About Professional
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {displayedAbout}
        </p>
        {hasLongAbout && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <span>{isExpanded ? "Show less" : "Read full summary"}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>

      {/* 3. Experience Timeline */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A]">
              Experience & Career Milestones
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified work positions and professional engagements
            </p>
          </div>
        </div>

        {experienceList.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-50 text-center">
            <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">
              No formal experience history listed
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              You can add employment milestones by updating your profile.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {experienceList.map((exp, idx) => (
              <div
                key={exp._id || idx}
                className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-800">
                    {exp.role || "Professional Specialist"}
                  </h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{exp.locations || exp.location || servicer?.location || "Location on file"}</span>
                  </p>
                  <p className="text-xs font-medium text-slate-400 mt-1">
                    {formatDate(exp.startdate)} — {formatDate(exp.enddate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSummary;
