import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import { authContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { motion } from "framer-motion";

function UpdateUser() {
  const { user, token, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    gender: "",
    role: "patient",
    bloodType: "",
    age: "",
    location: "",
  });

  const [previewSrc, setPreviewSrc] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        photo: user.photo || null,
        gender: user.gender || "",
        role: user.role || "patient",
        bloodType: user.bloodType || "",
        age: user.age || "",
        location: user.location || "",
      });
      setPreviewSrc(user.photo || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageUploading(true);
      try {
        const data = await uploadImageToClodinary(file);
        setFormData((prev) => ({ ...prev, photo: data.url }));
        setPreviewSrc(data.url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Image upload failed.");
      } finally {
        setImageUploading(false);
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setUpdatingProfile(true);

    try {
      const res = await fetch(`${BASE_URL}/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile.");

      dispatch({ type: "UPDATE_USER", payload: data.updatedUser });
      toast.success("Profile updated successfully!");
      navigate(`/User-profile/${user._id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdatingProfile(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 via-[#f8fbff] to-blue-100 flex justify-center px-4"
    >
      <div className="w-full max-w-3xl mt-20">
        {/* Desktop Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex fixed top-20 left-6 items-center gap-2 z-50
        bg-white/90 backdrop-blur-md border border-blue-100
        px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition group cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            Back to Profile
          </span>
        </motion.div>

        {/* Mobile Back */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden sticky top-3 z-40 px-3 mb-2"
          onClick={() => navigate(-1)}
        >
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-blue-100 px-3 py-2 rounded-xl shadow-sm cursor-pointer">
            <FaArrowLeft size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Back to Profile
            </span>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-blue-100 p-7"
        >
          {/* Profile Photo */}
          <div className="flex flex-col items-center mb-7">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <FaUserCircle className="w-28 h-28 text-gray-300" />
              )}

              <div className="absolute inset-0 rounded-full ring-2 ring-blue-200"></div>
            </motion.div>

            <label className="mt-4 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 transition">
              {imageUploading ? "Uploading..." : "Change profile photo"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={submitHandler}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06 },
              },
            }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <MotionInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <MotionInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <MotionInput
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
              />
              <MotionInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />

              <motion.div variants={inputAnim}>
                <label className="text-sm text-gray-600">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </motion.div>
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={updatingProfile}
              className={`w-full py-3 rounded-xl text-white font-medium transition ${
                updatingProfile
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow hover:shadow-lg"
              }`}
            >
              {updatingProfile ? "Updating Profile..." : "Save Changes"}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* Reusable Input */
const inputAnim = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const MotionInput = ({ label, ...props }) => (
  <motion.div variants={inputAnim}>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      required
    />
  </motion.div>
);

export default UpdateUser;
