import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getActivities, addActivity, deleteActivity } from '../Controllers/activities.js';

const activitiesRouter = express.Router();


// define activities routes
activitiesRouter.get('/', getActivities);

activitiesRouter.post('/', authenticate, addActivity );

activitiesRouter.delete('/:id', authenticate, deleteActivity );

export default activitiesRouter;