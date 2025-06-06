

import mongoose from 'mongoose';
import ConversationModel from '../Models/ConversationModel.js';
import MessageModel from '../Models/MessageModel.js';
import { getReceiversocketId, io } from '../SocketIO/server.js';

export const sendMessages = async (req, res) => {
  try {
    const { message } = req.body;
    // const { message, id: receiverId } = req.params.id;
    const receiverId = req.params.id;  // from URL param
    const senderId = req.userId;

    console.log("receiverId", receiverId)


    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
    // console.log("recierber id", receiverObjectId)

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderObjectId, receiverObjectId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderObjectId, receiverObjectId],
      });
    }

    const newMessage = new MessageModel({
      senderId: senderObjectId,
      receiverId: receiverObjectId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    // await newMessage.save();
    // conversation.messages.push(newMessage._id);
    // await conversation.save();

await Promise.all([conversation.save(), newMessage.save()])

    const receiverSocketId = getReceiversocketId(receiverId.toString())

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage)
   console.log("Message emitted to socket receiverSocketId", receiverSocketId);


    }

    return res.status(200).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    console.error('Error in Sending message:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getMessage = async (req, res) => {
  try {
    const chatUser = req.params.id;
    const senderId = req.userId;
    console.log('senderId:', senderId);
    console.log('chatUser:', chatUser);
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(chatUser)) {
      return res.status(400).json({ message: "Invalid user ID(s)" });
    }
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const chatUserObjectId = new mongoose.Types.ObjectId(chatUser);
    const conversation = await ConversationModel.findOne({
      // participants: { $all: [senderId, chatUser] },
      participants: { $all: [senderObjectId, chatUserObjectId] },
    }).populate("messages")

    if (!conversation) {
      return res.status(404).json({ message: "No conversation found" });
    }
    const messages = conversation.messages;
    res.status(200).json({ messages })
  } catch (error) {
    console.log("message getting error" + error)
    return res.status(500).json({ message: "Internal server error" });

  }

}


