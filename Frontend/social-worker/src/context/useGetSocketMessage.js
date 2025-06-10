
import { useEffect } from 'react';
import { useSocketContext } from './SocketContext';
import useConversation from '../stateManage/useConversation.js';

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const setMessages = useConversation(state => state.setMessages);

  useEffect(() => {
    if (!socket) return;


    const handler = (newMessage) => {
      console.log("🔥 Received:", newMessage);
      if (newMessage) {
        setMessages(prev => [...prev, newMessage]);
      } else {
        console.warn("Received undefined or null newMessage");
      }
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [socket, setMessages]);
};

export default useGetSocketMessage;




// import { useEffect } from 'react';
// import { useSocketContext } from './SocketContext';
// import useConversation from '../stateManage/useConversation.js';

// const useGetSocketMessage = () => {
//   const { socket } = useSocketContext();
//   const setMessages = useConversation(state => state.setMessages);
//   const setUnreadCounts = useConversation(state => state.setUnreadCounts);
//   const selcetedConversation = useConversation(state => state.selcetedConversation);

//   useEffect(() => {
//     if (!socket) return;

//     const handler = (newMessage) => {
// console.log("🔥 Received:", newMessage);
//   console.log("📌 Selected Conversation:", selcetedConversation);
//       if (newMessage) {
//         setMessages(prev => [...prev, newMessage]);

//          const senderId = newMessage.senderId._id || newMessage.senderId;


//         // Increase unread count if message not from selected conversation
//         // if (!selcetedConversation || selcetedConversation._id !== newMessage.senderId) {
//         //       console.log("⬆️ Unread increase for:", newMessage.senderId);
//         //   setUnreadCounts(newMessage.senderId);
//         // }else{
//         //    console.log("💬 Message in selected chat — no unread count increased");
//         // }
//           if (!selcetedConversation) {
//       console.log("😴 No selected conversation");
//       setUnreadCounts(senderId);
//     } else if (selcetedConversation._id !== senderId) {
//       console.log("⬆️ Unread increase for:", senderId);
//       setUnreadCounts(senderId);
//     } else {
//       console.log("💬 Message in selected chat — no unread count increased");
//     }
//   }
// }

      

//     socket.on("newMessage", handler);

//     return () => {
//       socket.off("newMessage", handler);
//     };
//   }, [socket, setMessages, setUnreadCounts, selcetedConversation]);
// };

// export default useGetSocketMessage;


// import { useEffect, useRef } from 'react';
// import { useSocketContext } from './SocketContext';

// import useConversation from '../stateManage/useConversation.js';

// const useGetSocketMessage = () => {
//   const { socket } = useSocketContext();
//   const setMessages = useConversation(state => state.setMessages);
//   const setUnreadCounts = useConversation(state => state.setUnreadCounts);
//   const selcetedConversation = useConversation(state => state.selcetedConversation);

//   const selectedConversationRef = useRef(selcetedConversation);

//   useEffect(() => {
//     selectedConversationRef.current = selcetedConversation;
//   }, [selcetedConversation]);

//   useEffect(() => {
//     if (!socket) return;

//     const handler = (newMessage) => {
//       console.log("🔥 Received:", newMessage);
//       console.log("📌 Selected Conversation:", selectedConversationRef.current);

//       if (newMessage) {
//         setMessages(prev => [...prev, newMessage]);

//         const senderId = newMessage.senderId._id || newMessage.senderId;

//         if (!selectedConversationRef.current) {
//           console.log("😴 No selected conversation");
//           setUnreadCounts(senderId);
//         } else if (selectedConversationRef.current._id !== senderId) {
//           console.log("⬆️ Unread increase for:", senderId);
//           setUnreadCounts(senderId);
//         } else {
//           console.log("💬 Message in selected chat — no unread count increased");
//         }
//       }
//     };

//     socket.on("newMessage", handler);

//     return () => {
//       socket.off("newMessage", handler);
//     };
//   }, [socket, setMessages, setUnreadCounts]);
// };

// export default useGetSocketMessage;

