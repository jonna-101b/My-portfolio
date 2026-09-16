import express from 'express';
import authenticate from '../Middleware/authenticate.js';
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
skillsRouter.post("/technical", authenticate, createTechnicalSkillValidator, addTechnicalSkill);
skillsRouter.put("/technical/:id", authenticate, updateTechnicalSkillValidator, updateTechnicalSkill);
skillsRouter.delete("/technical/:id", authenticate, technicalSkillIdParamValidator, deleteTechnicalSkill);

// Conceptual skills routes
skillsRouter.get("/conceptual", getConceptualSkills);
skillsRouter.post("/conceptual", authenticate, createConceptualSkillValidator, addConceptualSkill);
skillsRouter.put("/conceptual/:id", authenticate, updateConceptualSkillValidator, updateConceptualSkill);
skillsRouter.delete("/conceptual/:id", authenticate, conceptualSkillIdParamValidator, deleteConceptualSkill);

export default skillsRouter;
