import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaUtensils, FaUserMd, FaHome } from "react-icons/fa";
import star from "./../../assets/Star.png";

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* Icon selector */
const getServiceIcon = (specialization = "", name = "") => {
  const text = `${specialization} ${name}`.toLowerCase();

  if (text.includes("food")) return <FaUtensils />;
  if (text.includes("doctor")) return <FaUserMd />;
  if (text.includes("home")) return <FaHome />;

  return <FaHome />;
};

const Beset_s_card = ({ service }) => {
  const navigate = useNavigate();

  const {
    _id,
    name,
    avgRating,
    totalRating,
    photo,
    specialization,
    totalservice,
  } = service;

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -8 }}
      className="relative group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={
            photo ||
            "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
          }
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* SERVICE ICON */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-full shadow-lg text-blue-600 text-xl">
          {getServiceIcon(specialization, name)}
        </div>

        {/* RATING */}
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow">
          <img src={star} alt="star" className="w-4 h-4" />
          <span className="text-sm font-semibold">{avgRating || 4.8}</span>
          <span className="text-xs text-gray-500">({totalRating || 120})</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900">{name}</h2>

        <span className="inline-block mt-3 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
          {specialization || "Professional Service"}
        </span>

        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          Trusted professionals delivering quality service with reliability.
        </p>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => navigate(`/service-profile/${_id}`)}
            className="flex items-center gap-2 text-blue-600 font-semibold text-sm"
          >
            Learn more
            <span className="bg-blue-600 text-white p-1 rounded-full">
              <BsArrowRight />
            </span>
          </button>

          <span className="text-sm text-gray-500">
            {totalservice || 1500}+ Services
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[3px] w-full 
        bg-gradient-to-r from-blue-600 to-blue-400
        scale-x-0 origin-left transition-transform duration-300 
        group-hover:scale-x-100"
      />
    </motion.div>
  );
};

export default Beset_s_card;
