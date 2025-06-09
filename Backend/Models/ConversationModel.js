
import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'participants.role' },
  role: { 
    type: String, 
    required: true, 
    enum: ['customer', 'service-provider']  
  }
}, { _id: false });

const conversationSchema = new mongoose.Schema({
  participants: [participantSchema],

  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] }],

}, {
  timestamps: true,
});

export default mongoose.model("Conversation", conversationSchema);
