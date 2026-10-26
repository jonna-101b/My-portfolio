import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import trackActivity from '../Middleware/trackActivity.js';
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../Controllers/blogs.js";
import { createBlogValidator, updateBlogValidator, blogIdParamValidator } from '../Validator/blogsValidator.js';


const blogRouter = express.Router();


blogRouter.get("/", getBlogs);

blogRouter.post("/", authenticate, createBlogValidator, trackActivity('Blogs'), addBlog);

blogRouter.put("/:id", authenticate, updateBlogValidator, trackActivity('Blogs'), updateBlog);

blogRouter.delete("/:id", authenticate, blogIdParamValidator, trackActivity('Blogs'), deleteBlog);

export default blogRouter;
