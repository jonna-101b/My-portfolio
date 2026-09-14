import mongoose from 'mongoose';
import NotificationsModel from '../Models/notifications.js';
import { APIError } from '../Errors/APIError.js';
import { resend } from '../index.js';
import { config } from '../Config/environments.js';

// Controller functions for notifications
const getNotifications = async (req, res, next) => {
        try {
                const notifications = await NotificationsModel.find({}).sort({ createdAt: -1 });
                res.status(200).json(notifications);
        }
        catch (error) {
                next(error);
        }
};

const addNotification = async (req, res, next) => {
        try {
                const { name, email, subject, message } = req.body;

                if (!name || !email || !subject || !message) {
                        return next(APIError.badRequest('All fields are required.'));
                }

                // Sanitize message input for HTML rendering
                const formattedMessage = message
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\n/g, '<br>');

                const data = await resend.emails.send({
                        from: 'Your Portfolio Contact Form <onboarding@resend.dev>',
                        to: [config.myGmail],
                        replyTo: email,
                        subject: `[New Contact] ${subject}`,
                        html: emailTemplate(email, subject, formattedMessage),
                });

                const notification = await NotificationsModel.create({ name, email, subject, message });
                res.status(200).json(notification);
        }
        catch (error) {
                next(error);
        }
};

const deleteNotification = async (req, res, next) => {
        try {
                const id = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return next(APIError.notFound('No such message!'));
                }

                const notification = await NotificationsModel.findByIdAndDelete(id);

                if (notification) {
                        res.status(200).json(notification);
                }
                else {
                        return next(APIError.notFound('No such message'));
                }
        }
        catch (error) {
                next(error);
        }
};

export { getNotifications, addNotification, deleteNotification };