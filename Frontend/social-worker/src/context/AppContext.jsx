// // import React, {
// //   createContext,
// //   useReducer,
// //   useContext,
// //   useState,
// //   useEffect,
// // } from "react";

// // // Initial auth state from localStorage
// // const initialState = {
// //   user: localStorage.getItem("user")
// //     ? JSON.parse(localStorage.getItem("user"))
// //     : null,
// //   role: localStorage.getItem("role") || null,
// //   token: localStorage.getItem("token") || null,
// // };

// // // Create context
// //   export const authContext = createContext(initialState);

// // // Custom hook for easy context usage
// // export const useAuth = () => useContext(authContext);

// // // Reducer to manage auth actions
// // const authReducer = (state, action) => {
// //   switch (action.type) {
// //     case "LOGIN_START":
// //       return { user: null, role: null, token: null };

// //     case "LOGIN_SUCCESS":
// //       return {
// //         user: action.payload.user,
// //         token: action.payload.token,
// //         role: action.payload.role,
// //       };

// //     case "LOGOUT":
// //       return { user: null, role: null, token: null };

// //     default:
// //       return state;
// //   }
// // };

// // // Provider component
// // export const AuthContextProvider = ({ children }) => {
// //   const [state, dispatch] = useReducer(authReducer, initialState);
// //   const [chatUser, setChatUser] = useState(() => {
// //     const stored = localStorage.getItem("chatUser");
// //     return stored ? JSON.parse(stored) : null;
// //   });

// //   // Persist auth state in localStorage
// //   useEffect(() => {
// //     localStorage.setItem("user", JSON.stringify(state.user));
// //     localStorage.setItem("token", state.token || "");
// //     localStorage.setItem("role", state.role || "");
// //   }, [state]);

// //   // Persist chatUser separately
// //   useEffect(() => {
// //     if (chatUser) {
// //       localStorage.setItem("chatUser", JSON.stringify(chatUser));
// //     }
// //   }, [chatUser]);

// //   return (
// //     <authContext.Provider
// //       value={{
// //         user: state.user,
// //         token: state.token,
// //         role: state.role,
// //         dispatch,
// //         chatUser,
// //         setChatUser,
// //       }}
// //     >
// //       {children}
// //     </authContext.Provider>
// //   );
// // };

// import React, {
//   createContext,
//   useReducer,
//   useContext,
//   useState,
//   useEffect,
// } from "react";

// // Function to safely get user data from localStorage
// const getUserFromLocalStorage = () => {
//   try {
//     return localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user"))
//       : null;
//   } catch (error) {
//     console.error("Error parsing user data from localStorage:", error);
//     return null;
//   }
// };

// // Initial auth state from localStorage
// const initialState = {
//   user: getUserFromLocalStorage(),
//   role: localStorage.getItem("role") || null,
//   token: localStorage.getItem("token") || null,
// };

// // Create context
// export const authContext = createContext(initialState);

// // Custom hook for easy context usage
// export const useAuth = () => useContext(authContext);

// // Reducer to manage auth actions
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_START":
//       return { user: null, role: null, token: null };

//     case "LOGIN_SUCCESS":
//       return {
//         user: action.payload.user,
//         token: action.payload.token,
//         role: action.payload.role,
//       };

//     case "LOGOUT":
//       return { user: null, role: null, token: null };

//     default:
//       return state;
//   }
// };

// // Provider component
// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const [chatUser, setChatUser] = useState(() => {
//     const stored = localStorage.getItem("chatUser");
//     return stored ? JSON.parse(stored) : null;
//   });

//   // Persist auth state in localStorage
//   useEffect(() => {
//     if (state.user) {
//       localStorage.setItem("user", JSON.stringify(state.user));
//     } else {
//       localStorage.removeItem("user");
//     }
//     localStorage.setItem("token", state.token || "");
//     localStorage.setItem("role", state.role || "");
//   }, [state]);

//   // Persist chatUser separately
//   useEffect(() => {
//     if (chatUser) {
//       localStorage.setItem("chatUser", JSON.stringify(chatUser));
//     } else {
//       localStorage.removeItem("chatUser");
//     }
//   }, [chatUser]);

//   return (
//     <authContext.Provider
//       value={{
//         user: state.user,
//         token: state.token,
//         role: state.role,
//         dispatch,
//         chatUser,
//         setChatUser,
//       }}
//     >
//       {children}
//     </authContext.Provider>
//   );
// };

import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { BASE_URL } from "../config";

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
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (!authState.token) return;
        const res = await fetch(`${BASE_URL}/api/services`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch accounts");
        const data = await res.json();
        setAccounts(data);
        setAccountsLoading(false);
      } catch (err) {
        setAccountsError(err.message);
        setAccountsLoading(false);
      }
    };

    fetchAccounts();
  }, [authState.token]);

  return (
    <authContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        role: authState.role,
        dispatch,
        chatUser,
        setChatUser,
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
