import { useContext, useCallback } from 'react';
import { RatingsContext } from '../Contexts/RatingsContext';
import {
  createRating as createRatingApi,
  updateRating as updateRatingApi,
  deleteRating as deleteRatingApi,
} from '../api/RatingsApi';
import { APIError } from '../api/APIError';

const useRatingsReducer = () => {
  const context = useContext(RatingsContext);

  if (!context) {
    throw new Error('useRatingsReducer must be used within a RatingsContextProvider');
  }

  const { state, dispatch } = context;

  /**
   * Submits a rating: creates if not previously submitted in this browser,
   * or updates the existing rating document if an ID exists.
   */
  const submitRating = useCallback(async (ratingData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const existingId = state.currentRating?._id;
      let res;

      if (existingId) {
        res = await updateRatingApi(existingId, ratingData);
      } else {
        res = await createRatingApi(ratingData);
      }

      dispatch({ type: 'RATING_SUBMIT_SUCCESS', payload: res });
      return res;
    } catch (error) {
      const apiError = APIError.fromAxiosError(error, 'Failed to submit rating');
      console.error('Error submitting rating:', apiError);
      dispatch({ type: 'SET_ERROR', payload: apiError });
      throw apiError;
    }
  }, [state.currentRating?._id, dispatch]);

  const createRating = useCallback(async (ratingData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await createRatingApi(ratingData);
      dispatch({ type: 'RATING_SUBMIT_SUCCESS', payload: res });
      return res;
    } catch (error) {
      const apiError = APIError.fromAxiosError(error, 'Failed to create rating');
      console.error('Error creating rating:', apiError);
      dispatch({ type: 'SET_ERROR', payload: apiError });
      throw apiError;
    }
  }, [dispatch]);

  const updateRating = useCallback(async (id, ratingData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const targetId = typeof id === 'object' ? id._id : id;
      const res = await updateRatingApi(targetId, ratingData);
      dispatch({ type: 'RATING_SUBMIT_SUCCESS', payload: res });
      return res;
    } catch (error) {
      const apiError = APIError.fromAxiosError(error, 'Failed to update rating');
      console.error('Error updating rating:', apiError);
      dispatch({ type: 'SET_ERROR', payload: apiError });
      throw apiError;
    }
  }, [dispatch]);

  const deleteRating = useCallback(async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const targetId = typeof id === 'object' ? id._id : id;
      const res = await deleteRatingApi(targetId);
      dispatch({ type: 'DELETE_RATING', payload: targetId });
      return res;
    } catch (error) {
      const apiError = APIError.fromAxiosError(error, 'Failed to delete rating');
      console.error('Error deleting rating:', apiError);
      dispatch({ type: 'SET_ERROR', payload: apiError });
      throw apiError;
    }
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);

  const resetSubmitted = useCallback(() => {
    dispatch({ type: 'RESET_SUBMITTED' });
  }, [dispatch]);

  return {
    state,
    ratings: state.ratings,
    currentRating: state.currentRating,
    loading: state.loading,
    error: state.error,
    submitted: state.submitted,
    submitRating,
    createRating,
    updateRating,
    deleteRating,
    clearError,
    resetSubmitted,
  };
};

export const useRating = useRatingsReducer;
export const useRatings = useRatingsReducer;

export default useRatingsReducer;
