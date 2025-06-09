import { Server } from "socket.io";
import express from 'express'
import http from "http"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://serivce.vercel.app',
    ],
    methods: ['GET', 'POST'],


  }
})
const users = {}


export const getReceiversocketId = (receiverId) => {
  const user = users[receiverId?.toString()];
  if (user) {
    return user.socketId;
  }
  return null; 
};


io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  const role = socket.handshake.query.role;

  if (userId && role) {
    users[userId.toString()] = socket.id;
  }
  if (userId && role) {
    users[userId.toString()] = {
      socketId: socket.id,
      role: role,
    };


  }


  io.emit("getOnline", Object.keys(users))


  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id)

    delete users[userId]
    io.emit("getOnline", Object.keys(users))
  })

})

export { app, io, server }