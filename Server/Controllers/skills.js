import mongoose from "mongoose";
import { TechnicalSkillsModel, ConceptualSkillsModel } from "../Models/skills.js";


const getTechnicalSkills = async (req, res) => {
    try {
        const skills = await TechnicalSkillsModel.find({});
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addTechnicalSkill = async (req, res) => {
        try {
        const { concept } = req.body;
        const newSkill = await TechnicalSkillsModel.create({ concept });
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTechnicalSkill = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such skill' });
    }

    try {
        const skill = await TechnicalSkillsModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (skill) {
            res.status(200).json(skill);
        } else {
            res.status(404).json({ error: 'No such skill' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTechnicalSkill = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such skill' });
    }

    try {
        const skill = await TechnicalSkillsModel.findByIdAndDelete(id);
        if (skill) {
            res.status(200).json(skill);
        } else {
            res.status(404).json({ error: 'No such skill' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addTech = async (req, res) => {
        try {
                const id = req.params.id;
                
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such skill' });
                }
                
                const skill = await TechnicalSkillsModel.findById(id);

                if (!skill) {
                        return res.status(404).json({ error: 'No such tech!' });
                }

                skill.techStack.push({ ...req.body });
                await skill.save();
                res.status(201).json(skill);
        }

        catch (error) {
                res.status(400).json({ error: error.message });
        }
};

const deleteTech = async (req, res) => {
        try {
                const { id, techId } = req.params;
                if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(techId)) {
                        return res.status(404).json({ error: 'No such skill' });
                }
        
                const skill = await TechnicalSkillsModel.findById(id);

                if (!skill) {
                    return res.status(404).json({ error: 'No such skill' });
                }
                
                const skillTech = skill.techStack.id(techId);

                if (!skillTech) {
                        return res.status(404).json({ error: "No such tech!" })
                }

                skill.skillTech.pull();
                await skill.save();
                res.status(200).json(skill);

        } catch (error) {
                res.status(400).json({ error: error.message });
        }
};

// Conceptual skills controller functions
const getConceptualSkills = async (req, res) => {
    try {
        const skills = await ConceptualSkillsModel.find({});
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addConceptualSkill = async (req, res) => {
    const { concept, description } = req.body;

    try {
        const newSkill = await ConceptualSkillsModel.create({ concept, description });
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteConceptualSkill = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such skill' });
    }

    try {
        const skill = await ConceptualSkillsModel.findByIdAndDelete(id);
        if (skill) {
            res.status(200).json(skill);
        } else {
            res.status(404).json({ error: 'No such skill' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getTechnicalSkills, addTechnicalSkill, updateTechnicalSkill, deleteTechnicalSkill, addTech, deleteTech, getConceptualSkills, addConceptualSkill, deleteConceptualSkill };