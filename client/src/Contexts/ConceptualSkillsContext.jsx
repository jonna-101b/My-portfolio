import { createContext, useReducer } from 'react';
import skills from '../Mock/trialConceptualSkills';


export const ConceptualSkillsContext = createContext();

const conceptualSkillsReducer = (state, action) => {
        switch(action.type) {
                case "SET_LOADING":
                        return { ...state, loading: action.payload ?? true, error: null };

                case "SET_ERROR":
                        return { ...state, loading: false, error: action.payload };

                case "CLEAR_ERROR":
                        return { ...state, error: null };

                case "SET_SKILLS":
                        return { ...state, skills: action.payload, loading: false, error: null };

                case "CREATE_SKILL":
                        return { ...state, skills: [action.payload, ...state.skills], loading: false, error: null };

                case "DELETE_SKILL":
                        return {
                                ...state,
                                skills: state.skills.filter((skill) => skill._id !== action.payload),
                                loading: false,
                                error: null
                        };

                case "DELETE_SKILLS":
                        return {
                                ...state,
                                skills: state.skills.filter(
                                        (skill) => !action.payload.includes(skill._id)),
                                loading: false,
                                error: null
                        };

                default:
                        return state;
        }
}

export function ConceptualSkillsContextProvider({ children }) {
        const [state, dispatch] = useReducer(conceptualSkillsReducer, {
                skills: skills,
                loading: false,
                error: null
        });

        return (
                <ConceptualSkillsContext.Provider value={{ state, dispatch }}>
                        { children }
                </ConceptualSkillsContext.Provider>
        );
}