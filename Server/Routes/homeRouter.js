import express from 'express';


const homeRouter = express.Router();

// Define your home routes here
homeRouter.get("/", getHomePage);

homeRouter.post("/", postHomePage);

homeRouter.patch("/:id", updateHomePage);

homeRouter.delete("/:id", deleteHomePage);

export default homeRouter;