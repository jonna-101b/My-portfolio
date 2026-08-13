import { createContext, useReducer } from 'react';
import qualifications from '../Mock/trialQualifications';


export const QualificationsContext = createContext();

const QualificationsReducer = (state, action) => {
        switch(action.type) {
                case "SET_LOADING":
                        return { ...state, loading: action.payload ?? true, error: null };

                case "SET_ERROR":
                        return { ...state, loading: false, error: action.payload };

                case "CLEAR_ERROR":
                        return { ...state, error: null };

                case "SET_QUALIFICATIONS":
                        return { ...state, qualifications: action.payload, loading: false, error: null };

                case "CREATE_QUALIFICATION":
                        return { ...state, qualifications: [action.payload, ...state.qualifications], loading: false, error: null };

                case "UPDATE_QUALIFICATION":
                        return {
                                ...state,
                                qualifications: state.qualifications.map((qualification) =>
                                        qualification._id === action.payload._id ? action.payload : qualification),
                                loading: false,
                                error: null
                        };

                case "DELETE_QUALIFICATION":
                        return {
                                ...state,
                                qualifications: state.qualifications.filter((qualification) => qualification._id !== action.payload),
                                loading: false,
                                error: null
                        };

                case "DELETE_QUALIFICATIONS":
                        return {
                                ...state,
                                qualifications: state.qualifications.filter(
                                        (qualification) => !action.payload.includes(qualification._id)),
                                loading: false,
                                error: null
                        };
                
                default:
                        return state;
        }
}

export function QualificationsContextProvider({ children }) {
        const [state, dispatch] = useReducer(QualificationsReducer, {
                qualifications: qualifications,
                loading: false,
                error: null
        });

        return (
                <QualificationsContext.Provider value={{ state, dispatch }}>
                        { children }
                </QualificationsContext.Provider>
        );
}