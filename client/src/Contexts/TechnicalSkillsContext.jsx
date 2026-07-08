import { createContext, useReducer } from 'react';
import skills from '../Mock/trialTechnicalSkills';


export const TechnicalSkillsContext = createContext();

const technicalSkillsReducer = (state, action) => {
        switch(action.type) {
                case "SET_SKILLS":
                        return { skills: action.payload};

                case "CREATE_SKILL":
                        return { skills: [action.payload, ...state.skills] };

                case "UPDATE_SKILL":
                        return {
                                skills: state.skills.map((skill) =>
                                        skill._id === action.payload._id ? action.payload : skill)
                        };

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

export function TechnicalSkillsContextProvider({ children }) {
        const [state, dispatch] = useReducer(technicalSkillsReducer, { skills: skills});

        return (
                <TechnicalSkillsContext.Provider value={{ state, dispatch }}>
                        { children }
                </TechnicalSkillsContext.Provider>
        );
}