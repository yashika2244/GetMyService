import express from "express"
const userRouter= express.Router()
import {authenticate,restrict} from '../auth/VerifyToken.js'
import {updateUser} from '../Controller/userController.js'

userRouter.put('/:id',authenticate,restrict(["customer"]),updateUser)

export default userRouter;
