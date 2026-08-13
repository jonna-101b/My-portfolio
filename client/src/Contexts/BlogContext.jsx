import { createContext, useReducer } from 'react';
import blogs from '../Mock/trialBlogs';


const BlogContext = createContext();

const blogReducer = (state, action) => {
        switch(action.type) {
                case "SET_LOADING":
                        return { ...state, loading: action.payload ?? true, error: null };

                case "SET_ERROR":
                        return { ...state, loading: false, error: action.payload };

                case "CLEAR_ERROR":
                        return { ...state, error: null };

                case "SET_BLOGS":
                        return { ...state, blogs: action.payload, loading: false, error: null };

                case "CREATE_BLOG":
                        return { ...state, blogs: [action.payload, ...state.blogs], loading: false, error: null };

                case "UPDATE_BLOG":
                        return {
                                ...state,
                                blogs: state.blogs.map((blog) =>
                                        blog._id === action.payload._id ? action.payload : blog),
                                loading: false,
                                error: null
                        };

                case "DELETE_BLOG":
                        return {
                                ...state,
                                blogs: state.blogs.filter((blog) => blog._id !== action.payload),
                                loading: false,
                                error: null
                        };

                case "DELETE_BLOGS":
                        return {
                                ...state,
                                blogs: state.blogs.filter(
                                        (blog) => !action.payload.includes(blog._id)),
                                loading: false,
                                error: null
                        };

                default:
                        return state;
        }
}

function BlogContextProvider({ children }) {
        const [state, dispatch] = useReducer(blogReducer, {
                blogs,
                loading: false,
                error: null
        });

        return (
                <BlogContext.Provider value={{ state, dispatch }}>
                        { children }
                </BlogContext.Provider>
        );
}

export { BlogContext, BlogContextProvider };