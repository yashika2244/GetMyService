import React from "react";
// import slider from "../assets/slider-login-signup.gif";
import signup from "../assets/signup.gif";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <section className="md:px-5 px-2 xl:px-0 mt-16 mb-28 md:mt-28 md:mb-32">
         <div className="max-w-[1100px] md:mt-8 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">
          {/*=======img box ==========*/}
          <div className="hidden lg:block bg-sky-600  max-w-[500px] rounded-2xl  ">
            <figure>
              <img src={signup} alt="" className="w-full rounded-md " />
            </figure>
          </div>


          {/* sign-up form */}
          <div className="rounded-md border border-gray-200  p-2 lg:pl-16 md:py-1">
            <h3
              className="text-slate-900 text-[22px] md:text-[30px] leading-9
          font-bold md:mb-4"
            >
              Create an <span className="text-sky-600">account</span>
            </h3>

            <form action="">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className="w-full px-4 py-3 border-b border-solid 
           border-[#0066ff61]  focus:outline-none placeholder:text-slate-600   rounded-md cursor-pointer text-gray-600 text-[20px]  "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  className="w-full px-4 py-3 border-b border-solid 
           border-[#0066ff61]  focus:outline-none placeholder:text-slate-600   rounded-md cursor-pointer text-gray-600 text-[20px]  "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="w-full px-4 py-3 border-b border-solid 
           border-[#0066ff61]  focus:outline-none placeholder:text-slate-600   rounded-md cursor-pointer text-gray-600 text-[20px]  "
                  required
                />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-slate-900 font-bold text-[16px]  leadin-7"
                >
                  Are you a{" "}
                  <select
                    name="role"
                    id=""
                    className="text-gray-600 font-semibold text-[15px]   leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option>Select</option>
                    <option>Servicer </option>
                    <option>Customar</option>
                  </select>
                </label>

                <label
                  htmlFor=""
                  className="text-slate-900 font-bold text-[16px]   leadin-7"
                >
                  Gender
                  <select
                    name="gender"
                    id=""
                    className="text-gray-600 font-semibold text-[15px]  leading-7 px-4
              py-3 focus:outline-none"
                  >
                    <option>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center gap-3">
                <figure className="w-[50px] h-[50px]  rounded-full border-2 border-solid border-sky-600 flex items-center justify-center">
                  <img
                    className="w-[50px] h-[50px] rounded-full"
                    src=""
                    alt=""
                  />
                </figure>
                <div className="relative w-[120px] h-[40px]">
                  <input
                    type="file"
                    name="photo"
                    accept=".jpg, .png, .gif, .jpeg"
                    className="absolute top-0 left-0w-full h-full opacity-0  cursor-pointer"
                  />

                  <label
                    htmlFor=""
                    className="absolute md:ml-4 top-0 left-0 w-full h-full flex items-center
                    px-[0.7rem] py-0.375rem] text-[15px] leading-6 overflow-hidden
                    bg-blue-600  hover:bg-blue-700 text-white font-bold
                    rounded-lg truncate cursor-pointer transition-all transition-transfrom hover:scale-[0.9] duration-300"
                  >
                    Upload Picture
                  </label>
                </div>
              </div>

              <div className="flex justify-center md:mt-8">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white text-[20px] py-1 md:text-[20px] md:px-20 
          px-22 rounded-[10px] font-[600]transition-all transition-transfrom hover:scale-[0.9] duration-300 cursor-pointer"
                >
                  Sign up
                </button>
              </div>
              <p className="mt-5 text-gray-500 text-center">
                {" "}
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-sky-600 font-medium ml-1 border-b"
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

export default SignUp;
