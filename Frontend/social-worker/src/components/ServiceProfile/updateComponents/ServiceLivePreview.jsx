import React from "react";
import {
  MapPin,
  DollarSign,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle,
} from "lucide-react";

const ServiceLivePreview = ({ formData, photoUrl }) => {
  const approvalConfig = {
    approved: {
      label: "Verified Pro",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
    pending: {
      label: "Pending Review",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    cancelled: {
      label: "Suspended",
      badge: "bg-red-50 text-red-700 border-red-200",
      dot: "bg-red-500",
    },
  }[formData.isApproved || "approved"] || {
    label: "Active Specialist",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  };

  const specializations = Array.isArray(formData.specialization)
    ? formData.specialization
    : typeof formData.specialization === "string" && formData.specialization.trim()
    ? formData.specialization.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const rate = formData.TicketPrice !== undefined && formData.TicketPrice !== ""
    ? formData.TicketPrice
    : 0;

  return (
    <div className="space-y-6">
      {/* Live Preview Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Customer View Preview
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            Real-time
          </span>
        </div>

        <div className="p-5">
          {/* Avatar & Title Row */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-inner">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Service preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-lg">
                  {formData.name ? formData.name.slice(0, 2).toUpperCase() : "SP"}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base font-bold text-[#0F172A] truncate">
                  {formData.name || "Provider Name"}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${approvalConfig.badge}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${approvalConfig.dot}`} />
                  {approvalConfig.label}
                </span>
              </div>

              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">
                  {formData.location || "City / Region"}
                </span>
              </p>
            </div>
          </div>

          {/* Specialization Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {specializations.length > 0 ? (
              specializations.map((spec, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700"
                >
                  {spec}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">
                General Specialist
              </span>
            )}
          </div>

          {/* Bio / Description */}
          <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {formData.bio ||
              formData.about ||
              "Your service description will appear here for customers looking to book appointments."}
          </p>

          {/* Pricing Row */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Consultation Fee
              </span>
              <span className="text-lg font-extrabold text-[#0F172A]">
                ${rate}{" "}
                <span className="text-xs font-normal text-slate-500">/ session</span>
              </span>
            </div>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-xs pointer-events-none"
            >
              Book Service
            </button>
          </div>
        </div>
      </div>

      {/* Helpful Listing Checklist */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Listing Quality Checklist
        </h4>
        <div className="space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            {photoUrl ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span className={photoUrl ? "text-slate-700 font-medium" : "text-slate-400"}>
              Service image uploaded
            </span>
          </div>

          <div className="flex items-center gap-2">
            {formData.name && formData.location ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span className={formData.name && formData.location ? "text-slate-700 font-medium" : "text-slate-400"}>
              Name and location provided
            </span>
          </div>

          <div className="flex items-center gap-2">
            {formData.TicketPrice > 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span className={formData.TicketPrice > 0 ? "text-slate-700 font-medium" : "text-slate-400"}>
              Valid consultation rate set
            </span>
          </div>

          <div className="flex items-center gap-2">
            {formData.about && formData.about.length >= 20 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span className={formData.about && formData.about.length >= 20 ? "text-slate-700 font-medium" : "text-slate-400"}>
              Detailed service description
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLivePreview;
