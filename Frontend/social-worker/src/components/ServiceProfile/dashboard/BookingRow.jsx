import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, ExternalLink, Calendar, MapPin } from "lucide-react";
import useConversation from "../../../stateManage/useConversation";

const BookingRow = ({ customer, servicerRate = 0, defaultService = "Service Consultation" }) => {
  const navigate = useNavigate();
  const { setSelcetedConversation } = useConversation();

  const handleMessage = () => {
    setSelcetedConversation(customer);
    navigate("/msg");
  };

  const handleViewProfile = () => {
    navigate(`/users-profile/${customer._id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recent Inquiry";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recent Inquiry";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Recent Inquiry";
    }
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-none">
      {/* Customer Info */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-600 text-sm shrink-0">
            {customer.photo ? (
              <img
                src={customer.photo}
                alt={customer.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              customer.name ? customer.name.slice(0, 2).toUpperCase() : "CU"
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {customer.name || "Client"}
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1 truncate">
              {customer.location ? (
                <>
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{customer.location}</span>
                </>
              ) : (
                customer.email || "Registered Client"
              )}
            </p>
          </div>
        </div>
      </td>

      {/* Service Requested */}
      <td className="py-4 px-4 hidden sm:table-cell">
        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
          {defaultService}
        </span>
      </td>

      {/* Date */}
      <td className="py-4 px-4 text-xs text-slate-500 hidden md:table-cell">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{formatDate(customer.lastMessageAt)}</span>
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active In Touch
        </span>
      </td>

      {/* Amount / Rate */}
      <td className="py-4 px-4 text-sm font-bold text-slate-800 hidden lg:table-cell">
        {servicerRate ? `$${servicerRate}` : "Standard"}
      </td>

      {/* Actions */}
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleMessage}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            title="Open Chat"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Message</span>
          </button>

          <button
            onClick={handleViewProfile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            title="View Profile"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookingRow;
