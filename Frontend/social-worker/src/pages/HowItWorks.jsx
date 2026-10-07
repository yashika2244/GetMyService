import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Search,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Lock,
  ThumbsUp,
  Star,
  Users,
  Compass,
} from "lucide-react";

const stepsData = [
  {
    step: "01",
    id: 1,
    title: "Create Your Account",
    subtitle: "Quick & effortless registration",
    description:
      "Sign up in less than a minute as a customer or service specialist. Complete your profile to get personalized recommendations tailored to your exact needs.",
    icon: UserPlus,
    badge: "Step 1 • Getting Started",
    highlights: [
      "Select your role (Customer or Service Provider)",
      "Add location and contact preferences",
      "Instant access to full directory and messaging",
    ],
    tip: "Pro Tip: Adding your specific location helps us match you with nearby specialists instantly.",
  },
  {
    step: "02",
    id: 2,
    title: "Find the Right Service",
    subtitle: "Explore verified professionals",
    description:
      "Use our smart search and intuitive filters to find trusted specialists by category, rating, location, and specialization. View transparent rates and past portfolio work.",
    icon: Search,
    badge: "Step 2 • Smart Discovery",
    highlights: [
      "Filter by category, price, and customer rating",
      "Inspect verified credentials and past portfolios",
      "Compare transparent hourly and service rates",
    ],
    tip: "Pro Tip: Review verified customer feedback to find specialists with proven experience in your task.",
  },
  {
    step: "03",
    id: 3,
    title: "Connect & Book",
    subtitle: "Direct real-time communication",
    description:
      "Chat directly with service providers through our built-in messaging platform. Discuss project specifics, agree on deliverables, and schedule convenient timings.",
    icon: MessageSquare,
    badge: "Step 3 • Seamless Connection",
    highlights: [
      "Live one-on-one chat with zero intermediaries",
      "Clarify project scope, deadlines, and pricing upfront",
      "Lock in your preferred date and time slot",
    ],
    tip: "Pro Tip: Share any specific requirements or photos in chat so the specialist can prepare in advance.",
  },
  {
    step: "04",
    id: 4,
    title: "Get the Job Done",
    subtitle: "Quality service delivered",
    description:
      "Your chosen specialist delivers top-tier work with professionalism and precision. Once the job is completed to your satisfaction, leave a review to support the community.",
    icon: CheckCircle2,
    badge: "Step 4 • Smooth Completion",
    highlights: [
      "Professional service execution backed by trusted experts",
      "Verify completion before final sign-off",
      "Rate and review your experience to guide others",
    ],
    tip: "Pro Tip: Honest reviews help top service providers grow and assist other customers in making informed choices.",
  },
];

const benefitsData = [
  {
    icon: ShieldCheck,
    title: "100% Verified Specialists",
    description:
      "Every service provider profile is vetted with verified credentials, skills, and real client reviews for maximum trust.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Award,
    title: "Transparent Upfront Rates",
    description:
      "No hidden fees or unexpected surcharges. Review clear pricing, consultation costs, and service packages before you reach out.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    icon: Zap,
    title: "Direct Real-Time Chat",
    description:
      "Connect instantly with providers using our built-in messaging portal to discuss custom details and agree on requirements.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    icon: Clock,
    title: "Fast & Reliable Turnaround",
    description:
      "Book available time slots that fit your schedule. Get prompt responses and reliable on-time service delivery every time.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
];

const faqData = [
  {
    question: "Is it free to sign up and browse services?",
    answer:
      "Yes, absolutely! Creating an account and browsing all services, categories, and specialist profiles is 100% free with no subscription required.",
  },
  {
    question: "How do I choose the best specialist for my task?",
    answer:
      "You can filter specialists by specific expertise, location, and rating. Read detailed customer reviews and view past work to choose the specialist that best matches your project.",
  },
  {
    question: "Can I communicate directly with the provider before booking?",
    answer:
      "Yes! Our built-in messaging system allows you to chat directly with service providers to clarify requirements, estimate timelines, and confirm pricing before agreeing on the job.",
  },
  {
    question: "Can I also sign up as a service provider?",
    answer:
      "Certainly. When registering, simply select 'Service Provider' to create your business profile, list your skills, set your rates, and start receiving inquiries from clients.",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const selectedStepData = stepsData[activeStep];
  const StepIcon = selectedStepData.icon;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pt-24 pb-20 overflow-hidden">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[700px] h-[350px] bg-gradient-to-b from-blue-100/60 via-blue-50/30 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 uppercase tracking-wider mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Effortless Platform Guide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]"
          >
            How It <span className="text-blue-600">Works</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            From finding the right certified specialist to getting quality work completed,
            discover our transparent, 4-step process designed for a hassle-free experience.
          </motion.p>

          {/* Key Value Micro-Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>4 Simple Steps</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Zero Service Fees</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. 4-STEP PROCESS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
            Step-by-Step Walkthrough
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Your Journey in Four Simple Steps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Click on any step below to explore what happens and see best practice tips.
          </p>
        </div>

        {/* DESKTOP HORIZONTAL TIMELINE STEPPER (lg+ screens) */}
        <div className="hidden lg:block mb-12">
          <div className="relative">
            {/* Connecting Base Line */}
            <div className="absolute top-7 left-12 right-12 h-1 bg-slate-200 -z-0 rounded-full" />
            
            {/* Dynamic Active Progress Line */}
            <motion.div
              className="absolute top-7 left-12 h-1 bg-blue-600 -z-0 rounded-full"
              initial={false}
              animate={{
                width: `${(activeStep / (stepsData.length - 1)) * (100 - 12)}%`,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Stepper Nodes */}
            <div className="grid grid-cols-4 gap-6 relative z-10">
              {stepsData.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeStep === index;
                const isPassed = activeStep > index;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveStep(index)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none transition-transform"
                  >
                    {/* Circle Node Indicator */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 shadow-md ${
                        isActive
                          ? "bg-blue-600 text-white ring-4 ring-blue-100 scale-110"
                          : isPassed
                          ? "bg-blue-600 text-white"
                          : "bg-white text-slate-500 border-2 border-slate-300 group-hover:border-blue-400 group-hover:text-blue-600"
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <span>{item.step}</span>
                      )}
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="mt-4">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider block transition-colors ${
                          isActive
                            ? "text-blue-600"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        Step {item.step}
                      </span>
                      <h3
                        className={`mt-1 text-base font-bold transition-colors ${
                          isActive
                            ? "text-[#0F172A]"
                            : "text-slate-700 group-hover:text-blue-600"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-2 max-w-[200px] mx-auto">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET VERTICAL STEPPER (sm/md screens) */}
        <div className="block lg:hidden mb-8">
          <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {stepsData.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeStep === index;
              const isPassed = activeStep > index;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveStep(index)}
                  className={`relative cursor-pointer p-4 rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? "bg-white border-blue-500 shadow-md ring-2 ring-blue-100"
                      : "bg-white/80 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {/* Step Marker on Connector Line */}
                  <div
                    className={`absolute -left-[37px] top-4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white ring-4 ring-blue-100"
                        : isPassed
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-600 border border-slate-300"
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4 text-white" /> : item.step}
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                          Step {item.step}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-semibold">
                            Viewing
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE STEP SPOTLIGHT CARD (Modern Showcase) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Background accent badge */}
            <div className="absolute -right-8 -top-8 w-44 h-44 bg-blue-50/80 rounded-full -z-0 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {selectedStepData.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                      {selectedStepData.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-4">
                  {selectedStepData.description}
                </p>

                {/* Key Checklist Highlights */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    What happens in this step:
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedStepData.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Tip Box */}
                <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs sm:text-sm text-blue-900">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p>{selectedStepData.tip}</p>
                </div>
              </div>

              {/* Right Column: Visual Dashboard Card */}
              <div className="lg:col-span-5 bg-slate-50/90 rounded-2xl p-6 border border-slate-200/80">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Step {selectedStepData.step} of 04
                  </span>
                </div>

                {/* Dynamic Visual Mock for each step */}
                {activeStep === 0 && (
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          1
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Customer Account</p>
                          <p className="text-[11px] text-slate-500">Book services & message experts</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          2
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Service Provider Account</p>
                          <p className="text-[11px] text-slate-500">Offer your skills & earn money</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/cutomer-register")}
                      className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Register Free Account
                    </button>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>Search & Filters</span>
                        <span className="text-blue-600">Active</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold">
                          All Categories
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px]">
                          ⭐ 4.5+ Rating
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px]">
                          Verified Only
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                          Pro
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Verified Specialist</p>
                          <p className="text-[11px] text-slate-500">Rating 4.9 (120+ jobs)</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">Available</span>
                    </div>
                    <button
                      onClick={() => navigate("/services")}
                      className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                    >
                      <Search className="w-3.5 h-3.5" />
                      Browse Services Catalog
                    </button>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span>Direct Chat Portal</span>
                      </div>
                      <div className="space-y-2 text-[11px]">
                        <div className="bg-slate-100 p-2 rounded-lg text-slate-700 max-w-[85%]">
                          "Hello! Can you help with electrical rewiring this Saturday?"
                        </div>
                        <div className="bg-blue-600 text-white p-2 rounded-lg ml-auto max-w-[85%]">
                          "Hi there! Yes, I am available at 10 AM. Let me share the estimate."
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/services")}
                      className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Find Specialist to Message
                    </button>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Job Successfully Completed</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-slate-600 text-[11px] font-semibold ml-1">5.0</span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic">
                        "Exceptional quality, on-time arrival and transparent rates!"
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/services")}
                      className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      Explore All Categories
                    </button>
                  </div>
                )}

                {/* Step navigation buttons */}
                <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-200/80 text-xs">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className={`font-semibold cursor-pointer ${
                      activeStep === 0
                        ? "text-slate-300 cursor-not-allowed"
                        : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    ← Previous Step
                  </button>
                  <button
                    disabled={activeStep === stepsData.length - 1}
                    onClick={() =>
                      setActiveStep((prev) => Math.min(stepsData.length - 1, prev + 1))
                    }
                    className={`font-semibold cursor-pointer ${
                      activeStep === stepsData.length - 1
                        ? "text-slate-300 cursor-not-allowed"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ================= 3. WHY CHOOSE US BENEFITS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
            Platform Advantages
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Why Choose Our Service Network?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            We bridge the gap between clients and verified professionals with trust,
            transparency, and speed at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsData.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${benefit.bg} ${benefit.border} border flex items-center justify-center mb-5 shrink-0`}
                >
                  <Icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Stats Strip */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">99%</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Client Satisfaction
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">100%</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Verified Profiles
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-sky-600">&lt; 15 min</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Avg. Response Time
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">0%</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Hidden Platform Fees
            </p>
          </div>
        </div>
      </section>

      {/* ================= 4. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
            Got Questions?
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Everything you need to know about navigating and using our platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-blue-600 transition"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 5. CALL TO ACTION (CTA) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-8 sm:p-14 overflow-hidden shadow-xl text-center">
          {/* Subtle geometric circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              Get Started Today
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Ready to Get Started?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl mx-auto">
              Join thousands of happy customers finding top-rated specialists, or create a
              provider profile to offer your services today.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/services")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-50 font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate("/cutomer-register")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-800/60 hover:bg-blue-800/80 text-white font-semibold text-sm border border-white/25 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Your Account</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
