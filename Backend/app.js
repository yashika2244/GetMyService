import express from 'express'
import authRouter from './Router/authRouter.js';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))


//  api Endpoint

app.get("/", (req, res) => {
    res.send("server chal rha h")
  
}
)

app.use(cookieParser());
app.use("/api/auth",authRouter)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
  })