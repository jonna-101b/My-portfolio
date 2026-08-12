import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../Controllers/blogs.js";
import { createBlogValidator, updateBlogValidator, blogIdParamValidator } from '../Validator/blogsValidator.js';


const blogRouter = express.Router();


blogRouter.get("/", getBlogs);

blogRouter.post("/", authenticate, createBlogValidator, addBlog);

blogRouter.put("/:id", authenticate, updateBlogValidator, updateBlog);

blogRouter.delete("/:id", authenticate, blogIdParamValidator, deleteBlog);

export default blogRouter;
