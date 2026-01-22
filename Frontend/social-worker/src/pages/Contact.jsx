import React from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative mt-20 mb-24 px-3 md:px-6">
      {/* Decorative background */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto ">
          
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-5 md:p-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
              Contact Us
            </h2>
            <p className="text-gray-600 text-center mt-2 max-w-sm mx-auto text-sm">
              Have a question or feedback? Fill the form and we’ll reach out soon.
            </p>

            <form className="space-y-5 mt-6">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={16} />
                  <textarea
                    rows={4}
                    placeholder="Write your message here..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
                  />
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold shadow-md"
                >
                  <Send size={16} />
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="hidden lg:flex justify-center"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg max-w-md">
              <img
                src="/images/contact.png"
                alt="Contact illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
