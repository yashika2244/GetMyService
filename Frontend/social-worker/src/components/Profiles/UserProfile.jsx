import React from "react";
import { IoIosSettings } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import doll from "../../assets/doll-1.jpeg";
import { MdOutlineLogout } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useState } from "react";
import {BASE_URL} from '../../config'

function UserProfile() {
  const [settingOpen, setsettingOpen] = useState(false);
  const toggleSetting = () => {
    setsettingOpen(!settingOpen);
  };

  // const logoutHandler = async () => {
  //   try {
  //     const res = await fetch(`${BASE_URL}/api/auth/logout`, {
  //       method: "POST",
  //       credentials: "include"
  //     });
  
  //     if (res.ok) {
  //       // Redirect or update state after logout
  //       window.location.href = "/"; // or use navigate() from react-router
  //     } else {
  //       const data = await res.json();
  //       console.log(data.message || "Logout failed");
  //     }
  //   } catch (error) {
  //     console.log("Logout error:", error.message);
  //   }
  // };
  const logoutHandler = async () => {
    try {
      // Logout request to server (you can modify this part based on your API)
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        // Remove user details from localStorage and set user state to null
        window.location.href = "/";
        localStorage.removeItem("user");
        setUser(null); // This will trigger re-render and login button will appear
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };

  return (
    <section className="min-h-screen mt-10">
      <div className="flex flex-col items-center justify-center">
        {/* Cover Image */}
        <div className="flex flex-col items-center justify-center max-w-[1000px] w-full lg:px-8">
          <div className="w-full relative   cursor-pointer lg:h-[58vh] md:h-[50vh] sm:h-[40vh] h-[23vh] overflow-hidden rounded-lg">
            <img src="https://wallpapercave.com/wp/wp7085311.jpg" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-20  rounded-lg"></div>
        </div>

        {/* Profile Image + Name + Button bg-[#f0f2f5] hover:bg-[#e7eaee] bg-gradient-to-t from-black/50 to-transparen*/}
        <div className="flex flex-col md:flex-row items-center md:gap-6  relative md:w-[1000px] w-full lg:pl-15 lg:mt-[-85px] mt-[-80px] justify-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className=" w-40 h-40 border-2  shadow-xl shadow-white border-gray-300 rounded-full overflow-hidden flex items-center justify-center">
              {/* Image */}
              <img src={doll} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col items-center lg:items-start md:flex-row lg:gap-4 lg:justify-between lg:pr-12   mt-3 lg:mt-25 w-full text-center md:text-left">
            <div className="">
              <h1 className="text-3xl font-bold">Yashi Rajput</h1>
              <h2 className="text-md text-gray-600 font-medium">My Location</h2>
            </div>
            {/* edit button */}
            <div>
              <button className="mt-4 px-4 py-2 bg-gray-200 text-black font-[500] cursor-pointer rounded-lg hover:bg-gray-300 transition flex items-center gap-1">
                <MdEdit className="text-lg" /> {/* Icon size adjustment */}
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Intro section with pink background */}
      <div className="w-full mt-10 lg:h-[400px]">
        <div className="bg-[#e7ecf3c5]  border-t-2 border-gray-200 py-6">
          <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto px-4">
            <div className="w-full bg-white md:h-[45vh] sm:h-[40vh] h-[30vh]  rounded-lg">
              <div>
                <h1 className=" md:p-8 p-5 text-2xl font-bold"> Intro</h1>
                <div className="flex flex-col gap-4 md:gap-8">
                  <button className="lg:w-1/2  bg-gray-200 hover:bg-gray-300 cursor-pointer transition font-medium py-2 px-5 mx-8 rounded-lg">
                    Add Bio
                  </button>
                  <button className="lg:w-1/2  bg-gray-200 hover:bg-gray-300 cursor-pointer transition font-medium py-2 px-5 mx-8 rounded-lg">
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        
            </div>
      {/* services */}
      <div className="w-full mt-2 min-h-[400px]">
        <div className="  py-6">
          <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto px-4">
            <div className="w-full border border-gray-200 shadow-lg bg-[#e4e9f1c5] md:h-[50vh] sm:h-[40vh] h-[50vh] overflow-y-auto  rounded-lg">
              <div>
                <h1 className=" p-6 text-2xl font-bold ">
                  My Booking Services List
                </h1>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-6 bg-white mx-3 rounded-xl p-1 cursor-pointer">
                    <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
                      <img
                        src={doll}
                        className="w-full h-full object-cover rounded-full"
                        alt=""
                      />
                    </div>
                    <h1 className="lg:text-xl font-bold"> Health care </h1>
                  </div>

                  <div className="flex  items-center gap-6 bg-white mx-3 rounded-xl p-1">
                    <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
                      <img
                        src={doll}
                        className="w-full h-full object-cover rounded-full"
                        alt=""
                      />
                    </div>
                    <h1 className="lg:text-xl font-bold"> Health care </h1>
                  </div>
                  <div className="flex  items-center gap-6 bg-white mx-3 rounded-xl p-1">
                    <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
                      <img
                        src={doll}
                        className="w-full h-full object-cover rounded-full"
                        alt=""
                      />
                    </div>
                    <h1 className="lg:text-xl font-bold"> Health care </h1>
                  </div>
                  <div className="flex  items-center gap-6 bg-white mx-3 rounded-xl p-1">
                    <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
                      <img
                        src={doll}
                        className="w-full h-full object-cover rounded-full"
                        alt=""
                      />
                    </div>
                    <h1 className="lg:text-xl font-bold"> Health care </h1>
                  </div>
                  <div className="flex  items-center gap-6">
                    <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
                      <img
                        src={doll}
                        className="w-full h-full object-cover rounded-full"
                        alt=""
                      />
                    </div>
                    <h1 className="text-xl font-bold"> Health care </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* setting */}
      <div className="w-full   mb-2">
        <div className="bg-[#e3e8f0c5]  border-t-2 border-gray-200 py-6">
          <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto px-4">
            <div className="w-full bg-white   rounded-lg">
              <div>
                <div className="flex items-center gap-2 p-4 text-slate-700">
                  <IoIosSettings className="text-3xl" />
                  <h1 className=" text-2xl font-bold"> Setting</h1>
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
                
                    <h1 className=" text-md font-[500] cursor-pointer transition hover:bg-gray-200 p-1 mx-3 rounded-md">
                      Delete Account{" "}
                    </h1>
                    <div className="flex items-center gap-1 mt-3 transition hover:bg-gray-200 p-1 mx-3 rounded-md">
                      <MdOutlineLogout />
                      <h1 className="text-md font-[500] cursor-pointer    " 
                  onClick={logoutHandler}>
                        Logout
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
