import React, { useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { NavLink, Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import y from "../../assets/y-2.jpg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useAuth } from "../../context/AppContext";

function Header() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleProfileClick = () => {
    if (role === "service-provider") {
      navigate(`/servicer-account/${user?._id}`);
    } else if (role === "customer") {
      navigate(`/user-profile/${user?._id}`);
    }
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/images/mainlogo.png"
            alt="Logo"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-10 items-center text-gray-700 font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Find a service", path: "/find-Service" },
            { name: "Contact Us", path: "/contact" },
          ].map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "hover:text-blue-600 transition"
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* RIGHT ACTIONS */}
        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold
               hover:bg-blue-700 active:scale-[0.97]
               shadow-sm hover:shadow-md
               transition duration-200"
          >
            Book Now
          </button>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            {/* Chat Icon */}
            <div
              className="relative group cursor-pointer"
              onClick={() => navigate("/msg")}
            >
              <IoChatbubbleEllipsesOutline className="text-2xl text-gray-600 group-hover:text-blue-600 transition" />

              {/* soft glow */}
              <span className="absolute inset-0 rounded-full bg-blue-400/10 blur-md opacity-0 group-hover:opacity-100 transition"></span>
            </div>

            {/* Avatar */}
            <div
              onClick={handleProfileClick}
              className="relative w-9 h-9 rounded-full overflow-hidden cursor-pointer
                 border border-gray-200
                 hover:ring-2 hover:ring-blue-500/60
                 shadow-sm hover:shadow-md
                 transition duration-200"
            >
              <img
                src={
                  user?.photo ||
                  "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />

              {/* optional online indicator */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
        )}

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <button onClick={toggleSidebar} className="absolute top-4 right-4">
          <BiX className="w-8 h-8 text-gray-500 hover:text-red-500" />
        </button>

        <ul className="mt-16 flex flex-col gap-6 text-gray-700 font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Find a service", path: "/find-Service" },
            { name: "Contact Us", path: "/contact" },
          ].map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                onClick={toggleSidebar}
                className="hover:text-blue-600 transition"
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {!user && (
          <button
            onClick={() => {
              toggleSidebar();
              navigate("/login");
            }}
            className="mt-10 w-full bg-blue-600 text-white py-2 rounded-full font-semibold"
          >
            Book Now
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
