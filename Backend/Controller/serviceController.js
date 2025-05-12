
import ServiceProviderModel from "../Models/ServiceProviderModel.js";
import BookingModel from '../Models/BookingModel.js'

import bcrypt from "bcryptjs";

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, photo, gender, age, TicketPrice, bio, about,
    specialization,
    exprole, location, expDateStart, expDateEnd, date, startTime, endTime, day } = req.body;

  try {
    const service = await ServiceProviderModel.findById(id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    // Prepare the updates object
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (gender) updates.gender = gender;
    if (age) updates.age = age;
    if (photo) updates.photo = photo;
    if (TicketPrice) updates.TicketPrice = TicketPrice;
    if (specialization) updates.specialization = specialization;
    if (bio) updates.bio = bio;
    if (about) updates.about = about;

    // Handle password change
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }
    // Push new experience entry if provided

    if (exprole || location || expDateStart || expDateEnd) {
      service.experience.push({
        role: exprole,
        location: location,
        startdate: expDateStart,
        enddate: expDateEnd
      });
    }
    // Apply other updates

    const updateService = await ServiceProviderModel.findByIdAndUpdate(id, { $set: updates }, { new: true });

    // Save the doctor with new array entries
    await service.save();

    res.status(200).json({
      success: true,
      message: "Service successfully updated",
      updateService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};


// service Profile

// export const getServiceProfile = async (req, res) => {
//   const serviceId = req.serviceId;
//   // const serviceId = req.params.id;
//   try {
//     const service = await ServiceProviderModel.findById(serviceId);
//     if (!service) {
//       return res.status(404).json({ success: false, message: 'service not found' });
      
//     }

//     const {password, ...rest} = service._doc;
//     const appointments =await BookingModel.find({service:serviceId})

  
//     res.status(200).json({ success: true, message: 'Profile info is getting', data: { ...rest } });

//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Something went wrong' });
//   }

  
// }


export const AllServices = async (req, res) => {
  try {
    const services = await ServiceProviderModel.find(); // Fetch all services from DB
    res.status(200).json(services); // Send the services as response
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
  
}
