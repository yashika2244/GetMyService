

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAccounts } from "../../context/AppContext";
import UserGetAtll from "../../context/UserGetAll.jsx";
import useConversation from "../../stateManage/useConversation.js";
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import goodJob from "../../assets/goodJob.jpg";

const AllUserProfiles = () => {
  const [allUsers] = UserGetAtll();
  const { accounts } = useAccounts();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setSelcetedConversation } = useConversation();
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (Array.isArray(allUsers) && allUsers.length > 0 && id) {
      const found = allUsers.find((p) => p._id === id);
      setProfile(found);
    }
  }, [allUsers, id]);

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Loading Profile...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-8 px-4 bg-gradient-to-r from-gray-50  mt-7 to-purple-100 flex flex-col items-center">
      <button onClick={() => navigate(-1)} className="self-start mb-4 text-blue-600 flex items-center gap-1 hover:underline">
        <FaArrowLeft /> Back
      </button>

      <div className="bg-white shadow-xl rounded-xl max-w-5xl w-full p-6 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={profile.photo || "https://via.placeholder.com/150"}
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-md"
            alt="User"
          />
          <h2 className="text-2xl font-bold mt-4 flex items-center gap-2">
            {profile.name} <MdOutlineVerified className="text-purple-600" />
          </h2>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
            <FaLocationDot /> {profile.location || "No location"}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => { setSelcetedConversation(profile); navigate("/msg"); }}
              className="bg-blue-600 px-4 py-1 rounded-full text-white hover:bg-blue-700 text-sm"
            >
              Message
            </button>
          </div>
        </div>

      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md w-full max-w-5xl p-4">
        <h3 className="text-lg font-bold mb-4">More Service Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.filter(p => p._id !== profile._id).map((p) => (
            <div key={p._id} className="border border-gray-300 rounded-xl p-3 flex flex-col items-center hover:shadow-lg">
              <img
                src={p.photo || "https://via.placeholder.com/100"}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <p
                className="font-semibold mt-2 cursor-pointer hover:underline"
                onClick={() => navigate(`/Service-profile/${p._id}`, { state: { id: p._id } })}
              >
                {p.name}
              </p>
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

export default AllUserProfiles;
