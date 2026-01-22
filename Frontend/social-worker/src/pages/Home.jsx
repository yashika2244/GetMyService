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

function Home() {
  let navigate = useNavigate();
  const getDetail = () => {
    navigate("/find-service");
  };

  const servicesProcess = [
    {
      title: "Find a Services",
      desc: "World-class care for everyone. Our service system offers unmatched expert service care.",
      img: "/images/package-delivery.png",
      link: "/find-Service",
    },
    {
      title: "Find a Location",
      desc: "World-class care for everyone. Our service system offers unmatched expert service care.",
      img: "/images/icon02.png",
      link: "/find-Service",
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
      <div className="bg-[#f9fbff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-28 flex flex-col lg:flex-row items-center gap-16">
          {/* LEFT CONTENT */}
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🌐 Top-Notch Services, Just For You
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your <span className="text-blue-600"> Best Service</span>{" "}
              Experience
              <br /> Awaits
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              placeat, aspernatur earum natus mollitia est molestias itaque
              minima neque.
            </p>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-5">
              <motion.button
                onClick={getDetail}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Services
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative w-full max-w-md h-[450px] md:flex justify-center items-end mt-10 hidden "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src="/images/heroimage.png"
              alt="Professional"
              className="relative z-10 w-[200px] md:w-[350px] object-cover rounded-full"
            />
          </motion.div>
        </div>
      </div>
      {/* process container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#E0F7FA] via-white to-[#F0F9FF] py-16">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-[1100px] px-6 text-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900">
              Providing The{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Best Services
              </span>
            </h1>
            <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto text-gray-600">
              World-class care for everyone. Our service system offers unmatched
              expert service care with a modern touch.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {servicesProcess.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group bg-white/80 backdrop-blur rounded-3xl p-6 md:p-8 
                     shadow-lg hover:shadow-2xl transition-all duration-300 
                     hover:-translate-y-2 flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center 
                       bg-gradient-to-br from-blue-500 to-teal-400 
                       shadow-lg mb-6 group-hover:scale-110 transition-transform"
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-10 h-10"
                  />
                </div>

                <h3 className="font-semibold text-lg md:text-xl text-gray-900 mb-2">
                  {service.title}
                </h3>

                <p className="text-sm md:text-[15px] text-gray-600 mb-6">
                  {service.desc}
                </p>

                {/* Arrow CTA */}
                <Link
                  to={service.link}
                  className="mt-auto inline-flex items-center gap-2 
                       text-blue-600 font-semibold text-sm 
                       group-hover:text-blue-700 transition"
                >
                  Learn More
                  <BsArrowRightCircle className="text-2xl transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* about serices */}
      <About />
      {/* out services section */};
      <section className="flex justify-center md:px-20 px-4 py-14 bg-[#ffffff]">
        <div className="w-full max-w-[1300px]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="uppercase text-sm tracking-widest text-blue-600 font-semibold"
              >
                Our Services
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-3xl font-semibold text-blue-600  mt-2"
              >
                All the Services You Need <br />
                <span className="text-gray-900">In One Trusted Platform</span>
              </motion.h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => navigate("/find-Service")}
              className="self-start md:self-center bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
            >
              Explore All Services
            </motion.button>
          </motion.div>

          {/* Cards */}
          <div className="mt-12">
            <Best_s_list />
          </div>
        </div>
      </section>
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
      <section className="relative bg-gradient-to-br from-[#0B1E3A] via-[#0E2A52] to-[#08162B] py-16 px-4 ">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest text-blue-300 uppercase mb-2">
              FAQs
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
              Frequently Asked Questions <br className="hidden md:block " />{" "}
              <span className="text-white">About Our Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* FAQ LIST */}
            <div className="lg:col-span-2 space-y-4">
              <Faqlist />
            </div>

            {/* Right Side Card */}
            <div
              className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl 
                bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 
                flex flex-col justify-between"
            >
              {/* Decorative Glow */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-300/20 rounded-full blur-3xl" />

              <div className="relative">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur 
                    flex items-center justify-center mb-5 text-2xl"
                >
                  💬
                </div>

                <h3 className="text-2xl font-bold mb-3 leading-snug">
                  You have different questions?
                </h3>

                <p className="text-sm text-blue-100 leading-6">
                  Our team will answer all your questions. We ensure a quick
                  response.
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => navigate("/contact")}
                className="relative mt-8 inline-flex items-center gap-2 
               bg-white text-blue-700 px-7 py-3 rounded-xl 
               font-semibold text-sm shadow-lg 
               transition-all duration-300 
               hover:scale-[1.05] hover:bg-blue-50"
              >
                Contact Us
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
