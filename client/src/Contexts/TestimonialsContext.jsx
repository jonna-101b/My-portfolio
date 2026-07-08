import { createContext, useReducer } from 'react';
import testimonials from '../Mock/trialTestimonials';


export const TestimonialsContext = createContext();

const testimonialsReducer = (state, action) => {
        switch(action.type) {
                case "SET_TESTIMONIALS":
                        return { testimonials: action.payload}; 

                case "CREATE_TESTIMONIAL":
                        return { testimonials: [action.payload, ...state.testimonials] };

                case "UPDATE_TESTIMONIAL":
                        return {
                                testimonials: state.testimonials.map((testimonial) =>
                                        testimonial._id === action.payload._id ? action.payload : testimonial)
                        };

                case "DELETE_TESTIMONIAL":
                        return { testimonials: state.testimonials.filter((testimonial) =>  testimonial._id !== action.payload) };

                case "DELETE_TESTIMONIALS":
                        return {
                                testimonials: state.testimonials.filter(
                                        (testimonial) => !action.payload.includes(testimonial._id))
                        };

                default:
                        return state;
        }
}

export function TestimonialsContextProvider({ children }) {
        const [state, dispatch] = useReducer(testimonialsReducer, { testimonials: testimonials});

        return (
                <TestimonialsContext.Provider value={{ state, dispatch }}>
                        { children }
                </TestimonialsContext.Provider>
        );
}