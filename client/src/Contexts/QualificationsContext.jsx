import { createContext, useReducer } from 'react';
import qualifications from '../Mock/trialQualifications';


export const QualificationsContext = createContext();

const QualificationsReducer = (state, action) => {
        switch(action.type) {
                case "SET_QUALIFICATIONS":
                        return { qualifications: action.payload};

                case "CREATE_QUALIFICATION":
                        return { qualifications: [action.payload, ...state.qualifications] };

                case "UPDATE_QUALIFICATION":
                        return {
                                qualifications: state.qualifications.map((qualification) =>
                                        qualification._id === action.payload._id ? action.payload : qualification)
                        };

                case "DELETE_QUALIFICATION":
                        return { qualifications: state.qualifications.filter((qualification) =>  qualification._id !== action.payload) };

                case "DELETE_QUALIFICATIONS":
                        return {
                                qualifications: state.qualifications.filter(
                                        (qualification) => !action.payload.includes(qualification._id))
                        };
                
                default:
                        return state;
        }
}

export function QualificationsContextProvider({ children }) {
        const [state, dispatch] = useReducer(QualificationsReducer, { qualifications: qualifications});

        return (
                <QualificationsContext.Provider value={{ state, dispatch }}>
                        { children }
                </QualificationsContext.Provider>
        );
}