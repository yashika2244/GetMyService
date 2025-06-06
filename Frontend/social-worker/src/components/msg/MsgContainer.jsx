// import React, { useState, useEffect } from "react";
// import Msg from "./Msg";
// import Chat from "./Chat";
// import Sidebar from "./Sidebar";

// function MsgContainer() {
//   const [selectedUser, setSelectedUser] = useState(false);

//     useEffect(() => {
//     const savedUser = localStorage.getItem("selectedUser");
//     if (savedUser) {
//       setSelectedUser(JSON.parse(savedUser));
//     }
//   }, []);

//   return (

//     <div className="md:p-12 md:mt-5 mb-5 ">
//       <div
//         className={`border-2 border-gray-300 rounded-2xl overflow-hidden h-full grid grid-cols-1 md:grid-cols-2`}
//       >
//         {/* Msg (Sidebar) */}
//         <div className={`${selectedUser ? "hidden" : "block"} md:block`}>
//           <Msg selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
//         </div>

//         {/* Chat */}
//         <div className={`${selectedUser ? "block" : "hidden"} md:block`}>
//           <Chat selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MsgContainer;
