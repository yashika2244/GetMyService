// import React from "react";
// import { IoIosSettings } from "react-icons/io";
// import { MdEdit } from "react-icons/md";
// import doll from "../../assets/doll-1.jpeg";
// import { MdOutlineLogout } from "react-icons/md";
// import { MdArrowForwardIos } from "react-icons/md";
// import { useState } from "react";
// import {BASE_URL} from '../../config'
// import  {  useEffect } from "react";



// function UserProfile() {
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }, []);
//   const [settingOpen, setsettingOpen] = useState(false);
//   const toggleSetting = () => {
//     setsettingOpen(!settingOpen);
//   };

//   const logoutHandler = async () => {
//     try {
//       // Logout request to server (you can modify this part based on your API)
//       const res = await fetch(`${BASE_URL}/api/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
  
//       if (res.ok) {
//         // Remove user details from localStorage and set user state to null
//         window.location.href = "/";
//         localStorage.removeItem("user");
//         setUser(null); // This will trigger re-render and login button will appear
//       } else {
//         console.log("Logout failed");
//       }
//     } catch (error) {
//       console.log("Logout error:", error.message);
//     }
//   };

//   return (
//     <section className="min-h-screen mt-10">
//       <div className="flex flex-col items-center justify-center">
//         {/* Cover Image */}
//         <div className="flex flex-col items-center justify-center max-w-[1000px] w-full lg:px-8">
//           <div className="w-full relative   cursor-pointer lg:h-[58vh] md:h-[50vh] sm:h-[40vh] h-[23vh] overflow-hidden rounded-lg">
//             <img src="https://wallpapercave.com/wp/wp7085311.jpg" alt="" className="w-full h-full object-cover" />
//           </div>

//           <div className="absolute bottom-0 left-0 right-0 h-20  rounded-lg"></div>
//         </div>

//         {/* Profile Image + Name + Button bg-[#f0f2f5] hover:bg-[#e7eaee] bg-gradient-to-t from-black/50 to-transparen*/}
//         <div className="flex flex-col md:flex-row items-center md:gap-6  relative md:w-[1000px] w-full lg:pl-15 lg:mt-[-85px] mt-[-80px] justify-center">
//           {/* Profile Image */}
//           <div className="flex justify-center">
//             <div className=" w-40 h-40 border-2  shadow-xl shadow-white border-gray-300 rounded-full overflow-hidden flex items-center justify-center">
//               {/* Image */}
//               <img    
//                src={user?.photo || "https://static.vecteezy.com/system/resources/previews/026/434/417/original/default-avatar-profile-icon-of-social-media-user-photo-vector.jpg"} alt="Profile" 
//                className="w-full h-full object-cover" />
//             </div>
//           </div>

//           {/* Details */}
//           <div className="flex flex-col items-center lg:items-start md:flex-row lg:gap-4 lg:justify-between lg:pr-12   mt-3 lg:mt-25 w-full text-center md:text-left">
//             <div className="">
//               <h1 className="text-3xl font-bold">{user?.name}</h1>
//               <h2 className="text-md text-gray-600 font-medium">My Location</h2>
//             </div>
//             {/* edit button */}
//             <div>
//               <button className="mt-4 px-4 py-2 bg-gray-200 text-black font-[500] cursor-pointer rounded-lg hover:bg-gray-300 transition flex items-center gap-1">
//                 <MdEdit className="text-lg" /> {/* Icon size adjustment */}
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Intro section with pink background */}
//       <div className="w-full mt-10 lg:h-[400px]">
//         <div className="bg-[#e7ecf3c5]  border-t-2 border-gray-200 py-6">
//           <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto px-4">
//             <div className="w-full bg-white md:h-[45vh] sm:h-[40vh] h-[30vh]  rounded-lg">
//               <div>
//                 <h1 className=" md:p-8 p-5 text-2xl font-bold"> Intro</h1>
//                 <div className="flex flex-col gap-4 md:gap-8">
//                   <button className="lg:w-1/2  bg-gray-200 hover:bg-gray-300 cursor-pointer transition font-medium py-2 px-5 mx-8 rounded-lg">
//                     Add Bio
//                   </button>
//                   <button className="lg:w-1/2  bg-gray-200 hover:bg-gray-300 cursor-pointer transition font-medium py-2 px-5 mx-8 rounded-lg">
//                     Edit Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>


        
//             </div>
//       {/* services */}
//       <div className="w-full mt-2 min-h-[400px]">
//         <div className="  py-6">
//           <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto px-4">
//             <div className="w-full border border-gray-200 shadow-lg bg-[#e4e9f1c5] md:h-[50vh] sm:h-[40vh] h-[50vh] overflow-y-auto  rounded-lg">
//               <div>
//                 <h1 className=" p-6 text-2xl font-bold ">
//                   My Booking Services List
//                 </h1>
//                 <div className="flex flex-col gap-3">
//                   <div className="flex items-center gap-6 bg-white mx-3 rounded-xl p-1 cursor-pointer">
//                     <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
//                       <img
//                         src={doll}
//                         className="w-full h-full object-cover rounded-full"
//                         alt=""
//                       />
//                     </div>
//                     <h1 className="lg:text-xl font-bold"> Health care </h1>
//                   </div>

//                   <div className="flex  items-center gap-6 bg-white mx-3 rounded-xl p-1">
//                     <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
//                       <img
//                         src={doll}
//                         className="w-full h-full object-cover rounded-full"
//                         alt=""
//                       />
//                     </div>
//                     <h1 className="lg:text-xl font-bold"> Health care </h1>
//                   </div>
//                   <div className="flex  items-center gap-6 bg-white mx-3 rounded-xl p-1">
//                     <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
//                       <img
//                         src={doll}
//                         className="w-full h-full object-cover rounded-full"
//                         alt=""
//                       />
//                     </div>
//                     <h1 className="lg:text-xl font-bold"> Health care </h1>
//                   </div>
//                   <div className="flex  items-center gap-6 bg-white mx-3 rounded-xl p-1">
//                     <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
//                       <img
//                         src={doll}
//                         className="w-full h-full object-cover rounded-full"
//                         alt=""
//                       />
//                     </div>
//                     <h1 className="lg:text-xl font-bold"> Health care </h1>
//                   </div>
//                   <div className="flex  items-center gap-6">
//                     <div className="  ml-3 w-14 h-14  rounded-full overflow-hidden ">
//                       <img
//                         src={doll}
//                         className="w-full h-full object-cover rounded-full"
//                         alt=""
//                       />
//                     </div>
//                     <h1 className="text-xl font-bold"> Health care </h1>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* setting */}
//       <div className="w-full   mb-2">
//         <div className="bg-[#e3e8f0c5]  border-t-2 border-gray-200 py-6">
//           <div className="flex flex-col items-center justify-center max-w-[1000px] w-full mx-auto px-4">
//             <div className="w-full bg-white   rounded-lg">
//               <div>
//                 <div className="flex items-center gap-2 p-4 text-slate-700">
//                   <IoIosSettings className="text-3xl" />
//                   <h1 className=" text-2xl font-bold"> Setting</h1>
//                   <MdArrowForwardIos
//                     onClick={toggleSetting}
//                     className={`ml-5 mt-2 text-xl cursor-pointer transition-transform ${
//                       settingOpen ? "rotate-90" : ""
//                     }`}
//                   />
//                 </div>
//                 {settingOpen && (
                 
//                   <div
//                     className={`overflow-y-auto transition-all duration-500 pl-5 p-3 text-slate-600 flex flex-col ${
//                       settingOpen ? "max-h-[300px]" : "max-h-0"
//                     }`}
//                   >
                
//                     <h1 className=" text-md font-[500] cursor-pointer transition hover:bg-gray-200 p-1 mx-3 rounded-md">
//                       Delete Account{" "}
//                     </h1>
//                     <div className="flex items-center gap-1 mt-3 transition hover:bg-gray-200 p-1 mx-3 rounded-md">
//                       <MdOutlineLogout />
//                       <h1 className="text-md font-[500] cursor-pointer    " 
//                   onClick={logoutHandler}>
//                         Logout
//                       </h1>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default UserProfile;



import React, { useState, useEffect } from "react";
import { IoIosSettings } from "react-icons/io";
import { MdEdit, MdOutlineLogout, MdKeyboardArrowDown } from "react-icons/md";
import doll from "../../assets/doll-1.jpeg";
import { BASE_URL } from "../../config";

const BookingCard = ({ img, title }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
    <img
      src={img}
      alt={title}
      className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-indigo-500"
    />
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
  </div>
);

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // Simulated booking data — replace with your API if needed
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
        alert("Logout failed, please try again.");
      }
    } catch (err) {
      alert("An error occurred during logout.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-xl font-medium">Loading Profile...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-10 max-w-5xl mx-auto">
      {/* Cover Image */}
      <div className="relative rounded-lg overflow-hidden h-48 sm:h-64 shadow-md">
        <img
          src="https://wallpapercave.com/wp/wp7085311.jpg"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-lg shadow-md p-6 -mt-16 sm:-mt-20 relative z-10">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
          <img
            src={
              user.photo ||
              "https://static.vecteezy.com/system/resources/previews/026/434/417/original/default-avatar-profile-icon-of-social-media-user-photo-vector.jpg"
            }
            alt={`${user.name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-8 text-center sm:text-left flex-grow">
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600 mt-1">{user.location || "Location not specified"}</p>
          <button
            className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            onClick={() => alert("Edit Profile clicked")}
          >
            <MdEdit size={20} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intro</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-indigo-100 text-indigo-700 py-3 rounded-lg font-semibold hover:bg-indigo-200 transition">
            Add Bio
          </button>
          <button className="flex-1 bg-indigo-100 text-indigo-700 py-3 rounded-lg font-semibold hover:bg-indigo-200 transition">
            Edit Details
          </button>
        </div>
      </div>

      {/* Bookings */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-10 max-h-96 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Booking Services List</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">No bookings found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map(({ id, title, img }) => (
              <BookingCard key={id} title={title} img={img} />
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-10">
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
              onClick={() => alert("Delete Account feature coming soon")}
              className="text-left px-3 py-2 rounded hover:bg-red-100 text-red-600 font-semibold transition"
            >
              Delete Account
            </button>
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
    </section>
  );
};

export default UserProfile;
