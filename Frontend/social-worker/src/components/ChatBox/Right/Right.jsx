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

  // useEffect(() => {
  //    return () => setSelcetedConversation(null);
  // }, [selcetedConversation]);
  useEffect(() => {
    return () => setSelcetedConversation(null); // only run on unmount
  }, []);
  return (
    <div className=" w-full  bg-slate-950 text-white   "
    >
      <div>
        {!selcetedConversation ? (
          <Nochat />
        ) : (
          <>
            <ChatUser />
              {/* // className=" py-2 flex-userContainer   overflow-y-auto" */}
                       <div className="flex-1 overflow-y-auto"
                     style={{ maxHeight: "calc(67.5vh)" }} >
              <Msg />
            </div>
            <Types />
          </>
        )}
      </div>
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
