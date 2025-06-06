

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import UserModels from '../Models/UserModels.js';
import ServiceProviderModel from '../Models/ServiceProviderModel.js';


//  generated token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)

}



export const registerCustomer = async (req, res) => {
  const { email, password, name, photo, gender, location } = req.body;
  try {
    // Validate input
    if (!email || !password || !name || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //  Validate password length before hashing
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if customer exists
    let user = await UserModels.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new customer
    const newUser = new UserModels({
      name,
      email,
      password: hashedPassword,
      photo,
      gender,
      role: "customer",
      location  // Ensure it's a customer
    });

    // Save new customer
    await newUser.save();
    res.status(201).json({ success: true, message: "Customer successfully created" });

  } catch (error) {
    console.error("Error during customer registration:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerServiceProvider = async (req, res) => {
  const { email, password, name, photo, gender, specialization, location, about } = req.body;
  try {
    // Validate input
    if (!email || !password || !name || !gender || !specialization || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  Validate password length before hashing
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }


    // Check if service provider exists
    let user = await ServiceProviderModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Service provider already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new service provider
    const newServiceProvider = new ServiceProviderModel({
      name,
      email,
      password: hashedPassword,
      photo,
      gender,
      role: "service-provider",  // Ensure it's a service provider
      specialization,
      location, // Include location in the service provider model
      about
    });

    // Save new service provider
    await newServiceProvider.save();
    res.status(201).json({ success: true, message: "Service provider successfully created" });

  } catch (error) {
    console.error("Error during service provider registration:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};






export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user;

    if (email && password) {
      user = await UserModels.findOne({ email });
      // let role = "";




      if (!user) {
        user = await ServiceProviderModel.findOne({ email });

      }

    }


    // // Find user based on role
    // if (role === "customer") {
    //   user = await UserModels.findOne({ email });
    // } else if (role === "service-provider") {
    //   user = await ServiceProviderModel.findOne({ email });
    // } else {
    //   return res.status(400).json({ message: "Invalid role" });
    // }




    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is Invalid" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      // expiresIn: "d",
    });

    // Send successful login response with token and user data
    res.status(200).json({
      message: "Login successful",
      token,
      data: user,
      // role,

    });
  } catch (error) {
    console.error("Login backend error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





























// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Logout failed", error: error.message });
  }
};