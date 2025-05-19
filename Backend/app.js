import express from 'express'
import authRouter from './Router/authRouter.js';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import serviceFindRouter from './Router/serviceFindRouter.js';
import serviceUpdateRouter from './Router/service.js';
import userRouter from './Router/user.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000
const allowdOrigns = ['http://localhost:5173',"http://localhost:5174", 'https://serivce.vercel.app']

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: allowdOrigns, credentials: true }))


//  api Endpoint

app.get("/", (req, res) => {
    res.send("server chal rha h")

}
)

app.use(cookieParser());
app.use("/api/auth", authRouter)
app.use("/api/Services-find", serviceFindRouter)
app.use('/api/services', serviceUpdateRouter)
app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})