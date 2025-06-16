import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signup from "../../assets/signup.gif";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

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
    const file = event.target.files[0];
    setUploading(true);
    try {
      const data = await uploadImageToClodinary(file);
      setPreviewUrl(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch {
      setErrorMessage("Error uploading image. Please try again.");
    } finally {
      setUploading(false); // finish uploading
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `${BASE_URL}/api/auth/register-service-provider`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, role: "service-provider" }),
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
    <section className="md:px-5 px-2 xl:px-0 mt-16 mb-28 md:mt-20 md:mb-32">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-sky-600 rounded-2xl">
            <img src={signup} alt="Signup" className="w-full rounded-md" />
          </div>

          <div className="rounded-md border border-gray-200 p-4 md:ml-2 lg:pl-16">
            <h3 className="text-slate-900 text-[28px] font-bold  mb-3">
              Become a <span className="text-sky-600">Professional</span>
            </h3>

            <form onSubmit={submitHandler}>
              {/* Basic Fields */}
              {[
                { name: "name", placeholder: "Full Name" },
                { name: "email", placeholder: "Email", type: "email" },
                { name: "password", placeholder: "Password", type: "password" },
                {
                  name: "specialization",
                  placeholder: "Specialization (e.g., Dentist)",
                },
                {
                  name: "experience",
                  placeholder: "Experience (e.g., 5 years)",
                  type: "number",
                },
                {
                  name: "consultationFee",
                  placeholder: "Consultation Fee",
                  type: "number",
                },
                {
                  name: "about",
                  placeholder: "About your service",
                  type: "text",
                },
                { name: "location", placeholder: "Location (e.g., Delhi)" }, // ✅
              ].map((field) => (
                <div key={field.name} className="mb-4">
                  <input
                    type={field.type || "text"}
                    required
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1 border-b border-[#0066ff61] rounded-md text-gray-600 outline-none text-[15px]"
                  />
                </div>
              ))}

              {/* Gender */}
              <div className=" flex justify-between">
                <label className="text-slate-900 font-bold md:text-[16px] text-[13px]">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="md:ml-3 px-4 py-2 md:text-[16px] text-[14px] text-gray-700 rounded-md outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
                {/* Upload Photo */}
                <div className="mb-5 flex items-center gap-3">
                  {previewUrl && (
                    <figure className="md:w-[50px] md:h-[50px] w-[35px] h-[35px] rounded-full border-2 border-sky-600     overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </figure>
                  )}
                  <div className="relative md:w-[140px] md:h-[40px] w-[100px] h-[35px]  ">
                    <input
                      type="file"
                      id="customfile"
                      onChange={handleFileInputChange}
                      accept=".jpg, .png, .gif, .jpeg, .avif"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <label
                      htmlFor="customfile"
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center
                       ${uploading ?  bg-blue-600 text-white font-bold rounded-lg md:text-[15px] text-[13px] cursor-pointer hover:bg-blue-700 transition"
                    >
                      {uploading ? "Uploading..." : "Upload Picture"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center ">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white text-[20px] py-1 px-20 rounded-[10px] font-semibold transition-transform hover:scale-[0.95] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploading}
                >
                  {uploading ? "Sign up" : "Sign up"}
                </button>
              </div>

              {/* Error Message */}
              {/* {errorMessage && (
                <p className="mt-3 text-red-600 text-center">{errorMessage}</p>
              )} */}

              {/* Login Link */}
              <p className="mt-2 text-gray-500 text-center text-[14px] ">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="text-sky-600 text-[15px] font-medium border-b ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceProviderSignUp;
