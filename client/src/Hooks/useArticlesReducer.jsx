import { useContext } from "react";
import { ArticlesContext } from "../Contexts/ArticlesContext";

const useArticlesReducer = () => {
        const { state, dispatch} = useContext(ArticlesContext);

        const setArticles = (fetchedArticles) => {
                dispatch({ type: "SET_ARTICLES", payload: fetchedArticles });
        };

        const createArticle = (newArticle) => {
                dispatch({ type: "CREATE_ARTICLE", payload: newArticle });
        };

        const updateArticle = (editedArticle) => {
                dispatch({ type: "UPDATE_ARTICLE", payload: editedArticle });
        };

        const deleteArticle = (articleId) => {
                dispatch({ type: "DELETE_ARTICLE", payload: articleId });
        };

        const deleteArticles = (articleIds) => {
                dispatch({ type: "DELETE_ARTICLES", payload: articleIds });
        };

        return {
                state,
                setArticles,
                createArticle,
                updateArticle,
                deleteArticle,
                deleteArticles
        };
}

export default useArticlesReducer;