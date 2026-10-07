import React from "react";
import { FileText, Sparkles } from "lucide-react";

const AboutYouSection = ({
  bio = "",
  onChange,
  maxLength = 300,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-6 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769FF] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#071A33]">About You</h2>
            <p className="text-xs text-slate-500">
              Share details about your background, needs, or preferences
            </p>
          </div>
        </div>

        <span className="text-xs font-medium text-slate-400">
          {(bio || "").length}/{maxLength} chars
        </span>
      </div>

      <div className="space-y-2">
        <textarea
          name="bio"
          value={bio || ""}
          onChange={onChange}
          rows={4}
          maxLength={maxLength}
          placeholder="Tell specialists a little about yourself, your service requirements, or special instructions..."
          className="w-full p-3.5 rounded-xl border border-[#E2E8F0] text-sm text-[#071A33] placeholder-slate-400 focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/15 transition-all outline-none resize-none leading-relaxed"
        />

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Sparkles className="w-3 h-3 text-[#1769FF]" />
          <span>A helpful bio helps service providers tailor their response to your specific needs.</span>
        </div>
      </div>
    </div>
  );
};

export default AboutYouSection;
