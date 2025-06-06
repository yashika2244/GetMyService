// import React, { useEffect, useState, useRef } from "react";
// import { IoMdSend } from "react-icons/io";
// import { FaArrowLeft } from "react-icons/fa6";
// import { data, useNavigate } from "react-router-dom";
// import { TfiGallery } from "react-icons/tfi";
// import { useAuth } from "../../context/AppContext";
// import { useSocket } from "../../context/Socket";
// import { BASE_URL } from "../../config";
// import { useAccounts } from "../../context/AppContext";
// import { useLocation } from "react-router-dom";

// function Chat({ selectedUser, setSelectedUser }) {
//   const { user, token } = useAuth();
//   const { socket } = useSocket();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { accounts: allAccounts } = useAccounts(); // 🔁 fallback accounts from context
//   const { name, photo, id, loc, about, accounts, rating, experience } =
//     location.state || {};
//   // Listen to window resize to reset chat view if user resizes screen
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   const AllmessagesEndRef = useRef(null);
//   const messagesContainerRef = useRef(null);
//   const [isAtBottom, setIsAtBottom] = useState(true);
//  useEffect(() => {
//     const fetchMessages = async () => {
//       if (!user?.conversationId) return;

//       try {
//         const res = await fetch(`${BASE_URL}/api/messages/${user.conversationId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         setMessages(data);
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//       }
//     };

//     fetchMessages();
//   }, [user]);
//   const checkIfAtBottom = () => {
//     const el = messagesContainerRef.current;
//     if (!el) return;
//     // tolerance 50px for "near bottom"
//     const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
//     setIsAtBottom(isBottom);
//   };

//   // Listen for scroll event on messages container
//   useEffect(() => {
//     const el = messagesContainerRef.current;
//     if (!el) return;

//     el.addEventListener("scroll", checkIfAtBottom);

//     // initial check
//     checkIfAtBottom();

//     return () => {
//       el.removeEventListener("scroll", checkIfAtBottom);
//     };
//   }, []);

//   // Scroll to bottom only if user is at bottom (or near bottom)
//   useEffect(() => {
//     if (isAtBottom) {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   console.log("Current user:", user._id);
//   // console.log("jddfnd", allAccounts)
//   console.log("Selected user:", selectedUser?._id);

//   //   // Key for localStorage per user-user chat
//   // const storageKey = selectedUser ? `chat_messages_${user.id}_${selectedUser.id}` : null;
//   const storageKey = selectedUser
//     ? `chat_messages_${String(user._id)}_${String(selectedUser?._id)}`
//     : null;
//   useEffect(() => {
//     if (socket && user) {
//       socket.emit("setup", user._id);
//     }
//   }, [socket, user]);

// // if (!user || !selectedUser) return null;
//   // Load messages from localStorage or fetch from backend on selectedUser change
//   useEffect(() => {
//     if (!selectedUser) return;

//     const saved = localStorage.getItem(storageKey);
//     if (saved) {
//       // Parse saved messages
//       const allMessages = JSON.parse(saved);
//       // Filter messages belonging only to the conversation between user and selectedUser
//       const filteredMessages = allMessages.filter(
//         (msg) =>
//           (msg.senderId === user._id && msg.receiverId === selectedUser?._id) ||
//           (msg.senderId === selectedUser?._id && msg.receiverId === user._id)
//       );
//       setMessages(filteredMessages);
//     } else {
//       fetch(`${BASE_URL}/api/messages/${selectedUser?._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.messages) {
//             // Filter fetched messages as well
//             const filteredMessages = data.messages.filter(
//               (msg) =>
//                 (msg.senderId === user._id &&
//                   msg.receiverId === selectedUser?._id) ||
//                 (msg.senderId === selectedUser?._id &&
//                   msg.receiverId === user._id)
//             );
//             setMessages(filteredMessages);
//             localStorage.setItem(storageKey, JSON.stringify(filteredMessages));
//           }
//         })
//         .catch(console.error);
//     }
//   }, [selectedUser, token, storageKey]);

//   // Save messages to localStorage whenever messages update
//   useEffect(() => {
//     if (storageKey) {
//       localStorage.setItem(storageKey, JSON.stringify(messages));
//     }
//   }, [messages, storageKey]);

//   // Scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Listen for incoming messages on socket for selectedUser
//   useEffect(() => {
//     if (!socket || typeof socket.on !== "function") return;

//     const handleNewMessage = (message) => {
//       if (
//         selectedUser &&
//         ((message.senderId === selectedUser?._id &&
//           message.receiverId === user._id) ||
//           (message.senderId === user._id &&
//             message.receiverId === selectedUser?._id))
//       ) {
//         setMessages((prev) => {
//           const updated = [...prev, message];
//           localStorage.setItem(storageKey, JSON.stringify(updated));
//           return updated;
//         });
//       }
//     };

//     socket.on("newMessage", handleNewMessage);

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [socket, selectedUser]);

//   // Send a new message
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedUser) return;

//     const messageData = {
//       senderId: user._id,
//       receiverId: selectedUser?._id,
//       text: newMessage.trim(),
//       createdAt: new Date().toISOString(),

//       // Temporarily disable auto scroll
//     };

//     console.log("Sending message data:", messageData);

//     // Emit message via socket
//     if (socket && typeof socket.emit === "function") {
//       socket.emit("sendMessage", messageData);
//     }

//     // Optimistic UI update
//     // setMessages((prev) => [...prev, messageData]);
//     setMessages((prev) => {
//       const updated = [...prev, messageData];
//       localStorage.setItem(storageKey, JSON.stringify(updated));
//       return updated;
//     });

//     // Save message to backend
//     try {
//       const res = await fetch(`${BASE_URL}/api/messages/send`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(messageData),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         console.log("Message sent:", data);
//       } else {
//         console.error("Failed to send message:", data.error);
//       }
//     } catch (err) {
//       console.error("sendMessage error:", err.message);
//       if (err.name === "ValidationError") {
//         return res.status(400).json({ err: err.message });
//       }
//       return res.status(500).json({ error: "Server error" });
//       console.error("Failed to save message:", err);
//     }

//     setNewMessage("");
//   };

//   // If no selectedUser, show placeholder
//   // if (!selectedUser) {
//   //   return (
//   //     <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
//   //       <img
//   //         width={80}
//   //         src="https://static.vecteezy.com/system/resources/previews/014/441/089/original/chat-message-icon-design-in-blue-circle-png.png"
//   //         alt="Chat Icon"
//   //       />
//   //       <p className="text-lg font-medium text-purple-800">
//   //         Chat anytime, anywhere
//   //       </p>
//   //     </div>
//   //   );
//   // }

//   // const handelclickRoute = () => {
//   //   navigate(`/Service-profile/${accounts._id}`, {
//   //     state: {
//   //       name:accounts.name,
//   //     photo:accounts.photo,
//   //       id:user.id,
//   //       loc:user.loc,
//   //       about:user.about,
//   //       accounts: allAccounts,
//   //       rating:user.rating,
//   //       experience:user.experience,
//   //     },
//   //     replace: false, // ya true depending on need
//   //   });
//   //   setTimeout(() => window.scrollTo(0, 0), 100);
//   // };

//   //   const handelclickRoute = () => {
//   //   navigate(`/Service-profile/${user._id}`
//   //   )
//   // };

//   if (!selectedUser) {
//     return (
//       <div className="flex h-full w-full items-center justify-center bg-white/10 max-md:hidden">
//         <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
//           <img
//             width={80}
//             src="https://static.vecteezy.com/system/resources/previews/014/441/089/original/chat-message-icon-design-in-blue-circle-png.png"
//             alt="Chat Icon"
//           />
//           <p className="text-lg font-medium text-purple-800">
//             Chat anytime, anywhere
//           </p>
//         </div>
//       </div>
//     );
//   }
//   // Chat UI
//   return (
//     <div className="flex flex-col h-screen bg-white text-black md:mt-0 mt-12  overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-3 py-4 mx-4 border-b border-stone-500">
//         <img src={selectedUser.photo} alt={name} className="w-8 rounded-full" />
//         <h1
//           // onClick={handelclickRoute}
//           className="flex-1 text-black flex items-center text-base font-medium cursor-pointer gap-2"
//         >
//           {selectedUser.name || "User"}
//           <span className="w-2 h-2 rounded-full bg-green-500"></span>
//         </h1>
//         {/* <FaArrowLeft
//           className="md:hidden cursor-pointer"
//           onClick={() => setSelectedUser(null)}
//         /> */}
//       </div>

//       {/* Messages container */}
//       {/* <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4"> */}
//       <div
//         ref={messagesContainerRef}
//         className="flex-1 overflow-y-auto px-4 py-2 space-y-4 flex flex-col"
//       >
//         {messages
//           .filter(
//             (msg) =>
//               (msg.senderId === user._id &&
//                 msg.receiverId === selectedUser?._id) ||
//               (msg.senderId === selectedUser?._id && msg.receiverId === user._id)
//           )
//           .map((msg, idx) => {
//             const isSender = msg.senderId === user._id;
//             return (
//               <div
//                 key={idx}
//                 className={`max-w-xs px-4 py-2 rounded-lg relative break-words ${
//                   isSender
//                     ? "self-end bg-blue-600 text-white"
//                     : "self-start bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {/* {msg.text} */}
//                 {/* Add bottom margin to the text */}
//                 <div className="mb-1 mr-10">{msg.text}</div>
//                 <span className="absolute bottom-1 right-2 text-[10px] text-gray-300 select-none">
//                   {new Date(msg.createdAt).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//               </div>
//             );
//           })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="flex items-center gap-2 p-3 border-t border-t-gray-300 bg-white pb-20">
//         <div className="flex-1 flex items-center bg-gray-100 px-4 py-2 rounded-full">
//           <input
//             type="text"
//             placeholder="Send a message"
//             className="flex-1 text-sm bg-transparent outline-none text-gray-900 placeholder-gray-400"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleSendMessage();
//             }}
//           />
//           <label htmlFor="image" className="cursor-pointer">
//             <TfiGallery className="text-xl text-gray-600 ml-2" />
//           </label>
//           <input type="file" id="image" accept="image/*" hidden />
//         </div>
//         <button
//           className="text-blue-600 bg-gray-200 rounded-full p-2 text-xl"
//           onClick={handleSendMessage}
//         >
//           <IoMdSend />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
