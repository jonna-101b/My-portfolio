import express from 'express';
import { getAboutPage, updateAboutPage, addEducation, updateEducation, deleteEducation, addExperience, updateExperience, deleteExperience } from '../Controllers/about.js';


const aboutRouter = express.Router();

// Define your about routes here
aboutRouter.get("/", getAboutPage);

aboutRouter.patch("/", updateAboutPage);


// Education controllers
aboutRouter.post("/education", addEducation);

aboutRouter.patch("/education/:id", updateEducation);

aboutRouter.delete("/education/:id", deleteEducation);


// experience controllers
aboutRouter.post("/experience", addExperience);

aboutRouter.patch("/experience/:id", updateExperience);

aboutRouter.delete("/experience/:id", deleteExperience);

export default aboutRouter;