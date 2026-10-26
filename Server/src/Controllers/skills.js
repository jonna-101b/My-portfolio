import mongoose from "mongoose";
import { TechnicalSkillsModel, ConceptualSkillsModel } from "../Models/skills.js";
import { APIError } from "../Errors/APIError.js";
import { deleteUploadedFile, deleteReplacedFiles, uploadToCloudinary, isCloudinaryUrl } from "../Utils/upload.js";

const getTechnicalSkills = async (req, res, next) => {
    try {
        const skills = await TechnicalSkillsModel.find({});
        res.status(200).json(skills);
    } catch (error) {
        next(error);
    }
};

const addTechnicalSkill = async (req, res, next) => {
    try {
        let { name, label, icon } = req.body;

        // If file uploaded directly or if icon is base64 data URI
        if (req.file) {
            const uploadRes = await uploadToCloudinary(req.file, { folder: 'portfolio/images' });
            if (uploadRes?.secure_url) icon = uploadRes.secure_url;
        } else if (typeof icon === 'string' && (icon.startsWith('data:') || (icon.length > 500 && !isCloudinaryUrl(icon)))) {
            const uploadRes = await uploadToCloudinary(icon, { folder: 'portfolio/images' });
            if (uploadRes?.secure_url) icon = uploadRes.secure_url;
        }

        const newSkill = await TechnicalSkillsModel.create({ name, label, icon });
        res.status(201).json(newSkill);
    } catch (error) {
        next(error);
    }
};

const updateTechnicalSkill = async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(APIError.notFound('No such skill'));
    }

    try {
        const existingSkill = await TechnicalSkillsModel.findById(id);
        if (!existingSkill) {
            return next(APIError.notFound('No such skill'));
        }

        const updates = { ...req.body };

        if (req.file) {
            const uploadRes = await uploadToCloudinary(req.file, { folder: 'portfolio/images' });
            if (uploadRes?.secure_url) updates.icon = uploadRes.secure_url;
        } else if (typeof updates.icon === 'string' && (updates.icon.startsWith('data:') || (updates.icon.length > 500 && !isCloudinaryUrl(updates.icon)))) {
            const uploadRes = await uploadToCloudinary(updates.icon, { folder: 'portfolio/images' });
            if (uploadRes?.secure_url) updates.icon = uploadRes.secure_url;
        }

        const skill = await TechnicalSkillsModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (skill) {
            if (updates.icon !== undefined && existingSkill.icon) {
                await deleteReplacedFiles(existingSkill.icon, updates.icon);
            }
            res.status(200).json(skill);
        } else {
            return next(APIError.notFound('No such skill'));
        }
    } catch (error) {
        next(error);
    }
};

const deleteTechnicalSkill = async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(APIError.notFound('No such skill'));
    }

    try {
        const skill = await TechnicalSkillsModel.findByIdAndDelete(id);
        if (skill) {
            if (skill.icon) {
                await deleteUploadedFile(skill.icon);
            }
            res.status(200).json(skill);
        } else {
            return next(APIError.notFound('No such skill'));
        }
    } catch (error) {
        next(error);
    }
};

// Conceptual skills controller functions
const getConceptualSkills = async (req, res, next) => {
    try {
        const skills = await ConceptualSkillsModel.find({});
        res.status(200).json(skills);
    } catch (error) {
        next(error);
    }
};

const addConceptualSkill = async (req, res, next) => {
    const { title, description } = req.body;

    try {
        const newSkill = await ConceptualSkillsModel.create({ title, description });
        res.status(201).json(newSkill);
    } catch (error) {
        next(error);
    }
};

const updateConceptualSkill = async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(APIError.notFound('No such skill'));
    }

    try {
        const skill = await ConceptualSkillsModel.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
        if (skill) {
            res.status(200).json(skill);
        } else {
            return next(APIError.notFound('No such skill'));
        }
    } catch (error) {
        next(error);
    }
};

const deleteConceptualSkill = async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(APIError.notFound('No such skill'));
    }

    try {
        const skill = await ConceptualSkillsModel.findByIdAndDelete(id);
        if (skill) {
            res.status(200).json(skill);
        } else {
            return next(APIError.notFound('No such skill'));
        }
    } catch (error) {
        next(error);
    }
};

export {
    getTechnicalSkills,
    addTechnicalSkill,
    updateTechnicalSkill,
    deleteTechnicalSkill,
    getConceptualSkills,
    addConceptualSkill,
    updateConceptualSkill,
    deleteConceptualSkill
};
