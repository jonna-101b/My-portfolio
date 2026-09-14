import mongoose from 'mongoose';


const technicalSkillsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	label: { type: String, required: true },
	icon: { type: String, required: true },
}, { timestamps: true });

const conceptualSkillsSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	icon: { type: String }
});

const TechnicalSkillsModel = mongoose.model('TechnicalSkills', technicalSkillsSchema);
const ConceptualSkillsModel = mongoose.model('ConceptualSkills', conceptualSkillsSchema);
export { TechnicalSkillsModel, ConceptualSkillsModel };