import React from "react";
import Msg from "./Msg";
import AccontList from "../account/AccontList";
import { IoSend } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, photo, id, loc, peragraph , accounts} = location.state || {};
  return (
    <section className="md:pt-10 mt-10 md:pl-20 md:pr-20 md:mb-20">
      <div className="border border-gray-300 rounded-2xl shadow-lg min-h-screen  mx-auto flex flex-col relative">
        {/* Chat Navigation Header */}
        <nav className=" md:rounded-t-2xl bg-gray-300 text-white h-[55px] md:py-8 py-7 px-6 flex items-center justify-between border border-b-gray-300 rounded-b-md shadow-lg">
          <div className="flex items-center gap-4 text-black">
            <FaArrowLeft
              onClick={() => navigate("/msg")}
              className="md:text-lg "
            />

            <img
              src={photo}
              alt=""
              className="w-10 h-10 rounded-full object-cover "
            />

            <h2
              className="text-lg font-semibold"
              onClick={() => navigate(`/Service-profile/${id}`, { state: { title, photo, id, loc,peragraph, accounts} })}
            >
              {title || "User Name"}
            </h2>
          </div>
        </nav>

        {/* Chat Messages Area */}
        <div className="flex-1  p-6 space-y-4 bg-white flex  flex-col-reverse h-[calc(100vh-200px)] overflow-y-auto">
          {/* Message from Support */}
          <div className="self-start bg-gray-200 text-gray-800 px-4 py-2   rounded-lg max-w-xs lg:pr-17 relative  pr-16">
            Hello! How can I help you today?
            <span className="absolute bottom-1 right-2  text-[13px]   text-gray-800">
              1:20 AM
            </span>
          </div>

          {/* Message from User */}
          <div className="self-end bg-blue-600 mb-4 mt-2 text-white px-4 py-2 rounded-lg max-w-xs relative md:pr-17 pr-16">
            I need help with my order.
            <span className="absolute bottom-1 right-2  text-[13px]   text-gray-200">
              1:20 AM
            </span>
          </div>
          <div className="self-start bg-gray-200 text-gray-800 px-4 py-2    rounded-lg max-w-xs md:pr-17 relative pr-16 ">
            Hello! How can I help you today?
            <span className="absolute bottom-1 right-2  text-[13px]   text-gray-800">
              1:20 AM
            </span>
          </div>

          <div className="self-end bg-blue-600 mb-4 text-white px-4 py-2  mt-2 rounded-lg max-w-xs relative md:pr-17 pr-16">
            I need help with my order.
            <span className="absolute bottom-1 right-2  text-[13px]   text-gray-200">
              1:20 AM
            </span>
          </div>

          <div className="self-start bg-gray-200 text-gray-800 px-4 py-2   rounded-lg max-w-xs ">
            Hello! How can I help you today?
          </div>
        </div>

        {/* Fixed Chat Input */}
        <div className="sticky bottom-0  bg-white rounded-b-2xl p-4  flex items-center gap-2 border-t border-gray-200">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 md:px-4 px-2 py-1 md:text-lg md:py-2 border text-md  border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-blue-800  md:px-4 md:py-4 cursor-pointer md:text-2xl text-xl px-2 py-2 rounded-full hover:bg-gray-300 transition">
            <IoSend />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Chat;
