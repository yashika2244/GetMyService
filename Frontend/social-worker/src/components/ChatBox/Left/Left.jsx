import React from "react";
import Search from "./Search";
import { AiOutlineMessage } from "react-icons/ai";
import User from "./User";

function Left() {
  return (
    <div className="h-full flex flex-col bg-white text-gray-800">

      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-blue-100">

        <div className="flex items-center gap-3 px-5 py-4">

          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
            <AiOutlineMessage className="text-2xl text-blue-600" />
          </div>

          <h1 className="text-xl font-semibold">Chats</h1>
        </div>

        <div className="px-4 pb-3">
          <Search />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-2 py-2 space-y-1">
        <User />
      </div>
    </div>
  );
}

export default Left;
