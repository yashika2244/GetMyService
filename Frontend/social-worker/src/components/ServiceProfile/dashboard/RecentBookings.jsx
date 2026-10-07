import React, { useState, useMemo } from "react";
import BookingRow from "./BookingRow";
import { Search, Filter, MessageSquare, AlertCircle } from "lucide-react";

const RecentBookings = ({
  conversations = [],
  servicerRate = 0,
  specialization = [],
  compact = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const primaryService =
    Array.isArray(specialization) && specialization.length > 0
      ? specialization[0]
      : "Consultation";

  // Filter clients based on search query
  const filteredConversations = useMemo(() => {
    return conversations.filter((cust) => {
      const matchesSearch =
        !searchTerm.trim() ||
        (cust.name &&
          cust.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cust.email &&
          cust.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cust.location &&
          cust.location.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesSearch;
    });
  }, [conversations, searchTerm]);

  const displayedList = compact
    ? filteredConversations.slice(0, 5)
    : filteredConversations;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-6">
      {/* Header & Filter Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Client Inquiries & Booking Requests
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
              {conversations.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real client requests from your direct communication channels
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search clients..."
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 w-44 sm:w-56 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {displayedList.length === 0 ? (
        <div className="py-12 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-800">
            {searchTerm
              ? "No clients match your search criteria"
              : "No client inquiries yet"}
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchTerm
              ? "Try resetting your search query to see all clients."
              : "When customers contact you or book a service consultation, their requests will appear here."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-3 px-3 py-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4 hidden sm:table-cell">Service</th>
                <th className="py-3 px-4 hidden md:table-cell">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 hidden lg:table-cell">Rate</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedList.map((customer, idx) => (
                <BookingRow
                  key={customer._id || idx}
                  customer={customer}
                  servicerRate={servicerRate}
                  defaultService={
                    specialization[idx % specialization.length] || primaryService
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentBookings;
