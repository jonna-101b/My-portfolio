import mongoose from 'mongoose';
import { AboutModel, EducationModel, ExperienceModel } from '../Models/about.js';

// About controllers
const getAboutPage = async (req, res) => {
        try {
                const aboutPageData = await AboutModel.findOne();
                const educationData = await EducationModel.find({}).sort({ year: -1 });
                const experienceData = await ExperienceModel.find({}).sort({ duration: -1 });
                res.status(200).json({ aboutPage: aboutPageData, education: educationData, experience: experienceData });
        }
        catch (error) {
                res.status(404).json({error: error.message})
        }
}

const updateAboutPage = async (req, res) => {
        
        try {
                const existingAboutPage = await AboutModel.findOne();
                if (!existingAboutPage) {
                        const newAboutPage = await AboutModel.create(req.body);
                        return res.status(201).json(newAboutPage);
                }
                else {
                        const updatedAboutPage = await AboutModel.findOneAndUpdate(existingAboutPage._id, { ...req.body }, { new: true });
                        return res.status(200).json(updatedAboutPage);
                }
        }
        catch (error) {
                res.status(404).json({error: error.message})
        }
};


// Education controllers
const addEducation = async (req, res) => {
        try {
                const newEducation = await EducationModel.create(req.body);
                res.status(201).json(newEducation);
        }
        catch (error) {
                res.status(404).json({error: error.message})
        }
}

const updateEducation = async (req, res) => {
        const id = req.params.id;

        try {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such education' });
                }
                else {
                        const updateEducation = await EducationModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
                        if (updateEducation) {
                                res.status(200).json(updateEducation);
                        }
                        else {
                                res.status(404).json({ error: 'No such education' });
                        }
                }
        }
        catch (error) {
                res.status(404).json({error: error.message})
        }
}

const deleteEducation = async (req, res) => {
        const id = req.params.id;

        try {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such education' });
                }
                else {
                        const deleteEducation = await EducationModel.findByIdAndDelete(id, { ...req.body }, { new: true });
                        if (deleteEducation) {
                                res.status(200).json(deleteEducation);
                        }
                        else {
                                res.status(404).json({ error: 'No such education' });
                        }

                }
        }
        catch (error) {
                res.status(404).json({error: error.message})
        }
}


// Experience controllers
const addExperience = async (req, res) => {
        try {
                const newExperience = await ExperienceModel.create(req.body);
                res.status(201).json(newExperience);
        }
        catch (error) {
                res.status(404).json({error: error.message})
        }
}

const updateExperience = async (req, res) => {
        const id = req.params.id;

        try {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such experience' });
                }
                else {
                        const updateExperience = await ExperienceModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
                        if (updateExperience) {
                                res.status(200).json(updateExperience);
                        }
                        else {
                                res.status(404).json({ error: 'No such experience' });
                        }
                }
        }
        catch (error) {
                res.status(404).json({error: error.message})
        }
}

const deleteExperience = async (req, res) => {
        const id = req.params.id;

        try {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such experience' });
                }
                else {
                        const deleteExperience = await ExperienceModel.findByIdAndDelete(id, { ...req.body }, { new: true });
                        if (deleteExperience) {
                                res.status(200).json(deleteExperience);
                        }
                        else {
                                res.status(404).json({ error: 'No such experience' });
                        }

                }
        }
        catch (error) {
                res.status(404).json({error: error.message})
        }
}


export { getAboutPage, updateAboutPage, addEducation, updateEducation, deleteEducation, addExperience, updateExperience, deleteExperience };