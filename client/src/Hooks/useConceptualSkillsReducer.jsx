import { useContext, useCallback } from "react";
import { ConceptualSkillsContext } from "../Contexts/ConceptualSkillsContext";
import { fetchConceptualSkills, createConceptualSkill, deleteConceptualSkill } from "../api/SkillsApi";
import { APIError } from "../api/APIError";

const useConceptualSkillsReducer = () => {
        const { state, dispatch } = useContext(ConceptualSkillsContext);
        const { skills } = state;

        const setSkills = useCallback(async () => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await fetchConceptualSkills();
                        dispatch({ type: "SET_SKILLS", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to fetch conceptual skills");
                        console.error("Error fetching conceptual skills:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        return null;
                }
        }, [dispatch]);

        const createSkill = useCallback(async (newSkill) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await createConceptualSkill(newSkill);
                        dispatch({ type: "CREATE_SKILL", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to create conceptual skill");
                        console.error("Error creating conceptual skill:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteSkill = useCallback(async (skillId) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof skillId === "object" ? skillId._id : skillId;
                        const res = await deleteConceptualSkill(id);
                        dispatch({ type: "DELETE_SKILL", payload: id });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to delete conceptual skill");
                        console.error("Error deleting conceptual skill:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteSkills = useCallback((skillIds) => {
                dispatch({ type: "DELETE_SKILLS", payload: skillIds });
        }, [dispatch]);

        const clearError = useCallback(() => {
                dispatch({ type: "CLEAR_ERROR" });
        }, [dispatch]);

        return {
                skills,
                state,
                loading: state.loading,
                error: state.error,
                setSkills,
                createSkill,
                deleteSkill,
                deleteSkills,
                clearError
        };
};

export default useConceptualSkillsReducer;