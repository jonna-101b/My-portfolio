import { createContext, useReducer, useEffect } from 'react';
import { fetchTechnicalSkills } from '../api/SkillsApi';
import { APIError } from '../api/APIError';
import skills from '../Mock/trialTechnicalSkills';
 
export const TechnicalSkillsContext = createContext();

const technicalSkillsReducer = (state, action) => {
	switch(action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload ?? true, error: null };

		case "SET_ERROR":
			return { ...state, loading: false, error: action.payload };

		case "CLEAR_ERROR":
			return { ...state, error: null };

		case "SET_SKILLS":
			return { 
				...state, 
				skills: Array.isArray(action.payload) ? action.payload : (action.payload ? [action.payload] : []), 
				loading: false, 
				error: null 
			};

		case "CREATE_SKILL":
			return { ...state, skills: [action.payload, ...state.skills], loading: false, error: null };

		case "UPDATE_SKILL":
			return {
				...state,
				skills: state.skills.map((skill) =>
					skill._id === action.payload._id ? action.payload : skill),
				loading: false,
				error: null
			};

		case "DELETE_SKILL":
			return {
				...state,
				skills: state.skills.filter((skill) => skill._id !== action.payload),
				loading: false,
				error: null
			};

		case "DELETE_SKILLS":
			return {
				...state,
				skills: state.skills.filter(
					(skill) => !action.payload.includes(skill._id)),
				loading: false,
				error: null
			};

		default:
			return state;
	}
};

export function TechnicalSkillsContextProvider({ children }) {
	const [state, dispatch] = useReducer(technicalSkillsReducer, {
		skills: skills,
		loading: true,
		error: null
	});

	useEffect(() => {
		let isMounted = true;

		const loadTechnicalSkills = async () => {
			try {
				dispatch({ type: "SET_LOADING", payload: true });
				const res = await fetchTechnicalSkills();
				if (isMounted && res) {
					dispatch({ type: "SET_SKILLS", payload: res });
				}
			} catch (error) {
				if (isMounted) {
					const apiError = APIError.fromAxiosError(error, "Failed to fetch technical skills");
					console.error("Error fetching technical skills on mount:", apiError);
					dispatch({ type: "SET_ERROR", payload: apiError });
				}
			}
		};

		loadTechnicalSkills();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<TechnicalSkillsContext.Provider value={{ state, dispatch }}>
			{ children }
		</TechnicalSkillsContext.Provider>
	);
}