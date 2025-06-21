import React, { useEffect, useState } from "react";
import Loading from "../../Loading.jsx";
import Messages from "./Messages.jsx";
import { useRef } from "react";
import useGetMessage from "../../../context/useGetMessage.js";

function Msg() {
  const { loading, messages } = useGetMessage();
  const containerRef = useRef();
  const safeMessages = Array.isArray(messages) ? messages : [];
  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 100);
  }, [messages]);
  return (
    <>
      <div
        ref={containerRef}
        className="flex-1  chat-scroll  overflow-y-auto "
        style={{ minHeight: "calc(69vh)", maxHeight: "calc(69vh)" }}
      >
        {loading ? (
          <Loading />
        ) : safeMessages.length === 0 ? (
          <p className="text-center mt-[20%] text-white">
            {" "}
            Hey !<br />
            Let's Start Conversation
          </p>
        ) : (
          safeMessages.map((message, index) => (
            <div key={message?._id || index}>
              <Messages message={message} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Msg;
