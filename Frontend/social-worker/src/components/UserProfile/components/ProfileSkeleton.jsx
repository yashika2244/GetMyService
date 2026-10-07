import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      {/* Back button skeleton */}
      <div className="h-6 w-24 bg-[#E2E8F0] rounded-md mb-6"></div>

      {/* Header skeleton */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-8">
        <div className="h-44 sm:h-52 bg-gradient-to-r from-slate-200 to-slate-300"></div>
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-14 mb-4 gap-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-300 border-4 border-white shadow"></div>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <div className="h-10 w-28 bg-[#E2E8F0] rounded-xl"></div>
              <div className="h-10 w-28 bg-[#E2E8F0] rounded-xl"></div>
            </div>
          </div>
          <div className="h-7 w-48 bg-slate-300 rounded mb-2"></div>
          <div className="h-4 w-64 bg-[#E2E8F0] rounded mb-3"></div>
          <div className="flex gap-4">
            <div className="h-4 w-32 bg-[#E2E8F0] rounded"></div>
            <div className="h-4 w-32 bg-[#E2E8F0] rounded"></div>
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-4 w-20 bg-[#E2E8F0] rounded"></div>
              <div className="h-6 w-16 bg-slate-300 rounded"></div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
          </div>
        ))}
      </div>

      {/* Main Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="h-5 w-32 bg-slate-300 rounded"></div>
            <div className="h-16 w-full bg-[#E2E8F0] rounded-xl"></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="h-5 w-40 bg-slate-300 rounded"></div>
            <div className="space-y-3">
              <div className="h-12 w-full bg-[#E2E8F0] rounded-xl"></div>
              <div className="h-12 w-full bg-[#E2E8F0] rounded-xl"></div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="h-5 w-32 bg-slate-300 rounded"></div>
            <div className="space-y-2">
              <div className="h-10 w-full bg-[#E2E8F0] rounded-xl"></div>
              <div className="h-10 w-full bg-[#E2E8F0] rounded-xl"></div>
              <div className="h-10 w-full bg-[#E2E8F0] rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
