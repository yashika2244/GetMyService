import React, { useState, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { FaLocationDot, FaArrowLeft, FaStar } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAccounts } from "../../context/AppContext";
import { useAuth } from "../../context/AppContext";
import useConversation from "../../stateManage/useConversation.js";
import goodjob from '../../assets/goodjob.jpg'
import JobPreferenceModal from "./ServicePRefence.jsx";


function AllServiceProfile() {
  const { accounts } = useAccounts();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const { selcetedConversation, setSelcetedConversation } = useConversation();
const [selectedSerPreference, setSelectedSerPreference] = useState(null);
  useEffect(() => {
    if (Array.isArray(accounts) && accounts.length > 0 && id) {
      const matchedProfile = accounts.find((profile) => profile._id === id);
      setProfile(matchedProfile);
    }
  }, [accounts, id]);

  // const text = `Lorem ipsum dolorm dolor sit c`;
  const text = profile?.about || "";
  const shortText = text.slice(0, 270);

const [showModal, setShowModal] = useState(false);
const openModal = () => {
  setSelectedSerPreference(profile); // jobPreference teri profile ke andar hona chahiye
  setShowModal(true);
};

  const closeModal = () => setShowModal(false);
  return (
    <div>
      <section className="min-h-screen bg-purple-100 md:mt-13 pt-6 md:px-7 md:pr-25 flex ">
        {/* Left and Right Sections */}
        <div className="md:flex md:w-full ">
          {/* Left Main Profile Section */}
          <div className="flex-1 min-w-0">
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
                  <h2 className="text-gray-700 font-normal text-md">
                    {profile?.about}
                  </h2>
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
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={() => {
                        setSelcetedConversation(profile);
                        navigate("/msg");
                      }}
                      className="px-6 py-1 rounded-full bg-sky-700 text-white font-semibold hover:bg-sky-900 transition duration-300"
                    >
                      Message
                    </button>
                    <button className="px-4 py-[2px] rounded-4xl text-sky-700 border border-sky-700 font-semibold hover:text-sky-900 hover:outline hover:bg-sky-100 transition duration-300">
                      More
                    </button>
                  </div>
                </div>
              </div>

              {/* Open to Work */}
              <div className="mt-6 bg-indigo-100 p-4 rounded-xl text-sm max-w-xl min-h-[80px]">
                <h3 className="text-gray-900 font-semibold">Open to work</h3>
                <p className="text-gray-800">
                  Looking for full-time frontend opportunities in React.js
                </p>
                     
             <p  onClick={openModal}> show details </p>
              </div>
            </div>

            {/* About Section */}
            <div className="max-w-[800px] w-full min-h-[150px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
              <h1 className="font-semibold text-xl text-gray-900">About</h1>
              <p className="text-[14px] font-[400] mt-3 text-slate-800 min-h-[40px]">
                {expanded ? text : `${shortText}...`}
              </p>
              <span className="flex justify-end">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-1 text-slate-600 font-semibold hover:underline"
                >
                  {expanded ? "See less" : "...see more"}
                </button>
              </span>
            </div>

            {/* Experience Section */}
            <div className="max-w-[800px] w-full min-h-[120px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
              <h1 className="font-semibold text-xl text-gray-900">
                Experience
              </h1>
              <p className="text-lg text-gray-800 mt-2">
                {Array.isArray(profile?.experience) &&
                profile?.experience.length > 0
                  ? `${profile?.experience
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

            <div className="max-w-[800px] w-full min-h-[5px]  ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2"></div>
          </div>

          {/* Right Side Profile Section */}
          <div className="hidden md:flex flex-col w-[300px] shrink-0">
            <div className="w-full h-[250px] border border-gray-300 overflow-hidden rounded-xl">
              <img
                src={goodjob}
                alt=""
                className="h-full w-full object-cover rounded-xl"
              />
            </div>

            <div className="mt-2 h-[calc(100vh-5px)] border border-gray-300 rounded-xl bg-white w-full custom-scroll overflow-y-auto">
              <div className="pt-6 pl-6">
                <h2 className="font-semibold text-gray-900">
                  More profiles for you
                </h2>
              </div>

              {Array.isArray(accounts) && accounts.length > 0 ? (
                accounts
                  .filter((p) => p._id !== id)
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
              {/* Job Preference Modal */}
                 {showModal && <JobPreferenceModal data={selectedSerPreference} onClose={closeModal} />}
        </div>
      
      </section>
    </div>
  );
}

export default AllServiceProfile;
