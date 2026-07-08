import { useContext } from "react";
import { TestimonialsContext } from "../Contexts/TestimonialsContext";

const useTestimonialsReducer = () => {
        const { state, dispatch} = useContext(TestimonialsContext);

        const setTestimonials = (fetchedTestimonials) => {
                dispatch({ type: "SET_TESTIMONIALS", payload: fetchedTestimonials });
        };

        const createTestimonial = (newTestimonial) => {
                dispatch({ type: "CREATE_TESTIMONIAL", payload: newTestimonial });
        };

        const updateTestimonial = (editedTestimonial) => {
                dispatch({ type: "UPDATE_TESTIMONIAL", payload: editedTestimonial });
        };

        const deleteTestimonial = (testimonialId) => {
                dispatch({ type: "DELETE_TESTIMONIAL", payload: testimonialId });
        };

        const deleteTestimonials = (testimonialIds) => {
                dispatch({ type: "DELETE_TESTIMONIALS", payload: testimonialIds });
        };

        return {
                state,
                setTestimonials,
                createTestimonial,
                updateTestimonial,
                deleteTestimonial,
                deleteTestimonials
        };
}

export default useTestimonialsReducer;