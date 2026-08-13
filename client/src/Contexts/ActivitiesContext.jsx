import { createContext, useReducer } from 'react';
import activities from '../Mock/trialActivities';


export const ActivitiesContext = createContext();

const activitiesReducer = (state, action) => {
        switch(action.type) {
                case "SET_LOADING":
                        return { ...state, loading: action.payload ?? true, error: null };

                case "SET_ERROR":
                        return { ...state, loading: false, error: action.payload };

                case "CLEAR_ERROR":
                        return { ...state, error: null };

                case "SET_ACTIVITIES":
                        return { ...state, activities: action.payload, loading: false, error: null };

                case "CREATE_ACTIVITY":
                        return { ...state, activities: [action.payload, ...state.activities], loading: false, error: null };

                case "DELETE_ACTIVITY":
                        return {
                                ...state,
                                activities: state.activities.filter((activity) => activity._id !== action.payload),
                                loading: false,
                                error: null
                        };

                case "DELETE_ACTIVITIES":
                        return {
                                ...state,
                                activities: state.activities.filter(
                                        (activity) => !action.payload.includes(activity._id)),
                                loading: false,
                                error: null
                        };

                default:
                        return state;
        }
}

export function ActivitiesContextProvider({ children }) {
        const [state, dispatch] = useReducer(activitiesReducer, {
                activities: activities,
                loading: false,
                error: null
        });

        return (
                <ActivitiesContext.Provider value={{ state, dispatch }}>
                        { children }
                </ActivitiesContext.Provider>
        );
}