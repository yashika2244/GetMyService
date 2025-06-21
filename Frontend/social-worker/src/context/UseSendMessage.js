


// import React, { useState } from 'react';
// import useConversation from '../stateManage/useConversation.js';
// import { BASE_URL, token } from '../config.js';

// function UseSendMessage() {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selcetedConversation } = useConversation();

//   const sendMessages = async (message) => {
//     setLoading(true);
//     if (selcetedConversation && selcetedConversation._id) {
//       try {
//         const res = await fetch(`${BASE_URL}/api/message/send/${selcetedConversation._id}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ message }),
//         });

//         if (!res.ok) {
//           throw new Error('Failed to send message');
//         }

//         const data = await res.json();

//         // Correct way to update messages
//         setMessages([...messages, data.newMessage ]);
//       } catch (error) {
//         console.error('Error sending message:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return {
//     loading,
//     sendMessages,
//   };
// }

// export default UseSendMessage;

// import React, { useState } from 'react';
// import useConversation from '../stateManage/useConversation.js';
// import { BASE_URL, token } from '../config.js';

// function UseSendMessage() {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selcetedConversation } = useConversation();

//   const sendMessages = async (messageText) => {
//     setLoading(true);
//     if (selcetedConversation && selcetedConversation._id) {
//       const tempMessage = {
//         _id: Date.now(), // temporary ID
//         senderId: "you", // ya currentUserId
//         receiverId: selcetedConversation._id,
//         message: messageText,
//         createdAt: new Date().toISOString(),
//         isTemp: true // just for frontend recognition (optional)
//       };

//       // 👇 Pehle local update karo - no wait for server
//       setMessages(prev => [...prev, tempMessage]);

//       try {
//         const res = await fetch(`${BASE_URL}/api/message/send/${selcetedConversation._id}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ message: messageText }),
//         });

//         if (!res.ok) {
//           throw new Error('Failed to send message');
//         }

//         const data = await res.json();

//         // server se real msg aane par temp wala replace karo
//         setMessages(prevMsgs => prevMsgs.map(msg =>
//           msg._id === tempMessage._id ? data.newMessage : msg
//         ));

//       } catch (error) {
//         console.error('Error sending message:', error);
//         // error ke case me temp msg hata do
//         setMessages(prevMsgs => prevMsgs.filter(msg => msg._id !== tempMessage._id));
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return {
//     loading,
//     sendMessages,
//   };
// }

// export default UseSendMessage;


import React, { useState } from 'react';
import useConversation from '../stateManage/useConversation.js';
import { BASE_URL, token } from '../config.js';
import {useAuth} from '../context/AppContext.jsx'

function UseSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selcetedConversation } = useConversation();
 const { user } = useAuth() // 👈 current logged-in user
  const currentUserId = user._id; // 👈 real sender id

  const sendMessages = async (messageText) => {
    if (!messageText.trim()) return; // Empty message guard
    if (!selcetedConversation || !selcetedConversation._id) return;

    setLoading(true);

    const tempId = Date.now().toString(); 
    const tempMessage = {
      _id: tempId, 
      senderId: currentUserId,
      receiverId: selcetedConversation._id,
      message: messageText,
      createdAt: new Date().toISOString(),
      isTemp: true // mark as temp
    };

    // 👇 Instantly update UI (no wait)
    setMessages(prev => [...prev, tempMessage]);

    try {
      const res = await fetch(`${BASE_URL}/api/message/send/${selcetedConversation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      const data = await res.json();

      // 👇 Replace temp message with server response
      setMessages(prevMsgs => prevMsgs.map(msg =>
        msg._id === tempId ? data.newMessage : msg
      ));

    } catch (error) {
      console.error('Error sending message:', error);

      // 👇 Remove temp message on error
      setMessages(prevMsgs => prevMsgs.filter(msg => msg._id !== tempId));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendMessages,
  };
}

export default UseSendMessage;
