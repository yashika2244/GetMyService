



import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAccounts } from "../../context/AppContext";
import useConversation from "../../stateManage/useConversation";

const AllServiceProfile = () => {
  const { accounts } = useAccounts();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelcetedConversation } = useConversation();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = accounts.find((acc) => acc._id === id);
    setProfile(user);
  }, [accounts, id]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-lg animate-pulse">Fetching profile data...</p>
      </div>
    );
  }

  const { name, photo, about, location, experience } = profile;
  const totalExperience = experience?.reduce((sum, exp) => {
    const start = new Date(exp.startdate);
    const end = new Date(exp.enddate);
    return sum + Math.abs(end - start) / (1000 * 60 * 60 * 24 * 365);
  }, 0).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 py-10 px-4 flex flex-col items-center">
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-8 text-sm text-blue-700 hover:underline flex items-center gap-1"
      >
        <span>&larr;</span> Back
      </button>

      <div className="bg-white shadow-2xl rounded-xl w-full max-w-5xl p-8 flex flex-col md:flex-row items-center gap-10">
        <img
          src={photo || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-md"
        />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-500 mt-1 text-sm">{location || "Location not specified"}</p>

          <button
            onClick={() => {
              setSelcetedConversation(profile);
              navigate("/msg");
            }}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow hover:scale-105 transition"
          >
            Message {name}
          </button>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">About</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {about || "No about information provided."}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Experience</h2>
            <p className="text-gray-600 text-sm">{totalExperience} years</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Similar Professionals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.filter(user => user._id !== id).map(user => (
            <div key={user._id} className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center hover:shadow-xl transition">
              <img
                src={user.photo || "https://via.placeholder.com/100"}
                alt="Other User"
                className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-200"
              />
              <p
                onClick={() => navigate(`/Service-profile/${user._id}`)}
                className="text-blue-600 font-semibold cursor-pointer hover:underline text-center"
              >
                {user.name}
              </p>
              <p className="text-xs text-gray-500 mt-1 text-center">{user.about || "No details"}</p>
              <button
                onClick={() => {
                  setSelcetedConversation(user);
                  navigate("/msg");
                }}
                className="mt-3 px-4 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600"
              >
                Message
              </button>
            </div>
          ))}
          {accounts.length <= 1 && (
            <p className="text-sm text-gray-500">No other profiles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllServiceProfile;

