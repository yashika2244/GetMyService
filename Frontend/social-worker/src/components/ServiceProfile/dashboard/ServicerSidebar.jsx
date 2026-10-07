import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Briefcase,
  Users,
  ExternalLink,
  Edit3,
  CalendarCheck,
  Plus,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import useConversation from "../../../stateManage/useConversation";

const ServicerSidebar = ({
  servicer,
  accounts = [],
  onOpenAddService,
  onOpenAddSlot,
  isOwnProfile = false,
}) => {
  const navigate = useNavigate();
  const { setSelcetedConversation } = useConversation();

  const handleMessagePeer = (peer) => {
    setSelcetedConversation(peer);
    navigate("/msg");
  };

  const peerSpecialists = accounts
    .filter((acc) => acc._id !== servicer?._id)
    .slice(0, 4);

  const timeSlots = Array.isArray(servicer?.timeSlots)
    ? servicer.timeSlots
    : [];

  const specializations = Array.isArray(servicer?.specialization)
    ? servicer.specialization
    : [];

  return (
    <div className="space-y-6">
      {/* 1. Availability Summary Widget */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Active Hours
            </h4>
          </div>
          {isOwnProfile && (
            <button
              onClick={onOpenAddSlot}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          )}
        </div>

        {timeSlots.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-3">
            No working slots set.
          </p>
        ) : (
          <div className="space-y-2">
            {timeSlots.slice(0, 3).map((slot, idx) => (
              <div
                key={slot._id || idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs font-medium text-slate-700"
              >
                <span className="font-semibold text-slate-800">{slot.day}</span>
                <span className="text-slate-500">
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
            ))}
            {timeSlots.length > 3 && (
              <p className="text-[11px] text-center text-slate-400 pt-1">
                +{timeSlots.length - 3} more days configured
              </p>
            )}
          </div>
        )}
      </div>

      {/* 2. Quick Services Widget */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Specialties
            </h4>
          </div>
          {isOwnProfile && (
            <button
              onClick={onOpenAddService}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>New</span>
            </button>
          )}
        </div>

        {specializations.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-3">
            No specialties listed yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {specializations.map((spec, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Colleague Network / Similar Professionals (Preserving original functionality!) */}
      {peerSpecialists.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">
                Network Specialists
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Verified
            </span>
          </div>

          <div className="space-y-3">
            {peerSpecialists.map((peer) => (
              <div
                key={peer._id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition"
              >
                <div
                  onClick={() => navigate(`/Service-profile/${peer._id}`)}
                  className="flex items-center gap-2.5 cursor-pointer min-w-0 flex-1 mr-2"
                >
                  <img
                    src={peer.photo || "https://via.placeholder.com/100"}
                    alt={peer.name}
                    className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-200"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/100";
                    }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate hover:text-blue-600">
                      {peer.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {peer.location || (peer.specialization?.[0]) || "Provider"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleMessagePeer(peer)}
                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition cursor-pointer shrink-0"
                  title="Message specialist"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicerSidebar;
