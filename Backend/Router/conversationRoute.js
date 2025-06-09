import express from "express";
import { authenticate } from "../auth/VerifyToken.js";
import { getChatPartners } from "../Controller/getConversation.js";

const conversationRouter = express.Router();


conversationRouter.get ("/chat-users/:userId/:role",authenticate, getChatPartners);

export default conversationRouter