import express from 'express';
import { getNotifications, addNotification, deleteNotification } from '../Controllers/notifications.js';

const notificationsRouter = express.Router();


// define notifications routes
notificationsRouter.get('/', getNotifications);

notificationsRouter.post('/', addNotification );

notificationsRouter.delete('/:id', deleteNotification );

export default notificationsRouter;