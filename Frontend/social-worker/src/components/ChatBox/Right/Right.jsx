import React, { useEffect } from "react";
import ChatUser from "./ChatUser";
import Msg from "./Msg";
import Types from "./Types";
import useConversation from "../../../stateManage/useConversation.js";
import { useAuth } from "../../../context/AppContext.jsx";

function Right() {
  const { selcetedConversation, setSelcetedConversation } = useConversation();

  useEffect(() => {
    return () => setSelcetedConversation(null);
  }, []);

  return (
    <div className="w-full h-full flex flex-col text-gray-800">

      {!selcetedConversation ? (
        <Nochat />
      ) : (
        <>
          {/* HEADER */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-blue-100">
            <ChatUser />
          </div>

          {/* BODY */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.06),transparent_60%)]">
              <Msg />
            </div>

            {/* INPUT */}
            <div className="bg-white border-t border-blue-100">
              <Types />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Right;




/* ================= EMPTY STATE ================= */
const Nochat = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">

      <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.1-3.3A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>

      <h1 className="text-xl font-semibold mb-2">
        No conversation selected
      </h1>

      <p className="text-gray-500 text-sm max-w-md">
        Hey <span className="text-blue-600 font-medium">{user?.name}</span>,  
        select a chat from the left panel to start messaging.
      </p>
    </div>
  );
};
