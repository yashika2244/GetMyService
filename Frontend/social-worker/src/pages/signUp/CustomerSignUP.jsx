import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import imageCompression from "browser-image-compression";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Lock,
  MapPin,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Camera,
  UploadCloud,
  Loader2,
  Star,
  CheckCircle2,
} from "lucide-react";

function CustomerSignUp() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "male",
    location: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileInputChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const data = await uploadImageToClodinary(compressedFile);

      setPreviewUrl(data.url);
      setFormData((prev) => ({ ...prev, photo: data.url }));
      toast.success("Profile photo uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed. Please try another image.");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "customer" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success("Registration Successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Something went wrong during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/25 to-slate-100/50 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
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
            id="customer-dot-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="#1E3A8A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#customer-dot-grid)" />
      </svg>

      {/* ============================================================== */}
      {/* MAIN TWO-PANEL CONTAINER                                       */}
      {/* ============================================================== */}
      <div className="max-w-6xl w-full mx-auto my-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-2xl shadow-slate-200/70 border border-slate-200/80 overflow-hidden flex flex-col lg:flex-row"
        >
          {/* ============================================================== */}
          {/* LEFT SIDE — CUSTOMER EXPERIENCE PANEL (Approx 40% Desktop)      */}
          {/* ============================================================== */}
          <div className="lg:w-[40%] bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#2563EB] p-8 sm:p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Abstract Decorative Visuals */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

            {/* Subtle Curved Accent Lines */}
            <svg
              className="absolute bottom-0 right-0 w-64 h-64 opacity-15 pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="160"
                cy="160"
                r="110"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle
                cx="160"
                cy="160"
                r="75"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>

            {/* Content Top */}
            <div className="relative z-10">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-blue-200 tracking-wider uppercase mb-6 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>GET STARTED</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
                Your Trusted Services,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-200 to-indigo-200">
                  Just a Step Away.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8 max-w-sm font-normal">
                Create your account and discover reliable professionals for your
                everyday needs.
              </p>

              {/* 3 Benefit Highlights */}
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "Find Trusted Professionals",
                    desc: "Explore verified, background-checked service experts in your city.",
                  },
                  {
                    title: "Book Services Easily",
                    desc: "Transparent upfront pricing with convenient scheduling at your fingertips.",
                  },
                  {
                    title: "Manage Everything in One Place",
                    desc: "Direct in-app messaging, active appointment tracking, and review history.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3.5 group"
                  >
                    <div className="w-7 h-7 rounded-xl bg-blue-500/25 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5 text-sky-300 shadow-xs">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300/85 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Content Bottom / Trust Badge Card */}
            <div className="relative z-10 pt-6 border-t border-white/15">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      100% Free Customer Registration
                    </p>
                    <p className="text-[11px] text-slate-300">
                      No hidden fees or subscriptions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-400/20 border border-amber-300/30 px-2.5 py-1 rounded-xl text-amber-300 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT SIDE — REGISTRATION FORM PANEL (Approx 60% Desktop)       */}
          {/* ============================================================== */}
          <div className="lg:w-[60%] p-6 sm:p-10 lg:p-12 bg-white flex flex-col justify-between">
            <div>
              {/* Form Header */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                  Create Your Account
                </h2>
                <p className="text-sm text-[#64748B] mt-1.5 leading-relaxed">
                  Join our platform and find the right professional for your
                  needs.
                </p>
              </div>

              {/* Form Element */}
              <form onSubmit={submitHandler} className="space-y-6">
                {/* -------------------------------------------------------- */}
                {/* SECTION 1: PERSONAL INFORMATION                         */}
                {/* -------------------------------------------------------- */}
                <div>
                  <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Personal Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          name="name"
                          placeholder="e.g. Amit Sharma"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-slate-400 transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          name="email"
                          placeholder="amit.sharma@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-slate-400 transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                        City & Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          name="location"
                          placeholder="e.g. Connaught Place, New Delhi"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full h-12 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-slate-400 transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Profile Photo Upload Box */}
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white border-2 border-slate-200 shrink-0 flex items-center justify-center shadow-xs">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="w-6 h-6 text-slate-400" />
                        )}
                        {previewUrl && (
                          <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px]">
                            ✓
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">
                          Profile Photo{" "}
                          <span className="text-slate-400 font-normal">
                            (Optional)
                          </span>
                        </p>
                        <p className="text-[11px] text-[#64748B] mt-0.5">
                          Personalize your profile picture
                        </p>
                      </div>
                    </div>

                    <div className="relative w-full sm:w-auto">
                      <input
                        type="file"
                        id="customer-photo"
                        onChange={handleFileInputChange}
                        accept=".jpg, .png, .jpeg, .gif, .avif, .webp"
                        disabled={uploading}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 disabled:cursor-not-allowed"
                      />
                      <label
                        htmlFor="customer-photo"
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-xs w-full sm:w-auto cursor-pointer ${
                          uploading
                            ? "bg-slate-400 cursor-not-allowed"
                            : "bg-[#2563EB] hover:bg-blue-700 active:scale-95"
                        }`}
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>
                              {previewUrl ? "Change Photo" : "Upload Photo"}
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* -------------------------------------------------------- */}
                {/* SECTION 2: ACCOUNT SECURITY                             */}
                {/* -------------------------------------------------------- */}
                <div>
                  <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span>Account Security</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        name="password"
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full h-12 pl-10 pr-12 bg-white border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-slate-400 transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      Must be at least 6 characters with letters and numbers.
                    </p>
                  </div>
                </div>

                {/* -------------------------------------------------------- */}
                {/* SUBMIT BUTTON                                            */}
                {/* -------------------------------------------------------- */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={uploading || isSubmitting}
                    className="w-full h-[52px] rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create My Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>

                {/* -------------------------------------------------------- */}
                {/* TRUST MESSAGE                                            */}
                {/* -------------------------------------------------------- */}
                <div className="flex items-center justify-center gap-2 text-xs text-[#64748B] pt-1 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your information is securely handled and used only to create
                    your account.
                  </span>
                </div>

                {/* -------------------------------------------------------- */}
                {/* LOGIN LINK                                               */}
                {/* -------------------------------------------------------- */}
                <p className="text-center text-sm text-[#64748B] pt-2">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#2563EB] font-bold hover:underline transition"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CustomerSignUp;
