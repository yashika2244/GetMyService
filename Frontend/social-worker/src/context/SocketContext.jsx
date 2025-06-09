import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AppContext";
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();
  const [onlineUsers, setOnlineusers] = useState([]);

  useEffect(() => {
    if (user && user._id) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: user._id,
              role: user.role,

        },
      });
      setSocket(socket);

          socket.emit("addUser", user._id);

      socket.on("getOnline", (users) => {
        setOnlineusers(users);

      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
