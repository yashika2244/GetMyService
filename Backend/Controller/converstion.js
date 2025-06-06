import Message from '../Models/Message.js'
import UserModels from '../Models/UserModels.js';
import ServiceProviderModel from '../Models/ServiceProviderModel.js';


export const getConversations = async (req, res) => {
    try {
    const userId = req.userId; 
    console.log("✅ userId from token:", userId);
   
   console.log("req.user", req.user); // Add this at top of getConversations

            const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 }); // latest first
        const conversationUserIds = new Set();

          messages.forEach((msg) => {
      if (msg.senderId.toString() !== userId.toString())
        conversationUserIds.add(msg.senderId.toString());
      if (msg.receiverId.toString() !== userId.toString())
        conversationUserIds.add(msg.receiverId.toString());
    });
    const users = await UserModels.find({ _id: { $in: Array.from(conversationUserIds) } });
    const serviceProviders = await ServiceProviderModel.find({ _id: { $in: Array.from(conversationUserIds) } });


const allUsers = [...users, ...serviceProviders];

   const conversations = Array.from(conversationUserIds).map((convUserId) => {
      const lastMsg = messages.find(
        (m) =>
          (m.senderId.toString() === convUserId && m.receiverId.toString() === userId.toString()) ||
          (m.receiverId.toString() === convUserId && m.senderId.toString() === userId.toString())
      );
      const user = allUsers.find((u) => u._id.toString() === convUserId);
      return {
        user,
        lastMessage: lastMsg,
      };
    });

    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};