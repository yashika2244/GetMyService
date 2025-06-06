import mongoose, { Types } from "mongoose";

// MongoDB  connect 
mongoose.connect("mongodb://127.0.0.1:27017/serviceDatabase")
// .then(() => console.log(" MongoDB connected"))
// .catch((err) => console.error(" MongoDB connection error:", err));








// User ka schema define kar rahe hain
// const MessageSchema = new mongoose.Schema({
//   senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   text: { type: String, required: true },
//   seen: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// } ,{ timestamps: true });


const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, refPath: 'senderModel', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, refPath: 'receiverModel', required: true },
  senderModel: { type: String, required: true, enum: ['User', 'ServiceProvider'] },
  receiverModel: { type: String, required: true, enum:['User', 'ServiceProvider'] },
  text: { type: String, required: true },
  seen: { type: Boolean, default: false },
}, { timestamps: true });

// Model create  export

export default mongoose.model('Message', MessageSchema);