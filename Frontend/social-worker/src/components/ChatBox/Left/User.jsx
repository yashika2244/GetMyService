import React, { useState } from "react";
import Users from "./Users";
import { useAccounts, useAuth } from "../../../context/AppContext";
import UserGetAtll from "../../../context/UserGetAll";

function User() {
  const [allUsers, loading] = UserGetAtll();

  // const {accounts} = useAccounts()
  // console.log("accounts is in accounts", accounts)

  return (
    <div
      style={{ maxHeight: "calc(72vh)" }}
      className="flex-userContainer  overflow-y-auto"
    >
      
      {Array.isArray(allUsers?.filterUser) && allUsers.filterUser.length > 0 ? (
        allUsers.filterUser.map((user, index) => (
          <Users key={user._id || index} user={user} />
        ))
      ) : (
        <p className="text-white px-6 py-4">No user found.</p>
      )}
    </div>
  );
}

export default User;
