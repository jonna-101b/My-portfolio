import { createContext, useReducer, useEffect } from 'react';
import { fetchNotifications } from '../api/NotificationsApi';
import { APIError } from '../api/APIError';

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
			return { 
				...state, 
				notifications: Array.isArray(action.payload) ? action.payload : (action.payload ? [action.payload] : []), 
				loading: false, 
				error: null 
			};

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
};

export function NotificationsContextProvider({ children }) {
	const [state, dispatch] = useReducer(notificationsReducer, {
		notifications: [],
		loading: true,
		error: null
	});

	useEffect(() => {
		let isMounted = true;

		const loadNotifications = async () => {
			try {
				dispatch({ type: "SET_LOADING", payload: true });
				const res = await fetchNotifications();
				if (isMounted && res) {
					dispatch({ type: "SET_NOTIFICATIONS", payload: res });
				}
			} catch (error) {
				if (isMounted) {
					const apiError = APIError.fromAxiosError(error, "Failed to fetch notifications");
					console.error("Error fetching notifications on mount:", apiError);
					dispatch({ type: "SET_ERROR", payload: apiError });
				}
			}
		};

		loadNotifications();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<NotificationsContext.Provider value={{ state, dispatch }}>
			{ children }
		</NotificationsContext.Provider>
	);
}