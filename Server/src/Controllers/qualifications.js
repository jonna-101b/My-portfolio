import mongoose from 'mongoose';
import QualificationsModel from '../Models/qualifications.js';
import { APIError } from '../Errors/APIError.js';

// Qualifications controllers
const getQualifications = async (req, res, next) => {
        try {
                const Qualifications = await QualificationsModel.find({}).sort({ createdAt: -1 });
                res.status(200).json(Qualifications);
        }
        catch (error) {
                next(error);
        }
};

const addQualification = async (req, res, next) => {
        try {
                const newQualification = await QualificationsModel.create({  ...req.body });
                res.status(200).json(newQualification);
        }
        catch (error) {
                next(error);
        }
};

const updateQualification = async (req, res, next) => {
        try {
                const id = req.params.id;

                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return next(APIError.notFound('No such Qualification!'));
                }

                const updatedQualification = await QualificationsModel.findByIdAndUpdate(id, {...req.body}, { new: true });

                if (updatedQualification) {
                        res.status(200).json(updatedQualification);
                }
                else {
                        return next(APIError.notFound('No such Qualification!'));
                }
        }
        catch (error) {
                next(error);
        }
};

const deleteQualification = async (req, res, next) => {
        try {
                const id = req.params.id;

                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return next(APIError.notFound('No such Qualification!'));
                }

                const deletedQualification = await QualificationsModel.findByIdAndDelete(id);

                if (deletedQualification) {
                        res.status(200).json(deletedQualification);
                }
                else {
                        return next(APIError.notFound('No such Qualification!'));
                }
        }
        catch (error) {
                next(error);
        }
};

export { getQualifications, addQualification, updateQualification, deleteQualification };