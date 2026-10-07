import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MessageSquare,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  PhoneCall,
  Home as HomeIcon,
} from "lucide-react";
import { useAuth } from "../../context/AppContext";
import { toast } from "react-toastify";

const navLinks = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Services", path: "/services", icon: Compass },
  { name: "How It Works", path: "/how-it-works", icon: Sparkles },
  { name: "Contact Us", path: "/contact", icon: PhoneCall },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser, role: authRole, dispatch } = useAuth();

  // Safe fallback to localStorage if context is hydrating
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const user = authUser || storedUser;
  const role = authRole || user?.role || localStorage.getItem("role");

  // UI state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);

  // Track window scroll for sticky visual elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Navigate to appropriate profile/dashboard based on user role
  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);

    if (role === "service-provider") {
      navigate(`/servicer-account/${user?._id}`);
    } else {
      navigate(`/user-profile/${user?._id}`);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      const BASE = "http://localhost:5000";
      await fetch(`${BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout request error:", err);
    } finally {
      if (dispatch) {
        dispatch({ type: "LOGOUT" });
      }
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("chatUser");
      toast.success("Logged out successfully");
      setIsProfileMenuOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/login");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5"
          : "bg-white border-b border-slate-100 py-3.5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* ================= LEFT: BRAND LOGO ================= */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src="/images/mainlogo.png"
              alt="GetMyService Logo"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </div>

          {/* ================= CENTER: DESKTOP NAVIGATION ================= */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                    ? "text-blue-600 bg-blue-50/70"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="flex items-center gap-1.5">
                    {name}
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-dot"
                        className="w-1.5 h-1.5 rounded-full bg-blue-600"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ================= RIGHT: AUTH & ACTIONS ================= */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              // NOT LOGGED IN
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/select-role")}
                  className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              // LOGGED IN
              <div className="flex items-center gap-3">
                {/* Chat / Messages button */}
                <button
                  type="button"
                  onClick={() => navigate("/msg")}
                  title="Messages"
                  className="relative p-2.5 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600" />
                </button>

                {/* User Profile Pill & Dropdown */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-blue-300 hover:bg-slate-50/80 transition-all cursor-pointer shadow-2xs"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 ring-2 ring-blue-100">
                      <img
                        src={
                          user?.photo ||
                          "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                        }
                        alt={user?.name || "User Avatar"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-left hidden lg:block max-w-[110px]">
                      <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                        {user?.name || "My Account"}
                      </p>
                      <p className="text-[10px] text-slate-400 capitalize truncate">
                        {role === "service-provider" ? "Provider" : "Client"}
                      </p>
                    </div>

                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 overflow-hidden"
                      >
                        {/* User Header */}
                        <div className="p-3 pb-3 border-b border-slate-100 flex items-center gap-3">
                          <img
                            src={
                              user?.photo ||
                              "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">
                              {user?.name || "User"}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {user?.email || ""}
                            </p>
                          </div>
                        </div>

                        {/* Dropdown Options */}
                        <div className="mt-1 space-y-0.5">
                          <button
                            type="button"
                            onClick={handleProfileClick}
                            className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 transition flex items-center gap-2.5 text-left cursor-pointer"
                          >
                            <LayoutDashboard className="w-4 h-4 text-blue-600" />
                            <span>
                              {role === "service-provider"
                                ? "Provider Dashboard"
                                : "My User Profile"}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              navigate("/msg");
                            }}
                            className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 transition flex items-center gap-2.5 text-left cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4 text-sky-600" />
                            <span>Messages & Inquiries</span>
                          </button>
                        </div>

                        {/* Sign Out Option */}
                        <div className="mt-1 pt-1 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition flex items-center gap-2.5 text-left cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Log out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* ================= MOBILE HAMBURGER BUTTON ================= */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <button
                type="button"
                onClick={() => navigate("/msg")}
                title="Messages"
                className="p-2 text-slate-600 hover:text-blue-600"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE DRAWER / PANEL ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto md:hidden"
            >
              {/* Drawer Header */}
              <div>
                <div className="p-5 flex items-center justify-between border-b border-slate-100">
                  <img
                    src="/images/mainlogo.png"
                    alt="Logo"
                    className="h-9 w-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Status Bar if Logged In */}
                {user && (
                  <div className="p-4 mx-4 mt-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3">
                    <img
                      src={
                        user?.photo ||
                        "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                      }
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-[11px] text-blue-600 capitalize">
                        {role === "service-provider" ? "Service Specialist" : "Client Account"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Nav Links */}
                <div className="px-4 py-4 space-y-1">
                  <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Navigation
                  </p>
                  {navLinks.map(({ name, path, icon: LinkIcon }) => (
                    <NavLink
                      key={name}
                      to={path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition ${isActive
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-700 hover:bg-slate-100"
                        }`
                      }
                    >
                      <LinkIcon className="w-4 h-4 shrink-0" />
                      <span>{name}</span>
                    </NavLink>
                  ))}
                </div>

                {/* Account Section for Logged In */}
                {user && (
                  <div className="px-4 pt-2 pb-4 space-y-1 border-t border-slate-100 mx-4">
                    <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Account Options
                    </p>
                    <button
                      type="button"
                      onClick={handleProfileClick}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition text-left cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        {role === "service-provider"
                          ? "Provider Dashboard"
                          : "My User Profile"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/msg");
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition text-left cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Chat Messages</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                {!user ? (
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/login");
                      }}
                      className="w-full py-3 px-4 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition"
                    >
                      Log in to Account
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/select-role");
                      }}
                      className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
