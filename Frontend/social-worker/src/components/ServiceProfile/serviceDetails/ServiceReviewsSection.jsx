import React from "react";
import { Star, ShieldCheck, MessageCircle } from "lucide-react";

const ServiceReviewsSection = ({ profile }) => {
  const rating = Number(profile?.averageRating || 0).toFixed(1);
  const totalReviews = profile?.totalRating || (profile?.reviews ? profile.reviews.length : 0);

  // If reviews array contains full objects from backend population
  const populatedReviews = Array.isArray(profile?.reviews)
    ? profile.reviews.filter((r) => typeof r === "object" && r !== null && (r.review || r.comment))
    : [];

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-7 mb-8">
      <div className="pb-4 border-b border-slate-100 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A]">
            Verified Customer Ratings & Reviews
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real feedback from clients who booked services
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified platform reviews</span>
        </div>
      </div>

      {/* Score Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50/60 to-slate-50 border border-amber-100/70 flex flex-col sm:flex-row items-center gap-6 mb-6">
        <div className="text-center sm:text-left shrink-0">
          <span className="text-4xl font-extrabold text-[#0F172A] tracking-tight block">
            {rating}
          </span>
          <div className="flex items-center justify-center sm:justify-start gap-1 my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(Number(rating))
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200 fill-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Based on {totalReviews} {totalReviews === 1 ? "rating" : "ratings"}
          </span>
        </div>

        <div className="h-px sm:h-16 w-full sm:w-px bg-slate-200" />

        <div className="text-xs text-slate-600 space-y-1.5 flex-1">
          <p className="font-semibold text-slate-800">
            High Reliability & Performance Rating
          </p>
          <p className="text-slate-500 leading-relaxed">
            Ratings are collected directly from verified customer appointments and consultations. Service quality, punctuality, and communication are evaluated.
          </p>
        </div>
      </div>

      {/* Reviews List or Empty State */}
      {populatedReviews.length > 0 ? (
        <div className="space-y-4">
          {populatedReviews.map((rev, idx) => (
            <div
              key={rev._id || idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                    {rev.user?.name ? rev.user.name.slice(0, 2).toUpperCase() : "CU"}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {rev.user?.name || "Verified Customer"}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      Verified Booking
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= (rev.rating || 5)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {rev.review || rev.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-xs text-slate-500">
          <MessageCircle className="w-6 h-6 text-slate-300 mx-auto mb-2" />
          <p className="font-semibold text-slate-700">
            No written review text submitted yet
          </p>
          <p className="text-slate-400 mt-0.5">
            Book this service and be among the first to leave a detailed review!
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceReviewsSection;
