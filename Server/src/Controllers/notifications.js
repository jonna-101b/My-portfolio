import mongoose from 'mongoose';
import NotificationsModel from '../Models/notifications.js';
import { APIError } from '../Errors/APIError.js';
import { resend } from '../index.js';
import { config } from '../Config/environments.js';
import { emailTemplate, forgotPasswordEmailTemplate } from '../Utils/messageBodyTemplate.js';

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
                
                const notification = await NotificationsModel.create({ name, email, subject, message });

                // Sanitize message input for HTML rendering
                const formattedMessage = message
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\n/g, '<br>');

                try {
                        await resend.emails.send({
                                from: 'Your Portfolio Contact Form <onboarding@resend.dev>',
                                to: [config.myGmail],
                                replyTo: email,
                                subject: `[New Contact] ${subject}`,
                                html: emailTemplate(name, email, subject, formattedMessage),
                        });
                } catch (emailErr) {
                        console.error("Resend email delivery failed:", emailErr);
                        return next(new APIError("Resend email delivery failed", 500, [emailErr?.message || String(emailErr)]));
                }

                res.status(200).json(notification);
        }
        catch (error) {
                next(error);
        }
};

const sendForgotPasswordNotification = async (req, res, next) => {
        try {
                const targetEmail = config.myGmail;
                const adminName = config.myName || "Admin";
                const adminPassword = config.myPortfolioPassword;

                if (!adminPassword || !targetEmail) {
                        return next(new APIError("Server credentials configuration missing", 500));
                }

                // 1. Create audit notification record in database
                const notification = await NotificationsModel.create({
                        name: adminName,
                        email: targetEmail,
                        subject: "Password Recovery",
                        message: `Admin security key was sent to ${targetEmail} via password recovery request.`,
                        date: new Date(),
                });

                // 2. Dispatch recovery email via Resend
                try {
                        await resend.emails.send({
                                from: 'Portfolio Admin <onboarding@resend.dev>',
                                to: [targetEmail],
                                subject: '[Security Alert] Admin Password Recovery',
                                html: forgotPasswordEmailTemplate(adminName, adminPassword),
                        });
                } catch (emailErr) {
                        console.error("Resend forgot-password email delivery failed:", emailErr);
                        return next(new APIError("Failed to send recovery email. Please check server email service.", 500, [emailErr?.message || String(emailErr)]));
                }

                res.status(200).json({
                        success: true,
                        message: `Your security key has been sent to ${targetEmail}.`,
                        notification,
                });
        } catch (error) {
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

export { getNotifications, addNotification, deleteNotification, sendForgotPasswordNotification };