




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
// import conversationRouter from './Router/conversationRoute.js';
import routeMessageRouter from './Router/routeMessage.js'
dotenv.config();

// const app = express();
// const server = http.createServer(app);  // HTTP server for Express + Socket.io

// Map to track online users: { userId: socketId }
// export const userSocketMap = {};



// // Socket.io server instance with CORS allowed origins
// export const io = new Server(server, {
//   cors: {
//     origin: [
//       'http://localhost:5173',
//       'http://localhost:5174',
//       'https://serivce.vercel.app',
//     ],
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });




// io.on("connection", (socket) => {
//   socket.on("setup", (userId) => {
//     userSocketMap[userId] = socket.id;
//     socket.join(userId); // User ko uske unique room mein join karna
//     console.log(`User ${userId} connected with socket ${socket.id}`);
//   });

//   socket.on("sendMessage", (messageData) => {
//   //   console.log(`Sending message from ${messageData.senderId} to ${messageData.receiverId}`);
//   //   io.to(messageData.receiverId).emit("newMessage", messageData);  // Sirf receiver ke room ko message bhejo
//   // });
//    try {
//       // TODO: Yahan messageData ko DB me save karne ka code daal sakte hain
//       console.log(`Sending message from ${messageData.senderId} to ${messageData.receiverId}`);

//       // Emit message sirf receiver ko
//       const receiverSocketId = userSocketMap[messageData.receiverId];
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("newMessage", messageData);
//       }
//     } catch (err) {
//       console.error("Error handling sendMessage:", err);
//     }
//   });

//   socket.on("disconnect", () => {
//     for (const [userId, sockId] of Object.entries(userSocketMap)) {
//       if (sockId === socket.id) {
//         delete userSocketMap[userId];
//         break;
//       }
//     }
//   });
// });


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



// Start server listening on defined port
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
