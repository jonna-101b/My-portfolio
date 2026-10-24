import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import trackActivity from '../Middlewares/trackActivity.js';
import { getNotifications, addNotification, deleteNotification, sendForgotPasswordNotification, deleteAllNotifications } from '../Controllers/notifications.js';
import { createNotificationValidator, notificationIdParamValidator } from '../Validator/notificationsValidator.js';
import contactLimiter from '../Middleware/contactLimiter.js';

const notificationsRouter = express.Router();


notificationsRouter.get('/', getNotifications);

notificationsRouter.post('/', createNotificationValidator, contactLimiter, addNotification);

notificationsRouter.post('/forgot-password', contactLimiter, sendForgotPasswordNotification);

notificationsRouter.delete('/all', authenticate, trackActivity({ destination: 'Notifications', title: 'All Notifications', action: 'Deleted' }), deleteAllNotifications);
notificationsRouter.delete('/', authenticate, trackActivity({ destination: 'Notifications', title: 'All Notifications', action: 'Deleted' }), deleteAllNotifications);

notificationsRouter.delete('/:id', authenticate, notificationIdParamValidator, trackActivity('Notifications'), deleteNotification );

export default notificationsRouter;
