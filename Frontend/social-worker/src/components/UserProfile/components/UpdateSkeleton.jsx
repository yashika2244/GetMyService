import React from "react";

const UpdateSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      {/* Back button & page header skeleton */}
      <div className="mb-8">
        <div className="h-5 w-28 bg-[#E2E8F0] rounded mb-3"></div>
        <div className="h-8 w-60 bg-slate-300 rounded mb-2"></div>
        <div className="h-4 w-96 bg-[#E2E8F0] rounded"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Forms) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Photo Card skeleton */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-slate-200"></div>
            <div className="space-y-2 flex-1">
              <div className="h-5 w-40 bg-slate-300 rounded"></div>
              <div className="h-4 w-60 bg-[#E2E8F0] rounded"></div>
              <div className="h-9 w-32 bg-[#E2E8F0] rounded-xl mt-2"></div>
            </div>
          </div>

          {/* Personal Info Card skeleton */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-5">
            <div className="h-5 w-44 bg-slate-300 rounded"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-4 w-24 bg-[#E2E8F0] rounded"></div>
                  <div className="h-11 w-full bg-slate-100 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>

          {/* About / Bio skeleton */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <div className="h-5 w-32 bg-slate-300 rounded"></div>
            <div className="h-28 w-full bg-slate-100 rounded-xl"></div>
          </div>
        </div>

        {/* Right Column (Preview & Actions) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden p-6 space-y-4">
            <div className="h-5 w-36 bg-slate-300 rounded mb-2"></div>
            <div className="w-20 h-20 rounded-2xl bg-slate-200 mx-auto"></div>
            <div className="h-5 w-32 bg-slate-300 rounded mx-auto"></div>
            <div className="h-4 w-44 bg-[#E2E8F0] rounded mx-auto"></div>
            <div className="h-16 w-full bg-slate-100 rounded-xl"></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3">
            <div className="h-5 w-32 bg-slate-300 rounded"></div>
            <div className="h-10 w-full bg-[#E2E8F0] rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSkeleton;
