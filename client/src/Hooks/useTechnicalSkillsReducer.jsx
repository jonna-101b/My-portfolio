import { useContext, useCallback } from "react";
import { TechnicalSkillsContext } from "../Contexts/TechnicalSkillsContext";
import { fetchTechnicalSkills, createTechnicalSkill, updateTechnicalSkill, deleteTechnicalSkill } from "../api/SkillsApi";
import { APIError } from "../api/APIError";

const useTechnicalSkillsReducer = () => {
	const { state, dispatch } = useContext(TechnicalSkillsContext);
	const { skills } = state;

	const setSkills = useCallback(async () => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			const res = await fetchTechnicalSkills();
			dispatch({ type: "SET_SKILLS", payload: res });
			return res;
		} catch (error) {
			const apiError = APIError.fromAxiosError(error, "Failed to fetch technical skills");
			console.error("Error fetching technical skills:", apiError);
			dispatch({ type: "SET_ERROR", payload: apiError });
			return null;
		}
	}, [dispatch]);

	const createSkill = useCallback(async (newSkill) => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			const res = await createTechnicalSkill(newSkill);
			dispatch({ type: "CREATE_SKILL", payload: res });
			return res;
		} catch (error) {
			const apiError = APIError.fromAxiosError(error, "Failed to create technical skill");
			console.error("Error creating technical skill:", apiError);
			dispatch({ type: "SET_ERROR", payload: apiError });
			throw apiError;
		}
	}, [dispatch]);

	const updateSkill = useCallback(async (editedSkill) => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			const id = typeof editedSkill === "object" ? editedSkill._id : editedSkill;
			const res = await updateTechnicalSkill(id, editedSkill);
			dispatch({ type: "UPDATE_SKILL", payload: res });
			return res;
		} catch (error) {
			const apiError = APIError.fromAxiosError(error, "Failed to update technical skill");
			console.error("Error updating technical skill:", apiError);
			dispatch({ type: "SET_ERROR", payload: apiError });
			throw apiError;
		}
	}, [dispatch]);

	const deleteSkill = useCallback(async (skillId) => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			const id = typeof skillId === "object" ? skillId._id : skillId;
			const res = await deleteTechnicalSkill(id);
			dispatch({ type: "DELETE_SKILL", payload: id });
			return res;
		} catch (error) {
			const apiError = APIError.fromAxiosError(error, "Failed to delete technical skill");
			console.error("Error deleting technical skill:", apiError);
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
		updateSkill,
		deleteSkill,
		deleteSkills,
		clearError
	};
};

export default useTechnicalSkillsReducer;
