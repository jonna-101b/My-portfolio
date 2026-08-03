import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getQualifications, addQualification, updateQualification, deleteQualification } from '../Controllers/qualifications.js';


const qualificationsRouter = express.Router();

// Define your qualifications routes here
qualificationsRouter.get("/", getQualifications);

qualificationsRouter.post("/", authenticate, addQualification);

qualificationsRouter.put("/:id", authenticate, updateQualification);

qualificationsRouter.delete("/:id", authenticate, deleteQualification);

export default qualificationsRouter;