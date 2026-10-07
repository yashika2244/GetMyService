import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Users,
  Wrench,
  ThumbsUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";

const WhyChooseUs = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/25 to-white overflow-hidden">
      {/* Decorative ambient background lighting */}
      <div className="absolute top-1/4 -right-24 w-[480px] h-[480px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 -left-24 w-[420px] h-[420px] bg-sky-100/35 rounded-full blur-[100px] pointer-events-none -z-0" />

      {/* Subtle micro dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-0"
        style={{
          backgroundImage: "radial-gradient(#2563EB 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>WHY CHOOSE US</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Benefits of Our Services:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Your Path to Excellence
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-4 text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Everything you need to find trusted professionals and enjoy a seamless service experience.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* ========================================================
              CARD 1: FEATURED PRIMARY BENEFIT (Easy Online Booking)
              Spans 7 cols on lg, full width on md (col-span-2)
          ======================================================== */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group relative md:col-span-2 lg:col-span-7 bg-gradient-to-br from-blue-50/90 via-sky-50/30 to-white rounded-[24px] border border-blue-200/90 hover:border-blue-400 p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Abstract decorative elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-indigo-100/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full border border-blue-200/40 pointer-events-none" />
            <div className="absolute top-2 right-2 w-28 h-28 rounded-full border border-blue-200/30 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 h-full">
              {/* Left Column of Featured Card */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  {/* Eyebrow tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold tracking-wide uppercase mb-5 border border-blue-200/60">
                    <Sparkles size={13} className="text-blue-600" />
                    <span>Primary Benefit</span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-blue-600/25 group-hover:scale-110 transition-transform duration-300">
                    <CalendarCheck size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight leading-snug mb-3">
                    Easy Online Appointment Booking
                  </h3>

                  {/* Description */}
                  <p className="text-[#64748B] text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                    Schedule confirmed visits with vetted top-tier specialists in seconds. Pick your preferred time slot, track real-time status, and enjoy guaranteed doorstep care.
                  </p>
                </div>

                {/* CTA & Trust Tag */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <motion.button
                    type="button"
                    onClick={() => navigate("/msg")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer group/btn"
                  >
                    <span>Book an Appointment</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/90 px-3.5 py-2.5 rounded-full border border-blue-100 shadow-2xs">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>Instant Confirmation</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Interactive Booking Preview */}
              <div className="relative w-full sm:w-[260px] shrink-0">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-blue-100 shadow-lg shadow-blue-900/5 relative z-10">
                  {/* Status row */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider">
                        Live Booking
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      Fast Track
                    </span>
                  </div>

                  {/* Specialist row */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      GMS
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A] leading-tight">Verified Specialist</h4>
                      <p className="text-[11px] text-[#64748B]">Doorstep Service</p>
                    </div>
                  </div>

                  {/* Slot selector pill */}
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-blue-600" />
                      <span className="text-xs font-medium text-slate-700">Today, 10:30 AM</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                      Confirmed
                    </span>
                  </div>

                  {/* Stat highlight */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100/80">
                    <span className="text-[11px] text-[#64748B]">Total Bookings</span>
                    <span className="font-bold text-blue-600 text-xs">20K+ Booked</span>
                  </div>
                </div>

                {/* Subtle depth shadow behind preview card */}
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-blue-600/5 rounded-2xl -z-0 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* ========================================================
              CARD 2: EXPERIENCED & CARING TEAM
              Spans 5 cols on lg, 1 col on md
          ======================================================== */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group relative md:col-span-1 lg:col-span-5 bg-white rounded-[24px] border border-slate-200/80 hover:border-blue-300 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:shadow-md group-hover:shadow-blue-500/20">
                <Users size={24} className="group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0F172A] mb-2.5">
                Experienced & Caring Team
              </h3>

              {/* Description */}
              <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                Every service professional is thoroughly vetted, licensed, and background-checked to guarantee trustworthy, compassionate, and attentive care.
              </p>
            </div>

            {/* Bottom Highlight */}
            <div className="flex items-center justify-between pt-5 mt-auto border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60">
                  10+
                </span>
                <span className="text-xs font-medium text-[#64748B]">Skilled & Vetted Experts</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Verified Pros
              </span>
            </div>
          </motion.div>

          {/* ========================================================
              CARD 3: ADVANCED SERVICE EQUIPMENT
              Spans 4 cols on lg, 1 col on md
          ======================================================== */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group relative md:col-span-1 lg:col-span-4 bg-white rounded-[24px] border border-slate-200/80 hover:border-blue-300 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:shadow-md group-hover:shadow-blue-500/20">
                <Wrench size={24} className="group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0F172A] mb-2.5">
                Advanced Service Equipment
              </h3>

              {/* Description */}
              <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                Equipped with cutting-edge tools and modern diagnostic instruments to guarantee high precision, safety, and durable service execution.
              </p>
            </div>

            {/* Bottom Highlight */}
            <div className="flex items-center gap-2 pt-5 mt-auto border-t border-slate-100 text-xs font-medium text-[#64748B]">
              <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
              <span>Modern Precision & Safety Tools</span>
            </div>
          </motion.div>

          {/* ========================================================
              CARD 4: 99% CUSTOMER SATISFACTION
              Spans 4 cols on lg, 1 col on md
          ======================================================== */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group relative md:col-span-1 lg:col-span-4 bg-white rounded-[24px] border border-slate-200/80 hover:border-blue-300 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:shadow-md group-hover:shadow-blue-500/20">
                <ThumbsUp size={24} className="group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0F172A] mb-2.5">
                99% Customer Satisfaction
              </h3>

              {/* Description */}
              <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                Backed by thousands of verified reviews from satisfied clients who trust our platform for punctuality, quality, and dependable service.
              </p>
            </div>

            {/* Bottom Highlight */}
            <div className="flex items-center justify-between pt-5 mt-auto border-t border-slate-100 text-xs">
              <div className="flex items-center gap-0.5 text-amber-400 font-bold text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/60">
                99% Positive Rating
              </span>
            </div>
          </motion.div>

          {/* ========================================================
              CARD 5: TRANSPARENT & GUARANTEED
              Spans 4 cols on lg, 1 col on md
          ======================================================== */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group relative md:col-span-1 lg:col-span-4 bg-white rounded-[24px] border border-slate-200/80 hover:border-blue-300 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:shadow-md group-hover:shadow-blue-500/20">
                <ShieldCheck size={24} className="group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0F172A] mb-2.5">
                Transparent & Guaranteed
              </h3>

              {/* Description */}
              <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                Clear upfront estimates without hidden charges, backed by our comprehensive service satisfaction warranty for absolute peace of mind.
              </p>
            </div>

            {/* Bottom Highlight */}
            <div className="flex items-center gap-2 pt-5 mt-auto border-t border-slate-100 text-xs font-medium text-[#64748B]">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
              <span>100% Quality & Service Warranty</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
