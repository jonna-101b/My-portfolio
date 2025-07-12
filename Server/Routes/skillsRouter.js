import express from 'express';


const skillsRouter = express.Router();

// Define your skills routes here
skillsRouter.get("/", getSkillsPage);

skillsRouter.post("/", postSkillsPage);

skillsRouter.patch("/:id", updateSkillsPage);

skillsRouter.delete("/:id", deleteSkillsPage);

export default skillsRouter;