import express from "express"
import { updateService } from "../Controller/serviceController.js"

import {authenticate,restrict} from '../auth/VerifyToken.js'

const serviceUpdateRouter= express.Router()

serviceUpdateRouter.put('/:id',authenticate,restrict(["service-provider"]),updateService)


export default serviceUpdateRouter;