import mongoose from "mongoose";
import ProfileModel from "../Models/profile.js";

// Get profile page (only one profile in DB)
const getProfilePage = async (req, res) => {
        try {
    const profilePageData = await ProfileModel.findOne();
    res.status(200).json(profilePageData);
        } catch (error) {
    res.status(404).json({ error: error.message });
        }
};

// Update general profile fields (flat updates)
const updateProfilePage = async (req, res) => {
        try {
                const updatedProfilePage = await ProfileModel.findOneAndUpdate(
                        {},
                        { ...req.body },
                        { new: true, upsert: true }
                );
                res.status(200).json(updatedProfilePage);
        } catch (error) {
                res.status(404).json({ error: error.message });
        }
};

// Update only description (brief/detailed)
const updateDescription = async (req, res) => {
        try {
                const updatedProfile = await ProfileModel.findOneAndUpdate(
                        {},
                        { $set: { description: req.body } },
                        { new: true }
                );
                res.status(200).json(updatedProfile);
        } catch (error) {
                res.status(404).json({ error: error.message });
        }
};

// Add multiple social links
const addSocialLinks = async (req, res) => {
        try {
                const profile = await ProfileModel.findOne();
                profile.socialLinks.push(...req.body); // req.body should be an array
                await profile.save();
                res.status(200).json(profile);
        } catch (error) {
                res.status(404).json({ error: error.message });
        }
};

// Update a specific social link
const updateSocialLink = async (req, res) => {
        try {
                const id = req.params.id;

                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: "Invalid social link ID!" });
                }

                const profile = await ProfileModel.findOne();
                const socialLink = profile.socialLinks.id(id);

                if (!socialLink) {
                        return res.status(404).json({ error: "No such social link!" });
                }

                Object.assign(socialLink, req.body); // merge updates
                await profile.save();

                res.status(200).json(profile);
        } catch (error) {
                res.status(404).json({ error: error.message });
        }
};

// Delete a specific social link
const deleteSocialLink = async (req, res) => {
        try {
                const id = req.params.id;

                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: "Invalid social link ID!" });
                }

                const profile = await ProfileModel.findOne();
                const deletedSocialLink = profile.socialLinks.id(id);

                if (!deletedSocialLink) {
                        return res.status(404).json({ error: "No such social link!" });
                }

                deletedSocialLink.remove();
                await profile.save();

                res.status(200).json(profile);
        } catch (error) {
                res.status(404).json({ error: error.message });
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