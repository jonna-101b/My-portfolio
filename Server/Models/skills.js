import mongoose from 'mongoose';


const techSchema = new mongoose.Schema({
        name: { type: String, required: true },
        icon: { type: String, required: true }, 
});


const technicalSkillsSchema = new mongoose.Schema({
        concept: { type: String, required: true },
        techStack: {
                type: [techSchema],
                required: true,
        },
});

const conceptualSkillsSchema = new mongoose.Schema({
        concept: { type: String, required: true },
        description: { type: String, required: true },
});

const skillsSchema = new mongoose.Schema({
        technicalSkills: {type: [technicalSkillsSchema], required: true},
        conceptualSkills: {type: [conceptualSkillsSchema], required: true},
});


const skillsModel = mongoose.model('Skills', skillsSchema);
export default skillsModel;