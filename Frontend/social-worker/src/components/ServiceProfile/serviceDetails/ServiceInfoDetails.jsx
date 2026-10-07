import React from "react";
import {
  DollarSign,
  MapPin,
  Briefcase,
  Clock,
  ShieldCheck,
  Award,
  Calendar,
} from "lucide-react";

const ServiceInfoDetails = ({ profile, totalExperience = "0.0" }) => {
  const rate = profile.TicketPrice || profile.consultationFee || 50;
  const timeSlots = Array.isArray(profile.timeSlots) ? profile.timeSlots : [];
  const primaryCategory = profile.specialization?.[0] || "General Service";

  const specs = [
    {
      icon: DollarSign,
      label: "Consultation Rate",
      value: `$${rate} / session`,
      highlight: true,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: MapPin,
      label: "Service Area",
      value: profile.location || "Citywide",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Briefcase,
      label: "Category",
      value: primaryCategory,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: Award,
      label: "Field Experience",
      value: `${totalExperience} Years`,
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: ShieldCheck,
      label: "Account Status",
      value: profile.isApproved === "approved" ? "Verified Specialist" : "Active Provider",
      color: "text-cyan-600 bg-cyan-50",
    },
    {
      icon: Clock,
      label: "Weekly Availability",
      value: timeSlots.length > 0 ? `${timeSlots.length} Active Slots` : "By Appointment",
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-7 mb-8">
      <div className="pb-4 border-b border-slate-100 mb-6">
        <h3 className="text-lg font-bold text-[#0F172A]">
          Service Information & Specifications
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Standard rates, operational terms, and coverage details
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-3.5"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {item.label}
                </span>
                <p className="text-sm font-bold text-slate-800 mt-0.5 capitalize truncate">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Available Time Slots Schedule Preview */}
      {timeSlots.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
            Weekly Working Hours
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {timeSlots.map((slot, i) => (
              <div
                key={slot._id || i}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs"
              >
                <span className="font-bold text-slate-800 block">
                  {slot.day}
                </span>
                <span className="text-slate-500 text-[11px]">
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceInfoDetails;
