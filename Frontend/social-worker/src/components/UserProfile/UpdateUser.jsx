
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import { authContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

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

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      dispatch({ type: "UPDATE_USER", payload: data.updatedUser });
      toast.success("Profile updated successfully!");
      // navigate(`/update_user/${data.updatedUser._id}`);
      navigate(`/User-profile/${user._id}`)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdatingProfile(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl p-8 mt-10">
        <div className="flex  gap-5 md:gap-30 ">
          <FaArrowLeft
            className="text-xl  md:ml-3 md:mb-0 mt-2 "
            // onClick={() => navigate("/chat", { state: { name, photo, id } })}
            onClick={() => navigate(-1)}
          />

          <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
            Update Your Profile
          </h2>
        </div>

        <div className="flex flex-col items-center mb-6">
          {previewSrc ? (
            <img
              src={previewSrc}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}

          <label className="mt-3 cursor-pointer relative inline-block text-white font-medium bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition">
            {imageUploading ? "Uploading..." : "Change Picture"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="p-3 rounded-md border  border-gray-300  focus:ring-1 focus:ring-sky-300 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="p-3 rounded-md border  border-gray-300  focus:ring-1 focus:ring-sky-300 outline-none"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              required
              className="p-3 rounded-md border  border-gray-300  focus:ring-1 focus:ring-sky-300 outline-none"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="p-3 rounded-md border  border-gray-300  focus:ring-1 focus:ring-sky-300 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="p-3 rounded-md border  border-gray-300  text-gray-700 bg-white focus:ring-1 focus:ring-sky-300 outline-none"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={updatingProfile}
            className={`w-full py-3 text-white font-semibold rounded-md transition ${
              updatingProfile
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {updatingProfile ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
