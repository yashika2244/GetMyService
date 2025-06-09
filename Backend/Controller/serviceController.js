
import ServiceProviderModel from "../Models/ServiceProviderModel.js";

import bcrypt from "bcryptjs";


export const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, email, photo, gender, age, TicketPrice, bio, about,
    specialization,
     location, expDateStart, expDateEnd } = req.body;

  try {
    const service = await ServiceProviderModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ success: true, user: service });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    if (name) service.name = name;
    if (email) service.email = email;
    if (gender) service.gender = gender;
    if (age) service.age = age;
    if (photo) service.photo = photo;
    if (TicketPrice) service.TicketPrice = TicketPrice;
    if (specialization) service.specialization = specialization;
    if (bio) service.bio = bio;
    if (about) service.about = about;


    if ( location || expDateStart || expDateEnd) {
      service.experience.push({
        // role: exprole,
        location,
        startdate: expDateStart,
        enddate: expDateEnd
      });
    }

    await service.save();

    res.status(200).json({
      success: true,
      message: "Service successfully updated",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};


export const AllServices = async (req, res) => {
  try {
    const services = await ServiceProviderModel.find(); // Fetch all services from DB
    res.status(200).json(services); // Send the services as response
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
  
}


export const getServiceProfile = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await ServiceProviderModel.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error in getServiceProfile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

