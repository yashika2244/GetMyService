import React, { useState, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { useAccounts } from "../../context/AppContext";
import useConversation from "../../stateManage/useConversation.js";
import goodJob from "../../assets/goodJob.jpg";

function GetProfileFromSearch() {
  const [expanded, setExpanded] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [getService, setGetService] = useState(null);
  const { selcetedConversation, setSelcetedConversation } = useConversation();

  const [allProfiles, setAllProfiles] = useState([]);

  const { accounts, loading, error } = useAccounts();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const toggleSetting = () => setSettingOpen(!settingOpen);

  const [selectedSerPreference, setSelectedSerPreference] = useState(null);

  const profileData = getService || location.state || {};
  const { name, locate, photo, rating, about, experience } = profileData;

  useEffect(() => {
    if (location.state) {
      setGetService(location.state);
    } else if (id) {
      fetch(`${BASE_URL}/api/services/${id}`)
        .then((res) => res.json())
        .then((data) => setGetService(data))
        .catch((err) => toast.error("Error fetching single service:", err));
    }
  }, [id, location.state]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setAllProfiles(data))
      .catch((err) => toast.error("Error fetching all profiles:", err));
  }, []);
  if (!accounts) return <p>Loading...</p>;

  const text = about || "";

  const shortText = text.slice(0, 270);

  return (
    <div>
      <section className="min-h-screen bg-purple-100 md:mt-13 pt-6 md:pr-25 md:px-7 flex">
        <div className="w-full flex">
          <div className="flex-1 min-w-0 ">
            <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-10 mb-2">
              {/* Top Section */}
              <FaArrowLeft
                className="text-xl md:mt-0 mt-4 ml-3"
                onClick={() => navigate(-1)}
              />

              <div className="md:relative w-full rounded-xl ">
                {/* Profile Image */}
                <div className="md:absolute top-0 md:mt-14 ">
                  <img
                    // src={accounts.photo}
                    src={
                      photo ||
                      "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                    }
                    alt={name}
                    className="md:w-36 md:h-36 w-28 h-28 mt-8 md:mt-0 rounded-full shadow-lg object-cover"
                  />
                </div>
                {/* Background Image */}
                <div
                  className="hidden md:w-60 md:h-44 bg-cover ml-auto md:flex justify-end rounded-xl"
                  style={{
                    backgroundImage: `url("https:i1.wp.com/retiredandtravelling.com/wp-content/uploads/2019/03/WorldClassCover-2019-03-2-22-42.jpg?fit=1106%2C737&ssl=1")`,
                  }}
                ></div>
              </div>
              {/* Info */}
              <div className="flex md:justify-start md:mt-8 mt-3">
                <div className="flex flex-col justify-start ">
                  <div className="flex items-center md:gap-2 md:text-2xl text-xl font-semibold">
                    <h1>{name}</h1>
                    <MdOutlineVerified className="text-slate-700 mt-1" />
                  </div>
                  <h2 className="text-gray-700 font-normal text-md">{about}</h2>
                  <div className="flex flex-wrap items-center gap-1 md:mt-0 mt-2 text-sm text-slate-500">
                    <FaLocationDot />
                    <h2 className="text-gray-800 font-normal text-md">
                      {locate || "not location available"}
                    </h2>
                 
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-4  ">
                    <button
                      onClick={() => {
                        selcetedConversation();
                        navigate("/msg");
                      }}
                      className="px-6 py-1 rounded-full bg-sky-700 text-white font-semibold hover:bg-sky-900 transition duration-300 cursor-pointer "
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
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

            {/* Experience Section */}
            <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
              <h1 className="font-semibold text-xl text-gray-900">
                {" "}
                Experience
              </h1>

              <p className="text-lg text-gray-800 mt-2">
                {Array.isArray(experience) && experience.length > 0
                  ? `${experience
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

            {/* Setting Section */}
            <div className="max-w-[800px] ml:5 md:ml-20 md:h-[7px] bg-white border border-gray-300 shadow-lg rounded-xl p-2 mb-2">
              <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto ">
                <div className="w-full bg-white rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Sidebar with More Profiles */}
          <div className="hidden md:flex flex-col ml-6 w-[300px]  shrink-0">
            <div className="w-full h-[250px] border border-gray-300 overflow-hidden rounded-xl">
              <img src={goodJob} alt="Quotes" className="h-full rounded-xl" />
            </div>
            <div className="mt-2 h-[calc(100vh-5px)]  border border-gray-300 rounded-xl bg-white w-[300px] custom-scroll overflow-y-auto">
              <div className="pt-6 pl-6 pb-2 font-bold text-slate-800">
                More profiles for you
              </div>
              {/* Map through allProfiles except current profile */}
              {allProfiles.length > 0 ? (
                allProfiles
                  .filter((profile) => profile._id !== id)
                  .map((profile, index) => (
                    <div
                      key={profile._id}
                      className="flex cursor-pointer  px-5 py-2 gap-4 "
                    >
                      <img
                        src={
                          profile.photo && profile.photo.trim() !== ""
                            ? profile.photo
                            : "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                        }
                        alt={profile.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <h3
                          className="text-slate-900 font-semibold"
                          onClick={() =>
                            navigate(`/Services-profile/${profile._id}`, {
                              state: {
                                ...profile,
                                locate:
                                  profile.location || "Location nott available",
                                experience: profile.experience,
                              },
                            })
                          }
                        >
                          {profile.name}
                        </h3>
                        <span className="text-sm font-normal text-slate-700">
                          {profile.about}
                        </span>
                        <button
                          className="mr-2 py-1 w-[150px] mt-2 rounded-xl border border-sky-700 text-sky-700 bg-white font-semibold hover:text-sky-900 hover:outline cursor-pointer hover:bg-sky-50 transition duration-300"
                          onClick={() => {
                            setSelcetedConversation(profile);
                            navigate("/msg");
                          }}
                        >
                          Message
                        </button>
                        {index !== allProfiles.length - 1 && (
                          <div className="border-b border-gray-300 mt-5  mb-4" />
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <p className="p-4 text-gray-400">No more profiles found.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetProfileFromSearch;
