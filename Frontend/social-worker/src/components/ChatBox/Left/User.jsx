import React, { useState, useMemo, useEffect } from "react";
import Users from "./Users";
import { useAccounts, useAuth } from "../../../context/AppContext";
import UserGetAtll from "../../../context/UserGetAll";
import { BASE_URL, token } from "../../../config";
import Loading from "../../Loading";

function User() {
  const [allUsers, loading] = UserGetAtll();
  const { accounts } = useAccounts();
  const { user } = useAuth();
  const [chatList, setChatList] = useState([]);

  /*  FETCH CHAT USERS  */
  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/chat/chat-users/${user._id}/${user.role}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setChatList(data);
      } catch (error) {
        console.error("Error loading chat list", error);
      }
    };

    if (user?._id) fetchChatUsers();
  }, [user]);

  /*  FILTER + SORT USERS  */
  const filteredUsers = useMemo(() => {
    const chatById = new Map(chatList.map((u) => [u._id, u]));

    const serviceProviders = Array.isArray(accounts)
      ? accounts
          .filter((acc) => acc._id !== user._id)
          .map((sp) => ({
            ...sp,
            lastMessageAt: chatById.get(sp._id)?.lastMessageAt || null,
            isChatPartner: chatById.has(sp._id),
          }))
      : [];

    const chatCustomers = Array.isArray(chatList) ? chatList : [];

    const combined = [...serviceProviders];

    chatCustomers.forEach((cust) => {
      if (
        !combined.find(
          (acc) => acc?._id?.toString() === cust?._id?.toString()
        )
      ) {
        combined.push(cust);
      }
    });

    combined.sort((a, b) => {
      const aTime = a.lastMessageAt
        ? new Date(a.lastMessageAt).getTime()
        : 0;
      const bTime = b.lastMessageAt
        ? new Date(b.lastMessageAt).getTime()
        : 0;
      return bTime - aTime;
    });

    return combined;
  }, [accounts, allUsers, chatList, user]);

  const chatPartnerIds = useMemo(
    () => new Set(chatList.map((u) => u?._id)),
    [chatList]
  );

 
  return (
    <div
      style={{ maxHeight: "72vh" }}
      className="flex-userContainer overflow-y-auto no-scrollbar px-1"
    >
      {loading ? (
        <Loading/>
      ) : filteredUsers.length > 0 ? (
        filteredUsers.map((usr, index) => (
          <Users
            key={usr?._id || index}
            user={usr}
            isChatPartner={chatPartnerIds.has(usr?._id)}
          />
        ))
      ) : (
        <div className="flex items-center justify-center py-10">
          <p className="text-gray-400 text-sm">No users found</p>
        </div>
      )}
    </div>
  );
}

export default User;
