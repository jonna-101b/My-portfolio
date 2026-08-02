import { createContext, useReducer } from 'react';
import blogs from '../Mock/trialBlogs';


const BlogContext = createContext();

const blogReducer = (state, action) => {
        switch(action.type) {
                case "SET_BLOGS":
                        return { blogs: action.payload };

                case "CREATE_BLOG":
                        return { blogs: [action.payload, ...state.blogs] };

                case "UPDATE_BLOG":
                        return {
                                blogs: state.blogs.map((blog) =>
                                        blog._id === action.payload._id ? action.payload : blog)
                        };

                case "DELETE_BLOG":
                        return {
                                blogs: state.blogs.filter((blog) => blog._id !== action.payload)
                        };

                case "DELETE_BLOGS":
                        return {
                                blogs: state.blogs.filter(
                                        (blog) => !action.payload.includes(blog._id))
                        };

                default:
                        return state;
        }
}

function BlogContextProvider({ children }) {
        const [state, dispatch] = useReducer(blogReducer, { blogs });

        return (
                <BlogContext.Provider value={{ state, dispatch }}>
                        { children }
                </BlogContext.Provider>
        );
}

export { BlogContext, BlogContextProvider };