import express from "express"
import { AllServices, updateService } from "../Controller/serviceController.js"

import {authenticate,restrict} from '../auth/VerifyToken.js'

const serviceUpdateRouter= express.Router()

serviceUpdateRouter.put('/:id',authenticate,restrict(["service-provider"]),updateService)
// serviceUpdateRouter.get('/profile/:id',authenticate,restrict(["service-provider"]),getServiceProfile)
serviceUpdateRouter.get('/', authenticate,AllServices
)


export default serviceUpdateRouter;