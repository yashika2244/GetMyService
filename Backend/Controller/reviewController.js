// import ReviewModel from '../Models/ReviewModel.js';
// import ServiceProviderModel from '../Models/ServiceProviderModel.js';

// export const createReview = async (req, res) => {
//     try {
//         const { reviewee, rating, comment } = req.body;
//         const reviewer = req.userId; // from verifyToken middleware

//         // Check: Can't review yourself
//         if (reviewer === reviewee) {
//             return res.status(400).json({ success: false, message: "You cannot review yourself" });
//         }

//         // Check if reviewee is a valid Service Provider
//         const serviceProvider = await ServiceProviderModel.findById(reviewee);
//         if (!serviceProvider) {
//             return res.status(404).json({ success: false, message: "Service Provider not found" });
//         }

//         const newReview = new ReviewModel({
//             reviewer,
//             reviewee,
//             rating,
//             comment
//         });

//         await newReview.save();
//         res.status(201).json({ success: true, message: "Review created successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export const getReviewsForServiceProvider = async (req, res) => {
//     try {
//         const { serviceProviderId } = req.params;
//         console.log("ser", serviceProviderId)

//         const reviews = await ReviewModel.find({ reviewee: serviceProviderId })
//             .populate('reviewer', 'name photo');
//   console.log("Raw Reviews:", reviews);
//         res.status(200).json({ success: true, data: reviews });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


import ReviewModel from '../Models/ReviewModel.js';
import ServiceProviderModel from '../Models/ServiceProviderModel.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { reviewee, rating, comment } = req.body;
    const reviewer = req.userId;
    const reviewerModel = req.userRole === 'service-provider'
      ? 'ServiceProviderModel'
      : 'User';

    console.log("👉 createReview:", { reviewer, reviewerModel, reviewee });

    // Prevent self-review
    if (reviewer === reviewee) {
      return res.status(400).json({ success: false, message: "You cannot review yourself" });
    }

    // Validate reviewee exists
    const serviceProvider = await ServiceProviderModel.findById(reviewee);
    if (!serviceProvider) {
      return res.status(404).json({ success: false, message: "Service Provider not found" });
    }

    // Create and save review
    const newReview = new ReviewModel({
      reviewer,
      reviewerModel,
      reviewee,
      rating,
      comment
    });
    await newReview.save();

    console.log("👉 Saved Review:", newReview);
    res.status(201).json({ success: true, message: "Review created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews for a specific Service Provider
export const getReviewsForServiceProvider = async (req, res) => {
  try {
    const { serviceProviderId } = req.params;
    console.log("🔍 Fetching reviews for:", serviceProviderId);

    const reviews = await ReviewModel.find({ reviewee: serviceProviderId })
      .populate('reviewer', 'name photo');

    console.log("🔍 Populated Reviews:", reviews);
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
