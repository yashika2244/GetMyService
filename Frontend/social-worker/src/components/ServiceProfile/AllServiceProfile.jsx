



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
    <div className="min-h-screen bg-gray-100 py-8 px-3 flex flex-col items-center">

  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="w-full max-w-6xl mb-4 text-sm text-blue-600 hover:underline"
  >
    ← Back
  </button>

  <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">

    {/* ===== LEFT PANEL ===== */}
    <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">

      <img
        src={photo || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover shadow-sm"
      />

      <h2 className="mt-3 text-lg font-semibold text-gray-800">{name}</h2>

      <p className="text-sm text-gray-500 mt-1">
        {location || "Location not specified"}
      </p>

      <div className="mt-3">
        <p className="text-xs text-gray-500">Experience</p>
        <p className="font-semibold text-gray-700">{totalExperience} Years</p>
      </div>

      <button
        onClick={() => {
          setSelcetedConversation(profile);
          navigate("/msg");
        }}
        className="mt-4 w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
      >
        Message {name}
      </button>
    </div>

    {/* ===== RIGHT PANEL ===== */}
    <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-md">

      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        About Professional
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed">
        {about || "No about information provided."}
      </p>

      {/* Divider */}
      <div className="my-6 h-[1px] bg-gray-200 rounded"></div>

      {/* Similar Professionals */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Similar Professionals
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {accounts
          .filter((user) => user._id !== id)
          .map((user) => (
            <div
              key={user._id}
              className="bg-gray-50 rounded-lg p-3 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-2">

                <img
                  src={user.photo || "https://via.placeholder.com/100"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p
                    onClick={() => navigate(`/Service-profile/${user._id}`)}
                    className="text-sm font-semibold cursor-pointer hover:text-blue-600"
                  >
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-500 line-clamp-1">
                    {user.about || "No details"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelcetedConversation(user);
                  navigate("/msg");
                }}
                className="mt-2 w-full py-1.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
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
</div>

  );
};

export default AllServiceProfile;

