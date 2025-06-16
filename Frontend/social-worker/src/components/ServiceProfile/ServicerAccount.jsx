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
import { BASE_URL, token } from "../../config";
import { useAccounts } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import goodjob from "../../assets/goodjob.jpg";

import { FaUserEdit } from "react-icons/fa";
import useConversation from "../../stateManage/useConversation.js";

function ServicerAccount() {
  const { user, role, logout } = useAuth();
  const { accounts, loading, error } = useAccounts();

  const closeModal = () => setShowModal(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const currentUserId = localStorage.getItem("userId");
  const { selcetedConversation, setSelcetedConversation } = useConversation();
  const [selectedSerPreference, setSelectedSerPreference] = useState(null);

  const toggleSetting = () => {
    setSettingOpen(!settingOpen);
  };
  const { id } = useParams();

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
        toast.success("Logout Successfully");

        navigate("/");
      } else {
        toast.error("Logout failed, please try again.");
        // alert("Logout failed, please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  const text = user.about || "No description available";

  const shortText = text.slice(0, 270);

  return (
    <div>
      <section className="min-h-screen bg-purple-100 md:mt-13 pt-6  flex md:pr-25 md:px-7   ">
        <div className="flex w-full">
          <div className="flex-1 min-w-0">
            <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-10   mb-2">
              {/* Top Section */}
              <FaArrowLeft
                className="text-xl md:mt-0 mt-4 ml-3"
                onClick={() => navigate(-1)}
              />

              <div className="md:relative w-full rounded-xl ">
                {/* Profile Image */}
                <div className="md:absolute top-0    md:mt-14 ">
                  <img
                    src={
                      user.photo ||
                      "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                    }
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
                    <h1>{user.name}</h1>
                    <MdOutlineVerified className="text-slate-700 mt-1" />
                  </div>
                  <h2 className="text-gray-7=800 font-normal text-md">
                    {user.about}
                  </h2>
                  <div className="flex flex-wrap items-center gap-1 md:mt-0 mt-2 text-sm text-slate-500">
                    <FaLocationDot />
                    <h2 className="text-gray-7=800 font-normal text-md">
                      {user.location || "not location available"}
                    </h2>
                    <span className="font-bold text-lg md:mb-1">·</span>
                  </div>

                  {/* Buttons */}
                  <div className="md:flex flex-wrap gap-3 mt-4 hidden ">
                    <div
                      onClick={() => navigate(`/update_service/${user._id}`)}
                    >
                      <button className="px-10   py-1 rounded-full bg-gray-200 outline outline-gray-400  hover:outline text-gray-600 font-semibold hover:bg-gray-300 transition duration-300 cursor-pointer ">
                        <FaUserEdit className="text-gray-700  inline" /> Edit
                      </button>
                    </div>
                  
                  </div>
                </div>
              </div>
              {/* mini screen btn */}

              <div className="flex md:hidden mt-5 ">
                <div onClick={() => navigate(`/update_service/${user._id}`)}>
                  <button className=" py-1 px-12   rounded-xl bg-gray-200 outline  hover:outline outline-gray-300  text-gray-600 font-semibold hover:bg-gray-300 transition duration-300 cursor-pointer ">
                    <FaUserEdit className="text-gray-600 inline  " /> Edit
                  </button>
                </div>
              </div>

              {/* Open to Work Section */}
           
            </div>
            {/* about section */}
            <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
              <h1 className="font-semibold text-xl text-gray-900"> About</h1>

              <p className="text-[14px] font-[400] mt-3 text-slate-800">
                {expanded ? text : `${shortText}`}
              </p>
             {text.length > 270 && (
                <span className="flex justify-end">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-1 text-slate-600 font-semibold hover:underline"
                  >
                    {expanded ? "see less" : "...see more"}
                  </button>
                </span>
              )}
            </div>

            {/* experience */}
            <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
              <h1 className="text-slate-800 font-[600] text-xl"> Experience</h1>
              <p className="text-md text-gray-800 mt-2">
                {Array.isArray(user.experience) && user.experience.length > 0
                  ? `${user.experience
                      .reduce((total, exp) => {
                        const start = new Date(exp.startdate);
                        const end = new Date(exp.enddate);
                        const diffTime = Math.abs(end - start);
                        const diffYears =
                          diffTime / (1000 * 60 * 60 * 24 * 365);
                        return total + diffYears;
                      }, 0)
                      .toFixed(1)} years`
                  : "No experience found."}
              </p>
            </div>

            {/* setting */}
            <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 mb-2">
              {/* <div className="bg-[#e3e8f0c5]  border-t-2 border-gray-200 py-6"> */}
              <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto ">
                <div className="w-full bg-white   rounded-lg">
                  <div>
                    <div
                      className="flex items-center gap-2 md:py-4 text-slate-700 "
                      onClick={toggleSetting}
                    >
                      <IoIosSettings className="md:text-3xl text-2xl" />
                      <h1 className=" font-semibold text-xl text-gray-900">
                        {" "}
                        Setting
                      </h1>
                      <MdArrowForwardIos
                        className={`ml-5 mt-2 text-xl cursor-pointer transition-transform ${
                          settingOpen ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    {settingOpen && (
                      <div className="overflow-y-auto transition-all duration-500 pl-5  text-slate-600 flex flex-col max-h-[300px]">
                      
                        <h1
                          className="text-[15px] font-[500] cursor-pointer transition hover:bg-gray-200 p-1   mx-3 rounded-md"
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

          <div className="hidden  md:flex flex-col ml-6 shrink-0   ">
            <div className=" w-[300px] h-[250px] border border-gray-300 overflow-hidden rounded-xl">
              <img src={goodjob} alt="" className="h-full rounded-xl  " />
            </div>
            <div className=" mt-2  h-[calc(100vh-5px)] border border-gray-300 rounded-xl bg-white   w-[300px]  custom-scroll  overflow-y-auto">
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
                          src={
                            profile.photo ||
                            "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                          } // Default image if photo is missing
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
                            onClick={() => {
                              setSelcetedConversation(profile);

                              navigate("/msg");
                            }}
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
                <div className="pl-4 mt-2 text-[14px]">
                  No other profiles found
                </div>
              )}
            </div>
          </div>
        
        </div>
      </section>
    </div>
  );
}

export default ServicerAccount;
