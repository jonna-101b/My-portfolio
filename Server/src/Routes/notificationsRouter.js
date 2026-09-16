import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getNotifications, addNotification, deleteNotification, sendForgotPasswordNotification } from '../Controllers/notifications.js';
import { createNotificationValidator, notificationIdParamValidator } from '../Validator/notificationsValidator.js';
import contactLimiter from '../Middleware/contactLimiter.js';

const notificationsRouter = express.Router();


notificationsRouter.get('/', getNotifications);

notificationsRouter.post('/', createNotificationValidator, contactLimiter, addNotification);

notificationsRouter.post('/forgot-password', contactLimiter, sendForgotPasswordNotification);

notificationsRouter.delete('/:id', authenticate, notificationIdParamValidator, deleteNotification );

export default notificationsRouter;
