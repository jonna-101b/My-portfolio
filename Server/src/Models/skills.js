import mongoose from 'mongoose';
import { deleteUploadedFile } from '../Utils/upload.js';

const technicalSkillsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	label: { type: String, required: true },
	icon: { type: String, required: true },
}, { timestamps: true });

technicalSkillsSchema.post('findOneAndDelete', function(doc) {
	if (doc && doc.icon) {
		deleteUploadedFile(doc.icon);
	}
});

technicalSkillsSchema.post('deleteOne', { document: true, query: false }, function() {
	if (this.icon) {
		deleteUploadedFile(this.icon);
	}
});

const conceptualSkillsSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true }
}, { timestamps: true });

const TechnicalSkillsModel = mongoose.model('TechnicalSkills', technicalSkillsSchema);
const ConceptualSkillsModel = mongoose.model('ConceptualSkills', conceptualSkillsSchema);
export { TechnicalSkillsModel, ConceptualSkillsModel };
