import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signup from "../../assets/signup.gif";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import imageCompression from "browser-image-compression";
 
function ServiceProviderSignUp() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    photo: "",
    specialization: "",
    experience: "",
    consultationFee: "",
    location: "",
    about: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleFileInputChange = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  setUploading(true);

  try {
    const options = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const data = await uploadImageToClodinary(compressedFile);

    setPreviewUrl(data.url);
    setFormData((prev) => ({ ...prev, photo: data.url }));
  } catch (err) {
    console.error(err);
    toast.error("Image upload failed");
  } finally {
    setUploading(false);
  }
};

  const submitHandler = async (event) => {
    event.preventDefault();
    const specializationArray = formData.specialization
    .split(",")        // split by comma
    .map(item => item.trim()) // remove extra spaces
    .filter(item => item);    // remove empty strings
    try {
      const res = await fetch(
        `${BASE_URL}/api/auth/register-service-provider`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData,    specialization: specializationArray,role: "service-provider" }),
        }
      );

      const { message } = await res.json();
      if (!res.ok) throw new Error(message);

      toast.success("Registration Successful! Please login."); // Success toast
      navigate("/login");
    } catch (error) {
      // setErrorMessage(error.message);
      toast.error(error.message);
    }
  };

  
  return (
   <section className="px-2 xl:px-0 mt-16 mb-28 md:mb-32">
  <div className="md:px-8 mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 ">

      {/* LEFT IMAGE */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative hidden lg:block rounded-sm overflow-hidden shadow-lg"
      >
        <img
          src="/images/serviceSignup.png"
          alt="Signup"
          className="w-full h-full object-cover min-h-[520px]"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-sky-700/40 via-sky-600/20 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <h2 className="text-3xl font-bold leading-tight">
            Join Our Professional Team
          </h2>
          <p className="text-sm opacity-90 mt-2 max-w-[280px]">
            Connect with customers, grow your service business, and manage
            bookings easily with our platform.
          </p>
        </div>
      </motion.div>

      {/* RIGHT FORM */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="rounded-md border border-gray-200 p-4 md:ml-2 lg:pl-16 bg-white"
      >
        <h3 className="text-slate-900 text-[28px] font-bold mb-3">
          Become a <span className="text-sky-600">Professional</span>
        </h3>

        <form onSubmit={submitHandler} className="space-y-3">

          {[
            { name: "name", placeholder: "Full Name" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "password", placeholder: "Password", type: "password" },
            { name: "specialization", placeholder: "Specialization" },
            { name: "experience", placeholder: "Experience", type: "number" },
            { name: "consultationFee", placeholder: "Consultation Fee", type: "number" },
            { name: "about", placeholder: "About your service" },
            { name: "location", placeholder: "Location" },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <input
                type={field.type || "text"}
                required
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-b border-[#0066ff61] rounded-md text-gray-600 outline-none text-[15px]"
              />
            </motion.div>
          ))}

          {/* Gender + Upload */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between"
          >
            <label className="text-slate-900 font-bold md:text-[16px] text-[13px]">
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="ml-2 px-4 py-2 text-gray-700 rounded-md outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>

            <div className="flex items-center gap-3">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-10 h-10 rounded-full object-cover border-2 border-sky-600"
                />
              )}

              <div className="relative w-[120px] h-[38px]">
                <input
                  type="file"
                  id="customfile"
                  onChange={handleFileInputChange}
                  accept=".jpg, .png, .jpeg, .gif, .avif"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customfile"
                  className={`absolute inset-0 flex items-center justify-center rounded-lg text-white text-sm cursor-pointer
                  ${uploading ? "bg-gray-400" : "bg-sky-600 hover:bg-sky-700"}`}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </label>
              </div>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={uploading}
            className="w-full py-2 rounded-xl text-lg font-semibold text-white
            bg-[#0369a1] hover:bg-[#075985] transition"
          >
            {uploading ? "Please wait..." : "Sign Up"}
          </motion.button>

          <p className="text-gray-500 text-center text-[14px]">
            Already registered?
            <Link to="/login" className="text-sky-600 font-medium ml-1 border-b">
              Login
            </Link>
          </p>
        </form>
      </motion.div>

    </div>
  </div>
</section>

  );
}

export default ServiceProviderSignUp;
