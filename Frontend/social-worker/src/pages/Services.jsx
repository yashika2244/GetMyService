import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Serviceslist from "../components/Services/Serviceslist";
import Loading from "../components/Loading";
function Services() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2 sec

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-white py-16 md:py-24 overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute -top-20 -left-20 h-72 w-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 bg-indigo-200/30 rounded-full blur-3xl" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
      >
        <span className="inline-block mb-4 px-5 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
          Our Expertise
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800">
          Our <span className="text-blue-600">Premium Services</span>
        </h1>

        <p className="mt-5 text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          World-class care for everyone. Our service system offers unmatched,
          expert-level solutions tailored to your needs.
        </p>
      </motion.div>

      {/* Services / Loader */}
      <div className="relative z-10 mt-6 flex justify-center px-4">
        <div className="w-full max-w-6xl">
          {loading ? <Loading /> : <Serviceslist />}
        </div>
      </div>
    </section>
  );
}

export default Services;
