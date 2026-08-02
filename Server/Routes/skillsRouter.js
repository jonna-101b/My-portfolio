import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getTechnicalSkills, addTechnicalSkill, updateTechnicalSkill, deleteTechnicalSkill, addTech, deleteTech, getConceptualSkills, addConceptualSkill, deleteConceptualSkill} from '../Controllers/skills.js';

const skillsRouter = express.Router();


// Technical skills controller functions
skillsRouter.get("/technical", getTechnicalSkills);

skillsRouter.post("/technical", authenticate, addTechnicalSkill);

skillsRouter.patch("/technical/:id", authenticate, updateTechnicalSkill);

skillsRouter.delete("/technical/:id", authenticate, deleteTechnicalSkill);

skillsRouter.post("/technical/:id/tech", authenticate, addTech);

skillsRouter.delete("/technical/:id/tech/:techId", authenticate, deleteTech);


// Conceptual skills controller functions
skillsRouter.get("/conceptual", getConceptualSkills);

skillsRouter.post("/conceptual", authenticate, addConceptualSkill);

// skillsRouter.patch("/conceptual/:id", authenticate, addConceptualSkill);

skillsRouter.delete("/conceptual/:id", authenticate, deleteConceptualSkill);

export default skillsRouter;