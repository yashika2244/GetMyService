import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit3,
  Search,
  Layers,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const QuickActionsSidebar = ({
  user,
  isOwnProfile,
  onLogout,
  completionPercentage,
}) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Edit Profile Details",
      description: "Update personal information, location & photo",
      icon: Edit3,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      onClick: () => navigate(`/update_user/${user?._id}`),
      show: isOwnProfile,
    },
    {
      title: "How It Works",
      description: "Learn how to find, connect & hire experts",
      icon: HelpCircle,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      onClick: () => navigate("/how-it-works"),
      show: true,
    },
    {
      title: "Browse All Categories",
      description: "Explore our full catalog of services",
      icon: Layers,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      onClick: () => navigate("/services"),
      show: true,
    },
    {
      title: "Messages & Chats",
      description: "Open real-time communication portal",
      icon: MessageSquare,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-50",
      onClick: () => navigate("/msg"),
      show: true,
    },
    {
      title: "Help & Support",
      description: "Contact platform customer assistance",
      icon: HelpCircle,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      onClick: () => navigate("/contact"),
      show: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* QUICK ACTIONS CARD */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769FF] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-[#071A33]">Quick Actions</h2>
        </div>

        <div className="space-y-2">
          {actions
            .filter((a) => a.show)
            .map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className="w-full p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-[#F8FAFC] hover:bg-white flex items-center justify-between text-left transition group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg ${action.iconBg} ${action.iconColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#071A33] group-hover:text-[#1769FF] transition truncate">
                        {action.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {action.description}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1769FF] group-hover:translate-x-0.5 transition flex-shrink-0" />
                </button>
              );
            })}
        </div>
      </div>

      {/* ACCOUNT HEALTH / SECURITY CARD */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-[#071A33]">Account Health</h2>
        </div>

        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Your account is fully active and protected. Verified authentication is active on this session.
        </p>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
            <span className="text-slate-600">Profile Setup</span>
            <span className="font-semibold text-emerald-600">
              {completionPercentage}% Complete
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
            <span className="text-slate-600">Identity Status</span>
            <span className="font-semibold text-emerald-600">Verified</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
            <span className="text-slate-600">Role Authority</span>
            <span className="font-semibold text-[#1769FF] capitalize">
              {user?.role || "Customer"}
            </span>
          </div>
        </div>

        {isOwnProfile && (
          <button
            onClick={onLogout}
            className="w-full mt-4 py-2 px-3 rounded-xl border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 transition flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Account</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default QuickActionsSidebar;
