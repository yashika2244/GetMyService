import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  // Motion Variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="flex justify-center py-16 px-4 bg-white">
      <motion.div
        className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        variants={container}
        initial="hidden"
        animate="show" // Animate on page load
      >
        {/* LEFT – IMAGE */}
        <motion.div
          className="relative flex justify-center"
          variants={fadeInScale}
        >
          <div className="overflow-hidden w-80 h-80 lg:w-[450px] lg:h-[450px] shadow-lg flex items-center justify-center rounded-lg">
            <img
              src="/images/whychoose.png"
              alt="Service Illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Decorative circle with pulse */}
          <motion.div
            className="absolute top-2 right-0 w-12 h-12 bg-blue-100 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
          ></motion.div>
        </motion.div>

        {/* RIGHT – CONTENT */}
        <div className="flex flex-col">
          <motion.p variants={fadeInUp} className="uppercase text-sm tracking-widest text-gray-500 font-medium">
            Why Choose Us
          </motion.p>

          <motion.h2 variants={fadeInUp} className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Benefits of Our Services: <br />
            <span className="text-blue-600">Your Path to Excellence</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="mt-4 text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeInUp} className="mt-6 flex gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">10+</p>
              <p className="text-gray-500 text-sm">Skilled Experts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">99%</p>
              <p className="text-gray-500 text-sm">Customer Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">20K+</p>
              <p className="text-gray-500 text-sm">Appointments Booked</p>
            </div>
          </motion.div>

          {/* Points */}
          <motion.ul variants={fadeInUp} className="mt-6 space-y-3">
            {[
              "Easy Online Appointment Booking",
              "Experienced & Caring Team",
              "Advanced Service Equipment",
            ].map((point, i) => (
              <motion.li
                key={i}
                variants={fadeInUp}
                className="flex items-center gap-3 text-gray-700"
              >
                <span className="bg-blue-100 text-blue-600 p-1 rounded-full flex items-center justify-center">
                  <Check size={16} />
                </span>
                {point}
              </motion.li>
            ))}
          </motion.ul>

          {/* Button */}
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-md"
          >
            Book an Appointment
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
