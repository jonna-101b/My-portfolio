import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getNotifications, addNotification, deleteNotification } from '../Controllers/notifications.js';

const notificationsRouter = express.Router();


notificationsRouter.get('/', getNotifications);

notificationsRouter.post('/', authenticate, addNotification );

notificationsRouter.delete('/:id', authenticate, deleteNotification );

export default notificationsRouter;