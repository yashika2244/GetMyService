import React, { useEffect, useRef } from "react";
import Loading from "../../Loading.jsx";
import Messages from "./Messages.jsx";
import useGetMessage from "../../../context/useGetMessage.js";

function Msg() {
  const { loading, messages } = useGetMessage();
  const lastMessageRef = useRef(null);

  const safeMessages = Array.isArray(messages) ? messages : [];

  /* AUTO SCROLL TO LAST MESSAGE */
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [safeMessages]);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-2 py-2 space-y-3">

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loading />
        </div>
      ) : safeMessages.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center h-[60%] text-center">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 mb-3">
            💬
          </div>

          <p className="text-gray-500 text-sm">
            Hey! <br /> Start your conversation
          </p>
        </div>
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
