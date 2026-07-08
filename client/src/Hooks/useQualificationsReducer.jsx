import { useContext } from "react";
import { QualificationsContext } from "../Contexts/QualificationsContext";

const useQualificationsReducer = () => {
        const { state, dispatch} = useContext(QualificationsContext);

        const setQualifications = (fetchedQualifications) => {
                dispatch({ type: "SET_QUALIFICATIONS", payload: fetchedQualifications });
        };

        const createQualification = (newQualification) => {
                dispatch({ type: "CREATE_QUALIFICATION", payload: newQualification });
        };

        const updateQualification = (editedQualification) => {
                dispatch({ type: "UPDATE_QUALIFICATION", payload: editedQualification });
        };

        const deleteQualification = (qualificationId) => {
                dispatch({ type: "DELETE_QUALIFICATION", payload: qualificationId });
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