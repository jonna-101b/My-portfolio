import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import trackActivity from '../Middlewares/trackActivity.js';
import { getProjects, addProject, updateProject, deleteProject } from '../Controllers/projects.js';
import { createProjectValidator, updateProjectValidator, projectIdParamValidator } from '../Validator/projectsValidator.js';


const projectsRouter = express.Router();

// Define your projects routes here
projectsRouter.get("/", getProjects);

projectsRouter.post("/", authenticate, createProjectValidator, trackActivity('Projects'), addProject);

projectsRouter.put("/:id", authenticate, updateProjectValidator, trackActivity('Projects'), updateProject);

projectsRouter.delete("/:id", authenticate, projectIdParamValidator, trackActivity('Projects'), deleteProject);

export default projectsRouter;
