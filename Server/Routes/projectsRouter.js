import express from 'express';
import { getProjects, addProject, updateProject, deleteProject } from '../Controllers/projects.js';


const projectsRouter = express.Router();

// Define your projects routes here
projectsRouter.get("/", getProjects);

projectsRouter.post("/", addProject);

projectsRouter.patch("/:id", updateProject);

projectsRouter.delete("/:id", deleteProject);

export default projectsRouter;