import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../Controllers/blogs.js";


const blogRouter = express.Router();


blogRouter.get("/", getBlogs);

blogRouter.post("/", authenticate, addBlog);

blogRouter.put("/:id", authenticate, updateBlog);

blogRouter.delete("/:id", authenticate, deleteBlog);

export default blogRouter;