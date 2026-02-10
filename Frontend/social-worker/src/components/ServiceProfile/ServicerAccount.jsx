import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAuth, useAccounts } from "../../context/AppContext";
import useConversation from "../../stateManage/useConversation";
import { BASE_URL } from "../../config";
import { FaUserEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const ServicerAccount = () => {
  const { user, dispatch } = useAuth();
  const { accounts } = useAccounts();
  const { setSelcetedConversation } = useConversation();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  /* ---------- Smooth Motion Settings ---------- */

  const smooth = {
    type: "spring",
    stiffness: 60,
    damping: 18,
    mass: 0.6,
  };

  const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const slideUp = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: smooth,
  };

  const staggerParent = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const staggerChild = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: smooth },
  };

  /* ---------- Logout ---------- */

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
    <motion.div
      {...fade}
      className="min-h-screen bg-gray-100 md:mt-14 mt-12 px-3 py-6 flex justify-center"
    >
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">
        {/* ---------- LEFT PANEL ---------- */}
        <motion.div
          {...slideUp}
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-6 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50"></div>

          <div className="relative flex flex-col items-center text-center">
            <motion.img
              src={user.photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover shadow-md ring-4 ring-white"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
            />

            <h2 className="mt-3 text-lg font-semibold text-gray-800 flex items-center gap-1">
              {user.name}
              <MdOutlineVerified className="text-blue-500" />
            </h2>

            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <FaLocationDot /> {user.location || "Location not specified"}
            </p>

            <div className="mt-4 w-full grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg py-2">
                <p className="text-xs text-gray-500">Experience</p>
                <p className="font-semibold text-gray-700">
                  {totalExperience} yrs
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg py-2">
                <p className="text-xs text-gray-500">Profile</p>
                <p className="font-semibold text-gray-700">Active</p>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 my-5"></div>

            <div className="w-full flex flex-col gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={() => navigate(`/update_service/${user._id}`)}
                className="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                <FaUserEdit className="inline mr-1" />
                Edit Profile
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={logoutHandler}
                className="w-full py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ---------- RIGHT PANEL ---------- */}
        <motion.div
          {...slideUp}
          transition={{ ...smooth, delay: 0.05 }}
          className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            About Professional
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            {expanded ? aboutText : shortText}
            {aboutText.length > 270 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="ml-2 text-blue-600 text-xs hover:underline"
              >
                {expanded ? "See less" : "See more"}
              </button>
            )}
          </p>

          <div className="my-6 h-[1px] bg-gray-200 rounded"></div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Similar Professionals
          </h3>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {accounts
              .filter((profile) => profile._id !== user._id)
              .map((profile) => (
                <motion.div
                  key={profile._id}
                  variants={staggerChild}
                  whileHover={{ y: -2 }}
                  className="bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={profile.photo || "https://via.placeholder.com/100"}
                      alt={profile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <p
                        onClick={() =>
                          navigate(`/Service-profile/${profile._id}`)
                        }
                        className="text-sm font-semibold cursor-pointer hover:text-blue-600"
                      >
                        {profile.name}
                      </p>

                      <p className="text-xs text-gray-500 line-clamp-1">
                        {profile.about || "No details"}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => {
                      setSelcetedConversation(profile);
                      navigate("/msg");
                    }}
                    className="mt-2 w-full py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Message
                  </motion.button>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicerAccount;
