import { createContext, useReducer } from "react";
import profile from "../Mock/trialProfile";

export const ProfileContext = createContext();

const profileReducer = (state, action) => {
        switch (action.type) {
                case "SET_LOADING":
                        return { ...state, loading: action.payload ?? true, error: null };

                case "SET_ERROR":
                        return { ...state, loading: false, error: action.payload };

                case "CLEAR_ERROR":
                        return { ...state, error: null };

                case "SET_PROFILE":
                        return { ...state, profile: action.payload, loading: false, error: null };

                case "UPDATE_PROFILE":
                        return { ...state, profile: { ...state.profile, ...action.payload }, loading: false, error: null };

                case "ADD_SOCIAL_LINKS":
                        return {
                                ...state,
                                profile: {
                                        ...state.profile,
                                        socialLinks: [...state.profile.socialLinks, ...(Array.isArray(action.payload) ? action.payload : [action.payload])],
                                },
                                loading: false,
                                error: null
                        };

                case "UPDATE_SOCIAL_LINK":
                        return {
                                ...state,
                                profile: {
                                        ...state.profile,
                                        socialLinks: state.profile.socialLinks.map((link) =>
                                                link._id === action.payload._id ? { ...link, ...action.payload } : link
                                        ),
                                },
                                loading: false,
                                error: null
                        };

                case "DELETE_SOCIAL_LINK":
                        return {
                                ...state,
                                profile: {
                                        ...state.profile,
                                        socialLinks: state.profile.socialLinks.filter(
                                                (link) => link._id !== action.payload
                                        ),
                                },
                                loading: false,
                                error: null
                        };

                case "UPDATE_DESCRIPTION":
                        return {
                                ...state,
                                profile: {
                                        ...state.profile,
                                        description: { ...state.profile.description, ...action.payload },
                                },
                                loading: false,
                                error: null
                        };

                default:
                        return state;
        }
};

export function ProfileContextProvider({ children }) {
        const [state, dispatch] = useReducer(profileReducer, {
                profile: profile,
                loading: false,
                error: null
        });

        return (
                <ProfileContext.Provider value={{ state, dispatch }}>
                        {children}
                </ProfileContext.Provider>
        );
}