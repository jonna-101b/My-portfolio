import mongoose from 'mongoose';
import { deleteUploadedFile } from '../Utils/upload.js';

const descriptionSchema = new mongoose.Schema({
	brief: { type: String, required: true },
	detailed: { type: String, required: true },
});

const socialLinksSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
});

const profileSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	nickName: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	availability: {
		type: Boolean,
		default: true,
	},
	birthDate: {
		type: Date,
		required: true,
	},
	professions: {
		type: [String],
		required: true,
	},
	picture: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		required: true,
	},
	logoVisible: {
		type: Boolean,
		default: true,
	},
	logo: {
		type: String,
	},
	description: {
		type: descriptionSchema,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	socialLinks: {
		type: [socialLinksSchema],
		required: true,
	},
	resumeLink: {
		type: String,
	},
});

// Automatically delete uploaded files when profile document is deleted
profileSchema.post('findOneAndDelete', function(doc) {
	if (doc) {
		if (doc.picture) deleteUploadedFile(doc.picture);
		if (doc.logo) deleteUploadedFile(doc.logo);
		if (doc.resumeLink) deleteUploadedFile(doc.resumeLink);
		if (Array.isArray(doc.socialLinks)) {
			doc.socialLinks.forEach((link) => {
				if (link?.icon) deleteUploadedFile(link.icon);
			});
		}
	}
});

profileSchema.post('deleteOne', { document: true, query: false }, function() {
	if (this.picture) deleteUploadedFile(this.picture);
	if (this.logo) deleteUploadedFile(this.logo);
	if (this.resumeLink) deleteUploadedFile(this.resumeLink);
	if (Array.isArray(this.socialLinks)) {
		this.socialLinks.forEach((link) => {
			if (link?.icon) deleteUploadedFile(link.icon);
		});
	}
});

const ProfileModel = mongoose.model('Profile', profileSchema);
export default ProfileModel;
