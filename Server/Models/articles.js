import mongoose from 'mongoose';


const articlesSchema = new mongoose.Schema({
        author: {
                type: String,
        },
        title: {
                type: String,
                required: true, 
        },
        description: {
                type: String,
                required: true,
        },
        content: {
                type: String,
                required: true,
        },
        datePublished: {
                type: Date,
                default: Date.now,
        },
        tags: {
                type: [String],
        },
        image: {
                type: String,
        },
        link: {
                type: String,
                required: true,
        },
});

const ArticlesModel = mongoose.model('Articles', articlesSchema);
export default ArticlesModel;