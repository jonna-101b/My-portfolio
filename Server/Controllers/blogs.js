import mongoose from 'mongoose';
import BlogModel from '../Models/blogs.js';


const getBlogs = async (req, res) => {
        try {
                const blogs = await BlogModel.find({}).sort({ datePublished: -1 });
                res.status(200).json(blogs)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const addBlog = async (req, res) => {
        try {
                const newBlog = await BlogModel.create({ ...req.body });
                res.status(200).json(newBlog);
        }
        catch (error) {
                res.status(404).json({error: error.message});
        }
};

const updateBlog = async (req, res) => {
        try {
                const id = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such blog' });
                }

                const updatedBlog = await BlogModel.findByIdAndUpdate(id, {...req.body }, { new: true });

                if (updatedBlog) {
                        res.status(200).json(updatedBlog);
                }
                else {
                        res.status(404).json({ error: 'No such blog' });
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }       
};

const deleteBlog = async (req, res) => {
        try {
                const id = req.params.id;
                
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such blog' });
                }
                
                const deletedBlog = await BlogModel.findByIdAndDelete(id);

                if (deletedBlog) {
                        res.status(200).json(deletedBlog);
                }
                else {
                        res.status(404).json({ error: 'No such blog' });
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

export { getBlogs, addBlog, updateBlog, deleteBlog };