// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   reviewer: {                 // Jisne review diya (User ya Service-Provider)
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',        // UserModel & ServiceProviderModel dono ke liye check karna padega
//     required: true
//   },
//   reviewee: {                // Jisko review diya (Always Service-Provider)
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'ServiceProviderModel',
//     required: true
//   },
//   rating: { type: Number, required: true, min: 1, max: 5 },
//   comment: { type: String },
// }, { timestamps: true });

// const ReviewModel = mongoose.model("Review", reviewSchema);
// export default ReviewModel;
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewer: {                 // Jisne review diya (User ya Service-Provider)
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'reviewerModel',  // Dynamic ref based on reviewerModel field
    required: true
  },
  reviewerModel: {            // Specifies which model to use for reviewer
    type: String,
    required: true,
    enum: ['User', 'Service-provider']
  },
  reviewee: {                // Jisko review diya (Always Service-Provider)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service-provider',
    required: true
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, { timestamps: true });

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
