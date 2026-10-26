import { createContext, useReducer, useEffect } from 'react';
import { fetchRatings } from '../api/RatingsApi';

export const RatingsContext = createContext();

const STORAGE_KEY = 'portfolio_user_rating';

const getInitialRating = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const ratingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload ?? true, error: null };

    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    case 'SET_RATINGS':
      return {
        ...state,
        ratings: Array.isArray(action.payload) ? action.payload : (action.payload ? [action.payload] : []),
        loading: false,
        error: null,
      };

    case 'RATING_SUBMIT_SUCCESS': {
      const rating = action.payload;
      try {
        if (rating && rating._id) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(rating));
        }
      } catch (err) {
        console.warn('Failed to persist rating to localStorage:', err);
      }
      return {
        ...state,
        currentRating: rating,
        ratings: state.ratings.some((r) => r._id === rating._id)
          ? state.ratings.map((r) => (r._id === rating._id ? rating : r))
          : [rating, ...state.ratings],
        loading: false,
        submitted: true,
        error: null,
      };
    }

    case 'RESET_SUBMITTED':
      return { ...state, submitted: false };

    case 'DELETE_RATING': {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('Failed to clear rating from localStorage:', err);
      }
      return {
        ...state,
        currentRating: null,
        ratings: state.ratings.filter((r) => r._id !== action.payload),
        loading: false,
        submitted: false,
        error: null,
      };
    }

    default:
      return state;
  }
};

export function RatingsContextProvider({ children }) {
  const initialRating = getInitialRating();

  const [state, dispatch] = useReducer(ratingsReducer, {
    ratings: initialRating ? [initialRating] : [],
    currentRating: initialRating,
    loading: true,
    error: null,
    submitted: false,
  });

  useEffect(() => {
    let isMounted = true;

    const loadRatings = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const res = await fetchRatings();
        if (isMounted && res) {
          dispatch({ type: 'SET_RATINGS', payload: res });
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching ratings on mount:', error);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };

    loadRatings();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <RatingsContext.Provider value={{ state, dispatch }}>
      {children}
    </RatingsContext.Provider>
  );
}

export default RatingsContextProvider;
