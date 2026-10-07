import ServiceProviderModel from "../Models/ServiceProviderModel.js";

import bcrypt from "bcryptjs";

export const updateService = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    photo,
    gender,
    age,
    TicketPrice,
    bio,
    about,
    specialization,
    location,
    timeSlots,
    isApproved,
    expDateStart,
    expDateEnd,
  } = req.body;

  try {
    const service = await ServiceProviderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    if (name) service.name = name;
    if (email) service.email = email;
    if (phone !== undefined) service.phone = phone;
    if (gender) service.gender = gender;
    if (age) service.age = age;
    if (photo) service.photo = photo;
    if (location) service.location = location;
    if (TicketPrice !== undefined) service.TicketPrice = TicketPrice;
    if (specialization) service.specialization = specialization;
    if (timeSlots) service.timeSlots = timeSlots;
    if (bio !== undefined) service.bio = bio;
    if (about !== undefined) service.about = about;
    if (isApproved) service.isApproved = isApproved;

    if (expDateStart || expDateEnd) {
      service.experience.push({
        location: location || service.location,
        startdate: expDateStart,
        enddate: expDateEnd,
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
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

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
};
