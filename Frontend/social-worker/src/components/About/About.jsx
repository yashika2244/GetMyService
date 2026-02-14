import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const About = () => {
  return (
    <section className="flex  py-12 px-4 bg-white">
      <div className="w-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT – IMAGE */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/aboutimage.png"
            alt="About Us"
            className="w-full max-w-md rounded-lg  object-cover"
          />
        </div>

        {/* RIGHT – CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="uppercase text-sm tracking-widest text-blue-600 font-semibold">
            About Us
          </p>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            4 Years of Expertise <br />
            <span className="text-blue-600">in Professional Services</span>
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed">
            We connect you with trusted professionals delivering quality
            services with reliability, transparency, and care.
          </p>

          {/* Points */}
          <ul className="mt-6 space-y-3">
            {[
              "Verified & Trusted Professionals",
              "Award-Winning Service Experience",
              "Dedicated Support for Every Customer",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <span className="bg-blue-100 text-blue-600 p-1 rounded-full flex items-center justify-center">
                  <Check size={16} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-md"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
