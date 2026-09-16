import { useContext, useCallback } from "react";
import { ActivitiesContext } from "../Contexts/ActivitiesContext";
import { fetchActivities, createActivity as createActivityApi, deleteActivity as deleteActivityApi } from "../api/ActivitiesApi";
import { APIError } from "../api/APIError";

const useActivitiesReducer = () => {
        const { state, dispatch } = useContext(ActivitiesContext);

        const setActivities = useCallback(async () => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await fetchActivities();
                        dispatch({ type: "SET_ACTIVITIES", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to fetch activities");
                        console.error("Error setting activities:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        return null;
                }
        }, [dispatch]);

        const createActivity = useCallback(async (newActivity) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await createActivityApi(newActivity);
                        dispatch({ type: "CREATE_ACTIVITY", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to create activity");
                        console.error("Error creating activity:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteActivity = useCallback(async (activityId) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof activityId === "object" ? activityId._id : activityId;
                        const res = await deleteActivityApi(id);
                        dispatch({ type: "DELETE_ACTIVITY", payload: id });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to delete activity");
                        console.error("Error deleting activity:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteActivities = useCallback((activityIds) => {
                dispatch({ type: "DELETE_ACTIVITIES", payload: activityIds });
        }, [dispatch]);

        const clearError = useCallback(() => {
                dispatch({ type: "CLEAR_ERROR" });
        }, [dispatch]);

        return {
                state,
                activities: state.activities,
                loading: state.loading,
                error: state.error,
                setActivities,
                createActivity,
                deleteActivity,
                deleteActivities,
                clearError
        };
};

export default useActivitiesReducer;