import express from 'express';


const articlesRouter = express.Router();

// Define your articles routes here
articlesRouter.get("/", getArticlesPage);

articlesRouter.post("/", postArticlesPage);

articlesRouter.patch("/:id", updateArticlesPage);

articlesRouter.delete("/:id", deleteArticlesPage);

export default articlesRouter;