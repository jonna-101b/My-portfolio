import express from 'express';


const projectsRouter = express.Router();

// Define your projects routes here
projectsRouter.get("/", getProjectsPage);

projectsRouter.post("/", postProjectsPage);

projectsRouter.patch("/:id", updateProjectsPage);

projectsRouter.delete("/:id", deleteProjectsPage);

export default projectsRouter;