import mongoose from 'mongoose';
import { NotificationsModel } from '../Models/notifications.js';


// Controller functions for notifications
const getNotifications = async (req, res) => {
        try {
                const notifications = await NotificationsModel.find({}).sort({ createdAt: -1 });
                res.status(200).json(notifications)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const addNotification = async (req, res) => {
        try {
                const notification = await NotificationsModel.create({ ...req.body });
                res.status(200).json(notification)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const deleteNotification = async (req, res) => {
        try {
                const id = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such message!' });
                }

                const notification = await NotificationsModel.findByIdAndDelete(id);

                if (notification) {
                        res.status(200).json(notification);
                }
                else {
                        res.status(404).json({ error: 'No such message' });
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

export { getNotifications, addNotification, deleteNotification };