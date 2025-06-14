// import React from 'react';
import React from "react";
import star from "./../../assets/Star.png";
import { useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";

const beset_s_card = ({ service }) => {


  const navigate = useNavigate();
  const {
    _id,
    name,
    avgRating,
    totalRating,
    photo,
    specialization,
    totalservice,
    location,
  } = service;


  return (
    <div className=" p-2 bg-gradient-to-b  from-white to-gray-100 shadow-xl rounded-2xl transition-transform   transform hover:scale-105 hover:shadow-2xl duration-300 border border-gray-200">
      <div className="overflow-hidden md:h-[250px] rounded-lg">
        <img
          src={photo ||  "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
          alt={name}
          className="w-full md:h-full  object-cover rounded-lg hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* service Info */}
      <h2 className="md:text-2xl text-lg font-bold text-gray-900 mt- ">
        {name}
      </h2>

      <div className="flex items-center justify-between mt-1">
        <span className="bg-blue-500 text-white py-0 md:py-1 px-1 md:px-4 md:text-sm text-[10px] rounded-md md:rounded-full font-semibold shadow-md">
          {specialization}
        </span>
        <div className="flex items-center gap-1 md:gap-2 text-yellow-500">
          <img src={star} alt="rating" className="md:w-5 md:h-5 h-[10px] " />
          <span className=" md:text-lg text-[12px] font-bold">{ avgRating || 4.8}</span>
          <span className="text-gray-500  text-[12px] text-sm">
            ({totalRating || 4.8})
          </span>
        </div>
      </div>

      {/* Patients & Hospital Info */}
      <div className="flex items-center justify-between mt-2">
        <div>
          <h3 className="md:text-lg text-[15px] font-semibold text-gray-900">
            {totalservice}  1500 Services
          </h3>
          <p className="md:text-sm text-[10px] text-gray-600">At {location}</p>
        </div>
        <button
          onClick={() => navigate(`/service-profile/${_id}`)}
          className="flex items-center justify-center group"
        >
          <BsArrowRightCircle className="text-4xl text-blue-500 group-hover:text-white group-hover:bg-blue-600 rounded-full transition-all duration-300 p-1 shadow-md transform group-hover:scale-110" />
        </button>
      </div>

      {/* added own service */}
    </div>
  );
};
export default beset_s_card;
