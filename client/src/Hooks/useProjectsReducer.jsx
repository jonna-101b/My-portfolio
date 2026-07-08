import { useContext } from "react";
import { ProjectsContext } from "../Contexts/ProjectsContext";

const useProjectsReducer = () => {
        const { state, dispatch} = useContext(ProjectsContext);

        const setProjects = (fetchedProjects) => {
                dispatch({ type: "SET_PROJECTS", payload: fetchedProjects });
        };

        const createProject = (newProject) => {
                dispatch({ type: "CREATE_PROJECT", payload: newProject });
        };

        const updateProject = (editedProject) => {
                dispatch({ type: "UPDATE_PROJECT", payload: editedProject });
        };

        const deleteProject = (projectId) => {
                dispatch({ type: "DELETE_PROJECT", payload: projectId });
        };

        const deleteProjects = (projectIds) => {
                dispatch({ type: "DELETE_PROJECTS", payload: projectIds });
        };

        return {
                state,
                setProjects,
                createProject,
                updateProject,
                deleteProject,
                deleteProjects
        };
}

export default useProjectsReducer;