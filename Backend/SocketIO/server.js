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

// real time message 
export const getReceiversocketId = (receiverId) => {
    console.log("receiverId type:", typeof receiverId);
    return users[receiverId.toString()]
}





io.on("connection", (socket) => {
    console.log("New client connected", socket.id)
    const userId = socket.handshake.query.userId
     console.log("userId from handshake:", userId);
    if (userId) {
        users[userId] = socket.id;
         console.log("Updated users map:", users);
        console.log("Helloooo", users)
    }
    io.emit("getOnline", Object.keys(users))
    console.log("users keys:", Object.keys(users));


    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id)
        delete users[userId]
        io.emit("getOnline", Object.keys(users))
    })

})

export { app, io, server }