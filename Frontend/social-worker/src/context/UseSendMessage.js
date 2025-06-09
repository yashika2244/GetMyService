// import React, { useState } from 'react'

// import useConversation from '../stateManage/useConversation.js'
// import { BASE_URL, token } from '../config.js'


// function UseSendMessage() {
//   const [loading, setLoading] = useState(false)
//   const { messages, setMessages, selcetedConversation } = useConversation()

//   const sendMessages = async (message) => {
//     setLoading(true)
//     if (selcetedConversation && selcetedConversation._id) {
//       try {
//         console.log("Fetching messages for:", selcetedConversation._id);
//         const res = await fetch(`${BASE_URL}/api/message/send/${selcetedConversation._id}`, {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,

//           },

//   body: JSON.stringify({ message }),
//         });

//         if (!res.ok) {
//           throw new Error('Failed to fetch messages');
//         }
//         const data = await res.json();
//         console.log("Fetched messages:", data); // ✅ Correct way
//         console.log("data.message", data.messages)

//       setMessages([...messages, data.messages]);
//         setLoading(false)

//       } catch (error) {
//         console.log("Error is send messages:", error)
//       }

//     }
//   }

//   return {
//     loading, sendMessages
//   }
// }

// export default UseSendMessage


import React, { useState } from 'react';
import useConversation from '../stateManage/useConversation.js';
import { BASE_URL, token } from '../config.js';

function UseSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selcetedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    if (selcetedConversation && selcetedConversation._id) {
      try {
        const res = await fetch(`${BASE_URL}/api/message/send/${selcetedConversation._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        });

        if (!res.ok) {
          throw new Error('Failed to send message');
        }

        const data = await res.json();

        // Correct way to update messages
        setMessages([...messages, data.newMessage ]);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    sendMessages,
  };
}

export default UseSendMessage;
