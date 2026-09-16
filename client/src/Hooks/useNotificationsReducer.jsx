import { useContext, useCallback } from "react";
import { NotificationsContext } from "../Contexts/NotificationsContext";
import { fetchNotifications, createNotification as createNotificationApi, deleteNotification as deleteNotificationApi } from "../api/NotificationsApi";
import { APIError } from "../api/APIError";

const useNotificationsReducer = () => {
        const { state, dispatch } = useContext(NotificationsContext);

        const setNotifications = useCallback(async () => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await fetchNotifications();
                        dispatch({ type: "SET_NOTIFICATIONS", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to fetch notifications");
                        console.error("Error setting notifications:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        return null;
                }
        }, [dispatch]);

        const createNotification = useCallback(async (newNotification) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await createNotificationApi(newNotification);
                        dispatch({ type: "CREATE_NOTIFICATION", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to create notification");
                        console.error("Error creating notification:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteNotification = useCallback(async (notificationId) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof notificationId === "object" ? notificationId._id : notificationId;
                        const res = await deleteNotificationApi(id);
                        dispatch({ type: "DELETE_NOTIFICATION", payload: id });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to delete notification");
                        console.error("Error deleting notification:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteNotifications = useCallback((notificationIds) => {
                dispatch({ type: "DELETE_NOTIFICATIONS", payload: notificationIds });
        }, [dispatch]);

        const clearError = useCallback(() => {
                dispatch({ type: "CLEAR_ERROR" });
        }, [dispatch]);

        return {
                state,
                notifications: state.notifications,
                loading: state.loading,
                error: state.error,
                setNotifications,
                createNotification,
                deleteNotification,
                deleteNotifications,
                clearError
        };
};

export default useNotificationsReducer;