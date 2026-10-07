import express from "express"
const userRouter= express.Router()
import {authenticate,restrict} from '../auth/VerifyToken.js'
import {getAllUSersPorfile, updateUser, getUserById} from '../Controller/userController.js'

userRouter.put('/:id', (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken && authToken.startsWith("Bearer ") && authToken.split(" ")[1] !== "null" && authToken.split(" ")[1] !== "undefined") {
    return authenticate(req, res, () => restrict(["customer", "service-provider"])(req, res, next));
  }
  next();
}, updateUser)
userRouter.get('/getUserprofile',authenticate, getAllUSersPorfile)
userRouter.get('/:id', getUserById)

export default userRouter;



