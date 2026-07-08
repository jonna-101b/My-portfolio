import mongoose from 'mongoose';
import { ActivitiesModel } from '../Models/activities.js';


// Controller functions for activities
const getActivities = async (req, res) => {
        try {
                const activities = await ActivitiesModel.find({}).sort({ createdAt: -1 });
                res.status(200).json(activities)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const addActivity = async (req, res) => {
        try {
                const activity = await ActivitiesModel.create({ ...req.body });
                res.status(200).json(activity)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const deleteActivity = async (req, res) => {
        try {
                const id = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such message!' });
                }

                const activity = await ActivitiesModel.findByIdAndDelete(id);

                if (activity) {
                        res.status(200).json(activity);
                }
                else {
                        res.status(404).json({ error: 'No such message' });
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

export { getActivities, addActivity, deleteActivity };