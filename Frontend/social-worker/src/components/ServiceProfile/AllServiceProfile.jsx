

import React from "react";
import { MdOutlineVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useAuth } from "../../context/AppContext";
import { BASE_URL } from "../../config";

function AllServiceProfile() {
  // Get user data from context
  const { user, setUserData, dispatch  } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  const toggleSetting = () => {
    setSettingOpen(!settingOpen);
  };

  // const logoutHandler = async () => {
  //   try {
  //     // Logout request to server
  //     const res = await fetch(`${BASE_URL}/api/auth/logout`, {
  //       method: "POST",
  //       credentials: "include",
  //     });

  //     if (res.ok) {
  //       // Clear user data from context and localStorage
  //       // setUserData(null); // Update context

  //       localStorage.removeItem("userData");
  //       window.location.href = "/"; // Redirect to home
  //     } else {
  //       console.log("Logout failed");
  //     }
  //   } catch (error) {
  //     console.log("Logout error:", error.message);
  //   }
  // };


  const logoutHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        // Dispatch logout action
        dispatch({ type: "LOGOUT" });

        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("chatUser");

        // Redirect to home page
        navigate("/");
      } else {
        console.log("Logout failed");
        // alert("Logout failed, please try again.");
      }
    } catch (error) {
      console.log("Logout error:", error.message);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Get user profile data from the location state or context
  const { name, photo, id, loc, about, accounts, rating, experience } =
    location.state || user || {};

  const text = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi rerum modi dicta voluptatem deleniti! 
    Molestias veniam quis deserunt vero vitae. Lorem ipsum dolor, sit amet consectetur adipisicing elit.`;

  const shortText = text.slice(0, 270);

  return (
    <section className="min-h-screen bg-purple-100 md:mt-13 pt-6  md:px-7 flex">
      <div>
        <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-10 mb-2">
          {/* Top Section */}
          <FaArrowLeft
            className="text-xl md:mt-0 mt-4 ml-3"
            onClick={() => navigate("/chat", { state: { name, photo, id } })}
          />

          <div className="md:relative w-full rounded-xl ">
            {/* Profile Image */}
            <div className="md:absolute top-0    md:mt-14 ">
              <img
                src={photo}
                className="md:w-36  md:h-36 w-28 h-28 mt-8 md:mt-0 rounded-full  shadow-lg object-cover"
              />
            </div>
            {/* Background Image  */}
            <div
              className=" hidden  md:w-60 md:h-44 bg-cover ml-auto  md:flex justify-end  rounded-xl  "
              style={{
                backgroundImage: `url("https://i1.wp.com/retiredandtravelling.com/wp-content/uploads/2019/03/WorldClassCover-2019-03-2-22-42.jpg?fit=1106%2C737&ssl=1")`,
              }}
            ></div>
          </div>
          {/* Info */}
          <div className="flex  md:justify-start md:mt-8 mt-3">
            <div className="flex flex-col justify-start ">
              <div className="flex items-center md:gap-2 md:text-2xl text-xl font-semibold">
                <h1>{name}</h1>
                <MdOutlineVerified className="text-slate-700 mt-1" />
              </div>
              <h2 className="text-gray-7=800 font-normal text-md">{about}</h2>
              <div className="flex flex-wrap items-center gap-1 md:mt-0 mt-2 text-sm text-slate-500">
                <FaLocationDot />
                <h2 className="text-gray-7=800 font-normal text-md">
                  {loc || "not location available"}
                </h2>
                <span className="font-bold text-lg md:mb-1">·</span>
                <Link
                  to="/contact"
                  className="hidden md:inline hover:underline text-blue-600 font-semibold"
                >
                  Contact info
                </Link>
              </div>
              <div className="flex gap-1 text-sm md:text-slate-500 text-sky-700 font-medium">
                <span className="">1500</span>
                <span>connections</span>
              </div>

              {/* Buttons */}
              <div className="md:flex flex-wrap gap-3 mt-4 hidden ">
                <button className="px-6   py-1 rounded-full bg-sky-700 text-white font-semibold hover:bg-sky-900 transition duration-300 cursor-pointer ">
                  Connect
                </button>
                <button
                  className="px-4 py-[2px] rounded-4xl text-sky-700 border-1 border-sky-700  font-[600] hover:text-sky-900
        hover:outline hover:bg-sky-100  transition transform duration-300 cursor-pointer "
                >
                  Message
                </button>
                <button className="px-4    rounded-4xl bg-white text-slate-700 border border-slate-700 font-[600]  hover:outline hover:text-slate-900  hover:bg-slate-100     transition-all transform duration-300 cursor-pointer ">
                  More
                </button>
              </div>
            </div>
          </div>
          {/* mini screen btn */}

          <div className="flex md:hidden justify-center items-center mt-7">
            <button className="bg-blue-400 w-full py-2 rounded-4xl text-white font-semibold cursor-pointer hover:bg-sky-600 duration-300 ">
              {" "}
              Open to
            </button>
          </div>

          {/* Open to Work Section */}
          <div className="mt-6 bg-indigo-100 p-4 rounded-xl text-sm max-w-xl ">
            <h3 className="text-gray-900 font-semibold">Open to work</h3>
            <p className="text-gray-800">
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit Lorem ipsum dolor
              amet...
            </p>
            <Link
              className="text-sky-700 font-medium hover:underline"
              to="/details"
            >
              Show details
            </Link>
          </div>
        </div>
        {/* about section */}
        <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
          <h1 className="font-semibold text-xl text-gray-900"> About</h1>

          <p className="text-[14px] font-[400] mt-3 text-slate-800">
            {expanded ? text : `${shortText}...`}
          </p>
          <span className="flex justify-end">
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-slate-600 font-semibold hover:underline"
            >
              {expanded ? "" : "...see more"}
            </button>
          </span>
        </div>

        {/* experience */}
        <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
          <h1 className="font-semibold text-xl text-gray-900"> Experience</h1>
          <h2 className="pt-3 pl-2 text-slate-800 font-medium"> 4 years +</h2>
        </div>

        {/* Rating */}
        <div className="max-w-[800px] ml:5 md:ml-20 bg-white border mb-2 border-gray-300 shadow-lg rounded-xl p-2 md:p-5 ">
          <h1 className="font-semibold text-xl text-gray-900">Rate</h1>
          <span className="flex items-center  gap-2 pt-3">
            <h1 className="text-xl   "> 4.8</h1>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-lg ${
                    index < rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </span>
        </div>
        {/* setting */}
        <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 mb-2">
          {/* <div className="bg-[#e3e8f0c5]  border-t-2 border-gray-200 py-6"> */}
          <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto ">
            <div className="w-full bg-white   rounded-lg">
              <div>
                <div className="flex items-center gap-2 md:py-4 text-slate-700">
                  <IoIosSettings className="md:text-3xl text-2xl" />
                  <h1 className=" font-semibold text-xl text-gray-900">
                    {" "}
                    Setting
                  </h1>
                  <MdArrowForwardIos
                    onClick={toggleSetting}
                    className={`ml-5 mt-2 text-xl cursor-pointer transition-transform ${
                      settingOpen ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {settingOpen && (
                  <div
                    className={`overflow-y-auto transition-all duration-500 pl-5 p-3 text-slate-600 flex flex-col ${
                      settingOpen ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <h1 className=" text-[15px] font-[500] cursor-pointer transition hover:bg-gray-200 md:p-1 mx-3 rounded-md">
                      Book Now
                    </h1>
                   
               
                      <h1
                        className="text-[14px] font-[500] cursor-pointer transition hover:bg-gray-200 md:p-1 mx-3 rounded-md"
                        onClick={logoutHandler}
                      >
                        Logout
                      </h1>
                  
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* side div */}

      <div className="hidden  md:flex flex-col ml-6   ">
        <div className=" w-[300px] h-[250px] border border-gray-300 overflow-hidden rounded-xl">
          <img
            src="https://cdn.quotesgram.com/img/19/14/1132406686-11268773_m.jpg"
            alt=""
            className="h-full rounded-xl  "
          />
        </div>
        <div className=" mt-2  h-[calc(100vh-5px)] border border-gray-300 rounded-xl bg-white   w-[300px]   overflow-y-auto">
          <div className="pt-6 pl-6">
            <h2 className="font-semibold text-gray-900">
              {" "}
              More profile for you
            </h2>
          </div>

          {Array.isArray(accounts) && accounts.length > 0 ? (
            accounts
              .filter((profile) => profile._id !== id) // Exclude current profile based on _id
              .map((profile, index) => (
                <div key={index} className="pt-4 pl-4">
                  <div className="flex">
                    <img
                      src={profile.photo || "default-profile.png"} // Default image if photo is missing
                      className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                    />
                    <div className="flex flex-col justify-center ml-2">
                      <h2
                        className="text-md font-semibold"
                        onClick={() =>
                          navigate(`/Service-profile/${profile._id}`, {
                            state: {
                              id: profile._id,
                              name: profile.name,
                              photo: profile.photo,
                              loc: profile.loc,
                              about: profile.about,
                              accounts: accounts,
                            },
                          })
                        }
                      >
                        {profile.name || "No Name Available"}{" "}
                        {/* Default text if name is missing */}
                      </h2>

                      <p className="text-[14px] text-gray-800">
                        {profile.about || "No details available"}{" "}
                        {/* Default text if about is missing */}
                      </p>
                      <button
                        className="mr-2 py-1 w-[150px] mt-2 rounded-xl border border-sky-700 text-sky-700 bg-white font-semibold hover:text-sky-900 hover:outline cursor-pointer hover:bg-sky-50 transition duration-300"
                        onClick={() => navigate("/chat")}
                      >
                        Message
                      </button>
                    </div>
                  </div>
                  {index !== accounts.length - 1 && (
                    <div className="border-b border-gray-300 mt-5 mr-6 mb-4" />
                  )}
                </div>
              ))
          ) : (
            <div className="pl-4 mt-2 text-[14px]">No other profiles found</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllServiceProfile;
