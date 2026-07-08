import express from 'express';
import { getQualifications, addQualification, updateQualification, deleteQualification } from '../Controllers/qualifications.js';


const qualificationsRouter = express.Router();

// Define your qualifications routes here
qualificationsRouter.get("/", getQualifications);

qualificationsRouter.post("/", addQualification);

qualificationsRouter.patch("/:id", updateQualification);

qualificationsRouter.delete("/:id", deleteQualification);

export default qualificationsRouter;