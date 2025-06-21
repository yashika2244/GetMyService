
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { toast } from "react-toastify";
import goodJob from "../../assets/goodJob.jpg";
import { useAuth, useAccounts } from "../../context/AppContext";
import useConversation from "../../stateManage/useConversation";
import { BASE_URL } from "../../config";
import { FaUserEdit } from "react-icons/fa";

const ServicerAccount = () => {
  const { user, dispatch } = useAuth();
  const { accounts } = useAccounts();
  const { setSelcetedConversation } = useConversation();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        toast.success("Logout Successfully");
        navigate("/");
      } else {
        toast.error("Logout failed. Try again.");
      }
    } catch {
      toast.error("Error during logout.");
    }
  };

  const aboutText = user.about || "No description available";
  const shortText = aboutText.slice(0, 270);

  const totalExperience = user.experience
    ?.reduce((sum, exp) => {
      const start = new Date(exp.startdate);
      const end = new Date(exp.enddate);
      return sum + Math.abs(end - start) / (1000 * 60 * 60 * 24 * 365);
    }, 0)
    .toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-r md:mt-15 mt-12 from-gray-50 to-blue-50 md:py-10 md:px-4 px-3 flex flex-col items-center">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-5xl p-8 flex flex-col md:flex-row items-center gap-10">
        <img
          src={user.photo || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-md"
        />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2 justify-center md:justify-start">
            {user.name} <MdOutlineVerified className="text-purple-600" />
          </h1>
          <p className="text-gray-500 mt-1 text-sm flex items-center gap-1 justify-center md:justify-start">
            <FaLocationDot /> {user.location || "Location not specified"}
          </p>

        

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">About</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {expanded ? aboutText : shortText}
              {aboutText.length > 270 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="ml-2 text-blue-500 text-xs hover:underline"
                >
                  {expanded ? "See less" : "See more"}
                </button>
              )}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Experience
            </h2>
            <p className="text-gray-600 text-sm">{totalExperience} years</p>
          </div>

         
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate(`/update_service/${user._id}`)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition-all duration-300"
            >
              <FaUserEdit className="inline mr-2" /> Edit Profile
            </button>

            <button
              onClick={logoutHandler}
              className="px-6 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Similar Professionals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts
            .filter((profile) => profile._id !== user._id)
            .map((profile) => (
              <div
                key={profile._id}
                className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center hover:shadow-xl transition"
              >
                <img
                  src={profile.photo || "https://via.placeholder.com/100"}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-200"
                />
                <p
                  onClick={() => navigate(`/Service-profile/${profile._id}`)}
                  className="text-blue-600 font-semibold cursor-pointer hover:underline text-center"
                >
                  {profile.name}
                </p>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {profile.about || "No details"}
                </p>
                <button
                  onClick={() => {
                    setSelcetedConversation(profile);
                    navigate("/msg");
                  }}
                  className="mt-3 px-4 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600"
                >
                  Message
                </button>
              </div>
            ))}
          {accounts.length <= 1 && (
            <p className="text-sm text-gray-500">No other profiles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicerAccount;
