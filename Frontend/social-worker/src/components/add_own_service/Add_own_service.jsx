import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AddServiceSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-24 px-6 md:px-16">
      {/* Decorative Blurs */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-purple-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            Grow with Us
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Add Your{" "}
            <span className="bg-blue-800 bg-clip-text text-transparent">
              Own Service
            </span>
          </h2>

          <p className="max-w-lg text-gray-600 text-base md:text-lg">
            Share your skills, reach more people, and start helping others by offering services tailored to your expertise.
          </p>

          {/* CTA Card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="max-w-sm rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-xl backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-gray-900">Create Your Service</h3>
            <p className="mt-2 text-sm text-gray-600">
              It only takes a minute to list your service and start receiving requests.
            </p>
            <button
              onClick={() => navigate("/register-service-provider")}
              className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Add Service
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 -rotate-6 rounded-3xl  opacity-30 blur-2xl" />
            <img
              src="/images/addyourservice.png"
              alt="Add Service Illustration"
              className="relative w-96 md:w-[550px] rounded-3xl "
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
