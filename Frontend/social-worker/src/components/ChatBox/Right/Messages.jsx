

import React from "react";
import { useAuth } from '../../../context/AppContext';

function Messages({ message }) {
  if (!message || !message.message) return null;
  const { user } = useAuth();
  // Check if the message is sent by the logged-in user
  // const itsMe = message.senderId === user._id;
  const itsMe =
    message.sender?.id === user._id &&
    message.sender?.role === user.role;
  // Tailwind classes for alignment and colors
  const alignment = itsMe ? "justify-end" : "justify-start";
  const bubbleColor = itsMe ? " bg-blue-400 text-white  font-[500]" : "bg-gray-600 text-white  font-[500]";
  const borderRadius = itsMe ? "rounded-br-none" : "rounded-bl-none";
  const createAt = new Date(message.createdAt)
  const formateTime = createAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute:'2-digit'
  })

  return (
    <div className={`flex ${alignment} p-3`}>
      <div className={`relative ${bubbleColor} px-4 pr-15 py-2 rounded-xl ${borderRadius} max-w-xs shadow-md`}>
        {message.message}
  <div className={`text-[10px] absolute bottom-0  right-2  text-black ${itsMe ? "text-right" : "text-left"}`}>
        {formateTime}
      </div>
        {/* Tail of the chat bubble */}
        <div
          className={`absolute bottom-0 w-0 h-0
            border-t-[8px] border-t-transparent
            border-b-[8px] border-b-transparent
            ${itsMe
              ? "border-l-[8px] border-l-blue-400 right-0"
              : "border-r-[8px] border-r-gray-600 left-0"
            }`}
        ></div>
      </div>
      {/* <div className="">
        {formateTime}
      </div> */}
      
    </div>
  );
}

export default Messages;




