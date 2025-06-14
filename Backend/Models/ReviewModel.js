import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'reviewerModel' // dynamic reference: User ya Service-provider
    },
    reviewerModel: {
        type: String,
        required: true,
        enum: ['User', 'Service-provider'] // dono allowed
    },
    reviewee: { // always Service-provider ko review milega
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service-provider'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxLength: 300
    }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
