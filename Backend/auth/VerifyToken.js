import jwt from "jsonwebtoken";

import UserModels from "../Models/UserModels";
import ServiceProviderModel from "../Models/ServiceProviderModel";
export const authenticate = async (req, res, next) => {
    try {
      // Get token from headers
      const authToken = req.headers.authorization;
  
      // Check if token exists
      if (!authToken || !authToken.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ success: false, message: "No token, authorization denied" })
          ;
      }
  
      // Extract the token from the "Bearer" header
      const token = authToken.split(" ")[1];
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
      // Attach user information to the request object
      req.userId = decoded.id;
      req.role = decoded.role;
      console.log(" verified to access");
      
  
      next(); // Move to the next middleware or route
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  export const restrict = (roles) => async (req, res, next) => {
      const userId = req.userId;
    
      let user;
    
      const customer = await UserModels.findById(userId);
      const Servicer = await ServiceProviderModel.findById(userId);
    
      if (customer) {
        user = customer;
      }
      if (Servicer) {
        user = Servicer;
      }
    
      if (!roles.includes(user.role)) {
        return res
          .status(401)
          .json({ success: false, message: "You're not authorized" });
      }
    
      next();
    };