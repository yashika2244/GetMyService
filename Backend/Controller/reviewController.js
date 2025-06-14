import ReviewModel from "../Models/ReviewModel.js";
import UserModels from "../Models/UserModels.js";
import ServiceProviderModel from "../Models/ServiceProviderModel.js";
// export const createReview = async (req, res) => {
//     try {
//         const { revieweeId, rating, comment } = req.body;
//         const reviewerId = req.userId;
//         const reviewerRole =  req.user.role  // 'User' ya 'service-provider'
// console.log("snsjsj", reviewerRole)
//         // Validate Reviewee
//         const reviewee = await ServiceProviderModel.findById(revieweeId);
//         if (!reviewee) return res.status(404).json({ message: "Service Provider not found" });

//         // Check for duplicate review
//         const existingReview = await ReviewModel.findOne({
//             reviewer: reviewerId,
//             reviewee: revieweeId
//         });

//         if (existingReview) return res.status(400).json({ message: "You have already reviewed this Service Provider" });

//         // Create Review
//         const review = new ReviewModel({
//             reviewer: reviewerId,
//             reviewerModel: reviewerRole === 'service-provider' ? 'Service-provider' : 'User',
//             reviewee: revieweeId,
//             rating,
//             comment
//         });

//         await review.save();

//         // Update Service Provider average rating
//         const allReviews = await ReviewModel.find({ reviewee: revieweeId });
//         const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
//         const averageRating = totalRating / allReviews.length;

//         reviewee.averageRating = averageRating;
//         reviewee.totalRating = allReviews.length;
//         await reviewee.save();

//         res.status(201).json({ message: "Review added successfully", review });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
import mongoose from "mongoose";


export const createReview = async (req, res) => {
  try {
    const { revieweeId, rating, comment } = req.body;
  

    const reviewerId = req.userId;

    // Role ko database se check karenge:
    let reviewerRole = '';

    const isUser = await UserModels.findById(reviewerId);
    if (isUser) {
      reviewerRole = 'User';
    } else {
      const isServiceProvider = await ServiceProviderModel.findById(reviewerId);
      console.log("Reviewee Found:", reviewee);
      if (isServiceProvider) {
        reviewerRole = 'Service-provider';
      } else {
        return res.status(404).json({ message: "Reviewer not found in User or Service-provider collection" });
      }
    }

    console.log("review", reviewerRole)

    // Validate Reviewee
    const reviewee = await ServiceProviderModel.findById(revieweeId);
    if (!reviewee) return res.status(404).json({ message: "Service Provider not found" })


    // Check for duplicate review
    // const existingReview = await ReviewModel.findOne({
    //   reviewer: reviewerId,
    //   reviewee: revieweeId
    // });

    // if (existingReview) return res.status(400).json({ message: "You have already reviewed this Service Provider" });

    // Create Review
    const review = new ReviewModel({
      reviewer: reviewerId,
      reviewerModel: reviewerRole, // Ab yeh dynamic hai based on DB
      reviewee: revieweeId,
      rating,
      comment
    });

    await review.save();

    // Update Service Provider average rating
    const allReviews = await ReviewModel.find({ reviewee: revieweeId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / allReviews.length;

    reviewee.averageRating = averageRating;
    reviewee.totalRating = allReviews.length;
    await reviewee.save();

    res.status(201).json({ message: "Review added successfully", review });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// export const getReviewsForServiceProvider = async (req, res) => {
//   try {
//     const { serviceProviderId } = req.params;

//     const reviews = await ReviewModel.find({ reviewee: serviceProviderId });

//     // Manually populate reviewer based on reviewerModel
//     const populatedReviews = await Promise.all(reviews.map(async (review) => {
//       let reviewerData = null;

//       if (review.reviewerModel === 'User') {
//         reviewerData = await UserModels.findById(review.reviewer).select('name photo');
//       } else if (review.reviewerModel === 'Service-provider') {
//         reviewerData = await ServiceProviderModel.findById(review.reviewer).select('name photo');
//       }

//       return {
//         ...review._doc,
//         reviewer: reviewerData
//       };
//     }));

//     res.status(200).json(populatedReviews);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



export const getReviewsForServiceProvider = async (req, res) => {
    try {
        const { serviceProviderId } = req.params;

        const reviews = await ReviewModel.find({ reviewee: serviceProviderId });

        // Manually populate reviewer based on reviewerModel
        const populatedReviews = await Promise.all(reviews.map(async (review) => {
            let reviewerData;
            if (review.reviewerModel === 'User') {
                reviewerData = await UserModels.findById(review.reviewer).select('name photo');
            } else if (review.reviewerModel === 'Service-provider') {
                reviewerData = await ServiceProviderModel.findById(review.reviewer).select('name photo');
            }
            return {
                ...review.toObject(),
                reviewer: reviewerData
            };
        }));

        res.status(200).json(populatedReviews);
    } catch (error) {
        console.error("Get reviews error:", error);
        res.status(500).json({ message: error.message });
    }
};