import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signup from "../../assets/signup.gif";
import uploadImageToClodinary from "../../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

function CustomerSignUp() {
  const [selectedfile, setSelectedFile] = useState(null);
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
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setUploading(true);

    try {
      const data = await uploadImageToClodinary(file);
      setPreviewUrl(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (error) {
      setErrorMessage("Error uploading image, please try again.");
    } finally {
      setUploading(false); // finish uploading
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "customer" }),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }
        toast.success("Registration Successful! Please login.");

      navigate("/login"); // Redirect to login
    } catch (error) {
      setErrorMessage(error.message);
          toast.error(error.message || "Login failed. Try again.");
    }
  };

  return (
    <section className="md:px-5 px-2 xl:px-0 mt-16 mb-28 md:mt-28 md:mb-32">
      <div className="max-w-[1100px] md:mt-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-sky-600 max-w-[500px] rounded-2xl">
            <figure>
              <img src={signup} alt="Signup" className="w-full rounded-md" />
            </figure>
          </div>

          <div className="rounded-md border border-gray-200 p-2 lg:pl-16 md:py-8 ">
            <h3 className="text-slate-900 text-[22px] md:text-[30px] leading-9 font-bold md:mb-6 mb-2 ">
              Create a <span className="text-sky-600"> Customer account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5  md:text-[20px] text-[17px] ">
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  name="name"
                  className="w-full px-4 py-3 border-b border-[#0066ff61] rounded-md text-gray-600 outline-none "
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-[#0066ff61] rounded-md text-gray-600 text-[20px] outline-none"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  className="w-full px-4 py-3 border-b border-[#0066ff61] rounded-md text-gray-600 text-[20px] outline-none"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  name="location"
                  className="w-full px-4 py-3 border-b border-[#0066ff61] rounded-md text-gray-600 text-[20px] outline-none"
                  required
                />
              </div>

              <div className=" flex justify-between">
                <label className="text-slate-900 font-bold md:text-[16px] text-[14px]">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="md:ml-3 md:px-4 py-2 md:text-[16px] text-[14px] text-gray-700 rounded-md outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
                <div className="mb-5 flex items-center gap-3">
                  {previewUrl && (
                    <figure className="md:w-[50px] md:h-[50px] w-[35px] h-[35px rounded-full border-2 border-sky-600 overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </figure>
                  )}

                  <div className="relative w-[120px] h-[40px]">
                    <input
                      type="file"
                      name="photo"
                      id="customfile"
                      onChange={handleFileInputChange}
                      accept=".jpg, .png, .gif, .jpeg,.avif"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <label
                      htmlFor="customfile"
                      className="absolute top-0 left-0 w-full h-full flex items-center md:text-[15px] text-[14px]  justify-center   ${uploading ? bg-blue-600 text-white font-bold rounded-lg  cursor-pointer hover:bg-blue-700 transition"
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload Picture"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-center ">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white text-[20px] py-1 px-20 rounded-[10px] font-semibold transition-transform hover:scale-[0.95] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploading}
                >
                  {uploading ? "Sign Up" : "Sign up"}
                </button>
              </div>
{/* 
              {errorMessage && (
                <p className="mt-3 text-red-600 text-center">{errorMessage}</p>
              )} */}

              <p className="mt-3 text-gray-500 text-center text-[14px]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-sky-600 font-medium border-b ml-1 text-[15px]"
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

export default CustomerSignUp;
