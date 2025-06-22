import React from "react";
import ChatUser from "./ChatUser";
import Msg from "./Msg";
import Types from "./Types";
import useConversation from "../../../stateManage/useConversation.js";
import { useEffect } from "react";
import { useAuth } from "../../../context/AppContext.jsx";
import Loading from "../../Loading.jsx";

function Right() {
  const { selcetedConversation, setSelcetedConversation } = useConversation();


  useEffect(() => {
    return () => setSelcetedConversation(null); // only run on unmount
  }, []);
  return (

  <div className="w-full h-full flex flex-col bg-slate-950 text-white">
  {!selcetedConversation ? (
    <Nochat />
  ) : (
    <>
      <ChatUser />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 chat-scroll overflow-y-auto">
          <Msg />
        </div>
        <Types />
      </div>
    </>
  )}
</div>
  );
}

export default Right;

const Nochat = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center font-semibold text-xl ">
          {" "}
          No conversation selected <br />
          Select a conversation to start a chat
        </h1>
        {/* {user.name   && <Nochat/>} */}
      </div>
    </>
  );
};
