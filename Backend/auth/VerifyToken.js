// import jwt from "jsonwebtoken";

// import UserModels from "../Models/UserModels.js";
// import ServiceProviderModel from "../Models/ServiceProviderModel.js";
// export const authenticate = async (req, res, next) => {
//     try {
//       // Get token from headers
//       const authToken = req.headers.authorization;
  
//       // Check if token exists
//       if (!authToken || !authToken.startsWith("Bearer ")) {
//         return res
//           .status(401)
//           .json({ success: false, message: "No token, authorization denied" })
//           ;
//       }
  
//       // Extract the token from the "Bearer" header
//       const token = authToken.split(" ")[1];
  
//       // Verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
//       // Attach user information to the request object
//       req.userId = decoded.id;
//       req.role = decoded.role;
//       console.log(" verified to access");
      
  
//       next(); // Move to the next middleware or route
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   };
  
//   export const restrict = (roles) => async (req, res, next) => {
//       const userId = req.userId;
    
//       let user;
    
//       const customer = await UserModels.findById(userId);
//       const Servicer = await ServiceProviderModel.findById(userId);
    
//       if (customer) {
//         user = customer;
//       }
//       if (Servicer) {
//         user = Servicer;
//       }
    
//       if (!roles.includes(user.role)) {
//         return res
//           .status(401)
//           .json({ success: false, message: "You're not authorized" });
//       }
    
//       next();
//     };

import jwt from "jsonwebtoken";
import UserModels from "../Models/UserModels.js";
import ServiceProviderModel from "../Models/ServiceProviderModel.js";

// Authentication middleware to check if the user is authenticated
export const authenticate = async (req, res, next) => {
  try {
    // Get token from headers
    const authToken = req.headers.authorization;

    // Check if token exists
    if (!authToken || !authToken.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    // Extract the token from the "Bearer" header
    const token = authToken.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.userId = decoded.id;
    req.role = decoded.role;
    console.log("Verified to access");

    next(); // Move to the next middleware or route
  } catch (err) {
    console.error(err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired, please log in again" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Restrict access based on the user's role
export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;

  // Try to find the user in either of the models
  const customer = await UserModels.findById(userId);
  const serviceProvider = await ServiceProviderModel.findById(userId);

  if (customer) {
    user = customer;
  }
  if (serviceProvider) {
    user = serviceProvider;
  }

  // If no user is found, return an error
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Check if the user's role is in the allowed roles list
  if (!roles.includes(user.role)) {
    return res.status(401).json({ success: false, message: "You're not authorized" });
  }

  next(); // Proceed to the next middleware or route
};
