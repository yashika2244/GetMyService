

import { useEffect } from 'react';
import { useSocketContext } from './SocketContext';
import useConversation from '../stateManage/useConversation.js';

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const setMessages = useConversation(state => state.setMessages);
  const selcetedConversation = useConversation(state => state.selcetedConversation);
  const increaseUnreadCount = useConversation(state => state.increaseUnreadCount);

  useEffect(() => {
    if (!socket) return;

    const handler = (newMessage) => {
      console.log("🔥 Received:", newMessage);
      if (newMessage) {
        setMessages(prev => [...prev, newMessage]);
        
    
        if (!selcetedConversation || selcetedConversation._id !== newMessage.senderId) {
          increaseUnreadCount(newMessage.senderId);
        }
      } else {
        console.warn("Received undefined or null newMessage");
      }
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [socket, setMessages, selcetedConversation, increaseUnreadCount]);
};

export default useGetSocketMessage;
