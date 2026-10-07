import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Clock,
  Sparkles,
} from "lucide-react";
import { useAccounts } from "../../context/AppContext";
import useConversation from "../../stateManage/useConversation";

const Services_card = ({
  searchTerm = "",
  selectedCategory = "all",
  sortBy = "featured",
}) => {
  const { accounts = [], accountsLoading, accountsError } = useAccounts();
  const navigate = useNavigate();
  const { setSelcetedConversation } = useConversation();

  if (accountsLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs"
          >
            <div className="w-full aspect-16/10 bg-slate-200 rounded-2xl" />
            <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
            <div className="h-4 w-1/2 bg-slate-200 rounded-md" />
            <div className="h-10 bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (accountsError) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-red-200 shadow-sm max-w-md mx-auto">
        <p className="text-sm font-bold text-red-600">Failed to load services</p>
        <p className="text-xs text-slate-500 mt-1">{accountsError}</p>
      </div>
    );
  }

  // Filter accounts
  let filtered = accounts.filter((service) => {
    const nameMatch =
      !searchTerm.trim() ||
      (service.name &&
        service.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (service.location &&
        service.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (Array.isArray(service.specialization) &&
        service.specialization.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase()),
        ));

    const categoryMatch =
      selectedCategory === "all" ||
      (Array.isArray(service.specialization) &&
        service.specialization.some(
          (s) => s.toLowerCase() === selectedCategory.toLowerCase(),
        ));

    return nameMatch && categoryMatch;
  });

  // Sort accounts
  if (sortBy === "rating") {
    filtered.sort(
      (a, b) => Number(b.averageRating || 0) - Number(a.averageRating || 0),
    );
  } else if (sortBy === "price-low") {
    filtered.sort(
      (a, b) =>
        Number(a.TicketPrice || a.consultationFee || 50) -
        Number(b.TicketPrice || b.consultationFee || 50),
    );
  } else if (sortBy === "price-high") {
    filtered.sort(
      (a, b) =>
        Number(b.TicketPrice || b.consultationFee || 50) -
        Number(a.TicketPrice || a.consultationFee || 50),
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          No services match your criteria
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Try adjusting your search terms or picking another category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((service) => {
        const rate = service.TicketPrice || service.consultationFee || 50;
        const rating = Number(service.averageRating || 0).toFixed(1);
        const reviewsCount =
          service.totalRating || (service.reviews ? service.reviews.length : 0);
        const specializations = Array.isArray(service.specialization)
          ? service.specialization
          : [];
        const primaryCat = specializations[0] || "Specialist";
        const timeSlots = Array.isArray(service.timeSlots)
          ? service.timeSlots
          : [];

        return (
          <div
            key={service._id}
            className="group bg-white rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={
                    service.photo ||
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
                  }
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600";
                  }}
                />

                {/* Category Pill */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-xs capitalize">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    {primaryCat}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{rating}</span>
                  <span className="text-[10px] text-slate-300 font-normal">
                    ({reviewsCount})
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Link
                    to={`/Service-profile/${service._id}`}
                    className="group-hover:text-blue-600 transition"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
                      {service.name}
                    </h3>
                  </Link>

                  {service.isApproved === "approved" && (
                    <span
                      className="text-emerald-600 shrink-0"
                      title="Verified Specialist"
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>

                {/* Location */}
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {service.location || "Citywide Coverage"}
                  </span>
                </p>

                {/* Specializations Pills */}
                {specializations.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3.5">
                    {specializations.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 capitalize"
                      >
                        {spec}
                      </span>
                    ))}
                    {specializations.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold text-slate-400">
                        +{specializations.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Description Snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {service.bio ||
                    service.about ||
                    "Professional certified specialist offering quality workmanship and reliable service."}
                </p>
              </div>
            </div>

            {/* Card Footer: Pricing & Action Buttons */}
            <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Starting Rate
                </span>
                <span className="text-base sm:text-lg font-extrabold text-[#0F172A]">
                  ${rate}{" "}
                  <span className="text-xs font-normal text-slate-500">/ session</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelcetedConversation(service);
                    navigate("/msg");
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-slate-600 transition cursor-pointer"
                  title="Quick Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                <Link
                  to={`/Service-profile/${service._id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Services_card;
