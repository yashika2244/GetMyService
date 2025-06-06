import UserModels from '../Models/UserModels.js'
import BookingModel from '../Models/BookingModel.js'
import ServiceProviderModel from '../Models/ServiceProviderModel.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const generateToken=user=>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
 }
 
 export const updateUser = async (req, res) => {
  

    const { id } = req.params;
    const { name, email, photo, gender, age , location} = req.body;
      // Prepare the updates object
      const updates = {};
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (gender) updates.gender = gender;
  if (age) updates.age = age;
  if (photo) updates.photo = photo;
  if (location) updates.location = location;


try {
     // Handle password change
    //  if (password) {
    //     const salt = await bcrypt.genSalt(10);
    //     updates.password = await bcrypt.hash(password, salt);
    //   }
      // Perform the update using findByIdAndUpdate
      const updatedUser = await UserModels.findByIdAndUpdate(id, { $set: updates }, { new: true });
      
    if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
          // Send success response
          res.status(200).json({
            success: true,
            message: 'User successfully updated',
            updatedUser,
          });

} catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message,
    });
}


 }


 export const getAllUSersPorfile = async (req,res) => {
  try {
// const loggedInUsers = req.UserModels._id
    const userId = req.userId;

    // console.log("userId is", userId)

    const filterUser =  await UserModels.find({_id:{$ne:userId}}).select("-password")
    res.status(201).json ({filterUser})
  } catch (error) {
    console.log(error)
    
    res.status(500).json ({message:"Server Error"})

    
  }
  
 }