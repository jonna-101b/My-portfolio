import mongoose from 'mongoose';

const linksSchema = new mongoose.Schema({
        title: { type: String, required: true, },
        url: { type: String, required: true, },
});

const articlesSchema = new mongoose.Schema({
        author: {
                type: String,
        },
        title: {
                type: String,
                required: true, 
        },
        intro: {
                type: String,
                required: true,
        },
        description: {
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
        links: {
                type: [ linksSchema ],
                required: true,
        },
}, { timestamps: true });

const ArticlesModel = mongoose.model('Articles', articlesSchema);
export default ArticlesModel;