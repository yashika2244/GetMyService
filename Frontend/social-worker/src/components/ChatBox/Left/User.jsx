

import React, { useState, useMemo, useEffect } from "react";
import Users from "./Users";
import { useAccounts, useAuth } from "../../../context/AppContext";
import UserGetAtll from "../../../context/UserGetAll";
import { BASE_URL, token } from "../../../config";

function User() {
  const [allUsers, loading] = UserGetAtll();
  const { accounts } = useAccounts();
  const { user } = useAuth();
  const [chatList, setChatList] = useState([]);

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


 const filteredUsers = useMemo(() => {
    const chatById = new Map(chatList.map(u => [u._id, u]));
    
    const serviceProviders = Array.isArray(accounts)
      ? accounts.filter((acc) => acc._id !== user._id) 
      .map(sp => ({
          ...sp,
          // if this provider also chatted, grab their lastMessageAt; otherwise null
          lastMessageAt: chatById.get(sp._id)?.lastMessageAt || null,
          // mark if they are an active chat partner
          isChatPartner: chatById.has(sp._id)
        }))
      : [];

    const allCustomers = Array.isArray(allUsers?.filterUser)
      ? allUsers.filterUser
      : [];

    const chatCustomers = Array.isArray(chatList) ? chatList : [];

    const combined = [...serviceProviders];


    // Add only those customers who messaged and not already in the list
    chatCustomers.forEach((cust) => {
      if (!combined.find((acc) => acc?._id.toString() === cust?._id.toString())) {
        combined.push(cust);
      }
    });
  // Sort combined users by lastMessageAt descending
  combined.sort((a, b) => {
    const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
    const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;

    return bTime - aTime;
  });

    return combined;

  }, [accounts, allUsers, chatList, user]);

  const chatPartnerIds = useMemo(() => new Set(chatList.map((u) => u?._id)), [chatList]);
  return (
    <div
      style={{ maxHeight: "calc(72vh)" }}
      className="flex-userContainer overflow-y-auto"
    >
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user, index) => (
          <Users key={user?._id || index} user={user} isChatPartner={chatPartnerIds.has(user?._id)} />
        ))
      ) : (
        <p className="text-white px-6 py-4">No users found.</p>
      )}
    </div>
  );
}

export default User;
