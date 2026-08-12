import express from 'express';
import { createRating, updateRating, deleteRating } from '../Controllers/ratings.js';
import { createRatingValidator, updateRatingValidator, ratingIdParamValidator } from '../Validator/ratingsValidator.js';

const ratingsRouter = express.Router();

// Public rating routes: no authentication middleware is required.
ratingsRouter.post('/', createRatingValidator, createRating);
ratingsRouter.put('/:id', updateRatingValidator, updateRating);
ratingsRouter.delete('/:id', ratingIdParamValidator, deleteRating);

export default ratingsRouter;
