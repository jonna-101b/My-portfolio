import express from 'express';
import { getActivities, addActivity, deleteActivity } from '../Controllers/activities.js';

const activitiesRouter = express.Router();


// define activities routes
activitiesRouter.get('/', getActivities);

activitiesRouter.post('/', addActivity );

activitiesRouter.delete('/:id', deleteActivity );

export default activitiesRouter;