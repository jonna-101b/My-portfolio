import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getTechnicalSkills, addTechnicalSkill, updateTechnicalSkill, deleteTechnicalSkill, addTech, deleteTech, getConceptualSkills, addConceptualSkill, deleteConceptualSkill} from '../Controllers/skills.js';
import { createTechnicalSkillValidator, updateTechnicalSkillValidator, technicalSkillIdParamValidator, createTechValidator, techIdParamValidator, createConceptualSkillValidator, conceptualSkillIdParamValidator } from '../Validator/skillsValidator.js';

const skillsRouter = express.Router();


// Technical skills controller functions
skillsRouter.get("/technical", getTechnicalSkills);

skillsRouter.post("/technical", authenticate, createTechnicalSkillValidator, addTechnicalSkill);

skillsRouter.put("/technical/:id", authenticate, updateTechnicalSkillValidator, updateTechnicalSkill);

skillsRouter.delete("/technical/:id", authenticate, technicalSkillIdParamValidator, deleteTechnicalSkill);

skillsRouter.post("/technical/:id/tech", authenticate, createTechValidator, addTech);

skillsRouter.delete("/technical/:id/tech/:techId", authenticate, techIdParamValidator, deleteTech);


// Conceptual skills controller functions
skillsRouter.get("/conceptual", getConceptualSkills);

skillsRouter.post("/conceptual", authenticate, createConceptualSkillValidator, addConceptualSkill);

// skillsRouter.patch("/conceptual/:id", authenticate, addConceptualSkill);

skillsRouter.delete("/conceptual/:id", authenticate, conceptualSkillIdParamValidator, deleteConceptualSkill);

export default skillsRouter;
