import express from 'express';
import { getHomePage, updateHomePage } from '../Controllers/home.js';


const homeRouter = express.Router();

// Defining the home routers
homeRouter.get("/", getHomePage);

homeRouter.patch("/", updateHomePage);

export default homeRouter;