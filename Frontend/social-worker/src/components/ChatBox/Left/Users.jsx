import React from "react";
import { useAccounts } from "../../../context/AppContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useConversation from "../../../stateManage/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function Users({ user }) {
  if (!user) return null;
  const { selcetedConversation, setSelcetedConversation } = useConversation();
  const isSelected = selcetedConversation?._id === user._id;
const  { onlineUsers } = useSocketContext()
const isOnline = onlineUsers.includes(user._id.toString());

  const { accounts, loading, error } = useAccounts();
  const { id } = useParams(); // id = current profile id from URL

  // useEffect(() => {
  //   if (Array.isArray(accounts) && accounts.length > 0 && id) {
  //     const matchedProfile = accounts.find(profile => profile._id === id);
  //     setProfile(matchedProfile);
  //     console.log("profile is in users", profile)
  //   }

  // }, [accounts, id]);
  // const matchedService = accounts?.find(account => account.email === user.email);

  return (
    <div
      className={`hover:bg-slate-600 duration-300  ${isSelected ? "bg-slate-700":""}`}
      onClick={() => setSelcetedConversation(user)}
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
          <h1 className="font-bold text-white"> {user.name || "user "}</h1>
          <span> {user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default Users;
