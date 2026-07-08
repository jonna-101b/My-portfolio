import { useContext } from "react";
import { NotificationsContext } from "../Contexts/NotificationsContext";

const useNotificationsReducer = () => {
        const { state, dispatch} = useContext(NotificationsContext);

        const setNotifications = (fetchedNotifications) => {
                dispatch({ type: "SET_NOTIFICATIONS", payload: fetchedNotifications });
        };

        const createNotification = (newNotification) => {
                dispatch({ type: "CREATE_NOTIFICATION", payload: newNotification });
        };

        const updateNotification = (editedNotification) => {
                dispatch({ type: "UPDATE_NOTIFICATION", payload: editedNotification });
        };

        const deleteNotification = (notificationId) => {
                dispatch({ type: "DELETE_NOTIFICATION", payload: notificationId });
        };

        const deleteNotifications = (notificationIds) => {
                dispatch({ type: "DELETE_NOTIFICATIONS", payload: notificationIds });
        };

        return {
                state,
                setNotifications,
                createNotification,
                updateNotification,
                deleteNotification,
                deleteNotifications
        };
}

export default useNotificationsReducer;