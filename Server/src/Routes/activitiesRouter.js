import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getActivities, addActivity, deleteActivity } from '../Controllers/activities.js';
import { createActivityValidator, activityIdParamValidator } from '../Validator/activitiesValidator.js';

const activitiesRouter = express.Router();


// define activities routes
activitiesRouter.get('/', getActivities);

activitiesRouter.post('/', authenticate, createActivityValidator, addActivity );

activitiesRouter.delete('/:id', authenticate, activityIdParamValidator, deleteActivity );

export default activitiesRouter;
