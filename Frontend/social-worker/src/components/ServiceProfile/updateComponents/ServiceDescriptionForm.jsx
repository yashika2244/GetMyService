import React from "react";
import { FileText, Sparkles } from "lucide-react";

const ServiceDescriptionForm = ({ formData, errors = {}, onChange }) => {
  const bioLength = formData.bio ? formData.bio.length : 0;
  const aboutLength = formData.about ? formData.about.length : 0;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
      <div className="pb-4 border-b border-slate-100">
        <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
          Service Bio & Detailed Description
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Explain what your service provides, your work ethics, and what customers can expect
        </p>
      </div>

      {/* Short Bio Tagline */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Short Catchphrase / Bio
          </label>
          <span
            className={`text-[11px] font-mono ${
              bioLength > 50 ? "text-red-500 font-bold" : "text-slate-400"
            }`}
          >
            {bioLength}/50
          </span>
        </div>
        <input
          type="text"
          name="bio"
          maxLength={50}
          value={formData.bio || ""}
          onChange={onChange}
          placeholder="e.g. Certified HVAC specialist with 8+ years experience"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
        />
        {errors.bio && <p className="text-xs text-red-500 mt-1">{errors.bio}</p>}
      </div>

      {/* Detailed About Textarea */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Detailed Service Description / About
          </label>
          <span className="text-[11px] font-mono text-slate-400">
            {aboutLength} characters
          </span>
        </div>
        <textarea
          rows={5}
          name="about"
          value={formData.about || ""}
          onChange={onChange}
          placeholder="Describe your service offerings, expertise, standard warranties, and turnaround times in detail..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition resize-y leading-relaxed"
        />
        {errors.about && (
          <p className="text-xs text-red-500 mt-1">{errors.about}</p>
        )}
      </div>
    </div>
  );
};

export default ServiceDescriptionForm;
