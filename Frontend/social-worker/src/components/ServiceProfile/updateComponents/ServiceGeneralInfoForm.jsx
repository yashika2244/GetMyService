import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Briefcase,
  ShieldCheck,
  Calendar,
} from "lucide-react";

const CATEGORY_OPTIONS = [
  "General Specialist",
  "Electrician",
  "Plumber",
  "HVAC & AC Repair",
  "Carpenter",
  "Home Painting",
  "Deep Cleaning",
  "Appliance Repair",
  "Pest Control",
  "Web Developer",
  "Software Architect",
  "Engineer",
];

const ServiceGeneralInfoForm = ({ formData, errors = {}, onChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
      <div className="pb-4 border-b border-slate-100">
        <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
          Service Information & Credentials
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          General listing details, base consultation rates, and contact info
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service / Provider Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Service / Provider Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={onChange}
              placeholder="e.g. Liam O'Connor"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                errors.name
                  ? "border-red-400 bg-red-50/30 focus:border-red-500"
                  : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Contact Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={onChange}
              placeholder="e.g. liam@example.com"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                errors.email
                  ? "border-red-400 bg-red-50/30 focus:border-red-500"
                  : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="phone"
              value={formData.phone !== undefined ? formData.phone : ""}
              onChange={onChange}
              placeholder="e.g. +1 555-0192"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Service Location / City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={onChange}
              placeholder="e.g. New York, NY"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                errors.location
                  ? "border-red-400 bg-red-50/30 focus:border-red-500"
                  : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />
          </div>
          {errors.location && (
            <p className="text-xs text-red-500 mt-1">{errors.location}</p>
          )}
        </div>

        {/* Ticket Price / Base Rate */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Base Consultation Rate ($) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              min="0"
              step="1"
              name="TicketPrice"
              value={formData.TicketPrice !== undefined ? formData.TicketPrice : ""}
              onChange={onChange}
              placeholder="e.g. 75"
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                errors.TicketPrice
                  ? "border-red-400 bg-red-50/30 focus:border-red-500"
                  : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />
          </div>
          {errors.TicketPrice && (
            <p className="text-xs text-red-500 mt-1">{errors.TicketPrice}</p>
          )}
        </div>

        {/* Specialization / Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Primary Specialization / Category
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              name="specialization"
              value={
                Array.isArray(formData.specialization)
                  ? formData.specialization.join(", ")
                  : formData.specialization || ""
              }
              onChange={onChange}
              placeholder="e.g. Full Stack, React, Node.js"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Separate multiple skills or categories with commas
          </p>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Listing Approval Status
          </label>
          <div className="relative">
            <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              name="isApproved"
              value={formData.isApproved || "approved"}
              onChange={onChange}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition cursor-pointer"
            >
              <option value="approved">Approved & Verified</option>
              <option value="pending">Pending Verification</option>
              <option value="cancelled">Paused / Suspended</option>
            </select>
          </div>
        </div>

        {/* Gender & Age */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={onChange}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition cursor-pointer"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Age
            </label>
            <input
              type="number"
              min="18"
              max="100"
              name="age"
              value={formData.age !== undefined ? formData.age : ""}
              onChange={onChange}
              placeholder="e.g. 29"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceGeneralInfoForm;
