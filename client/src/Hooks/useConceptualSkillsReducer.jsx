import { useContext } from "react";
import { ConceptualSkillsContext } from "../Contexts/ConceptualSkillsContext";

const useConceptualSkillsReducer = () => {
        const { state, dispatch} = useContext(ConceptualSkillsContext);
        const { skills } = state;

        const setSkills = (fetchedSkills) => {
                dispatch({ type: "SET_SKILLS", payload: fetchedSkills });
        };

        const createSkill = (newSkill) => {
                dispatch({ type: "CREATE_SKILL", payload: newSkill });
        };

        const updateSkill = (editedSkill) => {
                dispatch({ type: "UPDATE_SKILL", payload: editedSkill });
        };

        const deleteSkill = (skillId) => {
                dispatch({ type: "DELETE_SKILL", payload: skillId });
        };

        const deleteSkills = (skillIds) => {
                dispatch({ type: "DELETE_SKILLS", payload: skillIds });
        };

        return {
                skills,
                setSkills,
                createSkill,
                updateSkill,
                deleteSkill,
                deleteSkills
        };
}

export default useConceptualSkillsReducer;