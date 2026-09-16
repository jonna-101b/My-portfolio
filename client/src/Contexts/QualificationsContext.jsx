import { createContext, useReducer, useEffect } from 'react';
import { fetchQualifications } from '../api/QualificationsApi';
import { APIError } from '../api/APIError';
import qualifications from '../mock/trialQualifications';

export const QualificationsContext = createContext();

const QualificationsReducer = (state, action) => {
	switch(action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload ?? true, error: null };

		case "SET_ERROR":
			return { ...state, loading: false, error: action.payload };

		case "CLEAR_ERROR":
			return { ...state, error: null };

		case "SET_QUALIFICATIONS":
			return { 
				...state, 
				qualifications: Array.isArray(action.payload) ? action.payload : (action.payload ? [action.payload] : []), 
				loading: false, 
				error: null 
			};

		case "CREATE_QUALIFICATION":
			return { ...state, qualifications: [action.payload, ...state.qualifications], loading: false, error: null };

		case "UPDATE_QUALIFICATION":
			return {
				...state,
				qualifications: state.qualifications.map((qualification) =>
					qualification._id === action.payload._id ? action.payload : qualification),
				loading: false,
				error: null
			};

		case "DELETE_QUALIFICATION":
			return {
				...state,
				qualifications: state.qualifications.filter((qualification) => qualification._id !== action.payload),
				loading: false,
				error: null
			};

		case "DELETE_QUALIFICATIONS":
			return {
				...state,
				qualifications: state.qualifications.filter(
					(qualification) => !action.payload.includes(qualification._id)),
				loading: false,
				error: null
			};
		
		default:
			return state;
	}
};

export function QualificationsContextProvider({ children }) {
	const [state, dispatch] = useReducer(QualificationsReducer, {
		qualifications: qualifications,
		loading: true,
		error: null
	});

	useEffect(() => {
		let isMounted = true;

		const loadQualifications = async () => {
			try {
				dispatch({ type: "SET_LOADING", payload: true });
				const res = await fetchQualifications();
				if (isMounted && res) {
					dispatch({ type: "SET_QUALIFICATIONS", payload: res });
				}
			} catch (error) {
				if (isMounted) {
					const apiError = APIError.fromAxiosError(error, "Failed to fetch qualifications");
					console.error("Error fetching qualifications on mount:", apiError);
					dispatch({ type: "SET_ERROR", payload: apiError });
				}
			}
		};

		loadQualifications();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<QualificationsContext.Provider value={{ state, dispatch }}>
			{ children }
		</QualificationsContext.Provider>
	);
}