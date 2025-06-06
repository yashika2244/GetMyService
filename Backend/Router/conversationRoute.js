import express from "express";

import { getConversations } from "../Controller/converstion.js";
import { authenticate } from "../auth/VerifyToken.js";

const conversationRouter = express.Router();


conversationRouter.get("/", authenticate, getConversations);

export default conversationRouter