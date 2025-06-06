import React from "react";
import Left from "./Left/Left";
import Right from "./Right/Right";
import useConversation from "../../stateManage/useConversation.js";

function Chats() {
  const { selcetedConversation } = useConversation();
  return (
    <div className="h-[89vh md:mt-18 mt-11 flex overflow-hidden ">
      <div
        className={` text-white  ${
          selcetedConversation ? "hidden" : "block"
        } w-full md:w-[35%] md:block `}
      >
        <Left />
      </div>

      <div
        className={`${
          selcetedConversation ? "block" : "hidden"
        } w-full md:block md:w-full bg-slate-950`}
      >
        <Right />
      </div>
    </div>
  );
}

export default Chats;
