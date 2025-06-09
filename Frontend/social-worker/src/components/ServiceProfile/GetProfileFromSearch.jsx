

import React, { useState, useEffect } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { useAccounts } from "../../context/AppContext";


function GetProfileFromSearch() {
  const [expanded, setExpanded] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [searchService, setService] = useState(null);
  const [getService, setGetService] = useState(null);

  const [allProfiles, setAllProfiles] = useState([]);

  const { accounts, loading, error } = useAccounts();

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();


  // Toggle setting section
  const toggleSetting = () => setSettingOpen(!settingOpen);
  const {name, locate, photo, rating, about}  = location.state


  // Fetch single profile by id if not passed from state
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
        Authorization: `Bearer ${token}`, // yaha apna valid JWT token daalo
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

  const text = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi rerum modi dicta voluptatem deleniti! 
    Molestias veniam quis deserunt vero vitae. Lorem ipsum dolor, sit amet consectetur adipisicing elit.`;

  const shortText = text.slice(0, 270);

  return (
    <div>
      <section className="min-h-screen bg-purple-100 md:mt-13 pt-6  md:px-7 flex">
        <div>
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
                  src={photo || "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
                  alt={accounts.name}
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
                <h2 className="text-gray-700 font-normal text-md">
                  {about}
                </h2>
                <div className="flex flex-wrap items-center gap-1 md:mt-0 mt-2 text-sm text-slate-500">
                  <FaLocationDot />
                  <h2 className="text-gray-800 font-normal text-md">
                    {locate || "not location available"}
                  </h2>
                  <span className="font-bold text-lg md:mb-1">·</span>
                  <Link
                    to="/contact"
                    className="hidden md:inline hover:underline text-blue-600 font-semibold"
                  >
                    Contact info
                  </Link>
                </div>
                <div className="flex gap-1 text-sm md:text-slate-500 text-sky-700 font-medium">
                  <span className="">1500</span>
                  <span>connections</span>
                </div>

                {/* Buttons */}
                <div className="md:flex flex-wrap gap-3 mt-4 hidden ">
                  <button className="px-6 py-1 rounded-full bg-sky-700 text-white font-semibold hover:bg-sky-900 transition duration-300 cursor-pointer ">
                    Connect
                  </button>
                  <button className="px-4 py-[2px] rounded-4xl text-sky-700 border border-sky-700 font-[600] hover:text-sky-900 hover:outline hover:bg-sky-100 transition transform duration-300 cursor-pointer ">
                    Message
                  </button>
                  <button className="px-4 rounded-4xl bg-white text-slate-700 border border-slate-700 font-[600] hover:outline hover:text-slate-900 hover:bg-slate-100 transition-all transform duration-300 cursor-pointer ">
                    More
                  </button>
                </div>
              </div>
            </div>
            {/* mini screen btn */}
            <div className="flex md:hidden justify-center items-center mt-7">
              <button className="bg-blue-400 w-full py-2 rounded-4xl text-white font-semibold cursor-pointer hover:bg-sky-600 duration-300 ">
                Open to
              </button>
            </div>

            {/* Open to Work Section */}
            <div className="mt-6 bg-indigo-100 p-4 rounded-xl text-sm max-w-xl ">
              <h3 className="text-gray-900 font-semibold">Open to work</h3>
              <p className="text-gray-800">
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit Lorem ipsum
                dolor amet...
              </p>
              <Link
                className="text-sky-700 font-medium hover:underline"
                to="/details"
              >
                Show details
              </Link>
            </div>
          </div>

          {/* About Section */}
          <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
            <h1 className="font-semibold text-xl text-gray-900"> About</h1>

            <p className="text-[14px] font-[400] mt-3 text-slate-800">
              {expanded ? text : `${shortText}...`}
            </p>
            <span className="flex justify-end">
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-1 text-slate-600 font-semibold hover:underline"
              >
                {expanded ? "see less" : "...see more"}
              </button>
            </span>
          </div>

          {/* Experience Section */}
          <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 md:p-5 mb-2">
            <h1 className="font-semibold text-xl text-gray-900"> Experience</h1>
            <h2 className="pt-3 pl-2 text-slate-800 font-medium">4 years +</h2>
          </div>

          {/* Rating Section */}
          <div className="max-w-[800px] ml:5 md:ml-20 bg-white border mb-2 border-gray-300 shadow-lg rounded-xl p-2 md:p-5 ">
            <h1 className="font-semibold text-xl text-gray-900">Rate</h1>
            <span className="flex items-center gap-2 pt-3">
              <h1 className="text-xl">4.8</h1>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-lg ${
                      index < rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </span>
          </div>

          {/* Setting Section */}
          <div className="max-w-[800px] ml:5 md:ml-20 bg-white border border-gray-300 shadow-lg rounded-xl p-2 mb-2">
            <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto ">
              <div className="w-full bg-white rounded-lg">
                <div
                  className="flex items-center gap-2 md:py-4 text-slate-700 cursor-pointer"
                  onClick={toggleSetting}
                >
                  <IoIosSettings className="md:text-3xl text-2xl" />
                  <h1 className="font-semibold text-xl text-gray-900">
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
                  <div
                    className={`overflow-y-auto transition-all duration-500 pl-5 p-3 text-slate-600 flex flex-col ${
                      settingOpen ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <h1 className="text-[15px] font-[500] cursor-pointer transition hover:bg-gray-200 md:p-1 mx-3 rounded-md">
                      Book Now
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with More Profiles */}
        <div className="hidden md:flex flex-col ml-6">
          <div className="w-[300px] h-[250px] border border-gray-300 overflow-hidden rounded-xl">
            <img
              src="https:cdn.quotesgram.com/img/19/14/1132406686-11268773_m.jpg"
              alt="Quotes"
              className="h-full rounded-xl"
            />
          </div>
          <div className="mt-2 h-[calc(100vh-5px)] border border-gray-300 rounded-xl bg-white w-[300px] overflow-y-auto">
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
                    onClick={() =>
                      navigate(`/Services-profile/${profile._id}`, { state: profile,  })
                    }
                  >
                    <img
                      src={profile.photo && profile.photo.trim() !== "" ? profile.photo : "/default-placeholder.png"}
                      alt={profile.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-slate-900 font-semibold">
                        {profile.name}
                      </h3>
                      <span className="text-sm font-normal text-slate-700">
                        {profile.about}
                      </span>
                       <button
                          className="mr-2 py-1 w-[150px] mt-2 rounded-xl border border-sky-700 text-sky-700 bg-white font-semibold hover:text-sky-900 hover:outline cursor-pointer hover:bg-sky-50 transition duration-300"
                          onClick={() => navigate("/msg")}
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
      </section>
    </div>
  );
}

export default GetProfileFromSearch;
