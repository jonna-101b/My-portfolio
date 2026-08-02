import { useContext } from "react";
import { BlogContext } from "../Contexts/BlogContext";

const useBlogReducer = () => {
        const { state, dispatch } = useContext(BlogContext);

        const setBlogs = (fetchedBlogs) => {
                dispatch({ type: "SET_BLOGS", payload: fetchedBlogs });
        };

        const createBlog = (newBlog) => {
                dispatch({ type: "CREATE_BLOG", payload: newBlog });
        };

        const updateBlog = (editedBlog) => {
                dispatch({ type: "UPDATE_BLOG", payload: editedBlog });
        };

        const deleteBlog = (blogId) => {
                dispatch({ type: "DELETE_BLOG", payload: blogId });
        };

        const deleteBlogs = (blogIds) => {
                dispatch({ type: "DELETE_BLOGS", payload: blogIds });
        };

        return {
                state,
                setBlogs,
                createBlog,
                updateBlog,
                deleteBlog,
                deleteBlogs
        };
}

export default useBlogReducer;