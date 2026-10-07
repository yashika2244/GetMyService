import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Users,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const ProfileStats = ({
  completionPercentage,
  activeChatsCount,
  availableProvidersCount,
  userRole = "customer",
}) => {
  const stats = [
    {
      id: "completion",
      title: "Profile Strength",
      value: `${completionPercentage}%`,
      subtitle:
        completionPercentage === 100
          ? "All information complete"
          : "Essential fields filled",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      hasProgress: true,
      progressValue: completionPercentage,
    },
    {
      id: "conversations",
      title: "Active Chats",
      value: activeChatsCount,
      subtitle: activeChatsCount === 1 ? "1 active conversation" : `${activeChatsCount} active conversations`,
      icon: MessageSquare,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#1769FF]",
    },
    {
      id: "network",
      title: "Verified Specialists",
      value: availableProvidersCount,
      subtitle: "Available in platform network",
      icon: Users,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      id: "standing",
      title: "Account Standing",
      value: "Good Standing",
      subtitle: userRole === "service-provider" ? "Service Provider tier" : "Verified Customer tier",
      icon: Sparkles,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className="text-2xl font-bold text-[#071A33] mt-1 tracking-tight">
                  {stat.value}
                </div>
              </div>
              <div
                className={`w-11 h-11 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center shadow-xs flex-shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {stat.hasProgress && (
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${stat.progressValue}%` }}
                ></div>
              </div>
            )}

            <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <span>{stat.subtitle}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProfileStats;
