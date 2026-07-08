import { createContext, useReducer } from 'react';
import projects from '../Mock/trialProjects';


export const ProjectsContext = createContext();

const projectsReducer = (state, action) => {
        switch(action.type) {
                case "SET_PROJECTS":
                        return { projects: action.payload};

                case "CREATE_PROJECT":
                        return { projects: [action.payload, ...state.projects] };

                case "UPDATE_PROJECT":
                        return {
                                projects: state.projects.map((project) =>
                                        project._id === action.payload._id ? action.payload : project)
                        };

                case "DELETE_PROJECT":
                        return { projects: state.projects.filter((project) =>  project._id !== action.payload) };

                case "DELETE_PROJECTS":
                        return {
                                projects: state.projects.filter(
                                        (project) => !action.payload.includes(project._id))
                        };

                default:
                        return state;
        }
}

export function ProjectsContextProvider({ children }) {
        const [state, dispatch] = useReducer(projectsReducer, { projects: projects});

        return (
                <ProjectsContext.Provider value={{ state, dispatch }}>
                        { children }
                </ProjectsContext.Provider>
        );
}