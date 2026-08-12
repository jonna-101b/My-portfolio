import mongoose from 'mongoose';

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
                required: true,
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
                required: true,
        },
        githubLink: {
                type: String,
                required: true,
        },
        contribution: {
                type: String,
                required: true,
        },
}, { timestamps: true });


const ProjectModel = mongoose.model('Project', projectSchema);
export default ProjectModel;