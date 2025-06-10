import React from "react";
import { useAccounts } from "../../../context/AppContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useConversation from "../../../stateManage/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function Users({ user }) {
  if (!user) return null;
    const { accounts } = useAccounts(); 

    const { selcetedConversation, setSelcetedConversation, unreadCounts, clearUnreadCount } = useConversation();


 
  const isSelected = selcetedConversation?._id === user._id;
const  { onlineUsers } = useSocketContext()
const isOnline = onlineUsers.includes(user._id.toString());




  return (
    <div
      className={`hover:bg-slate-600 duration-300  ${isSelected ? "bg-slate-700":""}`    }  
      onClick={() => {  setSelcetedConversation(user)}}   
    >
      <div className="flex space-x-4 px-3 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className="avatar " >
          <div className="  relative  w-14 h-14 rounded-full">
            <img
              src={user.photo  || "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"}
              className=" rounded-full w-full h-full  object-cover"
            />
            {isOnline && (
      <span className="absolute top-0 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
    )}
            
          </div>
        </div>
        <div>
          <h1 className="font-bold text-white"  > {user.name || "user "}  
              
            </h1>
          <span> {user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default Users;
