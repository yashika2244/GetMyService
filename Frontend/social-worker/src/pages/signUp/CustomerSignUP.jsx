import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiMapPin, FiUpload } from "react-icons/fi";

function CustomerSignUp() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "male",
    location: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    setUploading(true);
    try {
      const data = await uploadImageToClodinary(file);
      setPreviewUrl(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "customer" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Registration Successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100 md:px-4 md:py-18 py-15"
    >
      <div className="w-full max-w-8xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl bg-white rounded-sm">
        {/* LEFT IMAGE – FROM LEFT */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex relative"
        >
          <img
            src="/images/signUp.png"
            alt="signup"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-600/30 to-transparent" />

          <div className="relative z-10 py-12 px-4 text-white flex flex-col justify-end">
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
              Join as a Customer 💙
            </h2>
            <p className="text-sky-100 text-lg">
              Discover services, connect with experts, and get things done
              effortlessly.
            </p>
          </div>
        </motion.div>

        {/* FORM – FROM RIGHT */}
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h3>
          <p className="text-gray-500 mb-8">
            It only takes a minute to get started
          </p>

          <motion.form
            onSubmit={submitHandler}
            className="space-y-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {/* INPUTS */}
            {[
              {
                icon: <FiUser />,
                name: "name",
                type: "text",
                placeholder: "Full Name",
              },
              {
                icon: <FiMail />,
                name: "email",
                type: "email",
                placeholder: "Email Address",
              },
              {
                icon: <FiLock />,
                name: "password",
                type: "password",
                placeholder: "Password",
              },
              {
                icon: <FiMapPin />,
                name: "location",
                type: "text",
                placeholder: "Location",
              },
            ].map((field, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="input-box"
              >
                {field.icon}
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
            ))}

            {/* GENDER + UPLOAD */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="select-box"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <label className="upload-btn">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FiUpload />
                )}
                <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
                <input
                  type="file"
                  hidden
                  accept=".jpg,.png,.jpeg,.avif"
                  onChange={handleFileInputChange}
                />
              </label>
            </motion.div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              disabled={uploading}
              className="w-full py-3 rounded-xl text-lg font-semibold text-white
              bg-[#0369a1] hover:bg-[#075985] transition"
            >
              Create Account
            </motion.button>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?
              <Link to="/login" className="text-sky-700 ml-1 font-medium">
                Login
              </Link>
            </p>
          </motion.form>
        </motion.div>
      </div>

      {/* STYLES */}
      <style>{`
        .input-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          background: #fff;
          transition: 0.3s;
        }
        .input-box:focus-within {
          border-color: #0284c7;
          box-shadow: 0 0 0 3px #bae6fd;
        }
        .select-box {
          flex: 1;
          padding: 14px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
        }
        .upload-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          border-radius: 14px;
          cursor: pointer;
          background: #0369a1;
          color: white;
        }
        .upload-btn:hover {
          background: #075985;
        }
      `}</style>
    </motion.section>
  );
}

export default CustomerSignUp;
