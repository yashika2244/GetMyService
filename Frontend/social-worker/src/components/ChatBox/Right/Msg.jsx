import React, { useEffect, useState } from "react";
import Loading from "../../Loading.jsx";
import Messages from "./Messages.jsx";
import { useRef } from "react";
import useConversation from "../../../stateManage/useConversation.js";
import useGetMessage from "../../../context/useGetMessage.js";
import useGetSocketMessage from "../../../context/useGetSocketMessage.js";

function Msg() {
  const { loading, messages } = useGetMessage();
  // const { selcetedConversation, messages, loading} = useConversation();
  // useGetMessage(selcetedConversation?._id);
    const containerRef = useRef();
  
  useGetSocketMessage();

  const safeMessages = Array.isArray(messages) ? messages : [];



  // const lastMessageRef = useRef();
  useEffect(() => {
    
    setTimeout(() => {

     if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    }, 100);

  }, [messages]);
  return (
    <>


       <div    ref={containerRef}
        className="flex-1 overflow-y-auto" style={{ minHeight: "calc(69vh)", maxHeight: "calc(69vh)" }}>
      {loading ? (
        <Loading />
      ) : safeMessages.length === 0 ? (
        <p className="text-center mt-[20%] text-white"> Hey !<br />Let's Start Conversation</p>
      ) : (
        safeMessages.map((message, index) => 
          <div key={message?._id || index}  >
        <Messages message={message} />
          </div>
)    

      // safeMessages.map((message, index) => {
      //     const isLast = index === safeMessages.length - 1;
      //     return (
      //       <div key={message?._id || index} ref={isLast ? lastMessageRef : null}>
      //         <Messages message={message} />
      //       </div>
      //     );
        // })
      )}
    </div>
    </>
  );
}

export default Msg;
