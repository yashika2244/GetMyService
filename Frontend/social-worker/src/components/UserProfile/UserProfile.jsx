


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../../context/AppContext";
import { BASE_URL } from "../../config";
import useConversation from "../../stateManage/useConversation.js";
import { toast } from "react-toastify";
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { MdOutlineVerified, MdOutlineLogout } from "react-icons/md";
import goodJob from "../../assets/goodJob.jpg";
import { FaUserEdit } from "react-icons/fa"; // Correct import
const UserProfile = () => {
  const { accounts } = useAccounts();
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const navigate = useNavigate();
  const { setSelcetedConversation } = useConversation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setBio(storedUser.bio || "");
    }
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        localStorage.clear();
        window.location.href = "/";
        toast.success("Logged out successfully");
      } else toast.error("Logout failed");
    } catch {
      toast.error("Error during logout");
    }
  };

  const saveBio = () => {
    setUser((prev) => ({ ...prev, bio }));
    localStorage.setItem("user", JSON.stringify({ ...user, bio }));
    setEditingBio(false);
    toast.success("Bio updated");
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Loading Profile...</p>
      </div>
    );

  return (
    <section className="min-h-screen py-8 px-4 bg-gradient-to-r from-gray-50 to-purple-100 flex flex-col items-center">
      <button onClick={() => navigate(-1)} className="self-start mb-4 text-blue-600 flex items-center gap-1 hover:underline">
        <FaArrowLeft /> Back
      </button>

      <div className="bg-white shadow-xl rounded-xl max-w-5xl w-full p-6 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={user.photo || "https://via.placeholder.com/150"}
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-md"
            alt="User"
          />
          <h2 className="text-2xl font-bold mt-4 flex items-center gap-2">{user.name} <MdOutlineVerified className="text-purple-600" /></h2>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
            <FaLocationDot /> {user.location || "No location"}
          </p>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => navigate(`/update_user/${user._id}`)}
              className="bg-gray-200 px-4 py-1 rounded-full text-gray-700 hover:bg-gray-300"
            >
              <FaUserEdit className="inline mr-1" /> Edit
            </button>
            <button
              onClick={logoutHandler}
              className="bg-red-500 px-4 py-1 rounded-full text-white hover:bg-red-600"
            >
              <MdOutlineLogout className="inline mr-1" /> Logout
            </button>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">About</h3>
          {editingBio ? (
            <>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                rows="4"
              ></textarea>
              <div className="flex gap-2">
                <button onClick={() => setEditingBio(false)} className="bg-gray-200 px-4 py-1 rounded">Cancel</button>
                <button onClick={saveBio} disabled={!bio.trim()} className="bg-blue-500 px-4 py-1 text-white rounded disabled:bg-blue-300">Save</button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">{bio || "No bio added."}</p>
          )}
          {!editingBio && (
            <button onClick={() => setEditingBio(true)} className="text-blue-600 mt-2 hover:underline">{bio ? "Edit" : "Add"} Bio</button>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md w-full max-w-5xl p-4">
        <h3 className="text-lg font-bold mb-4">More Service Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.filter(p => p._id !== user._id).map((p) => (
            <div key={p._id} className="border border-gray-300 rounded-xl p-3 flex flex-col items-center hover:shadow-lg">
              <img
                src={p.photo || "https://via.placeholder.com/100"}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <p className="font-semibold mt-2 cursor-pointer hover:underline" onClick={() => navigate(`/Service-profile/${p._id}`)}>{p.name}</p>
              <p className="text-sm text-gray-500 text-center">{p.about || "No details"}</p>
              <button
                onClick={() => { setSelcetedConversation(p); navigate("/msg"); }}
                className="mt-2 px-3 py-1 bg-purple-500 text-white text-xs rounded-full hover:bg-purple-600"
              >
                Message
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;