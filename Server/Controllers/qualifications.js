import mongoose from 'mongoose';
import QualificationsModel from '../Models/qualifications.js';


// Qualifications controllers
const getQualifications = async (req, res) => {
        try {
                const Qualifications = await QualificationsModel.find({}).sort({ createdAt: -1 });
                res.status(200).json(Qualifications)
        }
        catch (error) {
                res.status(404).json({ error: error.message })
        }
};

const addQualification = async (req, res) => {
        try {
                const newQualification = await QualificationsModel.create({  ...req.body });
                res.status(200).json(newQualification);
        }
        catch (error) {
                res.status(404).json({ error: error.message })
        }
};

const updateQualification = async (req, res) => {
        try {
                const id = req.params.id;

                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: "No such Qualification!" });
                }

                const updatedQualification = await QualificationsModel.findByIdAndUpdate(id, {...req.body}, { new: true });

                if (updatedQualification) {
                        res.status(200).json(updatedQualification);
                }
                else {
                        res.status(404).json({ error: "No such Qualification!"});
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message })
        }
};

const deleteQualification = async (req, res) => {
        try {
                const id = req.params.id;

                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: "No such Qualification!" });
                }

                const deletedQualification = await QualificationsModel.findByIdAndDelete(id);

                if (deletedQualification) {
                        res.status(200).json(deletedQualification);
                }
                else {
                        res.status(404).json({ error: "No such Qualification!"});
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message })
        }
};


export { getQualifications, addQualification, updateQualification, deleteQualification };