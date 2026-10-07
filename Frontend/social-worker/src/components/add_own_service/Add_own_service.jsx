import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Briefcase,
  Star,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../../context/AppContext";

export default function AddServiceSection() {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const handleAddServiceClick = () => {
    // If logged in as service provider, navigate to their dashboard/account, otherwise to register
    if (user && role === "service-provider") {
      navigate(`/servicer-account/${user._id}`);
    } else {
      navigate("/register-service-provider");
    }
  };

  const benefits = [
    {
      title: "Create your service profile",
      desc: "Highlight your expertise, set your rates, and showcase verified work.",
    },
    {
      title: "Reach potential customers",
      desc: "Connect directly with local clients looking for your specific skills.",
    },
    {
      title: "Manage your services",
      desc: "Control appointments, chat with clients, and grow your client base.",
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-100/30 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Banner Container */}
        <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Subtle background corner shape */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* ================= LEFT COLUMN: CONTENT & BENEFITS ================= */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 uppercase tracking-wider mb-5 shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>FOR SERVICE PROVIDERS</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.18]">
                Add Your <span className="text-blue-600">Own Service</span>
              </h2>

              {/* Supporting Text */}
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Have a skill or service to offer? Join our platform, showcase your expertise,
                and connect with people looking for your services.
              </p>

              {/* 3 Core Benefits */}
              <div className="mt-8 space-y-3.5 w-full max-w-lg">
                {benefits.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-blue-200 transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Action Area */}
              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleAddServiceClick}
                  className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <span>Add Your Service</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-500 px-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Registration • No Hidden Fees</span>
                </div>
              </div>
            </motion.div>

            {/* ================= RIGHT COLUMN: VISUAL COMPOSITION ================= */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Visual Backdrop Frame */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50/80 via-slate-100 to-indigo-50 border border-slate-200/90 shadow-sm p-4 sm:p-6">
                  {/* Main Illustration */}
                  <img
                    src="/images/addyourservice.png"
                    alt="Become a Service Provider"
                    className="w-full h-auto object-contain rounded-2xl drop-shadow-sm transition-transform duration-500 hover:scale-102"
                  />

                  {/* Floating Overlay Badge 1: Top Floating Pill */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 shadow-md flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">
                        Verified Profile
                      </p>
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Direct Inquiries
                      </p>
                    </div>
                  </motion.div>

                  {/* Floating Overlay Badge 2: Bottom Floating Pill */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-md flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-extrabold text-slate-900">5.0</span>
                        <span className="text-[10px] text-slate-400">Rating</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Grow your client network
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
