import { useContext } from "react";
import { ProfileContext } from "../Contexts/ProfileContext";

const useProfileReducer = () => {
        const { state, dispatch } = useContext(ProfileContext);
        const { profile } = state;

        const setProfile = (profile) => {
                dispatch({ type: "SET_PROFILE", payload: profile });
        };

        const updateProfile = (updates) => {
                dispatch({ type: "UPDATE_PROFILE", payload: updates });
        };

        const updateDescription = (descriptionUpdates) => {
                dispatch({ type: "UPDATE_DESCRIPTION", payload: descriptionUpdates });
        };

        const addSocialLinks = (linksArray) => {
                dispatch({ type: "ADD_SOCIAL_LINKS", payload: linksArray });
        };

        const updateSocialLink = (link) => {
                dispatch({ type: "UPDATE_SOCIAL_LINK", payload: link });
        };

        const deleteSocialLink = (linkId) => {
                dispatch({ type: "DELETE_SOCIAL_LINK", payload: linkId });
        };

        return {
                profile,
                setProfile,
                updateProfile,
                updateDescription,
                addSocialLinks,
                updateSocialLink,
                deleteSocialLink,
        };
};

export default useProfileReducer;
