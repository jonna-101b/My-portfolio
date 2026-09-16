import { useContext, useCallback } from "react";
import { QualificationsContext } from "../Contexts/QualificationsContext";
import { fetchQualifications, createQualification as createQualificationApi, updateQualification as updateQualificationApi, deleteQualification as deleteQualificationApi } from "../api/QualificationsApi";
import { APIError } from "../api/APIError";

const useQualificationsReducer = () => {
        const { state, dispatch } = useContext(QualificationsContext);

        const setQualifications = useCallback(async () => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await fetchQualifications();
                        dispatch({ type: "SET_QUALIFICATIONS", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to fetch qualifications");
                        console.error("Error setting qualifications:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        return null;
                }
        }, [dispatch]);

        const createQualification = useCallback(async (newQualification) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await createQualificationApi(newQualification);
                        dispatch({ type: "CREATE_QUALIFICATION", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to create qualification");
                        console.error("Error creating qualification:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const updateQualification = useCallback(async (editedQualification) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof editedQualification === "object" ? editedQualification._id : editedQualification;
                        const res = await updateQualificationApi(id, editedQualification);
                        dispatch({ type: "UPDATE_QUALIFICATION", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to update qualification");
                        console.error("Error updating qualification:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteQualification = useCallback(async (qualificationId) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof qualificationId === "object" ? qualificationId._id : qualificationId;
                        const res = await deleteQualificationApi(id);
                        dispatch({ type: "DELETE_QUALIFICATION", payload: id });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to delete qualification");
                        console.error("Error deleting qualification:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteQualifications = useCallback((qualificationIds) => {
                dispatch({ type: "DELETE_QUALIFICATIONS", payload: qualificationIds });
        }, [dispatch]);

        const clearError = useCallback(() => {
                dispatch({ type: "CLEAR_ERROR" });
        }, [dispatch]);

        return {
                state,
                qualifications: state.qualifications,
                loading: state.loading,
                error: state.error,
                setQualifications,
                createQualification,
                updateQualification,
                deleteQualification,
                deleteQualifications,
                clearError
        };
};

export default useQualificationsReducer;