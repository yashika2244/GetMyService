import mongoose from "mongoose";
import ServiceProviderModel from "../Models/ServiceProviderModel.js";

const reviewSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
  type: Number,
  min: 1,
  max: 5,
  required: true
}
  
  },
  { timestamps: true }
);
reviewSchema.pre(/^find/,function (next){
  this.populate({
    path:"customer",
    select:"name photo"
  });
  next()
})
reviewSchema.statics.calcAverageRatings= async function(serviceId)
 {

  const stats =await this.aggregate([{
    $match:{service:serviceId},},

    {$group:{
      _id:"$service",

    numOfRating:{$sum:1},
    avgRating:{$avg:'$rating'}}
  }]);
 await ServiceProviderModel.findByIdAndUpdate(serviceId,{
  totalRating:stats[0].numOfRating,
  averageRating:stats[0].avgRating,
 });
  
};
reviewSchema.post("save",function(){
  this.constructor.calcAverageRatings(this.service)
})

export default mongoose.model("Review", reviewSchema);