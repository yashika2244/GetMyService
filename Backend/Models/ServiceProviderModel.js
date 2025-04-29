import mongoose from "mongoose";


const ServiceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
      // Fields for services only
      experience: [   {
        startdate:{ type: String,},
        enddate:{ type: String,},
        role: { type: String }, // Example: "10:00 AM"
        locations: { type: String } // Example: "4:30 PM"
      } ],
      bio: { type: String, maxLength: 50 },
      about: { type: String ,
        default:"it is good service"
      },
      timeSlots: [   {
        date:{ type: String,},
        day: { type: String, enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
        startTime: { type: String }, // Example: "10:00 AM"
        endTime: { type: String } // Example: "4:30 PM"
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