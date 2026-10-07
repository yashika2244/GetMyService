import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  ExternalLink,
  Copy,
  Check,
  Hash,
  Sparkles,
} from "lucide-react";

const AccountSecurityCard = ({ userId, role = "customer" }) => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = () => {
    if (!userId) return;
    navigator.clipboard.writeText(userId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 space-y-4 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#071A33]">Security & Access</h3>
          <p className="text-[11px] text-slate-500">Account status and credentials</p>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        {/* Account ID */}
        {userId && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              <span>User ID</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-slate-700">
              <span>{userId.slice(0, 8)}...</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="text-slate-400 hover:text-[#1769FF] transition p-0.5"
                title="Copy ID"
              >
                {copiedId ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Security Status */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Authentication</span>
          </div>
          <span className="font-semibold text-emerald-600">Password Active</span>
        </div>
      </div>

      {/* View Public Profile Link */}
      {userId && (
        <button
          type="button"
          onClick={() => navigate(`/user-profile/${userId}`)}
          className="w-full py-2 px-3 rounded-xl border border-blue-200 bg-[#EAF2FF] hover:bg-blue-100 text-[#1769FF] text-xs font-semibold transition flex items-center justify-center gap-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Profile</span>
        </button>
      )}
    </div>
  );
};

export default AccountSecurityCard;
