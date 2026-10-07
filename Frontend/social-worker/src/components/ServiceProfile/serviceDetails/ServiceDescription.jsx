import React from "react";
import { CheckCircle2, ShieldCheck, Zap, ThumbsUp } from "lucide-react";

const ServiceDescription = ({ about, serviceName }) => {
  const features = [
    "Verified identity and background-checked credentialing",
    "Direct messaging with the specialist to discuss custom requirements",
    "Upfront transparent pricing with zero surprise charges",
    "Flexible appointment scheduling matched to your availability",
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-7 mb-8">
      <div className="pb-4 border-b border-slate-100 mb-5">
        <h3 className="text-lg font-bold text-[#0F172A]">
          About This Service
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed overview of services, turnaround expectations, and expertise
        </p>
      </div>

      <div className="prose max-w-none text-sm text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
        {about ||
          `${serviceName || "This professional"} provides top-tier service solutions with a focus on quality craftsmanship, timely completion, and complete client satisfaction.`}
      </div>

      {/* Key Guarantees */}
      <div className="pt-5 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
          Service Inclusions & Guarantees
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDescription;
