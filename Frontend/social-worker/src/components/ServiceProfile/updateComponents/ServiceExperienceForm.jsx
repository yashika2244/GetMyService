import React from "react";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";

const ServiceExperienceForm = ({ formData, errors = {}, onChange }) => {
  const experiences = Array.isArray(formData.experience)
    ? formData.experience
    : [];

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

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
      <div className="pb-4 border-b border-slate-100">
        <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
          Work Experience & Career Milestones
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Highlight your professional background to increase trust with clients
        </p>
      </div>

      {/* Add New Milestone Fields */}
      <div>
        <span className="text-xs font-semibold text-slate-700 block mb-2">
          Add New Experience Milestone (Optional)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="expDateStart"
              value={formData.expDateStart || ""}
              onChange={onChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="expDateEnd"
              value={formData.expDateEnd || ""}
              onChange={onChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Existing Milestones List */}
      {experiences.length > 0 && (
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-700 block mb-3">
            Existing Recorded Milestones ({experiences.length})
          </span>
          <div className="space-y-2.5">
            {experiences.map((exp, idx) => (
              <div
                key={exp._id || idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800">
                    {exp.role || "Professional Specialist"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {exp.locations || exp.location || formData.location || "On file"}{" "}
                    • {formatDate(exp.startdate)} — {formatDate(exp.enddate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceExperienceForm;
