import { useContext, useEffect, useState } from "react";
import { ArticlesDisplayContext } from "../Contexts/ArticlesDisplayContext";
import useArticlesReducer from "../../../../Hooks/useArticlesReducer";


const hasTags = (articleTags, tags ) => {
        const remaining = new Set(tags);

        for (let tag of articleTags) {
                remaining.delete(tag);
                if (!remaining.size) return true;
        }

        return remaining.size === 0;
};

const sortArticles = (a, b, sortBy, order) => {
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

function findFilters(articles) {
        let filters = new Set();

        for (let Article of articles) {
                for (const tag of Article.tags) {
                        filters.add(tag);
                }
        }

        return [...filters];
}

function useArticlesDisplayReducer() {
        const { state } = useArticlesReducer();
        const { articles, setArticles } = useContext(ArticlesDisplayContext);

        const [sortMethod, setSortMethod] = useState({ sortBy: "createdAt", order: "desc"});
        const [searchQuery, setSearchQuery] = useState("");
        const [filterTags, setFilterTags] = useState(new Set());

        const [ filters, setFilters ] = useState(findFilters(state.articles));

        const computeArticles = () => {
                let result = [...state.articles];

                if (filterTags.size > 0) result = result.filter(p => hasTags(p.tags, filterTags));
          
                if (searchQuery.trim() !== "") {
                        const q = searchQuery.toLowerCase();
                        result = result.filter(p => p.title.toLowerCase().includes(q));
                }

                result.sort((a, b) => sortArticles(a, b, sortMethod.sortBy, sortMethod.order));

                return result;
        };

        useEffect(() => {
                setArticles(computeArticles());
        }, [state.articles, sortMethod, searchQuery, filterTags]);

        useEffect(() => {
                setFilters(findFilters(state.articles));
        }, [state.articles]);

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
                articles,
                filters,
                filterTags,
                sortMethod,
                searchComponent,
                addFilter,
                cancelFilter,
                sortComponent
        };
}


export default useArticlesDisplayReducer;