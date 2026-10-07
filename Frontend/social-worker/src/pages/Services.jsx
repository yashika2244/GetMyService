import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Zap,
  Award,
  X,
} from "lucide-react";
import Services_card from "../components/Services/Services_card";
import { useAccounts } from "../context/AppContext";

function Services() {
  const { accounts = [] } = useAccounts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Extract all unique specializations across accounts for the filter pills
  const categories = useMemo(() => {
    const set = new Set();
    accounts.forEach((acc) => {
      if (Array.isArray(acc.specialization)) {
        acc.specialization.forEach((spec) => {
          if (spec && typeof spec === "string" && spec.trim()) {
            set.add(spec.trim());
          }
        });
      }
    });
    return ["all", ...Array.from(set)];
  }, [accounts]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Verified Professional Network
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Find & Book <span className="text-blue-600">Top Services</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Discover verified specialists, compare transparent rates, and connect directly with qualified professionals for your home, commercial, and technical needs.
          </p>
        </motion.div>

        {/* 2. SEARCH & FILTER CONTROLS */}
        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services, skills, or locations (e.g. Electrician, Pune, React)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative w-full sm:w-auto shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-500 outline-none transition cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          {categories.length > 1 && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center overflow-x-auto no-scrollbar gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer capitalize ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat === "all" ? "All Services" : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. VALUE PROPOSITIONS */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 font-medium">
          <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/70 border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Verified Specialists</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/70 border border-slate-200 shadow-2xs">
            <Award className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Upfront Consultation Rates</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/70 border border-slate-200 shadow-2xs">
            <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Direct Client Messaging</span>
          </div>
        </div>
      </section>

      {/* 4. MAIN SERVICES GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Services_card
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
        />
      </main>
    </div>
  );
}

export default Services;
