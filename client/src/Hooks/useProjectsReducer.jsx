import { useContext, useCallback } from "react";
import { ProjectsContext } from "../Contexts/ProjectsContext";
import { fetchProjects, createProject as createProjectApi, updateProject as updateProjectApi, deleteProject as deleteProjectApi } from "../api/ProjectsApi";
import { APIError } from "../api/APIError";

const useProjectsReducer = () => {
        const { state, dispatch } = useContext(ProjectsContext);

        const setProjects = useCallback(async () => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await fetchProjects();
                        dispatch({ type: "SET_PROJECTS", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to fetch projects");
                        console.error("Error setting projects:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        return null;
                }
        }, [dispatch]);

        const createProject = useCallback(async (newProject) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await createProjectApi(newProject);
                        dispatch({ type: "CREATE_PROJECT", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to create project");
                        console.error("Error creating project:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const updateProject = useCallback(async (editedProject) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof editedProject === "object" ? editedProject._id : editedProject;
                        const res = await updateProjectApi(id, editedProject);
                        dispatch({ type: "UPDATE_PROJECT", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to update project");
                        console.error("Error updating project:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteProject = useCallback(async (projectId) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof projectId === "object" ? projectId._id : projectId;
                        const res = await deleteProjectApi(id);
                        dispatch({ type: "DELETE_PROJECT", payload: id });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to delete project");
                        console.error("Error deleting project:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteProjects = useCallback((projectIds) => {
                dispatch({ type: "DELETE_PROJECTS", payload: projectIds });
        }, [dispatch]);

        const clearError = useCallback(() => {
                dispatch({ type: "CLEAR_ERROR" });
        }, [dispatch]);

        return {
                state,
                projects: state.projects,
                loading: state.loading,
                error: state.error,
                setProjects,
                createProject,
                updateProject,
                deleteProject,
                deleteProjects,
                clearError
        };
};

export default useProjectsReducer;