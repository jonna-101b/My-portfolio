import mongoose from "mongoose";
import ProfileModel from "../Models/profile.js";
import { APIError } from "../Errors/APIError.js";

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
                const updatedProfilePage = await ProfileModel.findOneAndUpdate(
                        {},
                        { ...req.body },
                        { new: true, upsert: true }
                );
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

                Object.assign(socialLink, req.body); // merge updates
                await profile.save();

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

                deletedSocialLink.remove();
                await profile.save();

                res.status(200).json(profile);
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
};
