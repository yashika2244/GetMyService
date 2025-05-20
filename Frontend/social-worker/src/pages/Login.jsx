import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import {authContext} from '../context/AppContext'
import { BASE_URL } from "../config";
// import { useAuth } from "../context/AppContext";
import { useAuth } from "../context/AppContext";

function Login() {
  const { user, role, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // role :""
  });

  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const [accounts, setAccounts] = useState([]);  // State to hold service data
  // const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state
  // const navigate = useNavigate();


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  


  const submitHandler = async (event) => {
  event.preventDefault();
  if (loading) return; // Prevent multiple clicks
  setLoading(true);

  try {
    // Prevent invalid role submission
    // if (formData.role === "select" || !formData.role) {
     
    //   setLoading(false);
    //   return;
    // }

    // Normalize role value
    // formData.role = formData.role.trim().toLowerCase();

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
        console.log( "result is",result);

    if (!res.ok) {
      throw new Error(result.message);
    }

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        user: result.data,
        token: result.token,
        role: result.role,
      },
    });

    // Store the role, user data, and token in localStorage
    localStorage.setItem("user", JSON.stringify(result.data));
    localStorage.setItem("token", result.token); 
    // localStorage.setItem("role", result.role); // Store the role

       
    // Redirect based on role
    if (role === "customer") {
      navigate("/user-profile");
    } else if (role === "service-provider") {
      navigate("/Service-profile/:id");
    }
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.error("Login error:", error);
    setLoading(false);
  }
  }



  return (
    <section className="md:px-5 px-2 lg:px-0 mt-16 mb-32 md:mt-24 ">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="mx-2 text-slate-900 text-[22px] leading-9 font-bold md:mb-8">
          Hello! <span className="text-sky-600">Welcome</span> Back 🎉
        </h3>
        <form className="py-4 px-3 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5 ">
            <input
              type="email"
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              name="email"
              className="w-full px-4  py-3 border-b border-[#0066ff61] rounded-md outline-[#1d365c61]  "
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              onChange={handleInputChange}
              placeholder="Password"
              name="password"
              className="w-full px-4 py-3 border-b border-[#0066ff61] rounded-md outline-[#1d365c61]"
              required
            />
          </div>
          {/* <div className="mb-5">
           
            <select
              name="role"
              className="text-gray-600 font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none   "
              required
              onChange={handleInputChange}
            >
              <option value="select">select</option>
              <option value="customer">Customer</option> 
            <option value="service-provider">Service Provider</option>{" "} 
            </select> 
          </div> */}

          <div className="flex justify-center md:mt-8">
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-[20px] py-1 md:py-2 md:px-40 px-22 rounded-[10px] font-[600] flex items-center justify-center cursor-pointer transition-all hover:scale-[0.9] duration-300"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <p className="mt-5 text-gray-500 text-center">
            {" "}
            Don't have an account?{" "}
            <Link
              // to="/register"
              to="/select-role"
              className="text-sky-600 font-medium ml-1 border-b"
            >
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
