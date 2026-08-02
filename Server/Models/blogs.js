import mongoose from 'mongoose';

const linksSchema = new mongoose.Schema({
        title: { type: String, required: true, },
        url: { type: String, required: true, },
});

const blogsSchema = new mongoose.Schema({
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

const BlogModel = mongoose.model('Blogs', blogsSchema);
export default BlogModel;