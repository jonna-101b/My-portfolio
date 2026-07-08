import { useState, createContext } from 'react';
import useArticlesReducer from '../../../../Hooks/useArticlesReducer';



export const ArticlesDisplayContext = createContext();

export function ArticlesDisplayContextProvider({ children }) {
        const { state } = useArticlesReducer();
        const [ articles, setArticles ] = useState(state.articles);

        return (
                <ArticlesDisplayContext.Provider value={{ articles, setArticles }}>
                        { children }
                </ArticlesDisplayContext.Provider>
        );
}