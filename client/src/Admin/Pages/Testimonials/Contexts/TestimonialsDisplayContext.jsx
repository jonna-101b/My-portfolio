import { useState, createContext } from 'react';
import useTestimonialsReducer from '../../../../Hooks/useTestimonialsReducer';



export const TestimonialsDisplayContext = createContext();

export function TestimonialsDisplayContextProvider({ children }) {
        const { state } = useTestimonialsReducer();
        const [ testimonials, setTestimonials ] = useState(state.testimonials);

        return (
                <TestimonialsDisplayContext.Provider value={{ testimonials, setTestimonials }}>
                        { children }
                </TestimonialsDisplayContext.Provider>
        );
}