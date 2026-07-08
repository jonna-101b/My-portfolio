import express from 'express';
import { getTechnicalSkills, addTechnicalSkill, updateTechnicalSkill, deleteTechnicalSkill, addTech, deleteTech, getConceptualSkills, addConceptualSkill, deleteConceptualSkill} from '../Controllers/skills.js';

const skillsRouter = express.Router();


// Technical skills controller functions
skillsRouter.get("/technical", getTechnicalSkills);

skillsRouter.post("/technical", addTechnicalSkill);

skillsRouter.patch("/technical/:id", updateTechnicalSkill);

skillsRouter.delete("/technical/:id", deleteTechnicalSkill);

skillsRouter.post("/technical/:id/tech", addTech);

skillsRouter.delete("/technical/:id/tech/:techId", deleteTech);


// Conceptual skills controller functions
skillsRouter.get("/conceptual", getConceptualSkills);

skillsRouter.post("/conceptual", addConceptualSkill);

skillsRouter.patch("/conceptual/:id", addConceptualSkill);

skillsRouter.delete("/conceptual/:id", deleteConceptualSkill);

export default skillsRouter;