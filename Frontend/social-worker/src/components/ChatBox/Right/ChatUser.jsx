import React from "react";
import useConversation from "../../../stateManage/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function ChatUser() {
  const { selcetedConversation, setSelcetedConversation } = useConversation();
  const { socket, onlineUsers } = useSocketContext();
  const navigate = useNavigate();
  const getOnlineUsers = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  const handleNameClick = () => {
    if (!selcetedConversation) return;

    // Assuming selcetedConversation.role exists and can be "user" or "service"
    if (selcetedConversation.role === "customer") {
      navigate(`/users-profile/${selcetedConversation._id}`);
    } else if (
      selcetedConversation.role === "service-provider" ||
      selcetedConversation.role === "servicer"
    ) {
      navigate(`/service-profile/${selcetedConversation._id}`);
    } else {
      // fallback or unknown role
      console.warn("Unknown user role:", selcetedConversation.role);
    }
  };

  return (
    <div className="flex space-x-4 pl-5 md:pt-5 pt-2 pb-2  md:pb-3 bg-gray-900 hover:bg-gray-600 duration-300">
      <FaArrowLeft
        className="md:hidden"
        onClick={() => setSelcetedConversation(null)}
      />

      <div>
        {/* <div className="avatar online"> */}
        <div className="md:w-14 md:h-14 w-12 h-12 rounded-full">
          <img
            src={
              selcetedConversation.photo ||
              "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
            }
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        {/* </div> */}
      </div>
      <div>
        <h1 className="md:text-xl font-[600] text-md" onClick={handleNameClick}>
          {" "}
          {selcetedConversation.name}
        </h1>
        {/* <h1 className="text-xl">yashu</h1> */}
        <span className="md:text-sm text-[12px] text-gray-200 ">
          {" "}
          {getOnlineUsers(selcetedConversation._id)}
        </span>
      </div>
    </div>
  );
}

export default ChatUser;
