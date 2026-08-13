import { useContext, useCallback } from "react";
import { TestimonialsContext } from "../Contexts/TestimonialsContext";
import { fetchTestimonials, createTestimonial as createTestimonialApi, updateTestimonial as updateTestimonialApi, deleteTestimonial as deleteTestimonialApi } from "../api/TestimonialsApi";
import { APIError } from "../api/APIError";

const useTestimonialsReducer = () => {
        const { state, dispatch } = useContext(TestimonialsContext);

        const setTestimonials = useCallback(async () => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await fetchTestimonials();
                        dispatch({ type: "SET_TESTIMONIALS", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to fetch testimonials");
                        console.error("Error setting testimonials:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        return null;
                }
        }, [dispatch]);

        const createTestimonial = useCallback(async (newTestimonial) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await createTestimonialApi(newTestimonial);
                        dispatch({ type: "CREATE_TESTIMONIAL", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to create testimonial");
                        console.error("Error creating testimonial:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const updateTestimonial = useCallback(async (editedTestimonial) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof editedTestimonial === "object" ? editedTestimonial._id : editedTestimonial;
                        const res = await updateTestimonialApi(id, editedTestimonial);
                        dispatch({ type: "UPDATE_TESTIMONIAL", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to update testimonial");
                        console.error("Error updating testimonial:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteTestimonial = useCallback(async (testimonialId) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof testimonialId === "object" ? testimonialId._id : testimonialId;
                        const res = await deleteTestimonialApi(id);
                        dispatch({ type: "DELETE_TESTIMONIAL", payload: id });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to delete testimonial");
                        console.error("Error deleting testimonial:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteTestimonials = useCallback((testimonialIds) => {
                dispatch({ type: "DELETE_TESTIMONIALS", payload: testimonialIds });
        }, [dispatch]);

        const clearError = useCallback(() => {
                dispatch({ type: "CLEAR_ERROR" });
        }, [dispatch]);

        return {
                state,
                loading: state.loading,
                error: state.error,
                setTestimonials,
                createTestimonial,
                updateTestimonial,
                deleteTestimonial,
                deleteTestimonials,
                clearError
        };
};

export default useTestimonialsReducer;