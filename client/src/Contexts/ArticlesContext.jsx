import { createContext, useReducer } from 'react';
import articles from '../Mock/trialArticles';


export const ArticlesContext = createContext();

const articlesReducer = (state, action) => {
        switch(action.type) {
                case "SET_ARTICLES":
                        return { articles: action.payload};

                case "CREATE_ARTICLE":
                        return { articles: [action.payload, ...state.articles] };

                case "UPDATE_ARTICLE":
                        return {
                                articles: state.articles.map((article) =>
                                        article._id === action.payload._id ? action.payload : article)
                        };

                case "DELETE_ARTICLE":
                        return { articles: state.articles.filter((article) =>  article._id !== action.payload) };

                case "DELETE_ARTICLES":
                        return {
                                articles: state.articles.filter(
                                        (article) => !action.payload.includes(article._id))
                        };

                default:
                        return state;
        }
}

export function ArticlesContextProvider({ children }) {
        const [state, dispatch] = useReducer(articlesReducer, { articles: articles});

        return (
                <ArticlesContext.Provider value={{ state, dispatch }}>
                        { children }
                </ArticlesContext.Provider>
        );
}