import { useContext } from "react";
import { ActivitiesContext } from "../Contexts/ActivitiesContext";
import { fetchActivities, createActivity as createActivityApi, deleteActivity as deleteActivityApi } from "../api/ActivitiesApi";

const useActivitiesReducer = () => {
        const { state, dispatch} = useContext(ActivitiesContext);

        const setActivities = async () => {
                try {
                        const res = await fetchActivities();
                        dispatch({ type: "SET_ACTIVITIES", payload: res });
                } catch (error) {
                        console.error("Error setting activities:", error);
                }
        };

        const createActivity = async (newActivity) => {
                try {
                        const res = await createActivityApi(newActivity);
                        dispatch({ type: "CREATE_ACTIVITY", payload: res });
                } catch (error) {
                        console.error("Error creating activity:", error);
                }
        };

        const deleteActivity = async (activityId) => {
                try {
                        const res = await deleteActivityApi(activityId._id);
                        dispatch({ type: "DELETE_ACTIVITY", payload: res });
                } catch (error) {
                        console.error("Error deleting activity:", error);
                }
        };

        const deleteActivities = (activityIds) => {
                dispatch({ type: "DELETE_ACTIVITIES", payload: activityIds });
        };

        return {
                state,
                setActivities,
                createActivity,
                deleteActivity,
                deleteActivities
        };
}

export default useActivitiesReducer;