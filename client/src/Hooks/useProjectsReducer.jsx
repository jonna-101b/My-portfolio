import { useContext } from "react";
import { ProjectsContext } from "../Contexts/ProjectsContext";
import { fetchProjects, createProject as createProjectApi, updateProject as updateProjectApi, deleteProject as deleteProjectApi } from "../api/ProjectsApi";

const useProjectsReducer = () => {
        const { state, dispatch} = useContext(ProjectsContext);

        const setProjects = async () => {
                try {
                        const res = await fetchProjects();
                        dispatch({ type: "SET_PROJECTS", payload: res });
                } catch (error) {
                        console.error("Error setting projects:", error);
                }
        };

        const createProject = async (newProject) => {
                try {
                        const res = await createProjectApi(newProject);
                        dispatch({ type: "CREATE_PROJECT", payload: res });
                } catch (error) {
                        console.error("Error creating project:", error);
                }
        };

        const updateProject = async (editedProject) => {
                try {
                        const res = await updateProjectApi(editedProject._id, editedProject);
                        dispatch({ type: "UPDATE_PROJECT", payload: res });
                } catch (error) {
                        console.error("Error updating project:", error);
                }
        };

        const deleteProject = async (projectId) => {
                try {
                        const res = await deleteProjectApi(projectId._id);
                        dispatch({ type: "DELETE_PROJECT", payload: res });
                } catch (error) {
                        console.error("Error deleting project:", error);
                }
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