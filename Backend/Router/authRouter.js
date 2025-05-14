import express from 'express'
import { login, logout, registerCustomer, registerServiceProvider } from '../Controller/authController.js';

const authRouter = express.Router();

authRouter.post('/register-customer', registerCustomer)
authRouter.post('/register-service-provider', registerServiceProvider);
authRouter.post('/login',login)
authRouter.post('/logout', logout)


export default authRouter