import express from 'express'
import { defaultServices, SearchService } from '../Controller/serverFindContorller.js';

const serviceRouter = express.Router();

serviceRouter.get('/search', SearchService  )
serviceRouter.get('/default', defaultServices)

export default serviceRouter