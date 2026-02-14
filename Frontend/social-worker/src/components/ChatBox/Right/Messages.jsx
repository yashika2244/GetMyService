import React from "react";
import { useAuth } from "../../../context/AppContext";

function Messages({ message }) {
  if (!message || !message.message) return null;

  const { user } = useAuth();

  const isMyMessage =
    message.senderId === user._id ||
    (message.sender?.id === user._id &&
      message.sender?.role === user.role);

  const alignment = isMyMessage ? "justify-end" : "justify-start";

  const bubbleStyle = isMyMessage
    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium"
    : "bg-blue-100 text-blue-900 font-medium";

  const bubbleRadius = isMyMessage
    ? "rounded-br-none"
    : "rounded-bl-none";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${alignment} p-1`}>
      <div
        className={`relative ${bubbleStyle} px-4 pr-14 py-1 rounded-xl ${bubbleRadius} max-w-xs shadow-md`}
      >
        {message.message}

        <div
          className={`text-[10px] absolute bottom-0 right-2 ${
            isMyMessage ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {formattedTime}
        </div>

        <div
          className={`absolute bottom-0 w-0 h-0
          border-t-[8px] border-t-transparent
          border-b-[8px] border-b-transparent
          ${
            isMyMessage
              ? "border-l-[8px] border-l-blue-600 right-0"
              : "border-r-[8px] border-r-blue-100 left-0"
          }`}
        />
      </div>
    </div>
  );
}

export default Messages;
