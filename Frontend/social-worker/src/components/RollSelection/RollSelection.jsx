import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  Briefcase,
  Check,
  ArrowRight,
  ShieldCheck,
  User,
  Wrench,
  CheckCircle2,
} from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "customer") {
      navigate("/cutomer-register");
    } else if (role === "service-provider") {
      navigate("/register-service-provider");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/25 to-slate-100/50 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start relative overflow-hidden">
      {/* ============================================================== */}
      {/* SUBTLE BACKGROUND DECORATIVE ELEMENTS                          */}
      {/* ============================================================== */}
      <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

      {/* Subtle Dot Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="role-dot-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="#1E3A8A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#role-dot-grid)" />
      </svg>

      {/* Subtle Abstract Wave / Curve */}
      <svg
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[1200px] h-64 opacity-20 pointer-events-none"
        viewBox="0 0 1200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 100 C 300 180, 600 20, 900 100 C 1050 140, 1150 120, 1200 100"
          stroke="url(#curve-grad)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <defs>
          <linearGradient id="curve-grad" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#93C5FD" stopOpacity="0" />
            <stop offset="0.5" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="1" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* ============================================================== */}
      {/* MAIN CONTENT CONTAINER                                         */}
      {/* ============================================================== */}
      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center my-auto">
        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 shadow-xs mb-6 text-xs"
        >
          <span className="font-extrabold text-[#2563EB] tracking-wider uppercase text-[11px]">
            STEP 1 OF 2
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
            Choose Role
          </span>
          <span className="text-slate-300">→</span>
          <span className="flex items-center gap-1.5 font-medium text-slate-400">
            <span className="w-2 h-2 rounded-full border border-slate-300" />
            Create Account
          </span>
        </motion.div>

        {/* Header Section */}
        <div className="text-center max-w-3xl mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 text-blue-700 text-xs font-bold tracking-wider uppercase mb-4 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>WELCOME TO OUR PLATFORM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
          >
            Choose How You Want to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-blue-600 to-indigo-600 whitespace-nowrap">
              Get Started
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto"
          >
            Whether you’re looking for a service or offering your expertise,
            choose the option that fits you best.
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* TWO PREMIUM ROLE CARDS                                         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
          {/* CARD 1 — CUSTOMER / USER */}
          <motion.div
            onClick={() => handleRoleSelect("customer")}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.99 }}
            className="group cursor-pointer bg-white rounded-3xl p-7 sm:p-9 border border-[#DBEAFE] hover:border-blue-500 shadow-md shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Subtle Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 to-sky-500 opacity-80 group-hover:h-2 transition-all duration-300" />

            <div>
              {/* Card Header & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-sky-500/20 border border-blue-200/80 flex items-center justify-center text-blue-600 shadow-xs group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 stroke-[2.2]" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold tracking-wider uppercase border border-blue-100">
                  <User className="w-3 h-3" />
                  <span>Customer</span>
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight group-hover:text-blue-600 transition-colors duration-200 mb-2">
                Find a Service
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Discover trusted professionals and get the help you need.
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-3 mb-8 pt-4 border-t border-slate-100">
                {[
                  "Browse verified local services",
                  "Connect with vetted professionals",
                  "Book appointments & consultations easily",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <div className="w-full h-12 rounded-xl bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 text-slate-800 group-hover:text-white border border-slate-200 group-hover:border-transparent font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-xs group-hover:shadow-lg group-hover:shadow-blue-500/25">
                <span>Continue as Customer</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>

          {/* CARD 2 — SERVICE PROVIDER */}
          <motion.div
            onClick={() => handleRoleSelect("service-provider")}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.99 }}
            className="group cursor-pointer bg-white rounded-3xl p-7 sm:p-9 border border-[#DBEAFE] hover:border-indigo-500 shadow-md shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Subtle Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-600 opacity-80 group-hover:h-2 transition-all duration-300" />

            <div>
              {/* Card Header & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-blue-500/20 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shadow-xs group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-8 h-8 stroke-[2.2]" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold tracking-wider uppercase border border-indigo-100">
                  <Wrench className="w-3 h-3" />
                  <span>Service Provider</span>
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight group-hover:text-indigo-600 transition-colors duration-200 mb-2">
                Offer Your Services
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Showcase your skills, connect with customers and grow your
                service business.
              </p>

              {/* Benefits Checklist */}
              <div className="space-y-3 mb-8 pt-4 border-t border-slate-100">
                {[
                  "Create your verified professional profile",
                  "Reach new clients searching for your skills",
                  "Manage services, fees & availability schedule",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <div className="w-full h-12 rounded-xl bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-blue-700 text-slate-800 group-hover:text-white border border-slate-200 group-hover:border-transparent font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-xs group-hover:shadow-lg group-hover:shadow-indigo-500/25">
                <span>Continue as Professional</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM TRUST & LOGIN SECTION                                   */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-12 text-center space-y-3"
        >
          <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-[#64748B]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Choose your role to continue. You can complete your profile in the
              next step.
            </span>
          </div>

          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#2563EB] font-bold hover:underline transition"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
