import mongoose from "mongoose";
import ProfileModel from "../Models/profile.js";
import { APIError } from "../Errors/APIError.js";
import { deleteUploadedFile, deleteReplacedFiles } from "../Utils/upload.js";

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

		const updatedProfilePage = await ProfileModel.findOneAndUpdate(
			{},
			{ ...req.body },
			{ new: true, upsert: true }
		);

		// If profile images or resume were replaced or removed, delete old files from Server/uploads
		if (existingProfile) {
			if (req.body.picture !== undefined && existingProfile.picture) {
				deleteReplacedFiles(existingProfile.picture, req.body.picture);
			}
			if (req.body.logo !== undefined && existingProfile.logo) {
				deleteReplacedFiles(existingProfile.logo, req.body.logo);
			}
			if (req.body.resumeLink !== undefined && existingProfile.resumeLink) {
				deleteReplacedFiles(existingProfile.resumeLink, req.body.resumeLink);
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

		profile.socialLinks.push(...req.body); // req.body should be an array
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

		const oldIcon = socialLink.icon;
		Object.assign(socialLink, req.body); // merge updates
		await profile.save();

		if (req.body.icon !== undefined && oldIcon) {
			deleteReplacedFiles(oldIcon, req.body.icon);
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
			deleteUploadedFile(deletedSocialLink.icon);
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
