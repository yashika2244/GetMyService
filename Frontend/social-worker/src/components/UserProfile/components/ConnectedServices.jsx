import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useConversation from "../../../stateManage/useConversation";
import {
  Briefcase,
  MessageSquare,
  ExternalLink,
  MapPin,
  Star,
  Users,
  Search,
} from "lucide-react";
import EmptyState from "./EmptyState";

const ConnectedServices = ({
  accounts = [],
  conversations = [],
  currentUserId,
}) => {
  const navigate = useNavigate();
  const { setSelcetedConversation } = useConversation();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleMessage = (provider) => {
    if (!provider) return;
    setSelcetedConversation(provider);
    navigate("/msg");
  };

  const handleViewProfile = (providerId) => {
    if (!providerId) return;
    navigate(`/Service-profile/${providerId}`);
  };

  // Filter accounts
  const providersList = activeTab === "connected" ? conversations : accounts;
  const filteredProviders = providersList
    .filter((p) => p._id !== currentUserId)
    .filter((p) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      const nameMatch = p.name?.toLowerCase().includes(term);
      const locMatch = p.location?.toLowerCase().includes(term);
      const specMatch = Array.isArray(p.specialization)
        ? p.specialization.some((s) => s.toLowerCase().includes(term))
        : false;
      return nameMatch || locMatch || specMatch;
    });

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-8 hover:shadow-md hover:border-blue-200 transition-all">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769FF] flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#071A33]">
              Specialists & Service Directory
            </h2>
            <p className="text-xs text-slate-500">
              Connect with verified experts across all categories
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "all"
                ? "bg-white text-[#1769FF] shadow-xs"
                : "text-slate-600 hover:text-[#071A33]"
            }`}
          >
            All Providers ({accounts.length})
          </button>
          <button
            onClick={() => setActiveTab("connected")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "connected"
                ? "bg-white text-[#1769FF] shadow-xs"
                : "text-slate-600 hover:text-[#071A33]"
            }`}
          >
            Connected ({conversations.length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by specialist name, skill, or location..."
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E2E8F0] text-xs sm:text-sm text-[#071A33] placeholder-slate-400 focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/15 transition-all outline-none"
        />
      </div>

      {/* Grid of Provider Cards */}
      {filteredProviders.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No specialists found"
          description={
            searchTerm
              ? `No service providers match "${searchTerm}". Try another search term.`
              : activeTab === "connected"
              ? "You haven't initiated conversations with any specialists yet."
              : "No service providers currently available."
          }
          actionText={
            activeTab === "connected" ? "Browse All Providers" : undefined
          }
          onAction={
            activeTab === "connected" ? () => setActiveTab("all") : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProviders.map((provider) => (
            <div
              key={provider._id}
              className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={provider.photo || "https://via.placeholder.com/100"}
                    alt={provider.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <h3
                      onClick={() => handleViewProfile(provider._id)}
                      className="text-sm font-bold text-[#071A33] truncate cursor-pointer hover:text-[#1769FF] transition"
                    >
                      {provider.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{provider.location || "Remote / Various"}</span>
                    </p>
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {Array.isArray(provider.specialization) &&
                  provider.specialization.length > 0 ? (
                    provider.specialization.slice(0, 2).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#EAF2FF] text-[#1769FF]"
                      >
                        {spec}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {provider.role || "Specialist"}
                    </span>
                  )}
                </div>

                {provider.about && (
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {provider.about}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 mt-2">
                <button
                  onClick={() => handleMessage(provider)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-[#1769FF] hover:bg-[#1255d4] text-white transition shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>

                <button
                  onClick={() => handleViewProfile(provider._id)}
                  className="inline-flex items-center justify-center p-1.5 rounded-lg text-slate-500 hover:text-[#1769FF] hover:bg-blue-50 border border-slate-200 transition"
                  title="View Specialist Profile"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectedServices;
