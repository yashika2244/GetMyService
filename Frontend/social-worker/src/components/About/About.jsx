import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  Award,
  Sparkles,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    icon: Award,
    number: "4+",
    label: "Years of Experience",
    detail: "Proven track record",
  },
  {
    icon: Sparkles,
    number: "15+",
    label: "Service Categories",
    detail: "Home, repair & tech",
  },
  {
    icon: Users,
    number: "1,200+",
    label: "Happy Customers",
    detail: "Across local areas",
  },
  {
    icon: ShieldCheck,
    number: "100%",
    label: "Verified Professionals",
    detail: "Background-checked",
  },
];

const checklist = [
  "Verified & Trusted Professionals",
  "Award-Winning Service Experience",
  "Dedicated Support for Every Customer",
];

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-blue-100/35 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-sky-100/30 rounded-full blur-[100px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ================= 1. TWO-COLUMN COMPOSITION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT SIDE: CONTENT & VALUES */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Small Blue Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 sm:mb-5 border border-blue-100 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>OUR EXPERIENCE</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0B1E3A] tracking-tight leading-[1.18]">
              4 Years of Expertise{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block sm:inline">
                in Professional Services
              </span>
            </h2>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Professional services you can trust, backed by experience and quality. We connect you with verified professionals delivering quality services with reliability, transparency, and care.
            </p>

            {/* Core Value Checklist */}
            <ul className="mt-7 space-y-3.5 w-full max-w-lg">
              {checklist.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-800"
                >
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Learn More Action Button */}
            <div className="mt-8 sm:mt-9">
              <button
                type="button"
                onClick={() => navigate("/how-it-works")}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-[0_10px_25px_rgba(37,99,235,0.22)] hover:shadow-[0_14px_30px_rgba(37,99,235,0.32)] transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE: LARGE PREMIUM "4 YEARS" EXPERIENCE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[500px] rounded-[2rem] bg-gradient-to-br from-white via-blue-50/25 to-indigo-50/30 border border-blue-100 shadow-[0_20px_50px_rgba(37,99,235,0.08)] p-6 sm:p-8 lg:p-9 overflow-hidden">
              {/* Abstract subtle blue glow behind the number */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl pointer-events-none -z-0" />

              {/* Decorative concentric arcs */}
              <div className="absolute top-8 right-6 w-44 h-44 rounded-full border border-blue-200/40 pointer-events-none -z-0" />
              <div className="absolute top-4 right-2 w-56 h-56 rounded-full border border-dashed border-blue-200/30 pointer-events-none -z-0" />

              {/* Subtle decorative dot grid */}
              <div
                className="absolute top-5 right-5 w-16 h-16 opacity-30 pointer-events-none -z-0"
                style={{
                  backgroundImage: "radial-gradient(#2563eb 1.5px, transparent 1.5px)",
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Monumental "4 YEARS" Experience Header */}
              <div className="relative z-10 flex items-center gap-4 sm:gap-5 pb-5 border-b border-slate-200/60">
                <span className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 leading-none select-none drop-shadow-sm">
                  4
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">
                    Over Four
                  </span>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1E3A] tracking-tight leading-none mt-1">
                    YEARS
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 leading-snug">
                    in Professional Services
                  </span>
                </div>
              </div>

              {/* Central Specialist Showcase Image */}
              <div className="relative z-10 pt-5 flex justify-center items-center">
                <div className="relative w-full max-w-[320px] sm:max-w-[360px] flex justify-center">
                  <img
                    src="/images/aboutimage.png"
                    alt="4 Years of Professional Service Excellence"
                    className="w-full h-auto max-h-[280px] sm:max-h-[320px] object-contain drop-shadow-[0_15px_30px_rgba(15,23,42,0.12)] select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Bottom Verified Platform Bar */}
              <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-700">
                    Trusted Service Network
                  </span>
                </div>
                <span className="font-bold text-blue-600">Est. 2022</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= 2. STATISTICS ROW ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all duration-200 flex flex-col items-start text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mb-3.5 group-hover:scale-105 transition-transform duration-200">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3A] tracking-tight leading-none">
                  {stat.number}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-700 mt-1.5 leading-snug">
                  {stat.label}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-normal mt-0.5">
                  {stat.detail}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
