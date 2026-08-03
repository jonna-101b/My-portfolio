import { createContext, useReducer } from 'react';
import notifications from '../Mock/trialNotifications';


export const NotificationsContext = createContext();

const notificationsReducer = (state, action) => {
        switch(action.type) {
                case "SET_NOTIFICATIONS":
                        return { notifications: action.payload};

                case "CREATE_NOTIFICATION":
                        return { notifications: [action.payload, ...state.notifications] };

                case "DELETE_NOTIFICATION":
                        return { notifications: state.notifications.filter((notification) =>  notification._id !== action.payload) };

                case "DELETE_NOTIFICATIONS":
                        return {
                                notifications: state.notifications.filter(
                                        (notification) => !action.payload.includes(notification._id))
                        };

                default:
                        return state;
        }
}

export function NotificationsContextProvider({ children }) {
        const [state, dispatch] = useReducer(notificationsReducer, { notifications: notifications});

        return (
                <NotificationsContext.Provider value={{ state, dispatch }}>
                        { children }
                </NotificationsContext.Provider>
        );
}