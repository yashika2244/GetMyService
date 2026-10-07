import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const PersonalInformationForm = ({
  formData,
  errors = {},
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-6 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769FF] flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#071A33]">Personal Information</h2>
          <p className="text-xs text-slate-500">
            Keep your personal contact and demographic details up to date
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* FULL NAME */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#071A33] flex items-center gap-1">
            <span>Full Name</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={onChange}
              placeholder="e.g. Sarah Johnson"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-[#071A33] placeholder-slate-400 transition-all outline-none ${
                errors.name
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                  : "border-[#E2E8F0] focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/15 bg-white"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* EMAIL (READ-ONLY) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#071A33] flex items-center gap-1">
              <span>Email Address</span>
            </label>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> Read Only
            </span>
          </div>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              readOnly
              disabled
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed select-none"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Email is tied to your account login and cannot be altered directly.
          </p>
        </div>

        {/* PHONE NUMBER */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#071A33] flex items-center gap-1">
            <span>Phone Number</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
              onChange={onChange}
              placeholder="e.g. 1555234567"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-[#071A33] placeholder-slate-400 transition-all outline-none ${
                errors.phone
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                  : "border-[#E2E8F0] focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/15 bg-white"
              }`}
            />
          </div>
          {errors.phone ? (
            <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.phone}</span>
            </p>
          ) : (
            <p className="text-[11px] text-slate-400">
              Used by service specialists for urgent appointment updates.
            </p>
          )}
        </div>

        {/* LOCATION */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#071A33] flex items-center gap-1">
            <span>Primary Location</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={onChange}
              placeholder="e.g. San Francisco, CA"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-[#071A33] placeholder-slate-400 transition-all outline-none ${
                errors.location
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                  : "border-[#E2E8F0] focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/15 bg-white"
              }`}
            />
          </div>
          {errors.location && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.location}</span>
            </p>
          )}
        </div>

        {/* AGE */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#071A33]">Age (Years)</label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="number"
              name="age"
              min="1"
              max="120"
              value={formData.age || ""}
              onChange={onChange}
              placeholder="e.g. 29"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-[#071A33] placeholder-slate-400 transition-all outline-none ${
                errors.age
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                  : "border-[#E2E8F0] focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/15 bg-white"
              }`}
            />
          </div>
          {errors.age && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.age}</span>
            </p>
          )}
        </div>

        {/* GENDER */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#071A33]">Gender</label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={onChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#071A33] focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/15 transition-all outline-none"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other / Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationForm;
