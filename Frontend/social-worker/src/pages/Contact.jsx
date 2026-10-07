import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Tag,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Headphones,
  Check,
  Copy,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Contact() {
  const formRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\s\-()]{7,18}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields properly.");
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      setIsSubmitted(true);
      toast.success("Thank you! Your message has been sent successfully.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch {
      toast.error("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy to clipboard helper
  const handleCopy = (text, itemKey) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(itemKey);
    setTimeout(() => setCopiedItem(null), 2000);
    toast.info(`Copied "${text}" to clipboard`);
  };

  // Scroll to form helper for CTA
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const contactInfo = [
    {
      id: "phone",
      icon: Phone,
      title: "Phone Support",
      value: "+1 (555) 234-5678",
      subtext: "Mon-Fri from 9:00 AM - 10:00 PM EST",
      actionText: "Call us",
      actionHref: "tel:+15552345678",
      copyable: "+1 (555) 234-5678",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      id: "email",
      icon: Mail,
      title: "Email Inquiries",
      value: "support@getmyservice.com",
      subtext: "Average response time: under 2 hours",
      actionText: "Send email",
      actionHref: "mailto:support@getmyservice.com",
      copyable: "support@getmyservice.com",
      badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      id: "address",
      icon: MapPin,
      title: "Headquarters",
      value: "2464 Royal Ln, Mesa",
      subtext: "New Jersey 45463, United States",
      actionText: "View on map",
      copyable: "2464 Royal Ln, Mesa, New Jersey 45463",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      id: "hours",
      icon: Clock,
      title: "Working Hours",
      value: "Mon - Sat: 9 AM - 10 PM",
      subtext: "Sunday: Closed (Emergency on-call only)",
      badgeColor: "bg-sky-50 text-sky-600 border-sky-100",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pt-24 pb-20 overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 w-[750px] h-[350px] bg-gradient-to-b from-blue-100/50 via-blue-50/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 sm:mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 uppercase tracking-wider mb-4 shadow-2xs">
              <Headphones className="w-3.5 h-3.5 text-blue-600" />
              We Are Here For You
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
          >
            Let's Get in <span className="text-blue-600">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Have a question or need help? Our team is here to assist you.
            Reach out via the form below or connect with our support specialists directly.
          </motion.p>
        </div>
      </section>

      {/* ================= 2. TWO-COLUMN MAIN SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: CONTACT INFORMATION */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            {/* Info Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block mb-2">
                Direct Channels
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                Contact Information
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Connect with our dedicated support representatives through any channel
                that suits your convenience.
              </p>

              {/* Info Items List */}
              <div className="mt-6 space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="group p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-blue-200 hover:shadow-xs transition-all duration-200 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-11 h-11 rounded-xl ${item.badgeColor} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {item.title}
                          </p>
                          <p className="text-sm font-bold text-slate-900 mt-0.5">
                            {item.value}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.subtext}
                          </p>
                        </div>
                      </div>

                      {/* Copy Action button if available */}
                      {item.copyable && (
                        <button
                          type="button"
                          onClick={() => handleCopy(item.copyable, item.id)}
                          title="Copy to clipboard"
                          className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer shrink-0"
                        >
                          {copiedItem === item.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Service Level Highlights */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Rapid Response</span>
                </div>
              </div>
            </div>

            {/* Visual Help Desk Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 sm:p-7 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                    24/7 Client Helpdesk
                  </span>
                </div>
                <h3 className="text-lg font-bold">Need emergency service assistance?</h3>
                <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                  Our priority support specialists are available around the clock to help
                  coordinate immediate appointments and bookings.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm relative">
              <div className="mb-6">
                <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block mb-1">
                  Send A Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  How Can We Help You?
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              {/* SUCCESS BANNER */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-bold">Message sent successfully!</p>
                      <p className="mt-0.5 text-emerald-700">
                        Thank you for reaching out. One of our specialists will review your
                        inquiry and contact you shortly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* THE FORM */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border ${
                          errors.name
                            ? "border-red-400 bg-red-50/20 focus:border-red-500"
                            : "border-slate-200 focus:border-blue-500 focus:bg-white"
                        } outline-none focus:ring-2 focus:ring-blue-100 transition`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border ${
                          errors.email
                            ? "border-red-400 bg-red-50/20 focus:border-red-500"
                            : "border-slate-200 focus:border-blue-500 focus:bg-white"
                        } outline-none focus:ring-2 focus:ring-blue-100 transition`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border ${
                          errors.phone
                            ? "border-red-400 bg-red-50/20 focus:border-red-500"
                            : "border-slate-200 focus:border-blue-500 focus:bg-white"
                        } outline-none focus:ring-2 focus:ring-blue-100 transition`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Inquiry about electrician service"
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border ${
                          errors.subject
                            ? "border-red-400 bg-red-50/20 focus:border-red-500"
                            : "border-slate-200 focus:border-blue-500 focus:bg-white"
                        } outline-none focus:ring-2 focus:ring-blue-100 transition`}
                      />
                    </div>
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide details about your service question, booking request, or project requirements..."
                      className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 border ${
                        errors.message
                          ? "border-red-400 bg-red-50/20 focus:border-red-500"
                          : "border-slate-200 focus:border-blue-500 focus:bg-white"
                      } outline-none focus:ring-2 focus:ring-blue-100 transition resize-none`}
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                      isSubmitting
                        ? "bg-blue-400 cursor-wait"
                        : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 3. MAP / LOCATION SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
                Find Our Location
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-0.5">
                Our Central Service Hub
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                2464 Royal Ln, Mesa, New Jersey 45463 • Serving client networks nationwide
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Office Open Today
              </span>
            </div>
          </div>

          {/* Visually Attractive Location Showcase Container */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-slate-100 to-indigo-50 border border-slate-200/80 flex items-center justify-center">
            {/* Grid pattern aesthetic background */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#3b82f6 1px, transparent 1px), radial-gradient(#3b82f6 1px, #f8fafc 1px)",
                backgroundSize: "24px 24px",
                backgroundPosition: "0 0, 12px 12px",
              }}
            />

            {/* Decorative stylized map elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-blue-200/50 animate-ping opacity-25" />
              <div className="w-48 h-48 rounded-full border border-blue-300/40" />
            </div>

            {/* Central Pin Spotlight Card */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-slate-200 max-w-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                <MapPin className="w-6 h-6 animate-bounce" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">GetMyService Headquarters</h4>
              <p className="text-xs text-slate-600 mt-1">
                2464 Royal Ln, Mesa, New Jersey 45463
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
                <span>Free Visitor Parking</span>
                <span>•</span>
                <span>Wheelchair Accessible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. CTA SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Need Help?
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              We're Ready to Assist You
            </h3>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Reach out to us and we'll get back to you as soon as possible.
              Whether you need specialist recommendations or technical guidance, we're here.
            </p>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={scrollToForm}
                className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition flex items-center gap-2 cursor-pointer"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
