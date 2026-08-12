import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getProjects, addProject, updateProject, deleteProject } from '../Controllers/projects.js';
import { createProjectValidator, updateProjectValidator, projectIdParamValidator } from '../Validator/projectsValidator.js';


const projectsRouter = express.Router();

// Define your projects routes here
projectsRouter.get("/", getProjects);

projectsRouter.post("/", authenticate, createProjectValidator, addProject);

projectsRouter.put("/:id", authenticate, updateProjectValidator, updateProject);

projectsRouter.delete("/:id", authenticate, projectIdParamValidator, deleteProject);

export default projectsRouter;
