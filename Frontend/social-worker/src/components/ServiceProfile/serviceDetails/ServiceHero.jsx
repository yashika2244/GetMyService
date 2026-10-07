import React, { useState } from "react";
import {
  MapPin,
  Star,
  MessageSquare,
  Phone,
  Share2,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  Check,
} from "lucide-react";
import ServiceGallery from "./ServiceGallery";

const ServiceHero = ({ profile, onMessage, isOwnProfile = false }) => {
  const [copiedShare, setCopiedShare] = useState(false);

  const specializations = Array.isArray(profile.specialization)
    ? profile.specialization
    : [];

  const primaryCategory = specializations[0] || "General Service";
  const rate = profile.TicketPrice || profile.consultationFee || 50;
  const rating = Number(profile.averageRating || 0).toFixed(1);
  const reviewsCount = profile.totalRating || (profile.reviews ? profile.reviews.length : 0);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
      {/* LEFT: Image Gallery (5 cols) */}
      <div className="lg:col-span-5">
        <ServiceGallery
          photoUrl={profile.photo}
          serviceName={profile.name}
          category={primaryCategory}
          isApproved={profile.isApproved}
        />
      </div>

      {/* RIGHT: Service Details & Primary CTA (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-6">
        {/* Title, Category & Status */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wider">
              {primaryCategory}
            </span>

            {profile.isApproved === "approved" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Verified Specialist
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            {profile.name}
          </h1>

          {/* Rating, Reviews, & Location */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-500 mt-2.5">
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
              <span className="text-slate-400 font-normal">
                ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
              </span>
            </div>

            <span className="text-slate-300">•</span>

            <div className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.location || "Location not specified"}</span>
            </div>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-100/80 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider">
              Consultation & Booking Rate
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-extrabold text-[#0F172A]">
                ${rate}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                / initial consultation
              </span>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              Fast Direct Response
            </span>
          </div>
        </div>

        {/* Short Bio / Highlights */}
        {profile.bio && (
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            "{profile.bio}"
          </p>
        )}

        {/* Specialization Tags List */}
        {specializations.length > 0 && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Offered Specializations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {specializations.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons & Primary CTA */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Primary CTA: Message & Book */}
            <button
              onClick={onMessage}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book Service & Message Pro</span>
            </button>

            {/* Secondary: Phone call if available */}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Specialist</span>
              </a>
            )}

            {/* Secondary: Share Button */}
            <button
              onClick={handleShare}
              className="w-full sm:w-auto p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
              title="Share listing"
            >
              {copiedShare ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Direct conversation initiated immediately upon request.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
