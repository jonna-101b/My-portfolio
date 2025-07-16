import express from 'express';
import { getArticles, addArticle, updateArticle,  deleteArticle } from "../Controllers/articles.js";


const articlesRouter = express.Router();

// Define your articles routes here
articlesRouter.get("/", getArticles);

articlesRouter.post("/", addArticle);

articlesRouter.patch("/:id", updateArticle);

articlesRouter.delete("/:id", deleteArticle);

export default articlesRouter;