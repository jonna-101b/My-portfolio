import { useContext } from "react";
import { TestimonialsContext } from "../Contexts/TestimonialsContext";
import { fetchTestimonials, createTestimonial as createTestimonialApi, updateTestimonial as updateTestimonialApi, deleteTestimonial as deleteTestimonialApi } from "../api/TestimonialsApi";

const useTestimonialsReducer = () => {
        const { state, dispatch} = useContext(TestimonialsContext);

        const setTestimonials = async () => {
                try {
                        const res = await fetchTestimonials();
                        dispatch({ type: "SET_TESTIMONIALS", payload: res });
                } catch (error) {
                        console.error("Error setting testimonials:", error);
                }
        };

        const createTestimonial = async (newTestimonial) => {
                try {
                        const res = await createTestimonialApi(newTestimonial);
                        dispatch({ type: "CREATE_TESTIMONIAL", payload: res });
                } catch (error) {
                        console.error("Error creating testimonial:", error);
                }
        };

        const updateTestimonial = async (editedTestimonial) => {
                try {
                        const res = await updateTestimonialApi(editedTestimonial._id, editedTestimonial);
                        dispatch({ type: "UPDATE_TESTIMONIAL", payload: res });
                } catch (error) {
                        console.error("Error updating testimonial:", error);
                }
        };

        const deleteTestimonial = async (testimonialId) => {
                try {
                        const res = await deleteTestimonialApi(testimonialId._id);
                        dispatch({ type: "DELETE_TESTIMONIAL", payload: res });
                } catch (error) {
                        console.error("Error deleting testimonial:", error);
                }
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