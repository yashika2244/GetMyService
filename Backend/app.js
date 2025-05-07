import express from 'express'
import authRouter from './Router/authRouter.js';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import serviceRouter from './Router/serviceRouter.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000
const allowdOrigns = ['http://localhost:5173', 'https://serivce.vercel.app']

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({ origin:allowdOrigns, credentials: true }))


//  api Endpoint

app.get("/", (req, res) => {
    res.send("server chal rha h")
  
}
)

app.use(cookieParser());
app.use("/api/auth",authRouter)
app.use("/api/Services",serviceRouter)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
  })