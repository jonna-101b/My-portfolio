import { createContext, useReducer } from "react";
import profile from "../Mock/trialProfile";

export const ProfileContext = createContext();

const profileReducer = (state, action) => {
        switch (action.type) {
                case "SET_PROFILE":
                        return { profile: action.payload };

                case "UPDATE_PROFILE":
                        return { profile: { ...state.profile, ...action.payload } };

                case "ADD_SOCIAL_LINKS":
                        return {
                                profile: {
                                ...state.profile,
                                socialLinks: [...state.profile.socialLinks, ...action.payload],
                                },
                        };

                case "UPDATE_SOCIAL_LINK":
                        return {
                                profile: {
                                ...state.profile,
                                socialLinks: state.profile.socialLinks.map((link) =>
                                        link._id === action.payload._id ? { ...link, ...action.payload } : link
                                ),
                                },
                        };

                case "DELETE_SOCIAL_LINK":
                        return {
                                profile: {
                                ...state.profile,
                                socialLinks: state.profile.socialLinks.filter(
                                        (link) => link._id !== action.payload
                                ),
                                },
                        };

                case "UPDATE_DESCRIPTION":
                        return {
                                profile: {
                                ...state.profile,
                                description: { ...state.profile.description, ...action.payload },
                                },
                        };

                default:
                        return state;
        }
};

export function ProfileContextProvider({ children }) {
        const [state, dispatch] = useReducer(profileReducer, { profile: profile });

        return (
                <ProfileContext.Provider value={{ state, dispatch }}>
                        {children}
                </ProfileContext.Provider>
        );
}