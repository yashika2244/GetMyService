import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  MapPin,
  MessageSquare,
  Star,
  ChevronRight,
} from "lucide-react";
import { useAccounts } from "../../context/AppContext";

const BestServicesShowcase = () => {
  const navigate = useNavigate();
  const { accounts = [] } = useAccounts();

  // Dynamic service count based on real data
  const countText =
    accounts && accounts.length > 0
      ? `${accounts.length}+ Verified Specialists`
      : "10+ Professional Services";

  const featuredService = {
    title: "Find & Hire Verified Specialists",
    subtitle: "Premier Service Network",
    desc: "Connect directly with background-checked specialists for home maintenance, technical repairs, and professional consultations. Compare transparent rates and book with guaranteed satisfaction.",
    img: "/images/package-delivery.png",
    link: "/services",
    badge: "Featured Service",
    perks: [
      "100% Vetted credentials & identity verification",
      "Upfront consultation & service pricing",
      "Direct one-on-one client communication",
    ],
    ctaText: "Explore Specialists",
  };

  const secondaryServices = [
    {
      id: "location",
      title: "Find Local Specialists",
      desc: "Locate certified professionals operating right in your neighborhood and nearby communities.",
      img: "/images/icon02.png",
      icon: MapPin,
      link: "/services",
      tag: "Local Coverage",
      actionText: "Find Nearby",
    },
    {
      id: "booking",
      title: "Book Direct Appointments",
      desc: "Reserve convenient appointment slots that align with your schedule with real-time confirmation.",
      img: "/images/icon03.png",
      icon: CalendarCheck,
      link: "/msg",
      tag: "Instant Schedule",
      actionText: "Book Appointment",
    },
    {
      id: "messaging",
      title: "Direct Client Messaging",
      desc: "Chat directly with service providers to outline task specifics, share photos, and receive customized quotes.",
      img: null,
      icon: MessageSquare,
      link: "/msg",
      tag: "Instant Chat",
      actionText: "Start Discussion",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F7FF]/70 via-white to-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle ambient blur decorations */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* ================= 1. SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Our Services
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
          >
            Providing The <span className="text-blue-600">Best Services</span>
          </motion.h2>

          {/* Small decorative line using brand blue */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Discover reliable and professional services designed to make your everyday needs easier.
          </motion.p>

          {/* Trust Element / Service Count Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{countText}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Trusted Services For Your Needs</span>
            </div>
          </motion.div>
        </div>

        {/* ================= 2. ASYMMETRIC SERVICE SHOWCASE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-12">
          {/* LEFT: FEATURED SERVICE (LARGE HERO CARD) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-6 xl:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Subtle decorative background shape */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50/80 rounded-full blur-xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div className="relative z-10">
              {/* Badge & Top Row */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                  {featuredService.badge}
                </span>

                <span className="text-[11px] font-semibold text-slate-400">
                  Priority Access
                </span>
              </div>

              {/* Large Visual Icon / Image Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center p-3 shadow-md mb-6 group-hover:scale-105 group-hover:bg-blue-700 transition-all duration-300">
                <img
                  src={featuredService.img}
                  alt={featuredService.title}
                  className="w-10 h-10 object-contain drop-shadow-xs"
                />
              </div>

              {/* Title & Description */}
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 block mb-1">
                {featuredService.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight group-hover:text-blue-600 transition-colors">
                {featuredService.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {featuredService.desc}
              </p>

              {/* Highlight Perks List */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5">
                {featuredService.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured CTA Button */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100">
              <Link
                to={featuredService.link}
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 group-hover:gap-3"
              >
                <span>{featuredService.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: COMPLEMENTARY SMALLER SERVICE CARDS */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between gap-5">
            {secondaryServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer"
                  onClick={() => navigate(service.link)}
                >
                  {/* Left: Icon & Details */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 p-2.5 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                      {service.img ? (
                        <img
                          src={service.img}
                          alt={service.title}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 px-2 py-0.5 rounded-md bg-blue-50">
                          {service.tag}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right: Action & Arrow Indicator */}
                  <div className="mt-2 sm:mt-0 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 group-hover:text-blue-700 shrink-0 self-end sm:self-center">
                    <span>{service.actionText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= 3. VIEW ALL SERVICES FOOTER LINK ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-200/80 gap-4">
          <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
            Need something specific? Explore our complete directory of verified services and categories.
          </p>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs sm:text-sm font-bold border border-slate-200 hover:border-blue-200 transition-all duration-200 shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-blue-600" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestServicesShowcase;
