import { createContext, useReducer, useEffect } from 'react';
import { fetchConceptualSkills } from '../api/SkillsApi';
import { APIError } from '../api/APIError';
import skills from '../Mock/trialConceptualSkills';

export const ConceptualSkillsContext = createContext();

const conceptualSkillsReducer = (state, action) => {
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
					skill._id === action.payload._id ? action.payload : skill
				),
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

export function ConceptualSkillsContextProvider({ children }) {
	const [state, dispatch] = useReducer(conceptualSkillsReducer, {
		skills: skills,
		loading: true,
		error: null
	});

	useEffect(() => {
		let isMounted = true;

		const loadConceptualSkills = async () => {
			try {
				dispatch({ type: "SET_LOADING", payload: true });
				const res = await fetchConceptualSkills();
				if (isMounted && res) {
					dispatch({ type: "SET_SKILLS", payload: res });
				}
			} catch (error) {
				if (isMounted) {
					const apiError = APIError.fromAxiosError(error, "Failed to fetch conceptual skills");
					console.error("Error fetching conceptual skills on mount:", apiError);
					dispatch({ type: "SET_ERROR", payload: apiError });
				}
			}
		};

		loadConceptualSkills();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<ConceptualSkillsContext.Provider value={{ state, dispatch }}>
			{ children }
		</ConceptualSkillsContext.Provider>
	);
}