import mongoose from 'mongoose';


const techSchema = new mongoose.Schema({
        name: { type: String, required: true },
        icon: { type: String, required: true }, 
});


const technicalSkillsSchema = new mongoose.Schema({
        title: { type: String, required: true },
        techStack: {
                type: [techSchema],
                required: true,
        },
});

const conceptualSkillsSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String }
});

const TechnicalSkillsModel = mongoose.model('TechnicalSkills', technicalSkillsSchema);
const ConceptualSkillsModel = mongoose.model('ConceptualSkills', conceptualSkillsSchema);
export { TechnicalSkillsModel, ConceptualSkillsModel };