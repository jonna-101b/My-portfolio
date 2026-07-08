import { useContext, useEffect, useState } from "react";
import { QualificationsDisplayContext } from "../Contexts/QualificationsDisplayContext";
import useQualificationsReducer from "../../../../Hooks/useQualificationsReducer";


const sortQualifications = (a, b, sortBy, order) => {
        switch (sortBy) {
                case "createdAt":
                        return order === "asc"
                        ? new Date(a.createdAt) - new Date(b.createdAt)
                        : new Date(b.createdAt) - new Date(a.createdAt);
                        
                case "updatedAt":
                        return order === "asc"
                        ? new Date(a.updatedAt) - new Date(b.updatedAt)
                        : new Date(b.updatedAt) - new Date(a.updatedAt);

                case "discipline":
                        return order === "asc"
                        ? a.discipline.localeCompare(b.discipline)
                        : b.discipline.localeCompare(a.discipline);

                default:
                        return 0;
        }
};

function useQualificationsDisplayReducer() {
        const { state } = useQualificationsReducer();
        const { qualifications, setQualifications } = useContext(QualificationsDisplayContext);

        const [sortMethod, setSortMethod] = useState({ sortBy: "createdAt", order: "desc"});
        const [searchQuery, setSearchQuery] = useState("");

        const computeQualifications = () => {
                let result = [...state.qualifications];

                if (searchQuery.trim() !== "") {
                        const q = searchQuery.toLowerCase();
                        result = result.filter(p => p.discipline.toLowerCase().includes(q));
                }

                result.sort((a, b) => sortQualifications(a, b, sortMethod.sortBy, sortMethod.order));

                return result;
        };

        useEffect(() => {
                setQualifications(computeQualifications());
        }, [state.qualifications, sortMethod, searchQuery]);

        const searchComponent = query => setSearchQuery(query);
        
        const sortComponent = (sortBy, order) =>
                setSortMethod(prev => ({
                        sortBy: sortBy || prev.sortBy,
                        order: order || prev.order
        }));

        return {
                qualifications,
                filters: null,
                filterTags: null,
                sortMethod,
                addFilter: null,
                cancelFilter: null,
                searchComponent,
                sortComponent
        };
}


export default useQualificationsDisplayReducer;