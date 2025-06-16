import mongoose from "mongoose";


const ServiceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: [6, "Password must be at least 6 characters long"],  },
    phone: { type: Number },
    age: { type: Number, default: 25 }, 
    photo: { type: String },
    role: {
      type: String,
      enum: ["customer", "service-provider"], 
      default: "customer",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], 
    },
      location: {
    type: String,
    required: true, 
  },
     specialization: {
      type: [String], // Array to hold multiple specializations
      default: [],
    },
      // Fields for services only
      experience: [   {
        startdate:{ type: String,},
        enddate:{ type: String,},
        role: { type: String }, 
        locations: { type: String } 
      } ],
      bio: { type: String, maxLength: 50 },
      about: { type: String ,
      },
      timeSlots: [   {
        date:{ type: String,},
        day: { type: String, enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
        startTime: { type: String }, 
        endTime: { type: String } 
      } ],
      reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
      averageRating: {
        type: Number,
        default: 0,
      },
      totalRating: {
        type: Number,
        default: 0,
      },
      isApproved: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
      },

})
export default mongoose.model("Service-provider", ServiceProviderSchema );