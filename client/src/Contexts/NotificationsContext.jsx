import { createContext, useReducer } from 'react';
import notifications from '../Mock/trialNotifications';


export const NotificationsContext = createContext();

const notificationsReducer = (state, action) => {
        switch(action.type) {
                case "SET_LOADING":
                        return { ...state, loading: action.payload ?? true, error: null };

                case "SET_ERROR":
                        return { ...state, loading: false, error: action.payload };

                case "CLEAR_ERROR":
                        return { ...state, error: null };

                case "SET_NOTIFICATIONS":
                        return { ...state, notifications: action.payload, loading: false, error: null };

                case "CREATE_NOTIFICATION":
                        return { ...state, notifications: [action.payload, ...state.notifications], loading: false, error: null };

                case "DELETE_NOTIFICATION":
                        return {
                                ...state,
                                notifications: state.notifications.filter((notification) => notification._id !== action.payload),
                                loading: false,
                                error: null
                        };

                case "DELETE_NOTIFICATIONS":
                        return {
                                ...state,
                                notifications: state.notifications.filter(
                                        (notification) => !action.payload.includes(notification._id)),
                                loading: false,
                                error: null
                        };

                default:
                        return state;
        }
}

export function NotificationsContextProvider({ children }) {
        const [state, dispatch] = useReducer(notificationsReducer, {
                notifications: notifications,
                loading: false,
                error: null
        });

        return (
                <NotificationsContext.Provider value={{ state, dispatch }}>
                        { children }
                </NotificationsContext.Provider>
        );
}