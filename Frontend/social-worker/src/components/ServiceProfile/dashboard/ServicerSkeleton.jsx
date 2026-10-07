import React from "react";

const ServicerSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-6">
          <div className="h-44 sm:h-52 bg-slate-200" />
          <div className="px-6 pb-6 pt-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 sm:-mt-16 mb-6 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-300 border-4 border-white" />
                <div className="space-y-2">
                  <div className="h-7 w-48 bg-slate-200 rounded-lg" />
                  <div className="h-4 w-32 bg-slate-200 rounded-md" />
                  <div className="h-4 w-60 bg-slate-200 rounded-md" />
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="h-9 w-28 bg-slate-200 rounded-xl" />
                <div className="h-9 w-28 bg-slate-200 rounded-xl" />
              </div>
            </div>
            <div className="border-t border-slate-100 pt-3 flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 bg-slate-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-[#E2E8F0] space-y-3"
            >
              <div className="w-10 h-10 bg-slate-200 rounded-xl" />
              <div className="h-3 w-20 bg-slate-200 rounded" />
              <div className="h-6 w-14 bg-slate-200 rounded" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 h-96" />
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 h-96" />
        </div>
      </div>
    </div>
  );
};

export default ServicerSkeleton;
