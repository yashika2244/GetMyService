import React from "react";

const ServiceDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-60 bg-slate-200 rounded-md mb-6" />

        {/* Hero Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-4 h-96" />
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 h-96 space-y-4">
            <div className="h-5 w-24 bg-slate-200 rounded-full" />
            <div className="h-8 w-72 bg-slate-200 rounded-xl" />
            <div className="h-4 w-40 bg-slate-200 rounded-md" />
            <div className="h-20 bg-slate-100 rounded-2xl" />
            <div className="h-12 bg-slate-200 rounded-2xl" />
          </div>
        </div>

        {/* Info Grid Skeleton */}
        <div className="bg-white rounded-3xl border border-slate-200 p-7 mb-8 h-60" />

        {/* Description Skeleton */}
        <div className="bg-white rounded-3xl border border-slate-200 p-7 mb-8 h-48" />

        {/* Provider Card Skeleton */}
        <div className="bg-white rounded-3xl border border-slate-200 p-7 h-40" />
      </div>
    </div>
  );
};

export default ServiceDetailsSkeleton;
