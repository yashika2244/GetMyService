import React from "react";
import {
  Wrench,
  Zap,
  Hammer,
  Droplet,
  Code,
  Shield,
  Trash2,
  CheckCircle,
} from "lucide-react";

const ServiceCard = ({
  serviceName,
  rate = 0,
  onDelete,
  canEdit = false,
  isRemoving = false,
}) => {
  // Select icon based on service name
  const getIcon = (name = "") => {
    const lower = name.toLowerCase();
    if (lower.includes("electric")) return Zap;
    if (lower.includes("plumb") || lower.includes("pipe")) return Droplet;
    if (lower.includes("dev") || lower.includes("code") || lower.includes("soft"))
      return Code;
    if (lower.includes("clean") || lower.includes("pest")) return Shield;
    if (lower.includes("build") || lower.includes("carpenter")) return Hammer;
    return Wrench;
  };

  const Icon = getIcon(serviceName);

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition group relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
          <Icon className="w-6 h-6" />
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
          <CheckCircle className="w-3 h-3 text-emerald-500" />
          Active
        </span>
      </div>

      <div className="mt-4">
        <h4 className="text-base font-bold text-[#0F172A] tracking-tight capitalize">
          {serviceName}
        </h4>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
          Professional {serviceName.toLowerCase()} solutions tailored to your verified standards.
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
            Starting From
          </span>
          <span className="text-base font-extrabold text-[#0F172A]">
            ${rate}{" "}
            <span className="text-xs font-normal text-slate-500">/ visit</span>
          </span>
        </div>

        {canEdit && onDelete && (
          <button
            onClick={() => onDelete(serviceName)}
            disabled={isRemoving}
            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50"
            title="Remove Service"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
