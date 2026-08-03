import { useContext } from "react";
import { BlogContext } from "../Contexts/BlogContext";
import { fetchBlogs, createBlog as createBlogApi, updateBlog as updateBlogApi, deleteBlog as deleteBlogApi } from "../api/BlogApi";

const useBlogReducer = () => {
        const { state, dispatch } = useContext(BlogContext);

        const setBlogs = async () => {
                try {
                        const res = await fetchBlogs();
                        dispatch({ type: "SET_BLOGS", payload: res });
                } catch (error) {
                        console.error("Error setting blogs:", error);
                }
        };

        const createBlog = async (newBlog) => {
                try {
                        const res = await createBlogApi(newBlog);
                        dispatch({ type: "CREATE_BLOG", payload: res });
                } catch (error) {
                        console.error("Error creating blog:", error);
                }
        };

        const updateBlog = async (editedBlog) => {
                try {
                        const res = await updateBlogApi(editedBlog._id, editedBlog);
                        dispatch({ type: "UPDATE_BLOG", payload: res });
                } catch (error) {
                        console.error("Error updating blog:", error);
                }
        };

        const deleteBlog = async (blogId) => {
                try {
                        const res = await deleteBlogApi(blogId._id);
                        dispatch({ type: "DELETE_BLOG", payload: res });
                } catch (error) {
                        console.error("Error deleting blog:", error);
                }
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