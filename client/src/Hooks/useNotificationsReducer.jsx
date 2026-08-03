import { useContext } from "react";
import { NotificationsContext } from "../Contexts/NotificationsContext";
import { fetchNotifications, createNotification as createNotificationApi, deleteNotification as deleteNotificationApi } from "../api/NotificationsApi";

const useNotificationsReducer = () => {
        const { state, dispatch} = useContext(NotificationsContext);

        const setNotifications = async () => {
                try {
                        const res = await fetchNotifications();
                        dispatch({ type: "SET_NOTIFICATIONS", payload: res });
                } catch (error) {
                        console.error("Error setting notifications:", error);
                }
        };

        const createNotification = async (newNotification) => {
                try {
                        const res = await createNotificationApi(newNotification);
                        dispatch({ type: "CREATE_NOTIFICATION", payload: res });
                } catch (error) {
                        console.error("Error creating notification:", error);
                }
        };

        const deleteNotification = async (notificationId) => {
                try {
                        const res = await deleteNotificationApi(notificationId._id);
                        dispatch({ type: "DELETE_NOTIFICATION", payload: res });
                } catch (error) {
                        console.error("Error deleting notification:", error);
                }
        };

        const deleteNotifications = (notificationIds) => {
                dispatch({ type: "DELETE_NOTIFICATIONS", payload: notificationIds });
        };

        return {
                state,
                setNotifications,
                createNotification,
                deleteNotification,
                deleteNotifications
        };
};

export default useNotificationsReducer;