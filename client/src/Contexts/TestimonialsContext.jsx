import { createContext, useReducer, useEffect } from 'react';
import { fetchTestimonials } from '../api/TestimonialsApi';
import { APIError } from '../api/APIError';
import testimonials from '../Mock/trialTestimonials';

export const TestimonialsContext = createContext();

const testimonialsReducer = (state, action) => {
	switch(action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload ?? true, error: null };

		case "SET_ERROR":
			return { ...state, loading: false, error: action.payload };

		case "CLEAR_ERROR":
			return { ...state, error: null };

		case "SET_TESTIMONIALS":
			return { 
				...state, 
				testimonials: Array.isArray(action.payload) ? action.payload : (action.payload ? [action.payload] : []), 
				loading: false, 
				error: null 
			}; 

		case "CREATE_TESTIMONIAL":
			return { ...state, testimonials: [action.payload, ...state.testimonials], loading: false, error: null };

		case "UPDATE_TESTIMONIAL":
			return {
				...state,
				testimonials: state.testimonials.map((testimonial) =>
					testimonial._id === action.payload._id ? action.payload : testimonial),
				loading: false,
				error: null
			};

		case "DELETE_TESTIMONIAL":
			return {
				...state,
				testimonials: state.testimonials.filter((testimonial) => testimonial._id !== action.payload),
				loading: false,
				error: null
			};

		case "DELETE_TESTIMONIALS":
			return {
				...state,
				testimonials: state.testimonials.filter(
					(testimonial) => !action.payload.includes(testimonial._id)),
				loading: false,
				error: null
			};

		default:
			return state;
	}
};

export function TestimonialsContextProvider({ children }) {
	const [state, dispatch] = useReducer(testimonialsReducer, {
		testimonials: testimonials,
		loading: true,
		error: null
	});

	useEffect(() => {
		let isMounted = true;

		const loadTestimonials = async () => {
			try {
				dispatch({ type: "SET_LOADING", payload: true });
				const res = await fetchTestimonials();
				if (isMounted && res) {
					dispatch({ type: "SET_TESTIMONIALS", payload: res });
				}
			} catch (error) {
				if (isMounted) {
					const apiError = APIError.fromAxiosError(error, "Failed to fetch testimonials");
					console.error("Error fetching testimonials on mount:", apiError);
					dispatch({ type: "SET_ERROR", payload: apiError });
				}
			}
		};

		loadTestimonials();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<TestimonialsContext.Provider value={{ state, dispatch }}>
			{ children }
		</TestimonialsContext.Provider>
	);
}