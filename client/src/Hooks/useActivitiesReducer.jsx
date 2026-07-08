import { useContext } from "react";
import { ActivitiesContext } from "../Contexts/ActivitiesContext";

const useActivitiesReducer = () => {
        const { state, dispatch} = useContext(ActivitiesContext);

        const setActivities = (fetchedActivities) => {
                dispatch({ type: "SET_ACTIVITIES", payload: fetchedActivities });
        };

        const createActivity = (newActivity) => {
                dispatch({ type: "CREATE_ACTIVITY", payload: newActivity });
        };

        const updateActivity = (editedActivity) => {
                dispatch({ type: "UPDATE_ACTIVITY", payload: editedActivity });
        };

        const deleteActivity = (activityId) => {
                dispatch({ type: "DELETE_ACTIVITY", payload: activityId });
        };

        const deleteActivities = (activityIds) => {
                dispatch({ type: "DELETE_ACTIVITIES", payload: activityIds });
        };

        return {
                state,
                setActivities,
                createActivity,
                updateActivity,
                deleteActivity,
                deleteActivities
        };
}

export default useActivitiesReducer;