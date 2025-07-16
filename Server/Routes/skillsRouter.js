import express from 'express';
import { getTechnicalSkills, addTechnicalSkill, deleteTechnicalSkill, addTech, deleteTech, getConceptualSkills, addConceptualSkill, deleteConceptualSkill} from '../Controllers/skills.js';

const skillsRouter = express.Router();


// Technical skills controller functions
skillsRouter.get("/technical", getTechnicalSkills);

skillsRouter.post("/technical", addTechnicalSkill);

skillsRouter.delete("/technical/:id", deleteTechnicalSkill);

skillsRouter.post("/technical/tech", addTech);

skillsRouter.delete("/technical/:id/tech/:id", deleteTech);


// Conceptual skills controller functions
skillsRouter.get("/conceptual", getConceptualSkills);

skillsRouter.post("/conceptual", addConceptualSkill);

skillsRouter.patch("/conceptual/:id", addConceptualSkill);

skillsRouter.delete("/conceptual/:id", deleteConceptualSkill);

export default skillsRouter;