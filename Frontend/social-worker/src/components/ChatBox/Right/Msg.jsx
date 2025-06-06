import React, { useEffect, useState } from "react";
import useGetMessage from "../../../context/useGetMessage.js";
import Loading from "../../Loading.jsx";
import Messages from "./Messages.jsx";
import { useRef } from "react";
import useConversation from "../../../stateManage/useConversation.js";
import useGetSocketMessage from "../../../context/useGetSocketMessage.js";

function Msg() {
  const [newMessage, setNewMessage] = useState(null)
  const { loading, messages } = useGetMessage();


  console.log("message:",messages)
  if (messages) {
    setNewMessage(messages)
    
  }
  console.log("new messages:", newMessage)



  useGetSocketMessage();

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);
  return (
    <>
      {/* <div style={{ minHeight: "calc(67.5vh)" }}> */}
      <div
        className="flex-1 overflow-y-auto "
        style={{ minHeight: "calc(68vh)" }}
      >
        {loading ? (
          <Loading />
        ) : (
          Array.isArray(messages) &&
          messages.length > 0 &&
          messages.map((message, index) => (
            <div key={message?._id || index}>
              {" "}
              <Messages message={message} />
            </div>
          ))
        )}
        {!loading && Array.isArray(messages) && messages.length === 0 && (
          <div>
            <p className="text-center mt-[20%] text-white">Say hii</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Msg;
