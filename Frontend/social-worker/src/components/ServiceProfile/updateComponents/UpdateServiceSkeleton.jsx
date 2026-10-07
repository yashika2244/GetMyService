import React from "react";

const UpdateServiceSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-slate-200 rounded-md" />
            <div className="h-8 w-60 bg-slate-200 rounded-xl" />
            <div className="h-4 w-80 bg-slate-200 rounded-md" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-slate-200 rounded-xl" />
            <div className="h-10 w-32 bg-slate-200 rounded-xl" />
          </div>
        </div>

        {/* 2-Column Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 h-48" />
            <div className="bg-white rounded-2xl border border-slate-200 p-6 h-96" />
            <div className="bg-white rounded-2xl border border-slate-200 p-6 h-48" />
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 h-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceSkeleton;
