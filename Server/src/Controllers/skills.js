import mongoose from "mongoose";
import { TechnicalSkillsModel, ConceptualSkillsModel } from "../Models/skills.js";
import { APIError } from "../Errors/APIError.js";

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
        const { title, techStack } = req.body;
        const newSkill = await TechnicalSkillsModel.create({ title, techStack });
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
        const skill = await TechnicalSkillsModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (skill) {
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
            res.status(200).json(skill);
        } else {
            return next(APIError.notFound('No such skill'));
        }
    } catch (error) {
        next(error);
    }
};

const addTech = async (req, res, next) => {
        try {
                const id = req.params.id;
                
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return next(APIError.notFound('No such skill'));
                }
                
                const skill = await TechnicalSkillsModel.findById(id);

                if (!skill) {
                        return next(APIError.notFound('No such tech!'));
                }

                skill.techStack.push({ ...req.body });
                await skill.save();
                res.status(201).json(skill);
        }

        catch (error) {
                next(error);
        }
};

const deleteTech = async (req, res, next) => {
        try {
                const { id, techId } = req.params;
                if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(techId)) {
                        return next(APIError.notFound('No such skill'));
                }
        
                const skill = await TechnicalSkillsModel.findById(id);

                if (!skill) {
                    return next(APIError.notFound('No such skill'));
                }
                
                const skillTech = skill.techStack.id(techId);

                if (!skillTech) {
                        return next(APIError.notFound('No such tech!'));
                }

                skill.techStack.pull(techId);
                await skill.save();
                res.status(200).json(skill);

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
    const { title, description, icon } = req.body;

    try {
        const newSkill = await ConceptualSkillsModel.create({ title, description, icon });
        res.status(201).json(newSkill);
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

export { getTechnicalSkills, addTechnicalSkill, updateTechnicalSkill, deleteTechnicalSkill, addTech, deleteTech, getConceptualSkills, addConceptualSkill, deleteConceptualSkill };
