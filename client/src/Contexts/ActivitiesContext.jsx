import { createContext, useReducer, useEffect } from 'react';
import { fetchActivities } from '../api/ActivitiesApi';
import { APIError } from '../api/APIError';
import activities from '../Mock/trialActivities';

export const ActivitiesContext = createContext();

const activitiesReducer = (state, action) => {
	switch(action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload ?? true, error: null };

		case "SET_ERROR":
			return { ...state, loading: false, error: action.payload };

		case "CLEAR_ERROR":
			return { ...state, error: null };

		case "SET_ACTIVITIES":
			return { 
				...state, 
				activities: Array.isArray(action.payload) ? action.payload : (action.payload ? [action.payload] : []), 
				loading: false, 
				error: null 
			};

		case "CREATE_ACTIVITY":
			return { ...state, activities: [action.payload, ...state.activities], loading: false, error: null };

		case "DELETE_ACTIVITY":
			return {
				...state,
				activities: state.activities.filter((activity) => activity._id !== action.payload),
				loading: false,
				error: null
			};

		case "DELETE_ACTIVITIES":
			return {
				...state,
				activities: state.activities.filter(
					(activity) => !action.payload.includes(activity._id)),
				loading: false,
				error: null
			};

		default:
			return state;
	}
};

export function ActivitiesContextProvider({ children }) {
	const [state, dispatch] = useReducer(activitiesReducer, {
		activities: activities,
		loading: true,
		error: null
	});

	useEffect(() => {
		let isMounted = true;

		const loadActivities = async () => {
			try {
				dispatch({ type: "SET_LOADING", payload: true });
				const res = await fetchActivities();
				if (isMounted && res) {
					dispatch({ type: "SET_ACTIVITIES", payload: res });
				}
			} catch (error) {
				if (isMounted) {
					const apiError = APIError.fromAxiosError(error, "Failed to fetch activities");
					console.error("Error fetching activities on mount:", apiError);
					dispatch({ type: "SET_ERROR", payload: apiError });
				}
			}
		};

		loadActivities();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<ActivitiesContext.Provider value={{ state, dispatch }}>
			{ children }
		</ActivitiesContext.Provider>
	);
}