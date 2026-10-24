import mongoose from 'mongoose';
import { deleteUploadedFile } from '../Utils/upload.js';

const linksSchema = new mongoose.Schema({
	title: { type: String, required: true },
	url: { type: String, required: true },
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
		type: [String],
		validate: [
			(val) => !val || val.length <= 10,
			'Blog can have at most 10 images'
		]
	},
	links: {
		type: [ linksSchema ],
	},
}, { timestamps: true });

// Automatically delete uploaded image files when blog document is deleted
blogsSchema.post('findOneAndDelete', function(doc) {
	if (doc && doc.image) {
		deleteUploadedFile(doc.image);
	}
});

blogsSchema.post('deleteOne', { document: true, query: false }, function() {
	if (this.image) {
		deleteUploadedFile(this.image);
	}
});

const BlogModel = mongoose.model('Blogs', blogsSchema);
export default BlogModel;