// import React, {
//   createContext,
//   useReducer,
//   useContext,
//   useState,
//   useEffect,
// } from "react";
// import { BASE_URL } from "../config";

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

// // ==================== AUTH CONTEXT ====================
// const initialAuthState = {
//   user: getUserFromLocalStorage(),
//   role: localStorage.getItem("role") || null,
//   token: localStorage.getItem("token") || null,
// };

// export const authContext = createContext(initialAuthState);
// export const useAuth = () => useContext(authContext);

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

// // ==================== ACCOUNTS CONTEXT ====================
// export const accountsContext = createContext();
// export const useAccounts = () => useContext(accountsContext);

// // ==================== PROVIDER ====================
// export const AuthContextProvider = ({ children }) => {
//   const [authState, dispatch] = useReducer(authReducer, initialAuthState);
//   const [chatUser, setChatUser] = useState(() => {
//     const stored = localStorage.getItem("chatUser");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const [accounts, setAccounts] = useState([]);
//   const [accountsLoading, setAccountsLoading] = useState(true);
//   const [accountsError, setAccountsError] = useState(null);

//   // Auth localStorage persistence
//   useEffect(() => {
//     if (authState.user) {
//       localStorage.setItem("user", JSON.stringify(authState.user));
//     } else {
//       localStorage.removeItem("user");
//     }
//     // localStorage.setItem("token", authState.token || "");
//     if (authState.token) {
//   localStorage.setItem("token", authState.token);
// } else {
//   localStorage.removeItem("token");
// }
//     localStorage.setItem("role", authState.role || "");
//   }, [authState]);

//   // ChatUser localStorage persistence
//   useEffect(() => {
//     if (chatUser) {
//       localStorage.setItem("chatUser", JSON.stringify(chatUser));
//     } else {
//       localStorage.removeItem("chatUser");
//     }
//   }, [chatUser]);

//   // Fetch accounts when token is available
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         if (!authState.token) return;
//         const res = await fetch(`${BASE_URL}/api/services`, {
//           headers: {
//   Authorization: `Bearer ${authState.token}`,
// }
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

//     fetchAccounts();
//   }, [authState.token]);

//   return (
//     <authContext.Provider
//       value={{
//         user: authState.user,
//         token: authState.token,
//         role: authState.role,
//         dispatch,
//         chatUser,
//         setChatUser,
//       }}
//     >
//       <accountsContext.Provider
//         value={{ accounts, loading: accountsLoading, error: accountsError }}
//       >
//         {children}
//       </accountsContext.Provider>
//     </authContext.Provider>
//   );
// };

// import React, {
//   createContext,
//   useReducer,
//   useContext,
//   useState,
//   useEffect,
// } from "react";
// import { BASE_URL } from "../config";

// // Safely parse user data from localStorage
// const getUserFromLocalStorage = () => {
//   try {
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
//   } catch (error) {
//     console.error("Error parsing user data from localStorage:", error);
//     return null;
//   }
// };

// // ====== Initial auth state =======
// const initialAuthState = {
//   user: getUserFromLocalStorage(),
//   role: localStorage.getItem("role") || null,
//   token: localStorage.getItem("token") || null,
// };

// export const authContext = createContext(initialAuthState);
// export const useAuth = () => useContext(authContext);

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

// export const accountsContext = createContext();
// export const useAccounts = () => useContext(accountsContext);

// export const AuthContextProvider = ({ children }) => {
//   const [authState, dispatch] = useReducer(authReducer, initialAuthState);
//   const [chatUser, setChatUser] = useState(() => {
//     const stored = localStorage.getItem("chatUser");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const [accounts, setAccounts] = useState([]);
//   const [accountsLoading, setAccountsLoading] = useState(true);
//   const [accountsError, setAccountsError] = useState(null);

//   // Persist authState to localStorage
//   useEffect(() => {
//     if (authState.user) {
//       localStorage.setItem("user", JSON.stringify(authState.user));
//     } else {
//       localStorage.removeItem("user");
//     }

//     if (authState.token) {
//       localStorage.setItem("token", authState.token);
//     } else {
//       localStorage.removeItem("token");
//     }

//     if (authState.role) {
//       localStorage.setItem("role", authState.role);
//     } else {
//       localStorage.removeItem("role");
//     }
//   }, [authState]);
// useEffect(() => {
//   console.log("Token:", authState.token); // check token in console

// //   const fetchAccounts = async () => {
// //     if (!authState.token) {
// //       console.log("No token found, skipping fetch");
// //       return;
// //     }
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/services`, {
// //       headers: {
// //   "Content-Type": "application/json",
// //   Authorization: `Bearer ${authState.token}`,
// // },
// //       });
// //       if (!res.ok) throw new Error("Failed to fetch accounts: " + res.status);
// //       const data = await res.json();
// //       setAccounts(data);
// //       setAccountsLoading(false);
// //     } catch (err) {
// //       setAccountsError(err.message);
// //       setAccountsLoading(false);
// //     }
// //   };

// //   fetchAccounts();
// // }, [authState.token]);

//   // Persist chatUser to localStorage
//   useEffect(() => {
//     if (chatUser) {
//       localStorage.setItem("chatUser", JSON.stringify(chatUser));
//     } else {
//       localStorage.removeItem("chatUser");
//     }
//   }, [chatUser]);

//   // Fetch accounts when token is available
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       if (!authState.token) {
//         setAccounts([]);
//         setAccountsLoading(false);
//         setAccountsError("No token available");
//         return;
//       }

//       try {
//         const res = await fetch(`${BASE_URL}/api/services`, {
//           headers: {
//             Authorization: `Bearer ${authState.token}`,
//           },
//         });

//         if (res.status === 401) {
//           setAccountsError("Unauthorized: Invalid or expired token.");
//           setAccounts([]);
//           setAccountsLoading(false);
//           return;
//         }

//         if (!res.ok) {
//           throw new Error(`Failed to fetch accounts: ${res.statusText}`);
//         }

//         const data = await res.json();
//         setAccounts(data);
//         setAccountsLoading(false);
//         setAccountsError(null);
//       } catch (error) {
//         setAccountsError(error.message);
//         setAccounts([]);
//         setAccountsLoading(false);
//       }
//     };

//     fetchAccounts();
//   }, [authState.token]);

//   // Example login function you can call from your login form/component
//   const loginUser = async (email, password) => {
//     dispatch({ type: "LOGIN_START" });

//     try {
//       const res = await fetch(`${BASE_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//         throw new Error("Login failed: Invalid credentials");
//       }

//       const data = await res.json();

//       // Expecting data to contain user, token, and role
//       dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: {
//           user: data.user,
//           token: data.token,
//           role: data.role,
//         },
//       });
//     } catch (error) {
//       dispatch({ type: "LOGOUT" });
//       alert(error.message); // You can handle error UI better
//     }
//   };

//   const logoutUser = () => {
//     dispatch({ type: "LOGOUT" });
//     setChatUser(null);
//   };

//   return (
//     <authContext.Provider
//       value={{
//         user: authState.user,
//         token: authState.token,
//         role: authState.role,
//         dispatch,
//         chatUser,
//         setChatUser,
//         loginUser,
//         logoutUser,
//       }}
//     >
//       <accountsContext.Provider
//         value={{ accounts, loading: accountsLoading, error: accountsError }}
//       >
//         {children}
//       </accountsContext.Provider>
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
    // default:
    //   return state;
  // };
   case "UPDATE_USER":
      return {
        // ...state,
        // user: action.payload,
      ...state, user: action.payload 
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
