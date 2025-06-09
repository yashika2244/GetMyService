
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
