import { useContext, useEffect, useState } from "react";
import { ProjectsDisplayContext } from "../Contexts/ProjectsDisplayContext";
import useProjectsReducer from "../../../../Hooks/useProjectsReducer";


const hasTags = (domains, tags ) => {
        const remaining = new Set(tags);

        for (let domain of domains) {
                remaining.delete(domain);
                if (!remaining.size) return true;
        }

        return remaining.size === 0;
};

const sortProjects = (a, b, sortBy, order) => {
        switch (sortBy) {
                case "createdAt":
                        return order === "asc"
                        ? new Date(a.createdAt) - new Date(b.createdAt)
                        : new Date(b.createdAt) - new Date(a.createdAt);

                case "updatedAt":
                        return order === "asc"
                        ? new Date(a.updatedAt) - new Date(b.updatedAt)
                        : new Date(b.updatedAt) - new Date(a.updatedAt);

                case "title":
                        return order === "asc"
                        ? a.title.localeCompare(b.title)
                        : b.title.localeCompare(a.title);

                default:
                        return 0;
        }
};

function findFilters(projects) {
        let filters = new Set();

        for (let project of projects) {
                for (const domain of project.domains) {
                        filters.add(domain);
                }
        }

        return [...filters];
}

function useProjectsDisplayReducer() {
        const { state } = useProjectsReducer();
        const { projects, setProjects } = useContext(ProjectsDisplayContext);

        const [sortMethod, setSortMethod] = useState({ sortBy: "createdAt", order: "desc"});
        const [searchQuery, setSearchQuery] = useState("");
        const [filterTags, setFilterTags] = useState(new Set());

        const [ filters, setFilters ] = useState(findFilters(state.projects));

        const computeProjects = () => {
                let result = [...state.projects];

                if (filterTags.size > 0) result = result.filter(p => hasTags(p.domains, filterTags));
          
                if (searchQuery.trim() !== "") {
                        const q = searchQuery.toLowerCase();
                        result = result.filter(p => p.title.toLowerCase().includes(q));
                }

                result.sort((a, b) => sortProjects(a, b, sortMethod.sortBy, sortMethod.order));

                return result;
        };

        useEffect(() => {
                setProjects(computeProjects());
        }, [state.projects, sortMethod, searchQuery, filterTags]);

        useEffect(() => {
                setFilters(findFilters(state.projects));
        }, [state.projects]);

        const searchComponent = query => setSearchQuery(query);

        const addFilter = tag => setFilterTags(prev => new Set(prev).add(tag) );

        const cancelFilter = tag => setFilterTags(prev => {
                const newSet = new Set(prev);
                newSet.delete(tag);
                return newSet;
        });
        
        const sortComponent = (sortBy, order) =>
        setSortMethod(prev => ({
                sortBy: sortBy || prev.sortBy,
                order: order || prev.order
        }));

        return {
                projects,
                filters,
                filterTags,
                sortMethod,
                searchComponent,
                addFilter,
                cancelFilter,
                sortComponent
        };
}


export default useProjectsDisplayReducer;