import express from "express"
import { createReview, getAllReviews } from "../Controller/rivewController.js";
import { authenticate, restrict } from "../auth/VerifyToken.js";


const reviewRouter = express.Router({mergeParams:true})

reviewRouter
.route('/')
.get(getAllReviews)
.post(authenticate, restrict(['customer']),createReview);

export default reviewRouter;