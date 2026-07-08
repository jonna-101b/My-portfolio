import { useState, createContext } from 'react';
import useProjectsReducer from '../../../../Hooks/useProjectsReducer';



export const ProjectsDisplayContext = createContext();

export function ProjectsDisplayContextProvider({ children }) {
        const { state } = useProjectsReducer();
        const [ projects, setProjects ] = useState(state.projects);

        return (
                <ProjectsDisplayContext.Provider  value={{ projects, setProjects }}>
                        { children }
                </ProjectsDisplayContext.Provider>
        );
}