

import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  sender: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'service-provider'],
      required: true
    }
  },
  receiver: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'service-provider'],
      required: true
    }
  },

  message: {
  type: String,
  required: true,
  maxlength: 1000,
  trim: true,
  validate: {
    validator: function(value) {
      return value && value.length > 0;
    },
    message: "Message cannot be empty"
  }
}
}, {
  timestamps: true
});


export default mongoose.model("Message", messageSchema);
