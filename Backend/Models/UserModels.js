import mongoose from "mongoose";

// MongoDB  connect 
mongoose.connect("mongodb://127.0.0.1:27017/serviceDatabase")
// .then(() => console.log(" MongoDB connected"))
// .catch((err) => console.error(" MongoDB connection error:", err));

// User ka schema define kar rahe hain
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: [6, "Password must be at least 6 characters long"], },
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
    required: true, // if needed, you can remove this if not required
  },
});

// Model create  export

export default mongoose.model('User', UserSchema);