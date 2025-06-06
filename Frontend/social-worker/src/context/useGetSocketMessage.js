// import React, { useEffect } from 'react'
// import { useSocketContext } from './SocketContext'
// import useConversation from '../stateManage/useConversation.js'

// function UseGetSocketMessage() {
//   const { socket } = useSocketContext()
//   const { messages, setMessages } = useConversation()

//   // useEffect(() => {
//   //     if (!socket) return;
//   //   socket.on("newMessage", (newMessage) => {
//   //     console.log("📥 Received new message via socket:", newMessage);
//   //     // setMessages([...messages,newMessage])
//   //     // setMessages(prevMessages => [...prevMessages, newMessage]);
//   //     setMessages(prev => [...prev, newMessage]); // ✅ safer

//   //   })
//   //   return () => {
//   //     socket.off("newMessage")

//   //   }
//   // }, [socket, setMessages])
// useEffect(() => {
//   if (!socket) return;

//   const handleNewMessage = (newMessage) => {
//     console.log("📥 Received new message via socket:", newMessage);
//     setMessages(prev => [...prev, newMessage]);
//   };

//   socket.on("newMessage", handleNewMessage);

//   return () => {
//     socket.off("newMessage", handleNewMessage); // ✅ cleanly remove exact listener
//   };
// }, [socket, setMessages]);
// }

// export default UseGetSocketMessage


// useGetSocketMessage.js
// import { useEffect } from 'react';
// import { useSocketContext } from './SocketContext';
// import useConversation from '../stateManage/useConversation.js';

// function useGetSocketMessage() {
//   const { socket } = useSocketContext();
//   const { setMessages } = useConversation();

//   useEffect(() => {
//   if (!socket) return;
//   console.log("✅ Socket connected:", socket);
// }, [socket]);

//   useEffect(() => {
//     // if (!socket) return;

//     const handleNewMessage = (newMessage) => {
//       console.log("📥 Received new message via socket:", newMessage);
//       setMessages(prev => [...prev, newMessage]);
//     };

//     socket.on("newMessage", handleNewMessage);

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [socket, setMessages]);
// }

// export default useGetSocketMessage;
import { useEffect } from 'react';
import { useSocketContext } from './SocketContext';
import useConversation from '../stateManage/useConversation.js';

function useGetSocketMessage() {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return; // <-- important check

    console.log("✅ Socket connected:", socket);

    const handleNewMessage = (newMessage) => {
      console.log("📥 Received new message via socket:", newMessage);
      setMessages(prev => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]);
}

export default useGetSocketMessage;
