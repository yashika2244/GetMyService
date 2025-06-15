import React from "react";
import { useAccounts, useAuth } from "../../context/AppContext";
import { FaLocationDot, FaArrowLeft, FaStar } from "react-icons/fa6";
import {
  MdOutlineVerified,
  MdKeyboardArrowDown,
  MdOutlineLogout,
} from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import goodjob from "../../assets/goodjob.jpg";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import useConversation from "../../stateManage/useConversation.js";
import { FaUserEdit } from "react-icons/fa";

import { IoIosSettings } from "react-icons/io";

function UserProfile() {
  const { accounts } = useAccounts();
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { selcetedConversation, setSelcetedConversation } = useConversation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setBio(parsedUser.bio || "");
    }
  }, []);
  const logoutHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        localStorage.removeItem("user");
              localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/";
      } else {
        toast.error("Logout failed, please try again.");
      }
    } catch (err) {
      toast.error("An error occurred during logout.");
    }
  };

  const saveBio = () => {
    setUser((prev) => ({ ...prev, bio }));
    setEditingBio(false);
    localStorage.setItem("user", JSON.stringify({ ...user, bio }));
    toast.success("Bio updated");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-xl font-medium">Loading Profile...</p>
      </div>
    );
  }
  return (
    <div>
      <section className="min-h-screen bg-purple-100 md:mt-13 pt-6 md:px-7 md:pr-25 md:flex ">
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
                      user.photo ||
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
                    <h1>{user.name}</h1>
                    <MdOutlineVerified className="text-slate-700 mt-1" />
                  </div>
                  {/* <h2 className="text-gray-700 font-normal text-md">
                    {user.about}
                  </h2> */}
                  <div className="flex flex-wrap items-center gap-1 mt-2 text-sm text-slate-500">
                    <FaLocationDot />
                    <h2 className="text-gray-700 font-normal text-md">
                      {user.location || "Location not available"}
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
                  <div className="">
                   
                    <button
                      onClick={() => navigate(`/update_user/${user._id}`)}
                      className="mt-5 w-full bg-slate-400 text-white py-1 rounded-4xl shadow hover:bg-slate-500 transition"
                      aria-label="Edit Profile"
                    >
                      <FaUserEdit className="text-white  inline" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[800px] w-full  ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
              <div className="md:col-span-2 flex flex-col gap-8">
                {/* Intro Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 flex justify-between items-center">
                    Intro
                    {!editingBio && (
                      <button
                        onClick={() => setEditingBio(true)}
                        className="text-gray-00 font-semibold hover:underline"
                      >
                        {bio ? "Edit" : "Add"} Bio
                      </button>
                    )}
                  </h3>
                  {editingBio ? (
                    <>
                      <textarea
                        rows={5}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-md focus:outline-teal-500 resize-none"
                        placeholder="Write a short bio about yourself..."
                      />
                      <div className="mt-3 flex justify-end gap-3">
                        <button
                          onClick={() => setEditingBio(false)}
                          className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveBio}
                          disabled={!bio.trim()}
                          className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-300 transition"
                        >
                          Save
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-slate-700">
                      {bio || "No bio added yet."}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Settings */}
            <div className="max-w-[800px] w-full  ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
              <div className="bg-white rounded-lg shadow-md ">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="flex justify-between items-center w-full text-gray-800 font-semibold text-lg px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                  aria-expanded={settingsOpen}
                  aria-controls="settings-menu"
                >
                  <span className="flex items-center gap-2">
                    <IoIosSettings size={24} />
                    Settings
                  </span>
                  <MdKeyboardArrowDown
                    size={24}
                    className={`transform transition-transform duration-300 ${
                      settingsOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {settingsOpen && (
                  <div
                    id="settings-menu"
                    className="mt-4 flex flex-col gap-3 text-gray-700"
                  >
                    <button
                      onClick={logoutHandler}
                      className="text-left px-3 py-2 rounded hover:bg-red-100 text-red-600 font-semibold transition flex items-center gap-2"
                    >
                      <MdOutlineLogout size={20} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Profile Section */}
          <div className="hidden md:flex flex-col w-[300px] shrink-0">
            <div className="w-full h-[250px] border border-gray-300 overflow-hidden rounded-xl">
              <img
                src={goodjob || ""}
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
}

export default UserProfile;

