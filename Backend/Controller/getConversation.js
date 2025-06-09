

// import mongoose from 'mongoose';
// import ConversationModel from '../Models/ConversationModel.js';
// import UserModels from '../Models/UserModels.js';
// import ServiceProviderModel from '../Models/ServiceProviderModel.js';

// export const getChatPartners = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid userId" });
//     }

//     const userObjectId = new mongoose.Types.ObjectId(userId);

//     const conversations = await ConversationModel.find({
//       'participants.id': userObjectId
//     }).sort({ updatedAt: -1 });

//     const customerIds = [];
//     const serviceProviderIds = [];
//     const lastMessageMap = {}; // userId -> lastMessageAt timestamp

//     conversations.forEach((conv) => {
//       conv.participants.forEach((participant) => {
 
//         const participantIdStr = participant.id.toString();
           
//         if (participantIdStr !== userId) {
//           if (participant.role === "customer") {
//             customerIds.push(participantIdStr);
//           } else if (participant.role === "service-provider") {
//             serviceProviderIds.push(participantIdStr);
//           }

//           // if (
//           //   !lastMessageMap[participantIdStr] ||
//           //   lastMessageMap[participantIdStr] < conv.updatedAt
//           // ) {
//           //   lastMessageMap[participantIdStr] = conv.updatedAt;
//           // }

//           if (
//             conv.updatedAt &&
//             !isNaN(new Date(conv.updatedAt).getTime()) &&
//             (!lastMessageMap[participantIdStr] ||
//               new Date(lastMessageMap[participantIdStr]) < new Date(conv.updatedAt))
//           ) {
//             lastMessageMap[participantIdStr] = conv.updatedAt;
//             console.log("Convo:", conv.updatedAt);
//           }
//         }



//       });
//     });
// console.log("lastMessageMap:", lastMessageMap);

//     const uniqueCustomerIds = [...new Set(customerIds)];
//     const uniqueServiceProviderIds = [...new Set(serviceProviderIds)];

//     const customers = await UserModels.find({ _id: { $in: uniqueCustomerIds } });
//     const serviceProviders = await ServiceProviderModel.find({ _id: { $in: uniqueServiceProviderIds } });


//   const customersWithRole  = customers.map(u => ({
//       ...u.toObject(),
//       role: 'customer'
//     }));

//     const serviceProvidersWithRole  = serviceProviders.map(u => ({
//       ...u.toObject(),
//       role: 'service-provider'
//     }));
//     // const combinedUsers = [...customers, ...serviceProviders];
//     const combinedUsers = [...customersWithRole, ...serviceProvidersWithRole];
//     const usersWithLastMessage = combinedUsers.map(user => ({
//       ...user,
//       // lastMessageAt: lastMessageMap ? new Date(lastMessageMap) : null, // Ensure Date object
//       // lastMessageAt: lastMessageMap[user._id.toString()] || null,
//       lastMessageAt: lastMessageMap[user._id.toString()] || null
//     }));
// // 
//     usersWithLastMessage.sort((a, b) => {
//       const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
//       const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
//       return bTime - aTime;
//     });

//     res.status(200).json(usersWithLastMessage);
//   } catch (err) {
//     console.error("Error fetching chat partners", err);
//     res.status(500).json({ error: "Failed to fetch chat users" });
//   }
// };


import mongoose from 'mongoose';
import ConversationModel from '../Models/ConversationModel.js';
import UserModels from '../Models/UserModels.js';
import ServiceProviderModel from '../Models/ServiceProviderModel.js';

export const getChatPartners = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Find conversations where user is a participant
    const conversations = await ConversationModel.find({
      'participants.id': userObjectId
    }).populate('messages').sort({ updatedAt: -1 })


    const customerIds = [];
    const serviceProviderIds = [];
    const lastMessageMap = {}; // userId (string) -> lastMessageAt timestamp

    conversations.forEach((conv) => {
      conv.participants.forEach((participant) => {
        const participantIdStr = participant.id.toString();

        if (participantIdStr !== userId) {
          if (participant.role === "customer") {
            customerIds.push(participantIdStr);
          } else if (participant.role === "service-provider") {
            serviceProviderIds.push(participantIdStr);
          }

            

          // Update lastMessageMap with the latest updatedAt timestamp per participant
          if (
            conv.updatedAt &&
            !isNaN(new Date(conv.updatedAt).getTime()) &&
            (!lastMessageMap[participantIdStr] ||
              new Date(lastMessageMap[participantIdStr]) < new Date(conv.updatedAt))
          ) {
            lastMessageMap[participantIdStr] = conv.updatedAt;
          }
        }
      });
    });

    // Remove duplicate IDs
    const uniqueCustomerIds = [...new Set(customerIds)];
    const uniqueServiceProviderIds = [...new Set(serviceProviderIds)];

    // Fetch user data from DB
    const customers = await UserModels.find({ _id: { $in: uniqueCustomerIds } });
    const serviceProviders = await ServiceProviderModel.find({ _id: { $in: uniqueServiceProviderIds } });

    // Add explicit role to each user object
    const customersWithRole = customers.map(u => ({
      ...u.toObject(),
      role: 'customer'
    }));

    const serviceProvidersWithRole = serviceProviders.map(u => ({
      ...u.toObject(),
      role: 'service-provider'
    }));

    const combinedUsers = [...customersWithRole, ...serviceProvidersWithRole];

    // Attach lastMessageAt from lastMessageMap
    const usersWithLastMessage = combinedUsers.map(user => ({
      ...user,
      lastMessageAt: lastMessageMap[user._id.toString()] || null
    }));

    // Debug: check if any user missing lastMessageAt
    usersWithLastMessage.forEach(user => {
      if (!user.lastMessageAt) {
      }
    });

    // Sort: Customers first, then service providers; within role sort by latest message
    usersWithLastMessage.sort((a, b) => {
  

      const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
      return bTime - aTime;
    });

    usersWithLastMessage.forEach(user => {
      console.log(
        `User: ${user._id}, Role: ${user.role}, lastMessageAt: ${user.lastMessageAt}`
      );
    });

    res.status(200).json(usersWithLastMessage);

  } catch (err) {
    console.error("Error fetching chat partners", err);
    res.status(500).json({ error: "Failed to fetch chat users" });
  }
};
