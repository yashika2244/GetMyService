import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import { authContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { FaCamera, FaUser, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";

function UpdateServicerProfile() {
  const { dispatch, token, user } = useContext(authContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    specialization: "",
    location: "",
    TicketPrice: "",
    expDateStart: "",
    expDateEnd: "",
    about: "",
    photo: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
      setPreviewSrc(user.photo);
    }
  }, [user]);

  /* ---------- Smooth Motion ---------- */

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await uploadImageToClodinary(file);
      setFormData({ ...formData, photo: data.url });
      setPreviewSrc(data.url);
      toast.success("Photo updated");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "UPDATE_USER", payload: data.service });
        toast.success("Profile Updated");
        navigate(`/servicer-account/${data.service._id}`);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <motion.div
      {...fade}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center py-10 px-4"
    >
      <motion.div
        {...slideUp}
        className="w-full max-w-5xl bg-white/90 backdrop-blur rounded-3xl shadow-xl overflow-hidden border border-gray-200"
      >
        {/* Top Gradient */}
        <div className="h-26 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200" />

        {/* Header */}
        <div className="px-8 -mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          {/* Avatar */}
          <div className="flex items-center gap-5">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <img
                src={previewSrc || "https://via.placeholder.com/120"}
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />

              <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
                <FaCamera className="text-white text-lg" />
                <input type="file" hidden onChange={handleFile} />
              </label>
            </motion.div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
              <p className="text-gray-500 text-sm">{formData.email}</p>
            </div>
          </div>

          {/* Save Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onClick={submitHandler}
            disabled={uploading}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 
            hover:from-blue-700 hover:to-indigo-800 text-white px-7 py-2.5 rounded-xl shadow-lg 
            font-semibold tracking-wide transition-all duration-300 cursor-pointer
            disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="relative flex items-center justify-center gap-2">
              {uploading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {uploading ? "Saving Changes..." : "Save Changes"}
            </span>
          </motion.button>
        </div>

        {/* Form */}
        <form className="p-8 space-y-6">
          <motion.div
            {...slideUp}
            transition={{ ...smooth, delay: 0.05 }}
            className="bg-gray-50 rounded-xl p-6 shadow-sm space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} icon={<FaUser />} />
              <Input label="Age" type="number" name="age" value={formData.age} onChange={handleChange} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
              <Input label="Location" name="location" value={formData.location} onChange={handleChange} icon={<FaMapMarkerAlt />} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Input label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} icon={<FaBriefcase />} />
              <Input label="Ticket Price" type="number" name="TicketPrice" value={formData.TicketPrice} onChange={handleChange} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Input label="Start Date" type="date" name="expDateStart" value={formData.expDateStart} onChange={handleChange} />
              <Input label="End Date" type="date" name="expDateEnd" value={formData.expDateEnd} onChange={handleChange} />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">About</label>
              <textarea
                rows={4}
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* Input */
function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      <div className="flex items-center border border-gray-200 rounded-lg bg-white px-3 focus-within:ring-2 focus-within:ring-blue-100">
        {icon && <span className="text-gray-400 mr-2">{icon}</span>}
        <input {...props} className="w-full py-2 outline-none bg-transparent" />
      </div>
    </div>
  );
}

/* Select */
function Select({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      <select
        {...props}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 outline-none"
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
    </div>
  );
}

export default UpdateServicerProfile;
