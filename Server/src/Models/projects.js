import mongoose from 'mongoose';
import { deleteUploadedFile } from '../Utils/upload.js';

const descriptionSchema = new mongoose.Schema({
	brief: { type: String, required: true },
	detailed: { type: String, required: true },
});

const techSchema = new mongoose.Schema({
	name: { type: String, required: true },
	icon: { type: String, required: true }, 
});

const projectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	domains: {
		type: [String],
		required: true,
	}, 
	description: {
		type: descriptionSchema,
		required: true,
	},
	image: {
		type: String,
	},
	features: {
		type: [String]
	},
	techStack: {
		type: [techSchema],
		required: true,
	},
	projectLink: {
		type: String,
	},
	githubLink: {
		type: String,
	},
	contribution: {
		type: String,
		required: true,
	},
}, { timestamps: true });

// Automatically delete uploaded image file when project document is deleted
projectSchema.post('findOneAndDelete', function(doc) {
	if (doc) {
		if (doc.image) deleteUploadedFile(doc.image);
		if (Array.isArray(doc.techStack)) {
			doc.techStack.forEach((t) => {
				if (t?.icon) deleteUploadedFile(t.icon);
			});
		}
	}
});

projectSchema.post('deleteOne', { document: true, query: false }, function() {
	if (this.image) deleteUploadedFile(this.image);
	if (Array.isArray(this.techStack)) {
		this.techStack.forEach((t) => {
			if (t?.icon) deleteUploadedFile(t.icon);
		});
	}
});

const ProjectModel = mongoose.model('Project', projectSchema);
export default ProjectModel;