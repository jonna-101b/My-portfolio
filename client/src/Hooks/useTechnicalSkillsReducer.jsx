import { useContext } from "react";
import { TechnicalSkillsContext } from "../Contexts/TechnicalSkillsContext";
import { fetchTechnicalSkills, createTechnicalSkill, updateTechnicalSkill, deleteTechnicalSkill, createTechnicalSkillTech, deleteTechnicalSkillTech } from "../api/SkillsApi";

const useTechnicalSkillsReducer = () => {
        const { state, dispatch} = useContext(TechnicalSkillsContext);
        const { skills } = state;

        const setSkills = async () => {
                try {
                        const res = await fetchTechnicalSkills();
                        dispatch({ type: "SET_SKILLS", payload: res });
                }
                catch (error) {
                        console.error("Error fetching technical skills:", error);
                }
        };

        const createSkill = async (newSkill) => {
                try {
                        const res = await createTechnicalSkill(newSkill);
                        dispatch({ type: "CREATE_SKILL", payload: res });
                }
                catch (error) {
                        console.error("Error creating technical skill:", error);
                }
        };

        const updateSkill = async (editedSkill) => {
                try {
                        const res = await updateTechnicalSkill(editedSkill._id, editedSkill);
                        dispatch({ type: "UPDATE_SKILL", payload: res });
                }
                catch (error) {
                        console.error("Error updating technical skill:", error);
                }
        };

        const deleteSkill = async (skillId) => {
                try {
                        const res = await deleteTechnicalSkill(skillId._id);
                        dispatch({ type: "DELETE_SKILL", payload: res });
                }
                catch (error) {
                        console.error("Error deleting technical skill:", error);
                }
        };

        const deleteSkills = (skillIds) => {
                dispatch({ type: "DELETE_SKILLS", payload: skillIds });
        };

        const createSkillTech = async (skillId, newTech) => {
                try {
                        const res = await createTechnicalSkillTech(skillId._id, newTech);
                        dispatch({ type: "CREATE_SKILL_TECH", payload: res });
                }
                catch (error) {
                        console.error("Error creating technical skill technology:", error);
                }
        };

        const deleteSkillTech = async (skillId, techId) => {
                try {
                        const res = await deleteTechnicalSkillTech(skillId._id, techId._id);
                        dispatch({ type: "DELETE_SKILL_TECH", payload: res });
                }
                catch (error) {
                        console.error("Error deleting technical skill technology:", error);
                }
        };

        return {
                skills,
                setSkills,
                createSkill,
                updateSkill,
                deleteSkill,
                deleteSkills,
                createSkillTech,
                deleteSkillTech
        };
}

export default useTechnicalSkillsReducer;