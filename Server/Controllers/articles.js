import mongoose from 'mongoose';
import ArticlesModel from '../Models/articles.js';


const getArticles = async (req, res) => {
        try {
                const Articles = await ArticlesModel.find({}).sort({ datePublished: -1 });
                res.status(200).json(Articles)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const addArticle = async (req, res) => {
        try {
                const newArticle = await ArticlesModel.create({ ...req.body });
                res.status(200).json(newArticle);
        }
        catch (error) {
                res.status(404).json({error: error.message});
        }
};

const updateArticle = async (req, res) => {
        try {
                const id = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such article' });
                }

                const updatedArticle = await ArticlesModel.findByIdAndUpdate(id, {...req.body }, { new: true });

                if (updatedArticle) {
                        res.status(200).json(updatedArticle);
                }
                else {
                        res.status(404).json({ error: 'No such article' });
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }       
};

const deleteArticle = async (req, res) => {
        try {
                const id = req.params.id;
                
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such article' });
                }
                
                const deletedArticle = await ArticlesModel.findByIdAndDelete(id);

                if (deletedArticle) {
                        res.status(200).json(deletedArticle);
                }
                else {
                        res.status(404).json({ error: 'No such article' });
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

export { getArticles, addArticle, updateArticle,  deleteArticle };