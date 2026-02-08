import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AppContext";
import { BASE_URL } from "../config";
import { useAuth } from "../context/AppContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Login() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      localStorage.setItem("user", JSON.stringify(result.data));
      localStorage.setItem("token", result.token);

      toast.success("Login Successful!");

      if (result.role === "customer") {
        navigate(`/user-profile/${result.data._id}`);
      } else if (result.role === "service-provider") {
        navigate(`/servicer-account/${result.data._id}`);
      } else {
        navigate("/");
      }

      window.location.reload();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      
      {/* BACKGROUND IMAGE (LEFT → CENTER) */}
  <motion.div
  initial={{ x: -150, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="absolute inset-0 hidden md:block"
>
  <img
    src="/images/login.png"
    alt="Login Background"
    className="w-full h-full object-cover"
  />
</motion.div>


      {/* LOGIN FORM */}
     <div className="relative z-10 min-h-screen flex items-center justify-center md:justify-end px-4 md:px-20">

<motion.div
  initial={{ x: 150, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="
    w-full max-w-[420px]
    backdrop-blur-xl
    p-6 md:p-10
    border border-white/30
    bg-white/80 md:bg-transparent
    rounded-xl
  "
>

    {/* Heading */}
    <h2 className="text-center text-3xl font-bold text-gray-800 mb-2 tracking-wide">
      Welcome Back
    </h2>
    <p className="text-center text-sm text-gray-500 mb-2">
      Login to continue
    </p>

 <form onSubmit={submitHandler} className="space-y-6">
  
  {/* Email */}
  <div className="relative">
    <input
      type="email"
      name="email"
      placeholder=" Email"
      onChange={handleInputChange}
      className="w-full bg-transparent border-b-2 border-gray-300 py-3
      text-gray-800 outline-none focus:border-blue-500 transition-all"
      required
    />
  </div>

  {/* Password */}
  <div className="relative">
    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleInputChange}
      className="w-full bg-transparent border-b-2 border-gray-300 py-3
      text-gray-800 outline-none focus:border-blue-500 transition-all"
      required
    />
  </div>

  {/* Forgot */}
  <div className="text-right text-sm">
    <span className="text-gray-500 hover:text-blue-500 cursor-pointer transition">
      Forgot password?
    </span>
  </div>

  {/* Button */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={loading}
    className="w-full py-3 rounded-full text-white font-semibold text-lg
    bg-gradient-to-r from-blue-700 to-sky-600 cursor-pointer
    shadow-lg shadow-blue-500/30 hover:shadow-xl transition"
  >
    {loading ? "Logging in..." : "LOGIN"}
  </motion.button>

  {/* Register link */}
  <div className="text-center mt-6 text-sm text-gray-600">
    Already have an account?
    <span
      onClick={() => navigate("/select-role")}
      className="ml-1 text-blue-700 font-semibold cursor-pointer hover:underline"
    >
      Register
    </span>
  </div>
</form>

  </motion.div>
</div>

    </section>
  );
}

export default Login;
