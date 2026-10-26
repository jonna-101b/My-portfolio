import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import trackActivity from '../Middleware/trackActivity.js';
import { getQualifications, addQualification, updateQualification, deleteQualification } from '../Controllers/qualifications.js';
import { createQualificationValidator, updateQualificationValidator, qualificationIdParamValidator } from '../Validator/qualificationsValidator.js';


const qualificationsRouter = express.Router();

// Define your qualifications routes here
qualificationsRouter.get("/", getQualifications);

qualificationsRouter.post("/", authenticate, createQualificationValidator, trackActivity('Qualifications'), addQualification);

qualificationsRouter.put("/:id", authenticate, updateQualificationValidator, trackActivity('Qualifications'), updateQualification);

qualificationsRouter.delete("/:id", authenticate, qualificationIdParamValidator, trackActivity('Qualifications'), deleteQualification);

export default qualificationsRouter;
