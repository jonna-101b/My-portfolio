import { createContext, useReducer, useEffect } from 'react';
import { fetchProjects } from '../api/ProjectsApi';
import { APIError } from '../api/APIError';
import projects from '../Mock/trialProjects';

export const ProjectsContext = createContext();

const projectsReducer = (state, action) => {
	switch(action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload ?? true, error: null };

		case "SET_ERROR":
			return { ...state, loading: false, error: action.payload };

		case "CLEAR_ERROR":
			return { ...state, error: null };

		case "SET_PROJECTS":
			return { 
				...state, 
				projects: Array.isArray(action.payload) ? action.payload : (action.payload ? [action.payload] : []), 
				loading: false, 
				error: null 
			};

		case "CREATE_PROJECT":
			return { ...state, projects: [action.payload, ...state.projects], loading: false, error: null };

		case "UPDATE_PROJECT":
			return {
				...state,
				projects: state.projects.map((project) =>
					project._id === action.payload._id ? action.payload : project),
				loading: false,
				error: null
			};

		case "DELETE_PROJECT":
			return {
				...state,
				projects: state.projects.filter((project) => project._id !== action.payload),
				loading: false,
				error: null
			};

		case "DELETE_PROJECTS":
			return {
				...state,
				projects: state.projects.filter(
					(project) => !action.payload.includes(project._id)),
				loading: false,
				error: null
			};

		default:
			return state;
	}
};

export function ProjectsContextProvider({ children }) {
	const [state, dispatch] = useReducer(projectsReducer, {
		projects: projects,
		loading: true,
		error: null
	});

	useEffect(() => {
		let isMounted = true;

		const loadProjects = async () => {
			try {
				dispatch({ type: "SET_LOADING", payload: true });
				const res = await fetchProjects();
				if (isMounted && res) {
					dispatch({ type: "SET_PROJECTS", payload: res });
				}
			} catch (error) {
				if (isMounted) {
					const apiError = APIError.fromAxiosError(error, "Failed to fetch projects");
					console.error("Error fetching projects on mount:", apiError);
					dispatch({ type: "SET_ERROR", payload: apiError });
				}
			}
		};

		loadProjects();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<ProjectsContext.Provider value={{ state, dispatch }}>
			{ children }
		</ProjectsContext.Provider>
	);
}