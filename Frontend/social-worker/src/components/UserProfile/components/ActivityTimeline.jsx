import React from "react";
import { useNavigate } from "react-router-dom";
import useConversation from "../../../stateManage/useConversation";
import {
  MessageSquare,
  UserCheck,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import EmptyState from "./EmptyState";

const ActivityTimeline = ({
  conversations = [],
  memberSince,
  userName = "User",
}) => {
  const navigate = useNavigate();
  const { setSelcetedConversation } = useConversation();

  const handleOpenChat = (partner) => {
    if (!partner) return;
    setSelcetedConversation(partner);
    navigate("/msg");
  };

  // Format date helper
  const formatTime = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-8 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769FF] flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#071A33]">Recent Activity Feed</h2>
            <p className="text-xs text-slate-500">
              Live updates and interactions across the platform
            </p>
          </div>
        </div>
      </div>

      {conversations.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No recent conversations yet"
          description="When you reach out to service providers or receive messages, your conversation timeline will appear here."
          actionText="Find a Specialist"
          onAction={() => navigate("/services")}
        />
      ) : (
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
          {/* Conversation Activities from Real Data */}
          {conversations.map((partner) => (
            <div key={partner._id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[27px] top-1 w-5 h-5 rounded-full bg-[#EAF2FF] border-2 border-[#1769FF] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1769FF]"></span>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-[#F8FAFC] hover:bg-white hover:border-blue-200 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={partner.photo || "https://via.placeholder.com/100"}
                      alt={partner.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#071A33]">
                        Chat session with {partner.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {partner.specialization?.join(", ") || partner.role || "Specialist"} •{" "}
                        {partner.location || "Online"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenChat(partner)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1769FF] bg-[#EAF2FF] hover:bg-blue-100 transition flex-shrink-0"
                  >
                    <span>Open Chat</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {partner.lastMessageAt && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Last message: {formatTime(partner.lastMessageAt)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Account Milestone item */}
          <div className="relative group">
            <div className="absolute -left-[27px] top-1 w-5 h-5 rounded-full bg-slate-100 border-2 border-slate-400 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 bg-[#F8FAFC]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-700">
                    Account registered and verified
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {memberSince ? `Since ${memberSince}` : "Active"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
