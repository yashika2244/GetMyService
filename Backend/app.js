
import express from 'express';
import authRouter from './Router/authRouter.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import serviceFindRouter from './Router/serviceFindRouter.js';
import serviceUpdateRouter from './Router/service.js';
import userRouter from './Router/user.js';
import reviewRouter from './Router/review.js';
import { app, server  } from './SocketIO/server.js';
import routeMessageRouter from './Router/routeMessage.js'
import conversationRouter from './Router/conversationRoute.js';
dotenv.config();



// Express middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://serivce.vercel.app',
  ],
  credentials: true,
}));
app.use(cookieParser());

// Basic root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/Services-find", serviceFindRouter);
app.use('/api/services', serviceUpdateRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/users', userRouter);
app.use('/api/message', routeMessageRouter)
app.use('/api/chat', conversationRouter)



// Start server listening on defined port
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
