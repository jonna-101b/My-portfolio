import { createContext, useReducer } from 'react';
import skills from '../Mock/trialConceptualSkills';


export const ConceptualSkillsContext = createContext();

const conceptualSkillsReducer = (state, action) => {
        switch(action.type) {
                case "SET_SKILLS":
                        return { skills: action.payload};

                case "CREATE_SKILL":
                        return { skills: [action.payload, ...state.skills] };

                case "DELETE_SKILL":
                        return { skills: state.skills.filter((skill) =>  skill._id !== action.payload) };

                case "DELETE_SKILLS":
                        return {
                                skills: state.skills.filter(
                                        (skill) => !action.payload.includes(skill._id))
                        };

                default:
                        return state;
        }
}

export function ConceptualSkillsContextProvider({ children }) {
        const [state, dispatch] = useReducer(conceptualSkillsReducer, { skills: skills});

        return (
                <ConceptualSkillsContext.Provider value={{ state, dispatch }}>
                        { children }
                </ConceptualSkillsContext.Provider>
        );
}