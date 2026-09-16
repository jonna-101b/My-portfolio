import { useContext, useEffect, useState } from "react";
import { BlogDisplayContext } from "../Contexts/BlogDisplayContext";
import useBlogReducer from "../../../../Hooks/useBlogReducer";


const hasTags = (blogsTags, tags ) => {
        const remaining = new Set(tags);

        for (let tag of blogsTags) {
                remaining.delete(tag);
                if (!remaining.size) return true;
        }

        return remaining.size === 0;
};

const sortBlogs = (a, b, sortBy, order) => {
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

function findFilters(blogs) {
        let filters = new Set();

        for (let Blogs of blogs) {
                for (const tag of Blogs.tags) {
                        filters.add(tag);
                }
        }

        return [...filters];
}

function useBlogDisplayReducer() {
        const { state } = useBlogReducer();
        const { blogs, setBlogs } = useContext(BlogDisplayContext);

        const [sortMethod, setSortMethod] = useState({ sortBy: "createdAt", order: "desc"});
        const [searchQuery, setSearchQuery] = useState("");
        const [filterTags, setFilterTags] = useState(new Set());

        const [ filters, setFilters ] = useState(findFilters(state.blogs));

        const computeBlogs = () => {
                let result = [...state.blogs];

                if (filterTags.size > 0) result = result.filter(p => hasTags(p.tags, filterTags));
          
                if (searchQuery.trim() !== "") {
                        const q = searchQuery.toLowerCase();
                        result = result.filter(p => p.title.toLowerCase().includes(q));
                }

                result.sort((a, b) => sortBlogs(a, b, sortMethod.sortBy, sortMethod.order));

                return result;
        };

        useEffect(() => {
                setBlogs(computeBlogs());
        }, [state.blogs, sortMethod, searchQuery, filterTags]);

        useEffect(() => {
                setFilters(findFilters(state.blogs));
        }, [state.blogs]);

        const searchComponent = query => setSearchQuery(query);

        const addFilter = tag => setFilterTags(prev => new Set(prev).add(tag));

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
                blogs,
                loading: state?.loading,
                filters,
                filterTags,
                sortMethod,
                searchComponent,
                addFilter,
                cancelFilter,
                sortComponent
        };
}


export default useBlogDisplayReducer;