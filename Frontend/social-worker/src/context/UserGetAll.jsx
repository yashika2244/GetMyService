import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../config";

function UserGetAtll() {
  const [allUsers, setAllUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/users/getUserprofile`, {
          credentials: "include",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setAllUsers(data);
        setLoading(false);
      } catch (error) {
        console.log("error is UserGetAtll" + error);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default UserGetAtll;
