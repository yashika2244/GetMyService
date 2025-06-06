import express from 'express'
// import {  getMessage, sendMessages } from '../Controller/conrollerMessage.js';
import { authenticate } from '../auth/VerifyToken.js';
import {  sendMessages,getMessage} from '../Controller/conrollerMessage.js';
const routeMessageRouter = express.Router();

routeMessageRouter.post('/send/:id',authenticate,sendMessages)
routeMessageRouter.get('/get/:id',authenticate, getMessage )

 

export default routeMessageRouter