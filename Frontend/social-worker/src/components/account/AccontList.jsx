import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../../context/AppContext";
import { BASE_URL, token } from "../../config";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function AccountList({ selectedUser, setSelectedUser }) {
  const { accounts, loading, error } = useAccounts();
  const navigate = useNavigate();
  const location = useLocation();
  // const user = location.state;
  const user =
    location.state || JSON.parse(localStorage.getItem("selectedUser"));

  const [conversations, setConversations] = useState([]);

  const [loadings, setLoading] = useState(true);
  const [errors, setError] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/conversations/`, {
          method: "GET",
          credentials: "include", // important if you're using cookies
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // If you're using JWT in header
          },
        });

        if (!res.ok) throw new Error("Failed to fetch chat users");
        const data = await res.json();
        console.log("Fetched conversations:", data);
        setConversations(data); // [{ user: {...}, lastMessage: {...} }]
      } catch (err) {
        console.error(err);
        setError("Failed to load chat users");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // const handleNavigate = ({ ...conv.user, conversationId: conv._id }) => {
  //   // User ko localStorage me save karo
  //   localStorage.setItem("selectedUser", JSON.stringify({ ...conv.user, conversationId: conv._id }));
  //   // localStorage.setItem("selectedUser", JSON.stringify(user));
  //   console.log("user is ssdsdsdsd ", user);

  //   // Fir navigate karo chat page pe
  //   navigate("/msg", { state: user });
  // };
  const handleNavigate = (userObj) => {
    localStorage.setItem("selectedUser", JSON.stringify(userObj));
    navigate("/msg", { state: userObj });
  };

  // const handleNavigate = (account) => {
  //   navigate("/msg", {
  //     state: {
  //       name: account.name || "Service Name Not Available",
  //       photo:
  //         account.photo ||
  //         "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
  //       id: account._id,
  //       loc: account.location || "Location not available",
  //       about: account.about || "No information available",
  //       accounts: accounts,
  //       rating: account.totalRating || "No rating",
  //       experience: account.experience || "Experience not available",
  //     } ,}
  // console.log("acc", account);

  // )}
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="mt-3 ">
      <div className="p-4 space-y-2">
        {conversations.map((conv, i) => (
          <div
            key={conv.user._id}
            // key={i}
            onClick={() => {
              // setSelectedUser({ ...conv.user, conversationId: conv.user._id });
              // setSelectedUser({ ...conv.user, conversationId: conv.user._id });
              const userWithConvId = { ...conv.user, conversationId: conv._id };
              setSelectedUser(userWithConvId);
              handleNavigate(userWithConvId);
            }}
            className={` relative flex items-center gap-2 p-2 pl-4 rounded-md cursor-pointer max-sm:text-sm ${
              selectedUser?._id == conv.user._id && " bg-gray-100"
            }`}
            // className="p-3 bg-white shadow rounded cursor-pointer hover:bg-gray-50"
            // onClick={() => handleNavigate(conv.user)} // ✅ Add this line
            //     onClick={() => {
            // console.log("Clicked user:", conv.user);
            // localStorage.setItem("selectedUser", JSON.stringify(conv.user));
            // navigate("/msg");
            // }}
          >
            <div className="flex items-center gap-3">
              <img
                // src={conv.user.photo || "/default-avatar.jpg"}
                src={
                  conv.user?.photo ||
                  "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                }
                alt={conv.user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p
                  // onClick={() => handleNavigate(conv.user)}
                  className="font-medium"
                >
                  {conv.user?.name || "yashu"}
                </p>
                <p className="text-sm text-gray-500">
                  {conv.lastMessage?.message || "No messages yet"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {accounts.length === 0 ? (
          <p className="text-gray-500">No services available.</p>
        ) : (
          accounts.map((account, index) => (
            <div
              key={account._id}
              onClick={() => {
                setSelectedUser(account);
              }}
              className={` relative flex items-center gap-2 p-2 pl-4 rounded-md cursor-pointer max-sm:text-sm ${
                selectedUser?._id == account._id && " bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-4   ">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-sm">
                  <img
                    src={
                      account.photo ||
                      "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                    }
                    alt={account.name || "Service Name Not Available"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col leading-5">
                  <h2
                    className="text-base font-medium cursor-pointer"
                    onClick={() => {
                      setSelectedUser(account);
                      handleNavigate(account);
                    }}
                  >
                    {account.name || "Service Name Not Available"}{" "}
                  </h2>
                  {index < 3 ? (
                    <span className="text-green-400 text-xs">Active</span>
                  ) : (
                    <span className="text-neutral-400 text-xs">Offline</span>
                  )}
                </div>
                {index > 2 && (
                  <p className=" absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full ">
                    {" "}
                    {index}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AccountList;
