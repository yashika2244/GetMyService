import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  Zap,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useAccounts } from "../../context/AppContext";

// Fallback services matching real project structure if database accounts are loading or empty
const fallbackServices = [
  {
    _id: "featured-1",
    name: "Alex Martinez",
    specialization: ["Electrician", "Wiring & Installations"],
    photo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500",
    rating: 4.9,
    totalRating: 142,
    location: "Mesa, NJ",
    startingRate: 45,
    bio: "Certified residential and commercial electrical specialist with over 8 years of trusted service.",
  },
  {
    _id: "featured-2",
    name: "Sarah Jenkins",
    specialization: ["Home Cleaning", "Deep Sanitization"],
    photo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500",
    rating: 4.8,
    totalRating: 98,
    location: "Newark, NJ",
    startingRate: 35,
    bio: "Eco-friendly deep cleaning expert delivering immaculate living and office spaces.",
  },
  {
    _id: "featured-3",
    name: "David Chen",
    specialization: ["Plumbing Expert", "Pipe Repairs"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    rating: 5.0,
    totalRating: 186,
    location: "Jersey City, NJ",
    startingRate: 50,
    bio: "Master licensed plumber providing reliable emergency leak repairs and modern installations.",
  },
  {
    _id: "featured-4",
    name: "Elena Rostova",
    specialization: ["Interior Painting", "Wall Restoration"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500",
    rating: 4.9,
    totalRating: 112,
    location: "Hoboken, NJ",
    startingRate: 40,
    bio: "Precision painter offering premium finishes and custom color consultations.",
  },
];

const ServiceDiscoverySection = () => {
  const navigate = useNavigate();
  const { accounts = [] } = useAccounts();

  // Combine real accounts with fallback so we always have rich real data to display
  const displayServices = accounts.length >= 3 ? accounts.slice(0, 4) : fallbackServices;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = displayServices[activeIndex] || displayServices[0];

  // Helper to extract primary category/specialization
  const getCategory = (service) => {
    if (Array.isArray(service.specialization) && service.specialization.length > 0) {
      return service.specialization[0];
    }
    if (typeof service.specialization === "string" && service.specialization) {
      return service.specialization;
    }
    return "Professional Service";
  };

  // Safe navigation handler
  const handleServiceClick = (service) => {
    if (service._id && !service._id.startsWith("featured-")) {
      navigate(`/service-profile/${service._id}`, { state: { ...service } });
    } else {
      navigate("/services");
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-indigo-50/40 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ================= LEFT SIDE: CONTENT & CTA ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* Eyebrow Label */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              OUR SERVICES
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
              All the Services You Need{" "}
              <span className="text-blue-600 block mt-1">in One Trusted Platform</span>
            </h2>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Find reliable services, connect with trusted professionals, and get the help you
              need — all in one place.
            </p>

            {/* Feature Bullets */}
            <div className="mt-8 space-y-3.5 w-full">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">100% Background-checked & certified specialists</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">Direct live messaging with upfront transparent rates</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">Fast appointment scheduling with reliable turnaround</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate("/services")}
                className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore All Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE: SERVICE DISCOVERY COMPOSITION ================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            {/* Outer Discovery Hub Box */}
            <div className="relative rounded-3xl bg-slate-50/70 border border-slate-200/90 p-5 sm:p-7 shadow-xs">
              {/* Category Pills Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Specialist Network
                  </span>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  Interactive Preview
                </span>
              </div>

              {/* Composition Grid: Spotlight Showcase + Overlapping Category Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
                {/* 1. CENTRAL SPOTLIGHT CARD (7 cols on sm) */}
                <div className="sm:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className="relative">
                    {/* Specialist Image Container */}
                    <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={
                          activeService.photo ||
                          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
                        }
                        alt={activeService.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600";
                        }}
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-2xs capitalize">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          {getCategory(activeService)}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{activeService.rating || activeService.avgRating || 4.9}</span>
                      </div>

                      {/* Rate Pill */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-sm">
                        ${activeService.startingRate || activeService.hourlyRate || activeService.fee || 45}/hr
                      </div>
                    </div>

                    {/* Specialist Meta */}
                    <div className="mt-4">
                      <h4 className="text-base sm:text-lg font-bold text-[#0F172A]">
                        {activeService.name}
                      </h4>

                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{activeService.location || "New Jersey Hub"}</span>
                      </div>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {activeService.bio ||
                          activeService.about ||
                          "Certified professional verified on GetMyService with proven quality and customer trust."}
                      </p>
                    </div>
                  </div>

                  {/* Spotlight Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available for Hire
                    </span>

                    <button
                      type="button"
                      onClick={() => handleServiceClick(activeService)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2. DISCOVERY CATEGORY SELECTION COLUMN (5 cols on sm) */}
                <div className="sm:col-span-5 flex flex-col justify-between gap-3">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                    Select Specialist
                  </p>

                  {displayServices.map((service, idx) => {
                    const isSelected = activeIndex === idx;
                    const catName = getCategory(service);

                    return (
                      <button
                        key={service._id || idx}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`w-full p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-white border-blue-500 shadow-sm ring-2 ring-blue-100"
                            : "bg-white/80 border-slate-200 hover:bg-white hover:border-blue-200"
                        }`}
                      >
                        <img
                          src={
                            service.photo ||
                            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150"
                          }
                          alt={service.name}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150";
                          }}
                        />

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {service.name}
                          </p>
                          <p className="text-[11px] text-blue-600 truncate font-semibold">
                            {catName}
                          </p>
                        </div>

                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? "text-blue-600 translate-x-0.5" : "text-slate-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDiscoverySection;
