import { useContext, useCallback } from "react";
import { BlogContext } from "../Contexts/BlogContext";
import { fetchBlogs, createBlog as createBlogApi, updateBlog as updateBlogApi, deleteBlog as deleteBlogApi } from "../api/BlogApi";
import { APIError } from "../api/APIError";

const useBlogReducer = () => {
        const { state, dispatch } = useContext(BlogContext);

        const setBlogs = useCallback(async () => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await fetchBlogs();
                        dispatch({ type: "SET_BLOGS", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to fetch blogs");
                        console.error("Error setting blogs:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        return null;
                }
        }, [dispatch]);

        const createBlog = useCallback(async (newBlog) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const res = await createBlogApi(newBlog);
                        dispatch({ type: "CREATE_BLOG", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to create blog");
                        console.error("Error creating blog:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const updateBlog = useCallback(async (editedBlog) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof editedBlog === "object" ? editedBlog._id : editedBlog;
                        const res = await updateBlogApi(id, editedBlog);
                        dispatch({ type: "UPDATE_BLOG", payload: res });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to update blog");
                        console.error("Error updating blog:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteBlog = useCallback(async (blogId) => {
                try {
                        dispatch({ type: "SET_LOADING", payload: true });
                        const id = typeof blogId === "object" ? blogId._id : blogId;
                        const res = await deleteBlogApi(id);
                        dispatch({ type: "DELETE_BLOG", payload: id });
                        return res;
                } catch (error) {
                        const apiError = APIError.fromAxiosError(error, "Failed to delete blog");
                        console.error("Error deleting blog:", apiError);
                        dispatch({ type: "SET_ERROR", payload: apiError });
                        throw apiError;
                }
        }, [dispatch]);

        const deleteBlogs = useCallback((blogIds) => {
                dispatch({ type: "DELETE_BLOGS", payload: blogIds });
        }, [dispatch]);

        const clearError = useCallback(() => {
                dispatch({ type: "CLEAR_ERROR" });
        }, [dispatch]);

        return {
                state,
                blogs: state.blogs,
                loading: state.loading,
                error: state.error,
                setBlogs,
                createBlog,
                updateBlog,
                deleteBlog,
                deleteBlogs,
                clearError
        };
};

export default useBlogReducer;