import React from "react";
import { ShieldCheck, Award, Sparkles, CheckCircle2 } from "lucide-react";

const ServiceGallery = ({
  photoUrl,
  serviceName,
  category,
  isApproved = "approved",
}) => {
  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden p-3 sm:p-4">
      <div className="relative w-full aspect-4/3 sm:aspect-16/11 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 group">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={serviceName || "Service"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800";
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
            <Award className="w-16 h-16 mb-2 text-slate-300" />
            <span className="text-sm font-semibold">Service Listing</span>
          </div>
        )}

        {/* Floating Category Pill */}
        {category && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 text-[#0F172A] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="capitalize">{category}</span>
          </div>
        )}

        {/* Verification Pill */}
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/90 backdrop-blur-md text-white text-xs font-semibold shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          <span>{isApproved === "approved" ? "Verified Service" : "Active Listing"}</span>
        </div>

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
      </div>

      {/* Trust Badges */}
      <div className="mt-3 px-1 py-2 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Background-Checked Pro</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
          <Award className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Satisfaction Guaranteed</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceGallery;
