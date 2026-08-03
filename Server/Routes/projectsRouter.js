import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getProjects, addProject, updateProject, deleteProject } from '../Controllers/projects.js';


const projectsRouter = express.Router();

// Define your projects routes here
projectsRouter.get("/", getProjects);

projectsRouter.post("/", authenticate, addProject);

projectsRouter.put("/:id", authenticate, updateProject);

projectsRouter.delete("/:id", authenticate, deleteProject);

export default projectsRouter;