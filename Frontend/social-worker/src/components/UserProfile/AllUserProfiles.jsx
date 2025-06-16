import React, { useState, useEffect } from "react";
import { IoIosSettings } from "react-icons/io";
import doll from "../../assets/doll-1.jpeg";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserGetAtll from "../../context/UserGetAll.jsx";
import { IoSettingsSharp } from "react-icons/io5";
import { FaLocationDot, FaArrowLeft, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

import goodJob from '../../assets/goodJob.jpg'
import { useAccounts } from "../../context/AppContext.jsx";
import {
  MdOutlineVerified,
  MdKeyboardArrowDown,
  MdOutlineLogout,
} from "react-icons/md";
import useConversation from "../../stateManage/useConversation.js";

const AllUserProfiles = () => {
  const [allUsers, loading] = UserGetAtll();
  const { accounts } = useAccounts();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const { id } = useParams(); // id = current profile id from URL
  const user = JSON.parse(localStorage.getItem("user")); // logged-in user
  const { selcetedConversation, setSelcetedConversation } = useConversation();

  useEffect(() => {
    if (Array.isArray(allUsers) && allUsers.length > 0 && id) {
      const matchedProfile = allUsers.find((profile) => profile._id === id);
      setProfile(matchedProfile);
    }
  }, [allUsers, id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-xl font-medium">Loading Profile...</p>
      </div>
    );
  }

  return (
    //  <section className="min-h-screen  mt-18 bg-slate-50 px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
    //     {/* Left Panel */}
    //     <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
    //       <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-teal-400 shadow-md">
    //         <img
    //           src={
    //             profile?.photo ||
    //           "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
    //           }
    //           alt={`${profile?.name} profile`}
    //           className="w-full h-full object-cover"
    //         />
    //       </div>
    //       <h2 className="mt-6 text-2xl font-semibold text-slate-700"> Name :   {profile?.name}</h2>
    //       <p className="text-teal-600 font-medium mt-1">Location : {profile?.location || "No location set"}</p>
    //       {/* <button
    //         onClick={() => navigate(`/update_user/${profile?._id}`)}
    //         className="mt-5 w-full bg-teal-600 text-white py-2 rounded-md shadow hover:bg-teal-700 transition"
    //         aria-label="Edit Profile"
    //       >
    //         <MdEdit className="inline-block mr-2 text-lg" />
    //         Edit Profile
    //       </button> */}
    //     </div>

    //     {/* Right Panel */}
    //     <div className="md:col-span-2 flex flex-col gap-8">
    //       {/* Intro Card */}
    //       {/* <div className="bg-white rounded-lg shadow-md p-6">
    //         <h3 className="text-xl font-semibold text-slate-800 mb-4 flex justify-between items-center">
    //           Intro
    //           {!editingBio && (
    //             <button
    //               onClick={() => setEditingBio(true)}
    //               className="text-teal-600 font-semibold hover:underline"
    //             >
    //               {bio ? "Edit" : "Add"} Bio
    //             </button>
    //           )}
    //         </h3>
    //         {editingBio ? (
    //           <>
    //             <textarea
    //               rows={5}
    //               value={bio}
    //               onChange={(e) => setBio(e.target.value)}
    //               className="w-full p-3 border border-slate-300 rounded-md focus:outline-teal-500 resize-none"
    //               placeholder="Write a short bio about yourself..."
    //             />
    //             <div className="mt-3 flex justify-end gap-3">
    //               <button
    //                 onClick={() => setEditingBio(false)}
    //                 className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100 transition"
    //               >
    //                 Cancel
    //               </button>
    //               <button
    //                 onClick={saveBio}
    //                 disabled={!bio.trim()}
    //                 className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-300 transition"
    //               >
    //                 Save
    //               </button>
    //             </div>
    //           </>
    //         ) : (
    //           <p className="text-slate-700">{bio || "No bio added yet."}</p>
    //         )}
    //       </div> */}

    //       {/* Bookings Card */}
    //       <div className="bg-white rounded-lg shadow-md p-6 max-h-[300px] overflow-y-auto">
    //         <h3 className="text-xl font-semibold text-slate-800 mb-4">My Booking Services</h3>
    //         {bookings.length ? (
    //           <div className="flex flex-col gap-4">
    //             {bookings.map(({ id, title, img }) => (
    //               <BookingCard key={id} title={title} img={img} />
    //             ))}
    //           </div>
    //         ) : (
    //           <p className="text-slate-500 text-center">No bookings found.</p>
    //         )}
    //       </div>

    //       {/* Settings Card */}
    //       <div className="bg-white rounded-lg shadow-md p-6">
    //         <button
    //           onClick={() => setSettingsOpen(!settingsOpen)}
    //           className="flex justify-between items-center w-full font-semibold text-slate-700 text-lg px-3 py-2 rounded-md hover:bg-slate-100 transition"
    //           aria-expanded={settingsOpen}
    //           aria-controls="settings-menu"
    //         >
    //           <span className="flex items-center gap-2">
    //             <IoSettingsSharp size={22} />
    //             Settings
    //           </span>
    //           <svg
    //             className={`w-6 h-6 transform transition-transform duration-300 ${
    //               settingsOpen ? "rotate-180" : "rotate-0"
    //             }`}
    //             fill="none"
    //             stroke="currentColor"
    //             strokeWidth="2"
    //             viewBox="0 0 24 24"
    //             xmlns="http://www.w3.org/2000/svg"
    //             aria-hidden="true"
    //           >
    //             <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
    //           </svg>
    //         </button>
    //         {settingsOpen && (
    //           <div
    //             id="settings-menu"
    //             className="mt-4 flex flex-col gap-3 text-slate-700"
    //           >
    //             {/* <button
    //               onClick={() => alert("Delete Account feature coming soon")}
    //               className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 text-red-600 font-semibold transition"
    //             >
    //               <MdOutlineDeleteOutline size={20} />
    //               Delete Account
    //             </button> */}
    //             {/* <button
    //               onClick={logoutHandler}
    //               className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 text-red-600 font-semibold transition"
    //             >
    //               <MdOutlineLogout size={20} />
    //               Logout
    //             </button> */}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </section>
    <div>
      <section className="min-h-screen bg-purple-100 md:mt-13 pt-6 md:px-7 md:pr-25 md:flex    mt-10">
        <div className="md:flex md:w-full ">
          <div className="md:flex-1 md:min-w-0">
            <div className="max-w-[800px] w-full min-h-[300px]  md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-10 mb-2">
              <FaArrowLeft
                className="text-xl md:mt-0 mt-4 ml-3 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              {/* Profile & Background Image */}
              <div className="md:relative w-full rounded-xl">
                <div className="md:absolute top-0 md:mt-14">
                  <img
                    src={
                      profile?.photo ||
                      "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                    }
                    className="md:w-36 md:h-36 w-28 h-28 mt-8 md:mt-0 rounded-full shadow-lg object-cover"
                  />
                </div>
                <div
                  className="hidden md:w-60 md:h-44 bg-cover ml-auto md:flex justify-end rounded-xl"
                  style={{
                    backgroundImage: `url("https://i1.wp.com/retiredandtravelling.com/wp-content/uploads/2019/03/WorldClassCover-2019-03-2-22-42.jpg?fit=1106%2C737&ssl=1")`,
                  }}
                ></div>
              </div>

              {/* Info */}
              <div className="flex md:justify-start md:mt-8 mt-3">
                <div className="flex flex-col justify-start">
                  <div className="flex items-center gap-2 text-2xl font-semibold">
                    <h1>{profile?.name}</h1>
                    <MdOutlineVerified className="text-slate-700 mt-1" />
                  </div>
                  {/* <h2 className="text-gray-700 font-normal text-md">
                      {user.about}
                    </h2> */}
                  <div className="flex flex-wrap items-center gap-1 mt-2 text-sm text-slate-500">
                    <FaLocationDot />
                    <h2 className="text-gray-700 font-normal text-md">
                      {profile?.location || "Location not available"}
                    </h2>
                    <span className="font-bold text-lg">·</span>
                    <Link
                      to="/contact"
                      className="hidden md:inline hover:underline text-blue-600 font-semibold"
                    >
                      Contact info
                    </Link>
                  </div>

                  {/* Buttons */}
                  <div className=" mt-3">
                    <button
                      onClick={() => {
                        setSelcetedConversation(profile);
                        navigate("/msg");
                      }}
                      className="px-6 py-1 rounded-full bg-sky-700 text-white font-semibold hover:bg-sky-900 transition duration-300"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[800px] w-full  ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2"></div>
          </div>

          {/* Right Side Profile Section */}
          <div className="hidden md:flex flex-col w-[300px] shrink-0">
            <div className="w-full h-[250px] border border-gray-300 overflow-hidden rounded-xl">
              <img
                src={goodJob || ""}
                alt=""
                className="h-full w-full object-cover rounded-xl"
              />
            </div>

            <div className="mt-2 mb-3 h-[calc(70vh-5px)] border border-gray-300 rounded-xl bg-white w-full custom-scroll overflow-y-auto">
              <div className="pt-6 pl-6">
                <h2 className="font-semibold text-gray-900">
                  More Services profiles for you
                </h2>
              </div>

              {Array.isArray(accounts) && accounts.length > 0 ? (
                accounts
                  .filter((p) => p._id !== user?._id)
                  .map((p, index) => (
                    <div key={index} className="pt-4 pl-4">
                      <div className="flex">
                        <img
                          src={
                            p.photo ||
                            "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                          }
                          className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                        />
                        <div className="flex flex-col justify-center ml-2">
                          <h2
                            className="text-md font-semibold cursor-pointer"
                            onClick={() =>
                              navigate(`/Service-profile/${p._id}`, {
                                state: { id: p._id },
                              })
                            }
                          >
                            {p.name || "No Name Available"}
                          </h2>
                          <p className="text-[14px] text-gray-800">
                            {p.about || "No details available"}
                          </p>
                          <button
                            className="mr-2 py-1 w-[150px] mt-2 rounded-xl border border-sky-700 text-sky-700 font-semibold hover:text-sky-900 hover:bg-sky-50 transition duration-300"
                            onClick={() => {
                              setSelcetedConversation(p);
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
};

export default AllUserProfiles;
