import React from "react";
import { motion } from "framer-motion";

const StatCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  badgeText,
  badgeType = "info",
  iconBg = "bg-blue-50 text-blue-600",
}) => {
  const badgeColors = {
    info: "bg-blue-50 text-blue-700 border-blue-100",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    neutral: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {badgeText && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
              badgeColors[badgeType] || badgeColors.info
            }`}
          >
            {badgeText}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <p className="text-2xl font-bold text-[#0F172A] mt-1 tracking-tight">
          {value}
        </p>
        {subtext && (
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            {subtext}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
