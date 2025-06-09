import express from "express"
import { AllServices, getServiceProfile, updateService } from "../Controller/serviceController.js"

import {authenticate,restrict} from '../auth/VerifyToken.js'

const serviceUpdateRouter= express.Router()

serviceUpdateRouter.put('/:id',authenticate,restrict(["service-provider"]),updateService)
serviceUpdateRouter.get('/',AllServices)
serviceUpdateRouter.get("/:id", getServiceProfile);


export default serviceUpdateRouter;