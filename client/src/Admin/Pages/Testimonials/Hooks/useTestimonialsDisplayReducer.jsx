import { useContext, useEffect, useState } from "react";
import { TestimonialsDisplayContext } from "../Contexts/TestimonialsDisplayContext";
import useTestimonialsReducer from "../../../../Hooks/useTestimonialsReducer";


const sortTestimonials = (a, b, sortBy, order) => {
        switch (sortBy) {
                case "createdAt":
                        return order === "asc"
                        ? new Date(a.createdAt) - new Date(b.createdAt)
                        : new Date(b.createdAt) - new Date(a.createdAt);
                        
                case "updatedAt":
                        return order === "asc"
                        ? new Date(a.updatedAt) - new Date(b.updatedAt)
                        : new Date(b.updatedAt) - new Date(a.updatedAt);

                case "name":
                        return order === "asc"
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);

                default:
                        return 0;
        }
};

function useTestimonialsDisplayReducer() {
        const { state } = useTestimonialsReducer();
        const { testimonials, setTestimonials } = useContext(TestimonialsDisplayContext);

        const [sortMethod, setSortMethod] = useState({ sortBy: "createdAt", order: "desc"});
        const [searchQuery, setSearchQuery] = useState("");

        const computeTestimonials = () => {
                let result = [...state.testimonials];

                if (searchQuery.trim() !== "") {
                        const q = searchQuery.toLowerCase();
                        result = result.filter(p => p.name.toLowerCase().includes(q));
                }

                result.sort((a, b) => sortTestimonials(a, b, sortMethod.sortBy, sortMethod.order));

                return result;
        };

        useEffect(() => {
                setTestimonials(computeTestimonials());
        }, [state.testimonials, sortMethod, searchQuery]);

        const searchComponent = query => setSearchQuery(query);
        
        const sortComponent = (sortBy, order) =>
                setSortMethod(prev => ({
                        sortBy: sortBy || prev.sortBy,
                        order: order || prev.order
        }));

        return {
                testimonials,
                filters: null,
                filterTags: null,
                sortMethod,
                addFilter: null,
                cancelFilter: null,
                searchComponent,
                sortComponent
        };
}


export default useTestimonialsDisplayReducer;