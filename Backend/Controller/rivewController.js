import RiviewModel from "../Models/RiviewModel.js";
import ServiceProviderModel from "../Models/ServiceProviderModel.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await RiviewModel.find({});

    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "Not found" });
  }
};



///creating reviews
export const createReview = async (req, res) => {
    if (!req.body.service) req.body.service = req.params.serviceId;
    if (!req.body.customer) req.body.customer = req.userId;

    const newReview = new Review(req.body);

    try {
        const savedReview = await newReview.save();

        await ServiceProviderModel.findByIdAndUpdate(req.body.doctor, {
            $push: { reviews: savedReview._id },
        });

        res.status(200).json({
            success: true,
            message: "Review submitted",
            data: savedReview,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};