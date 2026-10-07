import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Sparkles,
  Users,
  Wrench,
  Check,
} from "lucide-react";
import { useAuth } from "../../context/AppContext";

export default function ExperienceAwaitsCTA() {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const handleExploreServices = () => {
    navigate("/services");
  };

  const handleAddService = () => {
    if (user && role === "service-provider") {
      navigate(`/servicer-account/${user._id}`);
    } else {
      navigate("/register-service-provider");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-24 lg:pb-14 min-h-auto lg:min-h-[calc(100vh-64px)] flex items-center">
      {/* Background Architectural Canvas & Subtle Dot Matrix Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(#3b82f6 0.85px, transparent 0.85px)",
          backgroundSize: "30px 30px",
          backgroundPosition: "center top",
        }}
      />

      {/* Large Abstract Soft Blue Atmosphere Shapes (Brand-aligned depth) */}
      <div className="absolute top-1/4 -left-20 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] bg-gradient-to-tr from-blue-100/60 via-sky-50/40 to-indigo-50/30 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute -bottom-10 right-0 sm:right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-50/70 via-indigo-50/40 to-transparent rounded-full blur-[100px] pointer-events-none -z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ================= LEFT COLUMN: HERO CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Small Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-xs font-bold tracking-[0.2em] uppercase mb-4 sm:mb-5 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>YOUR TRUSTED SERVICE PLATFORM</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.85rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] sm:leading-[1.1]"
            >
              Find the Right Service.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600">
                Get Things Done.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-xl"
            >
              Discover trusted professionals and reliable services for your everyday needs — all in one convenient platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              {/* Primary Button */}
              <button
                type="button"
                onClick={handleExploreServices}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-[0_10px_25px_rgba(37,99,235,0.22)] hover:shadow-[0_14px_30px_rgba(37,99,235,0.32)] transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <span>Explore Services</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">
                  →
                </span>
              </button>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={handleAddService}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-slate-800 bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-50"
              >
                <span>Add Your Service</span>
              </button>
            </motion.div>

            {/* Subtle Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 sm:mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium w-full"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                <span>Top-Rated Quality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Direct Booking & Chat</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN: PREMIUM VISUAL COMPOSITION ================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            {/* Visual Frame Container */}
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[450px] aspect-[4/4.5] flex items-end justify-center">
              {/* Static Depth Layer 1: Ambient Soft Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 bg-blue-400/15 rounded-full blur-3xl pointer-events-none -z-0" />

              {/* Static Depth Layer 2: Large Soft Blue Circular/Organic Shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] sm:w-[370px] lg:w-[395px] h-[310px] sm:h-[370px] lg:h-[395px] rounded-full bg-gradient-to-tr from-blue-100/75 via-sky-50/60 to-indigo-50/45 border border-blue-100 shadow-[0_20px_50px_rgba(37,99,235,0.08)] pointer-events-none -z-0" />

              {/* Static Depth Layer 3: Abstract Subtle Concentric Arcs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[310px] h-[260px] sm:h-[310px] rounded-full border border-blue-200/50 pointer-events-none -z-0" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[410px] h-[340px] sm:h-[410px] rounded-full border border-dashed border-blue-200/35 pointer-events-none -z-0" />

              {/* Subtle Decorative Dots (Top-Right behind image) */}
              <div
                className="absolute top-3 right-2 sm:right-5 w-16 h-16 pointer-events-none opacity-30 -z-0"
                style={{
                  backgroundImage: "radial-gradient(#2563eb 1.5px, transparent 1.5px)",
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Main Service Specialist Image (Central Hero Focus) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full flex justify-center items-end"
              >
                <img
                  src="/images/heroimage.png"
                  alt="GetMyService Professional"
                  className="w-auto h-auto max-h-[380px] sm:max-h-[440px] lg:max-h-[475px] object-contain drop-shadow-[0_20px_35px_rgba(37,99,235,0.14)] select-none pointer-events-none"
                />
                {/* Seamless pedestal grounding gradient fade at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
              </motion.div>

              {/* FLOATING ELEMENT 1: Verified Professional Badge (Top Left) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                className="absolute top-6 left-0 sm:-left-3 lg:-left-5 z-20 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-2 rounded-2xl border border-slate-100 shadow-[0_8px_20px_rgba(15,23,42,0.08)] flex items-center gap-2 sm:gap-2.5 select-none"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                    Verified Professional
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Identity Vetted
                  </p>
                </div>
              </motion.div>

              {/* FLOATING ELEMENT 2: Service Category Badge (Mid Right) */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.35 }}
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-3 lg:-right-5 z-20 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-2 rounded-2xl border border-slate-100 shadow-[0_8px_20px_rgba(15,23,42,0.08)] flex items-center gap-2 sm:gap-2.5 select-none"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 block leading-none">
                    Category
                  </span>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight mt-0.5">
                    Home & Daily Services
                  </p>
                </div>
              </motion.div>

              {/* FLOATING ELEMENT 3: Availability / Status Indicator (Bottom Center-Left) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.7 }}
                className="absolute bottom-3 left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full border border-slate-100 shadow-[0_8px_20px_rgba(15,23,42,0.08)] flex items-center gap-2 select-none"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 whitespace-nowrap">
                  Available for Booking
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-0.5" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
