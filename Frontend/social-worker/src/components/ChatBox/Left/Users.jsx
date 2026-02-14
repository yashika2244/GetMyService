import React from "react";
import useConversation from "../../../stateManage/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function Users({ user }) {
  if (!user) return null;

  const {
    selcetedConversation,
    setSelcetedConversation,
    unreadCounts,
    clearUnreadCount,
  } = useConversation();

  const { onlineUsers } = useSocketContext();

  const userId = user._id.toString();
  const isSelected = selcetedConversation?._id?.toString() === userId;
  const isOnline = onlineUsers.includes(userId);
  const newMsgCount = unreadCounts[userId] || 0;

  const handleSelect = (e) => {
    setSelcetedConversation(user);
    clearUnreadCount(userId);

    if (e?.currentTarget) {
      e.currentTarget.blur();
    }
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={(e) => handleSelect(e)}
      className={`
relative flex items-center gap-3 px-3 py-2.5 mx-1 rounded-xl cursor-pointer
border border-transparent
outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none
[WebkitTapHighlightColor:transparent]
transition-all duration-200 group
${isSelected ? "bg-blue-50 !border-blue-200 shadow-sm" : "hover:bg-blue-50/70"}
active:scale-[0.99]
`}
    >
      {/* LEFT ACCENT BAR (Selected) */}
      {isSelected && (
        <span className="absolute  left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-600 rounded-r-full" />
      )}

      {/* AVATAR */}
      <div className="relative  w-12 h-12 rounded-full overflow-hidden border border-blue-100 bg-white shadow-sm">
        <img
          src={
            user.photo ||
            "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
          }
          alt="user"
          className="w-full h-full object-cover"
        />

        {/* ONLINE DOT */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
        )}
      </div>

      {/* USER INFO */}
      <div className="flex flex-col flex-1 min-w-0">
        <h1
          className={`
            font-semibold truncate
            ${isSelected ? "text-blue-700" : "text-gray-800"}
          `}
        >
          {user.name || "User"}
        </h1>

        <span className="text-xs text-gray-400 truncate">{user.email}</span>
      </div>

      {/* UNREAD BADGE */}
      {newMsgCount > 0 && (
        <div className="flex items-center gap-1">
          {/* Blue Dot */}
          <span className="w-2 h-2 bg-blue-500 rounded-full" />

          {/* Count */}
          <span className="bg-blue-600 text-white text-[11px] font-medium rounded-full px-2 py-0.5 min-w-[20px] text-center shadow">
            {newMsgCount}
          </span>
        </div>
      )}
    </div>
  );
}

export default Users;
