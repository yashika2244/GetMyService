



import { IoSend } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useAuth } from "../../context/AppContext";

import { useAccounts } from "../../context/AppContext";

function Chat() {
  const { user } = useAuth(); // Current logged-in user from context
  const navigate = useNavigate();
  const location = useLocation();
  const { accounts: allAccounts } = useAccounts(); // 🔁 fallback accounts from context
  const { name, photo, id, loc, about, accounts, rating, experience } =
    location.state || {};
    console.log("accounts h yha pr chat me",accounts )

  return (
    <section className="md:pt-10 mt-10 md:pl-20 md:pr-20 md:mb-20">
      <div className="border border-gray-300 rounded-2xl shadow-lg min-h-screen mx-auto flex flex-col relative">
        
        {/* Chat Header with navigation and profile info */}
        <nav className="md:rounded-t-2xl bg-gray-300 text-white h-[55px] md:py-8 py-7 px-6 flex items-center justify-between border border-b-gray-300 rounded-b-md shadow-lg">
          <div className="flex items-center gap-4 text-black">
            <FaArrowLeft
              onClick={() => navigate("/msg")}
              className="md:text-lg cursor-pointer"
            />
            <img
              src={photo}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h2
              className="text-lg font-semibold cursor-pointer"
              onClick={() =>
                navigate(`/Service-profile/${id}`, {
                  state: {
                    name,
                    photo,
                    id,
                    loc,
                    about,
        accounts : allAccounts, // 🔁 fallback here
  
                    rating,
                    experience,
                  },
                })
              }
            >
              {name}
            </h2>
          </div>
        </nav>

        {/* Static Chat UI (for design only) */}
        <div className="flex-1 p-6 space-y-4 bg-white flex flex-col-reverse h-[calc(100vh-200px)] overflow-y-auto">
          <div className="self-start bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs relative pr-16">
            Hello! How can I help you today?
            <span className="absolute bottom-1 right-2 text-[13px] text-gray-800">1:20 AM</span>
          </div>

          <div className="self-end bg-blue-600 mb-4 mt-2 text-white px-4 py-2 rounded-lg max-w-xs relative pr-16">
            I need help with my order.
            <span className="absolute bottom-1 right-2 text-[13px] text-gray-200">1:20 AM</span>
          </div>

          <div className="self-start bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs relative pr-16">
            Hello! How can I help you today?
            <span className="absolute bottom-1 right-2 text-[13px] text-gray-800">1:20 AM</span>
          </div>

          <div className="self-end bg-blue-600 mb-4 text-white px-4 py-2 mt-2 rounded-lg max-w-xs relative pr-16">
            I need help with my order.
            <span className="absolute bottom-1 right-2 text-[13px] text-gray-200">1:20 AM</span>
          </div>
        </div>

        {/* Input area (UI only for now) */}
        <div className="sticky bottom-0 bg-white rounded-b-2xl p-4 flex items-center gap-2 border-t border-gray-200">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 md:px-4 px-2 py-1 md:text-lg md:py-2 border text-md border-gray-300 rounded-full bg-gray-100 text-gray-500 cursor-not-allowed"
          />
          <button
            className="text-blue-800 md:px-4 md:py-4 text-2xl px-2 py-2 rounded-full bg-gray-100  cursor-not-allowed"
          >
            <IoSend />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Chat;

