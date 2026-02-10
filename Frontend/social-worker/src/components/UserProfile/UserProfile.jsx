import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../../context/AppContext";
import { BASE_URL } from "../../config";
import useConversation from "../../stateManage/useConversation.js";
import { toast } from "react-toastify";
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { MdOutlineVerified, MdOutlineLogout } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { accounts } = useAccounts();
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const navigate = useNavigate();
  const { setSelcetedConversation } = useConversation();

  /* ---------------- SMOOTH MOTION CONFIG ---------------- */

  const smoothSpring = {
    type: "spring",
    stiffness: 70,
    damping: 18,
    mass: 0.6,
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: smoothSpring,
    },
  };

  const containerStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
  };

  /* ---------------- LOAD USER ---------------- */

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setBio(storedUser.bio || "");
    }
  }, []);

  /* ---------------- LOGOUT ---------------- */

  const logoutHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        localStorage.clear();
        window.location.href = "/";
        toast.success("Logged out successfully");
      } else toast.error("Logout failed");
    } catch {
      toast.error("Error during logout");
    }
  };

  /* ---------------- SAVE BIO ---------------- */

  const saveBio = () => {
    setUser((prev) => ({ ...prev, bio }));
    localStorage.setItem("user", JSON.stringify({ ...user, bio }));
    setEditingBio(false);
    toast.success("Bio updated");
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100"
    >
      {/* HEADER */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={smoothSpring}
        className="h-44 bg-gradient-to-r from-blue-100 to-blue-200 relative"
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-700 flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>

        {/* PROFILE IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={smoothSpring}
          className="absolute left-1/2 -translate-x-1/2 bottom-[-60px]"
        >
          <img
            src={user.photo || "https://via.placeholder.com/150"}
            className="w-32 h-32 rounded-full border-4 border-white shadow object-cover"
            alt="User"
          />
        </motion.div>
      </motion.div>

      {/* PROFILE INFO */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto mt-20 text-center px-4"
      >
        <h2 className="text-2xl font-semibold flex justify-center items-center gap-2 text-gray-800">
          {user.name}
          <MdOutlineVerified className="text-blue-600" />
        </h2>

        <p className="text-gray-500 text-sm flex justify-center items-center gap-1 mt-1">
          <FaLocationDot /> {user.location || "No location"}
        </p>

        <div className="flex justify-center gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/update_user/${user._id}`)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow"
          >
            <FaUserEdit className="inline mr-1" /> Edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={logoutHandler}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 shadow"
          >
            <MdOutlineLogout className="inline mr-1" /> Logout
          </motion.button>
        </div>
      </motion.div>

      {/* ABOUT */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto mt-6 bg-white rounded-2xl shadow p-6"
      >
        <h3 className="text-lg font-semibold text-blue-700 mb-2">About</h3>

        {editingBio ? (
          <>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              rows="4"
            />

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setEditingBio(false)}
                className="px-4 py-1 bg-gray-100 rounded"
              >
                Cancel
              </button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={saveBio}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600">{bio || "No bio added yet."}</p>
            <button
              onClick={() => setEditingBio(true)}
              className="text-blue-600 mt-2 hover:underline"
            >
              Edit Bio
            </button>
          </>
        )}
      </motion.div>

      {/* SERVICE PROFILES */}
      <div className="max-w-5xl mx-auto mt-8 px-4 pb-10">
        <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
          More Service Profiles
        </h3>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {accounts
            .filter((p) => p._id !== user._id)
            .map((p) => (
              <motion.div
                key={p._id}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-lg transition"
              >
                <img
                  src={p.photo || "https://via.placeholder.com/100"}
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                  alt={p.name}
                />

                <p
                  onClick={() => navigate(`/Service-profile/${p._id}`)}
                  className="mt-2 font-medium cursor-pointer hover:text-blue-600"
                >
                  {p.name}
                </p>

                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {p.about || "No details"}
                </p>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setSelcetedConversation(p);
                    navigate("/msg");
                  }}
                  className="mt-3 px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  Message
                </motion.button>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default UserProfile;
