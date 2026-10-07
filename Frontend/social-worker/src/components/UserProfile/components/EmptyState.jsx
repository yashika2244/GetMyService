import React from "react";
import { motion } from "framer-motion";

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-dashed border-[#E2E8F0] ${className}`}
    >
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-[#EAF2FF] text-[#1769FF] flex items-center justify-center mb-4 shadow-sm">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#071A33] mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl text-white bg-[#1769FF] hover:bg-[#1255d4] active:scale-[0.98] transition-all shadow-sm"
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
