import mongoose from "mongoose";
import { TechnicalSkillsModel, ConceptualSkillsModel } from "../Models/skills.js";
import { APIError } from "../Errors/APIError.js";
import { deleteUploadedFile, deleteReplacedFiles } from "../Utils/upload.js";

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
        const { name, label, icon } = req.body;
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

        const skill = await TechnicalSkillsModel.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
        if (skill) {
            if (req.body.icon !== undefined && existingSkill.icon) {
                deleteReplacedFiles(existingSkill.icon, req.body.icon);
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
                deleteUploadedFile(skill.icon);
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
