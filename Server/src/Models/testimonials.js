import mongoose from 'mongoose';
import { deleteUploadedFile } from '../Utils/upload.js';

const testimonialsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	position: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
	},
	testimony: {
		type: String,
		required: true,
	},
	company: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
}, { timestamps: true });

// Automatically delete uploaded picture file when testimonial document is deleted
testimonialsSchema.post('findOneAndDelete', function(doc) {
	if (doc && doc.picture) {
		deleteUploadedFile(doc.picture);
	}
});

testimonialsSchema.post('deleteOne', { document: true, query: false }, function() {
	if (this.picture) {
		deleteUploadedFile(this.picture);
	}
});

const TestimonialsModel = mongoose.model('Testimonials', testimonialsSchema);
export default TestimonialsModel;