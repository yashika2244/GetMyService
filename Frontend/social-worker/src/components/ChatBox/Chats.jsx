import React from "react";
import { motion } from "framer-motion";
import Left from "./Left/Left";
import Right from "./Right/Right";
import useConversation from "../../stateManage/useConversation.js";

function Chats() {
  const { selcetedConversation } = useConversation();

  return (
    <div className="h-screen pt-14 bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center items-center px-3 overflow-hidden">

      {/* Main Wrapper */}
      <div className="w-full max-w-7xl h-[85vh] bg-white/70 backdrop-blur-xl border border-blue-100 shadow-[0_20px_60px_rgba(37,99,235,0.15)] flex overflow-hidden rounded-2xl">

        {/* LEFT PANEL */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`
            ${selcetedConversation ? "hidden md:flex" : "flex"}
            flex-col w-full md:w-[30%] lg:w-[27%]
            bg-white border-r border-blue-100
            overflow-hidden
          `}
        >
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <Left />
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`
            ${selcetedConversation ? "flex" : "hidden md:flex"}
            flex-col flex-1 bg-gradient-to-b from-blue-50 via-white to-blue-50
            overflow-hidden
          `}
        >
          <div className="flex-1 overflow-hidden">
            <Right />
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Chats;
