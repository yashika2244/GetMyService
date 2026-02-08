import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import UseSendMessage from "../../../context/UseSendMessage.js";

function Types() {
  const { loading, sendMessages } = UseSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessages(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-blue-200 border-t border-blue-100 px-3 py-2"
    >
      <div className="flex items-center gap-2">

        {/* INPUT */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full border border-blue-100 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-gray-400 text-sm"
        />

        {/* SEND BUTTON */}
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className={`
            w-10 h-10 flex items-center justify-center rounded-full text-white
            transition-all duration-200 shadow-sm
            ${
              loading || !message.trim()
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }
          `}
        >
          <IoMdSend className="text-lg" />
        </button>
      </div>
    </form>
  );
}

export default Types;
