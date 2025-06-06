import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { BASE_URL, token } from "../config";
import { io } from "socket.io-client";
// Function to safely get user data from localStorage
const getUserFromLocalStorage = () => {
  try {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

// ==================== AUTH CONTEXT ====================
const initialAuthState = {
  user: getUserFromLocalStorage(),
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
};

export const authContext = createContext(initialAuthState);
export const useAuth = () => useContext(authContext);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, role: null, token: null };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      return { user: null, role: null, token: null };
    // default:
    //   return state;
    // };
    case "UPDATE_USER":
      return {
        // ...state,
        // user: action.payload,
        ...state,
        user: action.payload,
      };
    // other cases...
    default:
      return state;
  }
};

// ==================== ACCOUNTS CONTEXT ====================
export const accountsContext = createContext();
export const useAccounts = () => useContext(accountsContext);

// ==================== PROVIDER ====================
export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  const [onlineUsers, setOnlineUsers] = useState([])
  
  const [socket, setSocket] = useState(null)


  const [chatUser, setChatUser] = useState(() => {
    const stored = localStorage.getItem("chatUser");
    return stored ? JSON.parse(stored) : null;
  });

  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState(null);

  // Auth localStorage persistence
  useEffect(() => {
    if (authState.user) {
      localStorage.setItem("user", JSON.stringify(authState.user));
    } else {
      localStorage.removeItem("user");
    }
    localStorage.setItem("token", authState.token || "");
    localStorage.setItem("role", authState.role || "");
  }, [authState]);

  // ChatUser localStorage persistence
  useEffect(() => {
    if (chatUser) {
      localStorage.setItem("chatUser", JSON.stringify(chatUser));
    } else {
      localStorage.removeItem("chatUser");
    }
  }, [chatUser]);

  // Fetch accounts when token is available
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         if (!authState.token) return;
//         const res = await fetch(`${BASE_URL}/api/services`, {
//           headers: {
//             Authorization: `Bearer ${authState.token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch accounts");
//         const data = await res.json();
//         setAccounts(data);
//         setAccountsLoading(false);
//       } catch (err) {
//         setAccountsError(err.message);
//         setAccountsLoading(false);
//       }
//     };


//   fetchAccounts();
// }, [authState.token]);



//   fetchAccounts();
// }, [authState.token]);


useEffect(() => {

  setAccountsLoading(true);
  setAccountsError(null);

  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/services`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch accounts");

      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      setAccountsError(err.message);
    } finally {
      setAccountsLoading(false);
    }
  };

  fetchAccounts();
}, [authState.token]);





  // Setup socket connection when user logs in or token changes
  // useEffect(() => {
  //   if (!authState.user) {
  //     if (socket) {
  //       socket.disconnect();
  //       setSocket(null);
  //       setOnlineUsers([]);
  //     }
  //     return;
  //   }

  //   const newSocket = io(BASE_URL, {
  //     query: { userId: authState.user._id },
  //     // you can add auth headers or token here if your socket server requires
  //     // auth: { token: authState.token }
  //   });

  //   setSocket(newSocket);

  //   newSocket.on("getOnlineUsers", (users) => {
  //     setOnlineUsers(users);
  //   });

  //   newSocket.on("connect_error", (err) => {
  //     console.error("Socket connection error:", err.message);
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //     setSocket(null);
  //     setOnlineUsers([]);
  //   };
  // }, [authState.user]);













  return (
    <authContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        role: authState.role,
        dispatch,
        chatUser,
        setChatUser,
        // onlineUsers,
        // socket
      }}
    >
      <accountsContext.Provider
        value={{ accounts, accountsLoading, accountsError }}
      >
        {children}
      </accountsContext.Provider>
    </authContext.Provider>
  );
};
