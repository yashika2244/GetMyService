import express from "express"
const userRouter= express.Router()
import {authenticate,restrict} from '../auth/VerifyToken.js'
import {getAllUSersPorfile, updateUser} from '../Controller/userController.js'

userRouter.put('/:id',authenticate,restrict(["customer"]),updateUser)
userRouter.get('/getUserprofile',authenticate, getAllUSersPorfile)


export default userRouter;



