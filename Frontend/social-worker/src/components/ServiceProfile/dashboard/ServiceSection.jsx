import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import { Plus, Search, Briefcase, Sparkles } from "lucide-react";

const ServiceSection = ({
  specialization = [],
  rate = 0,
  onOpenAddModal,
  onRemoveService,
  canEdit = false,
  isRemoving = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = specialization.filter((spec) =>
    spec.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-6 p-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#0F172A]">
              Services & Specializations
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
              {specialization.length} Listed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage your service offerings, skillsets, and hourly/consultation rates
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services..."
              className="pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 w-44 sm:w-52 outline-none transition"
            />
          </div>

          {canEdit && (
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of services */}
      {filteredServices.length === 0 ? (
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Briefcase className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-800">
            {searchTerm
              ? "No services match your search"
              : "No services listed yet"}
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchTerm
              ? "Try changing your search keywords to view other offerings."
              : "Add your primary skills and service specializations to attract clients looking for qualified pros."}
          </p>
          {canEdit && !searchTerm && (
            <button
              onClick={onOpenAddModal}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Service</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {filteredServices.map((serviceName, index) => (
            <ServiceCard
              key={`${serviceName}-${index}`}
              serviceName={serviceName}
              rate={rate}
              onDelete={onRemoveService}
              canEdit={canEdit}
              isRemoving={isRemoving}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceSection;
