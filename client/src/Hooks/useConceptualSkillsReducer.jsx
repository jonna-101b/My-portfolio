import { useContext } from "react";
import { ConceptualSkillsContext } from "../Contexts/ConceptualSkillsContext";
import { fetchConceptualSkills, createConceptualSkill, deleteConceptualSkill } from "../api/SkillsApi";

const useConceptualSkillsReducer = () => {
        const { state, dispatch} = useContext(ConceptualSkillsContext);
        const { skills } = state;

        const setSkills = async () => {
                try {
                        const res = await fetchConceptualSkills();
                        dispatch({ type: "SET_SKILLS", payload: res });
                }
                catch (error) {
                        console.error("Error fetching conceptual skills:", error);
                }
        };

        const createSkill = async (newSkill) => {
                try {
                        const res = await createConceptualSkill(newSkill);
                        dispatch({ type: "CREATE_SKILL", payload: res });
                }
                catch (error) {
                        console.error("Error creating conceptual skill:", error);
                }
        };

        const deleteSkill = async (skillId) => {
                try {
                        const res = await deleteConceptualSkill(skillId._id);
                        dispatch({ type: "DELETE_SKILL", payload: res });
                }
                catch (error) {
                        console.error("Error deleting conceptual skill:", error);
                }
        };

        const deleteSkills = (skillIds) => {
                dispatch({ type: "DELETE_SKILLS", payload: skillIds });
        };

        return {
                skills,
                setSkills,
                createSkill,
                deleteSkill,
                deleteSkills
        };
}

export default useConceptualSkillsReducer;