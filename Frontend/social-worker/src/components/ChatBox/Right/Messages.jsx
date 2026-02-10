import React from "react";
import { useAuth } from "../../../context/AppContext";

function Messages({ message }) {
  if (!message || !message.message) return null;
  const { user } = useAuth();

  const itsMe =
    message.senderId === user._id ||
    (message.sender?.id === user._id && message.sender?.role === user.role);

  const alignment = itsMe ? "justify-end" : "justify-start";

  /* 🔵 GRADIENT BLUE BUBBLE */
  const bubbleColor = itsMe
    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-[500]"
    : "bg-blue-100 text-blue-900 font-[500]";

  const borderRadius = itsMe ? "rounded-br-none" : "rounded-bl-none";

  const createAt = new Date(message.createdAt);
  const formateTime = createAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${alignment} p-1`}>
      <div
        className={`relative ${bubbleColor} px-4 pr-14 py-1 rounded-xl ${borderRadius} max-w-xs shadow-md`}
      >
        {message.message}

        {/* TIME */}
        <div
          className={`text-[10px] absolute bottom-0 right-2 ${
            itsMe ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {formateTime}
        </div>

        {/* 🔻 CHAT BUBBLE TAIL (MATCH COLOR) */}
        <div
          className={`absolute bottom-0 w-0 h-0
          border-t-[8px] border-t-transparent
          border-b-[8px] border-b-transparent
          ${
            itsMe
              ? "border-l-[8px] border-l-blue-600 right-0"
              : "border-r-[8px] border-r-blue-100 left-0"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default Messages;
