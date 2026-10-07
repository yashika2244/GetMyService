import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Faq_item = ({ item, isOpen: controlledIsOpen, onToggle }) => {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen;
  const toggle = onToggle || (() => setLocalIsOpen(!localIsOpen));

  return (
    <div
      onClick={toggle}
      className={`rounded-2xl transition-all duration-200 border cursor-pointer select-none overflow-hidden ${
        isOpen
          ? "bg-blue-50/30 border-blue-400/80 shadow-xs"
          : "bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs"
      }`}
    >
      {/* Question Header Row */}
      <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <h4 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
          {item.question}
        </h4>
        <div
          className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full shrink-0 transition-all duration-200 ${
            isOpen
              ? "bg-blue-600 text-white rotate-180 shadow-xs"
              : "bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200" />
        </div>
      </div>

      {/* Answer Expandable Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
              <div className="pt-3.5 border-t border-slate-200/60">
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                  {item.content}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Faq_item;
