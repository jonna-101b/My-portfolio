import mongoose from 'mongoose';
import BlogModel from '../Models/blogs.js';
import { APIError } from '../Errors/APIError.js';

const getBlogs = async (req, res, next) => {
        try {
                const blogs = await BlogModel.find({}).sort({ datePublished: -1 });
                res.status(200).json(blogs);
        }
        catch (error) {
                next(error);
        }
};

const addBlog = async (req, res, next) => {
        try {
                const newBlog = await BlogModel.create({ ...req.body });
                res.status(200).json(newBlog);
        }
        catch (error) {
                next(error);
        }
};

const updateBlog = async (req, res, next) => {
        try {
                const id = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return next(APIError.notFound('No such blog'));
                }

                const updatedBlog = await BlogModel.findByIdAndUpdate(id, {...req.body }, { new: true });

                if (updatedBlog) {
                        res.status(200).json(updatedBlog);
                }
                else {
                        return next(APIError.notFound('No such blog'));
                }
        }
        catch (error) {
                next(error);
        }       
};

const deleteBlog = async (req, res, next) => {
        try {
                const id = req.params.id;
                
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return next(APIError.notFound('No such blog'));
                }
                
                const deletedBlog = await BlogModel.findByIdAndDelete(id);

                if (deletedBlog) {
                        res.status(200).json(deletedBlog);
                }
                else {
                        return next(APIError.notFound('No such blog'));
                }
        }
        catch (error) {
                next(error);
        }
};

export { getBlogs, addBlog, updateBlog, deleteBlog };