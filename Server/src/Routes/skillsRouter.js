import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import trackActivity from '../Middleware/trackActivity.js';
import {
  getTechnicalSkills,
  addTechnicalSkill,
  updateTechnicalSkill,
  deleteTechnicalSkill,
  getConceptualSkills,
  addConceptualSkill,
  updateConceptualSkill,
  deleteConceptualSkill
} from '../Controllers/skills.js';
import {
  createTechnicalSkillValidator,
  updateTechnicalSkillValidator,
  technicalSkillIdParamValidator,
  createConceptualSkillValidator,
  updateConceptualSkillValidator,
  conceptualSkillIdParamValidator
} from '../Validator/skillsValidator.js';

const skillsRouter = express.Router();

// Technical skills routes
skillsRouter.get("/technical", getTechnicalSkills);
skillsRouter.post("/technical", authenticate, createTechnicalSkillValidator, trackActivity('Technical Skills'), addTechnicalSkill);
skillsRouter.put("/technical/:id", authenticate, updateTechnicalSkillValidator, trackActivity('Technical Skills'), updateTechnicalSkill);
skillsRouter.delete("/technical/:id", authenticate, technicalSkillIdParamValidator, trackActivity('Technical Skills'), deleteTechnicalSkill);

// Conceptual skills routes
skillsRouter.get("/conceptual", getConceptualSkills);
skillsRouter.post("/conceptual", authenticate, createConceptualSkillValidator, trackActivity('Conceptual Skills'), addConceptualSkill);
skillsRouter.put("/conceptual/:id", authenticate, updateConceptualSkillValidator, trackActivity('Conceptual Skills'), updateConceptualSkill);
skillsRouter.delete("/conceptual/:id", authenticate, conceptualSkillIdParamValidator, trackActivity('Conceptual Skills'), deleteConceptualSkill);

export default skillsRouter;
