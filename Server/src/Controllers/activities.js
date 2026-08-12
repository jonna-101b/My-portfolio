import mongoose from 'mongoose';
import { ActivitiesModel } from '../Models/activities.js';
import { APIError } from '../Errors/APIError.js';

// Controller functions for activities
const getActivities = async (req, res, next) => {
        try {
                const activities = await ActivitiesModel.find({}).sort({ createdAt: -1 });
                res.status(200).json(activities);
        }
        catch (error) {
                next(error);
        }
};

const addActivity = async (req, res, next) => {
        try {
                const activity = await ActivitiesModel.create({ ...req.body });
                res.status(200).json(activity);
        }
        catch (error) {
                next(error);
        }
};

const deleteActivity = async (req, res, next) => {
        try {
                const id = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return next(APIError.notFound('No such message!'));
                }

                const activity = await ActivitiesModel.findByIdAndDelete(id);

                if (activity) {
                        res.status(200).json(activity);
                }
                else {
                        return next(APIError.notFound('No such message'));
                }
        }
        catch (error) {
                next(error);
        }
};

export { getActivities, addActivity, deleteActivity };