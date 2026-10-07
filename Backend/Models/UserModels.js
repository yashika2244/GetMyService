import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
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
  bio: {
    type: String,
  },
});

export default mongoose.model("User", UserSchema);
