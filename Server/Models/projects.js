import mongoose from 'mongoose';


const techSchema = new mongoose.Schema({
        name: { type: String, required: true },
        icon: { type: String, required: true }, 
});

const projectSchema = new mongoose.Schema({
        title: {
                type: String,
                required: true,
        },
        concept: {
                type: String,
                required: true,
        }, 
        description: {
                type: String,
                required: true,
        },
        image: {
                type: String,
                required: true,
        },
        functions: {
                type: String
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
}, { timestamps: true });


const ProjectModel = mongoose.model('Project', projectSchema);
export default ProjectModel;