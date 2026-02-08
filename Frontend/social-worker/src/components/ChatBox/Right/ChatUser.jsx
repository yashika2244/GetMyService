import React from "react";
import useConversation from "../../../stateManage/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function ChatUser() {
  const { selcetedConversation, setSelcetedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const navigate = useNavigate();

  const isOnline = onlineUsers.includes(selcetedConversation?._id);

  const handleNameClick = () => {
    if (!selcetedConversation) return;

    if (selcetedConversation.role === "customer") {
      navigate(`/users-profile/${selcetedConversation._id}`);
    } else if (
      selcetedConversation.role === "service-provider" ||
      selcetedConversation.role === "servicer"
    ) {
      navigate(`/service-profile/${selcetedConversation._id}`);
    }
  };

  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-sm">

      {/* BACK BUTTON (MOBILE) */}
      <FaArrowLeft
        className="md:hidden text-gray-600 text-lg cursor-pointer hover:text-blue-600 transition"
        onClick={() => setSelcetedConversation(null)}
      />

      {/* AVATAR */}
      <div className="relative">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-blue-100 shadow-sm">
          <img
            src={
              selcetedConversation?.photo ||
              "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ONLINE DOT */}
        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
            isOnline ? "bg-green-500" : "bg-gray-300"
          }`}
        />
      </div>

      {/* USER INFO */}
      <div className="flex flex-col">
        <h1
          className="text-[15px] md:text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition"
          onClick={handleNameClick}
        >
          {selcetedConversation?.name}
        </h1>

        <span
          className={`text-xs md:text-sm ${
            isOnline ? "text-green-600" : "text-gray-400"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default ChatUser;
