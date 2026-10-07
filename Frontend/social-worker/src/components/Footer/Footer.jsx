import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { BsLinkedin } from "react-icons/bs";
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from "react-icons/ai";
import { useAuth } from "../../context/AppContext";

const socialLinks = [
  {
    name: "GitHub",
    path: "https://github.com/yashika2244/Serivce",
    icon: <AiFillGithub className="w-4 h-4" />,
  },
  {
    name: "LinkedIn",
    path: "https://www.linkedin.com/in/yashika-chauhan-082155367/",
    icon: <BsLinkedin className="w-4 h-4" />,
  },
  {
    name: "Instagram",
    path: "#",
    icon: <AiOutlineInstagram className="w-4 h-4" />,
  },
  {
    name: "YouTube",
    path: "#",
    icon: <AiFillYoutube className="w-4 h-4" />,
  },
];

const quickLinks = [
  { display: "Home", path: "/" },
  { display: "Services", path: "/services" },
  { display: "How It Works", path: "/how-it-works" },
  { display: "About Us", path: "/about" },
  { display: "Contact Us", path: "/contact" },
];

const forUsersLinks = [
  { display: "Find a Service", path: "/services" },
  { display: "Book an Appointment", path: "/msg" },
  { display: "How Platform Works", path: "/how-it-works" },
  { display: "Customer Sign Up", path: "/cutomer-register" },
  { display: "Help & FAQs", path: "/contact" },
];

const forProvidersLinks = [
  { display: "Add Your Service", path: "/register-service-provider" },
  { display: "Provider Registration", path: "/register-service-provider" },
  { display: "Provider Login", path: "/login" },
  { display: "Role Selection", path: "/select-role" },
];

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const { user, role } = useAuth();

  const handleProviderClick = (e, path) => {
    e.preventDefault();
    if (user && role === "service-provider") {
      navigate(`/servicer-account/${user._id}`);
    } else {
      navigate(path);
    }
  };

  const handleUserClick = (e, path) => {
    e.preventDefault();
    if (user) {
      navigate(`/user-profile/${user._id}`);
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#09152E] via-[#0B1B3F] to-[#060E20] text-white overflow-hidden rounded-t-[2rem] sm:rounded-t-[2.5rem] mt-auto">
      {/* Decorative Subtle Ambient Background Lighting */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[350px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        {/* ================= 1. TOP CTA AREA ================= */}
        <div className="relative mb-14 sm:mb-16 rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-2xl border border-blue-400/20 overflow-hidden">
          {/* Subtle Ambient Shapes inside CTA */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-300/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-xs font-semibold mb-3 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Quick & Trusted Service Booking</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Need a Service? We’re Here to Help.
              </h3>
              <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
                Find trusted professionals and get the job done with confidence.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/services")}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-blue-900 bg-white hover:bg-blue-50 active:scale-[0.98] shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group shrink-0"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* ================= 2. MAIN FOOTER CONTENT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 sm:pb-14">
          {/* COLUMN 1 — BRAND (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Logo on clean white badge */}
            <div
              onClick={() => navigate("/")}
              className="inline-flex items-center p-2.5 px-3.5 rounded-2xl bg-white shadow-xs cursor-pointer group transition-transform duration-200 hover:scale-[1.02]"
            >
              <img
                src="/images/mainlogo.png"
                alt="GetMyService"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting you with verified professionals delivering high-quality everyday and specialized services with reliability, transparency, and care.
            </p>

            {/* Trust badge */}
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-blue-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Verified Specialists & Secure Chats</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-6">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.path}
                  target={item.path.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 flex items-center justify-center hover:scale-105 shadow-2xs"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2 — QUICK LINKS (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 text-blue-200">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-150 inline-block"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 — FOR USERS (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 text-blue-200">
              For Users
            </h4>
            <ul className="space-y-2.5">
              {forUsersLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={(e) =>
                      link.display === "User Profile"
                        ? handleUserClick(e, link.path)
                        : undefined
                    }
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-150 inline-block"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4 — FOR PROFESSIONALS (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 text-blue-200">
              For Providers
            </h4>
            <ul className="space-y-2.5">
              {forProvidersLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={(e) =>
                      link.display.includes("Service") || link.display.includes("Provider")
                        ? handleProviderClick(e, link.path)
                        : undefined
                    }
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-150 inline-block"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5 — CONTACT & HOURS (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 text-blue-200">
              Contact & Hours
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>(000) 000-0000</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="break-all">example@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>2464 Royal Ln, Mesa, NJ 45463</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1 border-t border-white/10">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-300">Mon - Fri: 09:00 - 22:00</p>
                  <p className="text-[11px] text-slate-400">Sat: 11:00 - 20:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= 4. DIVIDER ================= */}
        <div className="border-t border-slate-800/80" />

        {/* ================= 5. BOTTOM BAR ================= */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {year} GetMyService. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-slate-300 transition-colors">
              User Terms & Conditions
            </Link>
            <Link to="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
