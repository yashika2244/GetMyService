
import React, { useEffect, useRef } from "react";
import Loading from "../../Loading.jsx";
import Messages from "./Messages.jsx";
import useGetMessage from "../../../context/useGetMessage.js";

function Msg() {
  const { loading, messages } = useGetMessage();
  const lastMessageRef = useRef();

  const safeMessages = Array.isArray(messages) ? messages : [];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); 

  return (
    <div className="flex-1 overflow-y-auto space-y-2">
      {loading ? (
        <Loading />
      ) : safeMessages.length === 0 ? (
        <p className="text-center mt-[20%] text-white">
          Hey !<br />
          Let's Start Conversation
        </p>
      ) : (
        safeMessages.map((message, index) => (
          <div
            key={message?._id || index}
            ref={index === safeMessages.length - 1 ? lastMessageRef : null}
          >
            <Messages message={message} />
          </div>
        ))
      )}
    </div>
  );
}

export default Msg;
