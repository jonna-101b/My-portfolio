import { createContext, useReducer } from 'react';
import activities from '../Mock/trialActivities';


export const ActivitiesContext = createContext();

const activitiesReducer = (state, action) => {
        switch(action.type) {
                case "SET_ACTIVITIES":
                        return { activities: action.payload};

                case "CREATE_ACTIVITY":
                        return { activities: [action.payload, ...state.activities] };

                case "DELETE_ACTIVITY":
                        return { activities: state.activities.filter((activity) =>  activity._id !== action.payload) };

                case "DELETE_ACTIVITIES":
                        return {
                                activities: state.activities.filter(
                                        (activity) => !action.payload.includes(activity._id))
                        };

                default:
                        return state;
        }
}

export function ActivitiesContextProvider({ children }) {
        const [state, dispatch] = useReducer(activitiesReducer, { activities: activities});

        return (
                <ActivitiesContext.Provider value={{ state, dispatch }}>
                        { children }
                </ActivitiesContext.Provider>
        );
}