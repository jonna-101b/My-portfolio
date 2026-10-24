import { useContext, useCallback } from "react";
import { ProfileContext } from "../Contexts/ProfileContext";
import {
        fetchProfile,
        updateProfile as updateProfileApi,
        updateProfileDescription as updateProfileDescriptionApi,
        createProfileSocialLink as createProfileSocialLinkApi,
        updateProfileSocialLink as updateProfileSocialLinkApi,
        deleteProfileSocialLink as deleteProfileSocialLinkApi,
        updateLogoVisibility as updateLogoVisibilityApi
} from "../api/ProfileApi";
import { APIError } from "../api/APIError";

const useProfileReducer = () => {
        const { state, dispatch } = useContext(ProfileContext);
        const { profile } = state;

        const setProfile = useCallback(async (profileData) => {
                if (profileData) {
                        dispatch({ type: "SET_PROFILE", payload: profileData });
                        return profileData;
                }
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await fetchProfile();
                        dispatch({ type: "SET_PROFILE", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to fetch profile");
                        console.error("Error setting profile:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        return null;
                }
        }, [dispatch]);

        const updateProfile = useCallback(async (updates) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await updateProfileApi(updates);
                        dispatch({ type: "UPDATE_PROFILE", payload: res || updates });
                        return res || updates;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to update profile");
                        console.error("Error updating profile:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const updateDescription = useCallback(async (descriptionUpdates) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await updateProfileDescriptionApi(descriptionUpdates);
                        const newDescription = res?.description || descriptionUpdates;
                        dispatch({ type: "UPDATE_DESCRIPTION", payload: newDescription });
                        return res || descriptionUpdates;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to update profile description");
                        console.error("Error updating profile description:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const addSocialLinks = useCallback(async (linksArray) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const payload = Array.isArray(linksArray) ? linksArray : [linksArray];
                        const res = await createProfileSocialLinkApi(payload);
                        if (res?.socialLinks) {
                                dispatch({ type: "UPDATE_PROFILE", payload: { socialLinks: res.socialLinks } });
                        } else {
                                dispatch({ type: "ADD_SOCIAL_LINKS", payload });
                        }
                        return res || payload;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to add social link");
                        console.error("Error adding social links:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const updateSocialLink = useCallback(async (link) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await updateProfileSocialLinkApi(link._id, link);
                        dispatch({ type: "UPDATE_SOCIAL_LINK", payload: res || link });
                        return res || link;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to update social link");
                        console.error("Error updating social link:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteSocialLink = useCallback(async (linkId) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof linkId === "object" ? linkId._id : linkId;
                        const res = await deleteProfileSocialLinkApi(id);
                        dispatch({ type: "DELETE_SOCIAL_LINK", payload: id });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to delete social link");
                        console.error("Error deleting social link:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const updateLogoVisibility = useCallback(async (logoVisible) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const isVisible = typeof logoVisible === 'object' && logoVisible !== null && 'logoVisible' in logoVisible
                                ? Boolean(logoVisible.logoVisible)
                                : Boolean(logoVisible);
                        const res = await updateLogoVisibilityApi(isVisible);
                        const updatedVal = res?.logoVisible !== undefined ? res.logoVisible : isVisible;
                        dispatch({ type: "UPDATE_LOGO_VISIBILITY", payload: updatedVal });
                        return res || { logoVisible: updatedVal };
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to update logo visibility");
                        console.error("Error updating logo visibility:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const clearError = useCallback(() => {
                dispatch({ type: "CLEAR_ERROR" });
        }, [dispatch]);

        return {
                profile,
                state,
                loading: state.loading,
                error: state.error,
                setProfile,
                updateProfile,
                updateDescription,
                addSocialLinks,
                updateSocialLink,
                deleteSocialLink,
                updateLogoVisibility,
                clearError
        };
};

export default useProfileReducer;

