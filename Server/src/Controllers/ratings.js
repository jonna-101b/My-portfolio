import mongoose from 'mongoose';
import RatingModel from '../Models/ratings.js';
import { APIError } from '../Errors/APIError.js';

const getRatingPayload = (body) => {
  const payload = {};

  if (body.rating !== undefined) payload.rating = body.rating;
  if (body.feedback !== undefined) payload.feedback = body.feedback;

  return payload;
};

const createRating = async (req, res, next) => {
  try {
    const rating = await RatingModel.create(getRatingPayload(req.body));
    res.status(201).json(rating);
  } catch (error) {
    next(error);
  }
};

const updateRating = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(APIError.notFound('No such rating'));
  }

  const payload = getRatingPayload(req.body);
  if (Object.keys(payload).length === 0) {
    return next(APIError.badRequest('Provide a rating or feedback to update.'));
  }

  try {
    const rating = await RatingModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!rating) {
      return next(APIError.notFound('No such rating'));
    }

    res.status(200).json(rating);
  } catch (error) {
    next(error);
  }
};

const deleteRating = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(APIError.notFound('No such rating'));
  }

  try {
    const rating = await RatingModel.findByIdAndDelete(id);

    if (!rating) {
      return next(APIError.notFound('No such rating'));
    }

    res.status(200).json(rating);
  } catch (error) {
    next(error);
  }
};

export { createRating, updateRating, deleteRating };
