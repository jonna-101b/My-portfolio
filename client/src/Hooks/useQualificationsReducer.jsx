import { useContext } from "react";
import { QualificationsContext } from "../Contexts/QualificationsContext";
import { fetchQualifications, createQualification as createQualificationApi, updateQualification as updateQualificationApi, deleteQualification as deleteQualificationApi } from "../api/QualificationsApi";

const useQualificationsReducer = () => {
        const { state, dispatch} = useContext(QualificationsContext);

        const setQualifications = async () => {
                try {
                        const res = await fetchQualifications();
                        dispatch({ type: "SET_QUALIFICATIONS", payload: res });
                } catch (error) {
                        console.error("Error setting qualifications:", error);
                }
        };

        const createQualification = async (newQualification) => {
                try {
                        const res = await createQualificationApi(newQualification);
                        dispatch({ type: "CREATE_QUALIFICATION", payload: res });
                } catch (error) {
                        console.error("Error creating qualification:", error);
                }
        };

        const updateQualification = async (editedQualification) => {
                try {
                        const res = await updateQualificationApi(editedQualification._id, editedQualification);
                        dispatch({ type: "UPDATE_QUALIFICATION", payload: res });
                } catch (error) {
                        console.error("Error updating qualification:", error);
                }
        };

        const deleteQualification = async (qualificationId) => {
                try {
                        const res = await deleteQualificationApi(qualificationId._id);
                        dispatch({ type: "DELETE_QUALIFICATION", payload: res });
                } catch (error) {
                        console.error("Error deleting qualification:", error);
                }
        };

        const deleteQualifications = (qualificationIds) => {
                dispatch({ type: "DELETE_QUALIFICATIONS", payload: qualificationIds });
        };

        return {
                state,
                setQualifications,
                createQualification,
                updateQualification,
                deleteQualification,
                deleteQualifications
        };
}

export default useQualificationsReducer;