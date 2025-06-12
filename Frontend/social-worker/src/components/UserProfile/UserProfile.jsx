
// import React, { useState, useEffect } from "react";
// import { IoIosSettings } from "react-icons/io";
// import { MdEdit, MdOutlineLogout, MdKeyboardArrowDown } from "react-icons/md";
// import doll from "../../assets/doll-1.jpeg";
// import { BASE_URL } from "../../config.js";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

// const BookingCard = ({ img, title }) => (
//   <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
//     <img
//       src={img}
//       alt={title}
//       className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-indigo-500"
//     />
//     <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//   </div>
// );

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [bookings, setBookings] = useState([]);

//   const navigate = useNavigate()


//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       // Simulated booking data — replace with your API if needed
//       setBookings([
//         { id: 1, title: "Health Care", img: doll },
//         { id: 2, title: "Dental Care", img: doll },
//         { id: 3, title: "Physiotherapy", img: doll },
//       ]);
//     }
//   }, []);

//   const logoutHandler = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//       if (res.ok) {
//         localStorage.removeItem("user");
//         setUser(null);
//         window.location.href = "/";
//       } else {
//         toast.error("Logout failed, please try again.");
//       }
//     } catch (err) {
//       toast.error("An error occurred during logout.");
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-500 text-xl font-medium">Loading Profile...</p>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gray-50 px-5 py-10 max-w-5xl mx-auto">
//       {/* Cover Image */}
//       <div className="relative rounded-lg overflow-hidden h-48 sm:h-64 shadow-md">
//         <img
//           // src="https://wallpapercave.com/wp/wp7085311.jpg" 
//           alt="Cover"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
//       </div>

//       {/* Profile Info */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-lg shadow-md p-6 -mt-16 sm:-mt-20 relative z-10">
//         <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
//           <img
//             src={
//               user.photo ||
//               "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
//             }
//             alt={`${user.name}'s profile`}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="mt-4 sm:mt-0 sm:ml-8 text-center sm:text-left flex-grow">
//           <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
//           <p className="text-gray-600 mt-1">
//             {user.location || "Location not specified"}
//           </p>
//           <button
// onClick={()=>navigate(`/update_user/${user._id}`)}
//             className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
//           >
//             <MdEdit size={20} />
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Intro Section */}
//       <div className="bg-white rounded-lg shadow-md p-6 mt-10">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intro</h2>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <button className="flex-1 bg-indigo-100 text-indigo-700 py-3 rounded-lg font-semibold hover:bg-indigo-200 transition">
//             Add Bio
//           </button>
//           <button className="flex-1 bg-indigo-100 text-indigo-700 py-3 rounded-lg font-semibold hover:bg-indigo-200 transition">
//             Edit Details
//           </button>
//         </div>
//       </div>

//       {/* Bookings */}
//       <div className="bg-white rounded-lg shadow-md p-6 mt-10 max-h-96 overflow-y-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//           My Booking Services List
//         </h2>
//         {bookings.length === 0 ? (
//           <p className="text-gray-500 text-center">No bookings found.</p>
//         ) : (
//           <div className="flex flex-col gap-4">
//             {bookings.map(({ id, title, img }) => (
//               <BookingCard key={id} title={title} img={img} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Settings */}
//       <div className="bg-white rounded-lg shadow-md p-6 mt-10">
//         <button
//           onClick={() => setSettingsOpen(!settingsOpen)}
//           className="flex justify-between items-center w-full text-gray-800 font-semibold text-lg px-3 py-2 rounded-lg hover:bg-gray-100 transition"
//           aria-expanded={settingsOpen}
//           aria-controls="settings-menu"
//         >
//           <span className="flex items-center gap-2">
//             <IoIosSettings size={24} />
//             Settings
//           </span>
//           <MdKeyboardArrowDown
//             size={24}
//             className={`transform transition-transform duration-300 ${
//               settingsOpen ? "rotate-180" : "rotate-0"
//             }`}
//           />
//         </button>
//         {settingsOpen && (
//           <div
//             id="settings-menu"
//             className="mt-4 flex flex-col gap-3 text-gray-700"
//           >
//             <button
//               onClick={() => alert("Delete Account feature coming soon")}
//               className="text-left px-3 py-2 rounded hover:bg-red-100 text-red-600 font-semibold transition"
//             >
//               Delete Account
//             </button>
//             <button
//               onClick={logoutHandler}
//               className="text-left px-3 py-2 rounded hover:bg-red-100 text-red-600 font-semibold transition flex items-center gap-2"
//             >
//               <MdOutlineLogout size={20} />
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </section>

//   );
// };

// export default UserProfile;








import React, { useState, useEffect } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { MdEdit, MdOutlineLogout, MdOutlineDeleteOutline } from "react-icons/md";
import doll from "../../assets/doll-1.jpeg";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ img, title }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-md shadow-md hover:shadow-lg transition cursor-pointer">
    <img
      src={img}
      alt={title}
      className="w-14 h-14 rounded-full object-cover border-2 border-teal-500"
    />
    <h3 className="text-md font-semibold text-slate-800">{title}</h3>
  </div>
);

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setBio(parsedUser.bio || "");
      setBookings([
        { id: 1, title: "Health Care", img: doll },
        { id: 2, title: "Dental Care", img: doll },
        { id: 3, title: "Physiotherapy", img: doll },
      ]);
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
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, bio })
    );
    toast.success("Bio updated");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 text-lg font-medium">Loading Profile...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen  mt-18 bg-slate-50 px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Left Panel */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-teal-400 shadow-md">
          <img
            src={
              user.photo ||
            "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
            }
            alt={`${user.name} profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-slate-700"> Name :   {user.name}</h2>
        <p className="text-teal-600 font-medium mt-1">Location : {user.location || "No location set"}</p>
        <button
          onClick={() => navigate(`/update_user/${user._id}`)}
          className="mt-5 w-full bg-teal-600 text-white py-2 rounded-md shadow hover:bg-teal-700 transition"
          aria-label="Edit Profile"
        >
          <MdEdit className="inline-block mr-2 text-lg" />
          Edit Profile
        </button>
      </div>

      {/* Right Panel */}
      <div className="md:col-span-2 flex flex-col gap-8">
        {/* Intro Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4 flex justify-between items-center">
            Intro
            {!editingBio && (
              <button
                onClick={() => setEditingBio(true)}
                className="text-teal-600 font-semibold hover:underline"
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
            <p className="text-slate-700">{bio || "No bio added yet."}</p>
          )}
        </div>

        {/* Bookings Card */}
        <div className="bg-white rounded-lg shadow-md p-6 max-h-[300px] custom-scroll overflow-y-auto">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">My Booking Services</h3>
          {bookings.length ? (
            <div className="flex flex-col gap-4">
              {bookings.map(({ id, title, img }) => (
                <BookingCard key={id} title={title} img={img} />
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center">No bookings found.</p>
          )}
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex justify-between items-center w-full font-semibold text-slate-700 text-lg px-3 py-2 rounded-md hover:bg-slate-100 transition"
            aria-expanded={settingsOpen}
            aria-controls="settings-menu"
          >
            <span className="flex items-center gap-2">
              <IoSettingsSharp size={22} />
              Settings
            </span>
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${
                settingsOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {settingsOpen && (
            <div
              id="settings-menu"
              className="mt-4 flex flex-col gap-3 text-slate-700"
            >
              {/* <button
                onClick={() => alert("Delete Account feature coming soon")}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 text-red-600 font-semibold transition"
              >
                <MdOutlineDeleteOutline size={20} />
                Delete Account
              </button> */}
              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 text-red-600 font-semibold transition"
              >
                <MdOutlineLogout size={20} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
