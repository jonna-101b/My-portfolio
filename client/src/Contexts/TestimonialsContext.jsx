import { createContext, useReducer } from 'react';
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
                        return { ...state, testimonials: action.payload, loading: false, error: null }; 

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
}

export function TestimonialsContextProvider({ children }) {
        const [state, dispatch] = useReducer(testimonialsReducer, {
                testimonials: testimonials,
                loading: false,
                error: null
        });

        return (
                <TestimonialsContext.Provider value={{ state, dispatch }}>
                        { children }
                </TestimonialsContext.Provider>
        );
}