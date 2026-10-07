import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import Serviceslist from "../components/Services/Serviceslist";
import About from "../components/About/About";
import Best_s_list from "../components/Best-services/Best_s_list";
import Add_own_service from "../components/add_own_service/Add_own_service";
import Faqlist from "../components/faq/Faqlist";
import { motion } from "framer-motion";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";
import BestServicesShowcase from "../components/Home/BestServicesShowcase";
import ServiceDiscoverySection from "../components/Home/ServiceDiscoverySection";
import ExperienceAwaitsCTA from "../components/Home/ExperienceAwaitsCTA";

function Home() {
  let navigate = useNavigate();
  const getDetail = () => {
    navigate("/services");
  };

  const servicesProcess = [
    {
      title: "Find a Services",
      desc: "World-class care for everyone. Our service system offers unmatched expert service care.",
      img: "/images/package-delivery.png",
      link: "/services",
    },
    {
      title: "Find a Location",
      desc: "World-class care for everyone. Our service system offers unmatched expert service care.",
      img: "/images/icon02.png",
      link: "/services",
    },
    {
      title: "Book Appointment",
      desc: "World-class care for everyone. Our services system offers unmatched expert health care. Book Now!",
      img: "/images/icon03.png",
      link: "/msg",
    },
  ];

  return (
    <div>
      {/* Your Best Service Experience Awaits Section */}
      <ExperienceAwaitsCTA />
      {/* Providing The Best Services Section */}
      <BestServicesShowcase />
      {/* about serices */}
      <About />
      {/* Service Discovery Section */}
      <ServiceDiscoverySection />
      {/* Why choose us */}
      <WhyChooseUs />
      {/* Our Some Services Section */}
      <section className="relative py-16 md:py-10 bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden">
        {/* Decorative blur shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-indigo-200/40 rounded-full blur-3xl" />

        <div className="relative max-w-[1200px] mx-auto px-4">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="uppercase tracking-[0.25em] text-xs text-blue-600 font-semibold">
              Our Services
            </p>

            <h1 className="mt-3 font-extrabold text-[28px] md:text-[40px] text-gray-900 leading-tight">
              Some of Our <span className="text-blue-600">Best Services</span>
            </h1>

            {/* underline */}
            <div className="relative flex justify-center mt-4">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              <div className="absolute w-24 h-1 bg-blue-400 blur-md opacity-60" />
            </div>

            <p className="mt-6 text-gray-600 text-sm md:text-base max-w-[560px] mx-auto leading-relaxed">
              World class care for everyone. Our service system offers
              unmatched, expert services with trust, reliability, and
              compassion.
            </p>
          </motion.div>

          {/* Services list */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-2 flex justify-center"
          >
            <div
              className="w-full  bg-white/60 backdrop-blur-xl 
                      rounded-3xl p-3 md:p-6 shadow-lg border border-white"
            >
              <Serviceslist />
            </div>
          </motion.div>
        </div>
      </section>
      {/* other section */}
      <Add_own_service />
      {/*  faq section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/25 to-white overflow-hidden">
        {/* Subtle background ambient lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-sky-100/30 rounded-full blur-[100px] pointer-events-none -z-0" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 border border-blue-100 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>FAQ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#0B1E3A] tracking-tight leading-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Everything you need to know about our services and platform.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-[920px] mx-auto">
            <Faqlist />
          </div>

          {/* Contact Support Callout */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-6 py-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-xs sm:text-sm text-slate-600">
              <span className="font-medium text-slate-600">Still have questions about our services?</span>
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Contact our support team</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
