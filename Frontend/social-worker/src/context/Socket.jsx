


// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { useAuth } from "./AppContext";

// const SocketContext = createContext();

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (user?.id) {
//       console.log("userid is",user?.id)
//       const newSocket = io("http://localhost:5000", {
//         query: { userId: user.id },  // optional, backend me nahi zaruri
//       });

//       // **Yahan 'setup' event emit karo userId ke sath**
//       // newSocket.emit("setup", user.id);
//           newSocket.on("connect", () => {
//       newSocket.emit("setup", user.id);
//     });


//       setSocket(newSocket);

//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [user?.id]);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

