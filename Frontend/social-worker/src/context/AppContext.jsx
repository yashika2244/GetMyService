// import React, { createContext, useState,useEffect ,useReducer, useContext, Children } from 'react';
// const initialState ={
//     user:localStorage.getItem("user")!=undefined ? JSON.parse(localStorage.getItem('user')):null,
//     role:localStorage.getItem("role") || null,
//     token:localStorage.getItem("token")|| null
// };




// export const authContext = createContext(initialState);

// export const useAuth = () => {
//     return useContext(AppContext);
//   };

//   export const AppProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
  
//     // Function to update user data
//     const setUserData = (userData) => {
//       setUser(userData);
//     };
  
//     return (
//       <AppContext.Provider value={{ user, setUserData }}>
//         {children}
//       </AppContext.Provider>
//     );
//   };

// const authReducer =(state,action)=>{
//     switch (action.type)
//     { case 'LOGIN_START':
//             return {
//                 user:null,
//                 role:null,
//                 token:null,
//             }


//             case 'LOGIN_SUCCESS':
//                 return {
//                     user:action.payload.user,
//                     token:action.payload.token,
//                     role:action.payload.role,
//                     // accounts: action.payload.accounts,
                
//                 }

//                 case 'LOGOUT':
//                     return {
//                         user:null,
//                         role:null,
//                         token:null,
//                     }

//                     default :
//                     return state;
        
//     }
// }

// export const AuthContextProvider = ({children})=>{
 
//     const [state , dispatch] =useReducer(authReducer,initialState);
//     useEffect(()=>{
//         localStorage.setItem('user', JSON.stringify(state.user))
//     // localStorage.setItem('accounts', JSON.stringify(state.accounts));

//         localStorage.setItem("token",state.token)
//         localStorage.setItem("role",state.role)
//     })
//     return <authContext.Provider value={{user:state.user ,
//         token:state.token,
//         role:state.role,
//         dispatch,
//     }}>
//         {children}
//     </authContext.Provider>
// }

import React, { createContext, useState, useReducer, useContext, useEffect } from 'react';

// Initial state
const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
};

// Create the context
export const authContext = createContext(initialState);

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(authContext); // Use the correct context
};

// Reducer function for auth actions
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        role: null,
        token: null,
      };

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };

    case 'LOGOUT':
      return {
        user: null,
        role: null,
        token: null,
      };

    default:
      return state;
  }
};

// AuthContextProvider component to wrap the app
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Save state in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('token', state.token);
    localStorage.setItem('role', state.role);
  }, [state]);

  return (
    <authContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
      {children}
    </authContext.Provider>
  );
};
