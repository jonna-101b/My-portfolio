import express from 'express';


const aboutRouter = express.Router();

// Define your about routes here
aboutRouter.get("/", getAboutPage);

aboutRouter.post("/", postAboutPage);

aboutRouter.patch("/:id", updateAboutPage);

aboutRouter.delete("/:id", deleteAboutPage);

export default aboutRouter;