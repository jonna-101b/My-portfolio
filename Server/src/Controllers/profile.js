import mongoose from "mongoose";
import ProfileModel from "../Models/profile.js";
import { APIError } from "../Errors/APIError.js";
import { deleteUploadedFile, deleteReplacedFiles, uploadToCloudinary, isCloudinaryUrl } from "../Utils/upload.js";

// Get profile page (only one profile in DB)
const getProfilePage = async (req, res, next) => {
	try {
		const profilePageData = await ProfileModel.findOne();
		res.status(200).json(profilePageData);
	} catch (error) {
		next(error);
	}
};

// Update general profile fields (flat updates)
const updateProfilePage = async (req, res, next) => {
	try {
		const existingProfile = await ProfileModel.findOne();
		const updates = { ...req.body };

		// 1. Check if files were uploaded directly via req.file / req.files
		if (req.file) {
			const field = req.file.fieldname;
			const isDoc = field === 'resumeLink' || field === 'resume' || req.file.mimetype === 'application/pdf';
			const folder = isDoc ? 'portfolio/documents' : 'portfolio/images';
			const uploadRes = await uploadToCloudinary(req.file, { folder });
			if (uploadRes?.secure_url) {
				if (field === 'picture') updates.picture = uploadRes.secure_url;
				else if (field === 'logo') updates.logo = uploadRes.secure_url;
				else if (field === 'resumeLink' || field === 'resume') updates.resumeLink = uploadRes.secure_url;
				else updates[field] = uploadRes.secure_url;
			}
		}

		if (req.files) {
			const fileFields = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
			for (const file of fileFields) {
				const field = file.fieldname;
				const isDoc = field === 'resumeLink' || field === 'resume' || file.mimetype === 'application/pdf';
				const folder = isDoc ? 'portfolio/documents' : 'portfolio/images';
				const uploadRes = await uploadToCloudinary(file, { folder });
				if (uploadRes?.secure_url) {
					if (field === 'picture') updates.picture = uploadRes.secure_url;
					else if (field === 'logo') updates.logo = uploadRes.secure_url;
					else if (field === 'resumeLink' || field === 'resume') updates.resumeLink = uploadRes.secure_url;
					else updates[field] = uploadRes.secure_url;
				}
			}
		}

		// 2. Upload any base64 data URIs provided in the body
		if (typeof updates.picture === 'string' && (updates.picture.startsWith('data:') || (updates.picture.length > 500 && !isCloudinaryUrl(updates.picture)))) {
			const uploadRes = await uploadToCloudinary(updates.picture, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) updates.picture = uploadRes.secure_url;
		}

		if (typeof updates.logo === 'string' && (updates.logo.startsWith('data:') || (updates.logo.length > 500 && !isCloudinaryUrl(updates.logo)))) {
			const uploadRes = await uploadToCloudinary(updates.logo, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) updates.logo = uploadRes.secure_url;
		}

		if (typeof updates.resumeLink === 'string' && (updates.resumeLink.startsWith('data:') || (updates.resumeLink.length > 500 && !isCloudinaryUrl(updates.resumeLink)))) {
			const uploadRes = await uploadToCloudinary(updates.resumeLink, { folder: 'portfolio/documents' });
			if (uploadRes?.secure_url) updates.resumeLink = uploadRes.secure_url;
		}

		const updatedProfilePage = await ProfileModel.findOneAndUpdate(
			{},
			updates,
			{ new: true, upsert: true }
		);

		// If profile images or resume were replaced or removed, delete old files from Cloudinary or Server/uploads
		if (existingProfile) {
			if (updates.picture !== undefined && existingProfile.picture) {
				await deleteReplacedFiles(existingProfile.picture, updates.picture);
			}
			if (updates.logo !== undefined && existingProfile.logo) {
				await deleteReplacedFiles(existingProfile.logo, updates.logo);
			}
			if (updates.resumeLink !== undefined && existingProfile.resumeLink) {
				await deleteReplacedFiles(existingProfile.resumeLink, updates.resumeLink);
			}
		}

		res.status(200).json(updatedProfilePage);
	} catch (error) {
		next(error);
	}
};

// Update only description (brief/detailed)
const updateDescription = async (req, res, next) => {
	try {
		const updatedProfile = await ProfileModel.findOneAndUpdate(
			{},
			{ $set: { description: req.body } },
			{ new: true }
		);
		res.status(200).json(updatedProfile);
	} catch (error) {
		next(error);
	}
};

// Add multiple social links
const addSocialLinks = async (req, res, next) => {
	try {
		const profile = await ProfileModel.findOne();

		if (!profile) {
			return next(APIError.notFound('Profile not found'));
		}

		const linksToAdd = Array.isArray(req.body) ? req.body : [req.body];

		// Check if any icon is base64 data URI
		const processedLinks = await Promise.all(
			linksToAdd.map(async (link) => {
				if (link?.icon && typeof link.icon === 'string' && (link.icon.startsWith('data:') || (link.icon.length > 500 && !isCloudinaryUrl(link.icon)))) {
					const uploadRes = await uploadToCloudinary(link.icon, { folder: 'portfolio/images' });
					return { ...link, icon: uploadRes?.secure_url || link.icon };
				}
				return link;
			})
		);

		profile.socialLinks.push(...processedLinks);
		await profile.save();
		res.status(200).json(profile);
	} catch (error) {
		next(error);
	}
};

// Update a specific social link
const updateSocialLink = async (req, res, next) => {
	try {
		const id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(APIError.notFound('Invalid social link ID!'));
		}

		const profile = await ProfileModel.findOne();

		if (!profile) {
			return next(APIError.notFound('Profile not found'));
		}

		const socialLink = profile.socialLinks.id(id);

		if (!socialLink) {
			return next(APIError.notFound('No such social link!'));
		}

		const updates = { ...req.body };

		// Upload icon if file or data URI provided
		if (req.file) {
			const uploadRes = await uploadToCloudinary(req.file, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) updates.icon = uploadRes.secure_url;
		} else if (typeof updates.icon === 'string' && (updates.icon.startsWith('data:') || (updates.icon.length > 500 && !isCloudinaryUrl(updates.icon)))) {
			const uploadRes = await uploadToCloudinary(updates.icon, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) updates.icon = uploadRes.secure_url;
		}

		const oldIcon = socialLink.icon;
		Object.assign(socialLink, updates); // merge updates
		await profile.save();

		if (updates.icon !== undefined && oldIcon) {
			await deleteReplacedFiles(oldIcon, updates.icon);
		}

		res.status(200).json(profile);
	} catch (error) {
		next(error);
	}
};

// Delete a specific social link
const deleteSocialLink = async (req, res, next) => {
	try {
		const id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(APIError.notFound('Invalid social link ID!'));
		}

		const profile = await ProfileModel.findOne();

		if (!profile) {
			return next(APIError.notFound('Profile not found'));
		}

		const deletedSocialLink = profile.socialLinks.id(id);

		if (!deletedSocialLink) {
			return next(APIError.notFound('No such social link!'));
		}

		// If the social link icon is an uploaded file, delete it
		if (deletedSocialLink.icon) {
			await deleteUploadedFile(deletedSocialLink.icon);
		}

		deletedSocialLink.deleteOne();
		await profile.save();

		res.status(200).json(profile);
	} catch (error) {
		next(error);
	}
};

// Update logo visibility
const updateLogoVisibility = async (req, res, next) => {
	try {
		const isVisible = req.body.logoVisible === true || req.body.logoVisible === 'true';
		const updatedProfile = await ProfileModel.findOneAndUpdate(
			{},
			{ $set: { logoVisible: isVisible } },
			{ new: true }
		);
		if (!updatedProfile) {
			return next(APIError.notFound('Profile not found'));
		}
		res.status(200).json(updatedProfile);
	} catch (error) {
		next(error);
	}
};

export {
	getProfilePage,
	updateProfilePage,
	updateDescription,
	addSocialLinks,
	updateSocialLink,
	deleteSocialLink,
	updateLogoVisibility,
};
