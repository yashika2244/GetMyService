import express from 'express'
import { SearchService } from '../Controller/serverContorller.js';

const serviceRouter = express.Router();

serviceRouter.get('/search', SearchService  )

export default serviceRouter