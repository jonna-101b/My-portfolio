import mongoose from 'mongoose';


const notificationsSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                required: true,
        },
        subject: {
                type: String,
                required: true,
        },
        message: {
                type: String,
                required: true,
        },
        date: {
                type: Date,
                default: Date.now,
        }
}, { strict: false, timestamps: true });


const NotificationsModel = mongoose.model('Notifications', notificationsSchema);
export default NotificationsModel;