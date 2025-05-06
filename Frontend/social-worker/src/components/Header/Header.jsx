import React, { useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import y from "../../assets/y-2.jpg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function Header() {
  const navigate = useNavigate();
  //  const loginpage = () => {
  //   navigate('/login')

  //  }

  const headerRef = useRef(null);
  // const { user, role, token } = useContext(authContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-[#0d1f3b] fixed top-0 lg:py-2 left-0 max-md:h-[45px] w-full flex items-center justify-between h-[55px] ] px-8 text-white z-20">
      {/* Logo */}
      <div className="flex items-center">
        <img
          onClick={() => navigate("/")}
          src="/images/w-2.jpeg"
          alt="Logo"
          className="w-9 object-cover rounded-4xl mx-auto sm:mx-0 hover:scale-110 transition-transform cursor-pointer"
        />
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-16 cursor-pointer items-center ml-40 ">
        {[
          { name: "Home", path: "/" },
          { name: "Find a service", path: "/find-Service" },
          { name: "Contact Us", path: "/contact" },
          { name: "Services +", path: "/services" },
        ].map(({ name, path }) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold scale-110 transition-transform border-b-2 border-b-yellow-400 pb-1"
                  : "text-white font-semibold hover:text-yellow-400 hover:scale-110 transition-transform inline-block"
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Login Button */}

      <button
       onClick={()=>navigate('/login')}
        className="mr-3 bg-yellow-400 text-gray-900 px-4 py-1 md:px-6 md:py-2 rounded-full font-semibold hover:bg-yellow-500 transition-all shadow-md hover:scale-[0.9] duration-300 cursor-pointer"
      >
        Login
      </button>

      {/* img Container */}
      {/* <div className="flex flex-row justify-center items-center gap-2 mr-4 ">
        <div className="w-[40px] h-[40px]  rounded-full  md:mr-0  overflow-hidden relative ">
          <img
            src={y}
            alt=""
            className="object-cover md:w-full md:h-full  absolute inset-0 cursor-pointer "
            onClick={() => navigate("/User-profile")}
          />
        </div>

        <IoChatbubbleEllipsesOutline
          className="lg:text-3xl text-xl cursor-pointer transition-all transform hover:scale-[0.9] duration-300"
          onClick={() => navigate("/msg")}
        />
      </div> */}

      {/* ✅ Now this is outside of the ternary */}
      <button
        className="md:hidden text-white text-2xl cursor-pointer absolute top-1 right-3"
        onClick={toggleSidebar}
      >
        <FaBars className="w-6 h-10 text-white hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-blue-800 shadow-2xl w-80 p-6 transform ${
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } transition-all duration-500 ease-in-out z-50 overflow-y-auto`}
      >
        <button onClick={toggleSidebar} className="absolute top-4 right-4 ">
          <BiX className=" w-10 h-10 cursor-pointer text-gray-300 hover:text-red-600 transition-transform hover:rotate-90 duration-300" />
        </button>

        {/* Sidebar Links */}
        <ul className="mt-16 flex flex-col gap-8 text-lg ">
          {[
            { name: "Home", path: "/home" },
            { name: "About", path: "/about" },
            { name: "Contact Us", path: "/contact" },
            { name: "Services +", path: "/services" },
          ].map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className=" text-gray-300 font-semibold transition hover:text-yellow-400 hover:translate-x-2 inline-block duration-300"
                onClick={toggleSidebar} // Close sidebar on link click
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Click Outside to Close Sidebar */}
      {isSidebarOpen && (
        <div className=" opacity-50 z-10" onClick={toggleSidebar}></div>
      )}
    </nav>
  );
}

export default Header;
