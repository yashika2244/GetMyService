
import mongoose from 'mongoose';
import MessageModel from '../Models/MessageModel.js';
import ConversationModel from '../Models/ConversationModel.js';
import UserModels from '../Models/UserModels.js';
import ServiceProviderModel from '../Models/ServiceProviderModel.js';
import { getReceiversocketId, io } from '../SocketIO/server.js';

export const sendMessages = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.userId;
   

  // Detect sender role dynamically
    let senderRole = null;
    const senderUser = await UserModels.findById(senderId);
    if (senderUser) senderRole = 'customer';

    if (!senderRole) {
      const senderService = await ServiceProviderModel.findById(senderId);
      if (senderService) senderRole = 'service-provider';
    }

    if (!senderRole) {
      return res.status(404).json({ message: "Sender not found or invalid" });
    }


    // Determine receiver role by checking which collection has receiverId
    let receiverRole = null;

    const receiverUser = await UserModels.findById(receiverId);
    if (receiverUser) receiverRole = 'customer';

    const receiverService = receiverRole ? null : await ServiceProviderModel.findById(receiverId);
    if (receiverService) receiverRole = 'service-provider';




    if (!receiverRole) {
      return res.status(404).json({ message: "Receiver not found" });
    }
if (!mongoose.Types.ObjectId.isValid(senderId)) {
  return res.status(400).json({ message: "Invalid sender ID" });
}
if (!mongoose.Types.ObjectId.isValid(receiverId)) {
  return res.status(400).json({ message: "Invalid receiver ID" });
}
    // Convert to ObjectId
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    // Find or create conversation with participants as objects to handle roles
    let conversation = await ConversationModel.findOne({
      participants: {
        $all: [
          {  $elemMatch: {id: senderObjectId, role: senderRole }},
          { $elemMatch: {id: receiverObjectId, role: receiverRole} }
        ]
      }
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [
          { id: senderObjectId, role: senderRole },
          { id: receiverObjectId, role: receiverRole }
        ]
      });
    }

    // Create message with sender and receiver info
    const newMessage = new MessageModel({
      sender: { id: senderObjectId, role: senderRole },
      receiver: { id: receiverObjectId, role: receiverRole },
      message
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([newMessage.save(), conversation.save()]);


    // Emit socket message to receiver if online
    
    const receiverSocketId = getReceiversocketId(receiverId.toString());
    console.log("Socket Emit to Receiver:", receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
    ...newMessage.toObject(),
    senderId: newMessage.sender.id.toString(),
    receiverId: newMessage.receiver.id.toString()
     });
}   

    return res.status(200).json({ message: "Message sent successfully", newMessage });

  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const getMessage = async (req, res) => {
  try {
    const chatUserId = req.params.id;
    const senderId = req.userId;

    let senderRole = null;
    const senderUser = await UserModels.findById(senderId);
    if (senderUser) senderRole = 'customer';

    if (!senderRole) {
      const senderService = await ServiceProviderModel.findById(senderId);
      if (senderService) senderRole = 'service-provider';
    }

    if (!senderRole) {
      return res.status(404).json({ message: "Sender not found or invalid" });
    }
    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(chatUserId)) {
      return res.status(400).json({ message: "Invalid user ID(s)" });
    }

    // Determine chatUser role by checking both collections
    let chatUserRole = null;

    const userCheck = await UserModels.findById(chatUserId);
    if (userCheck) chatUserRole = "customer";

    const serviceCheck = chatUserRole ? null : await ServiceProviderModel.findById(chatUserId);
    if (serviceCheck) chatUserRole = "service-provider";

    if (!chatUserRole) {
      return res.status(404).json({ message: "Chat user not found" });
    }

    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const chatUserObjectId = new mongoose.Types.ObjectId(chatUserId);

    // Query conversation where participants include both sender and chatUser with roles
    const conversation = await ConversationModel.findOne({
      participants: {
        $all: [
          {$elemMatch: {id: senderObjectId, role: senderRole} },
          {$elemMatch: {id: chatUserObjectId, role: chatUserRole }}
        ]
      }
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ message: "No conversation found" });
    }

    return res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    console.error("Error getting messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};