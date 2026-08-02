import { useState, createContext } from 'react';
import useBlogReducer from '../../../../Hooks/useBlogReducer';



export const BlogDisplayContext = createContext();

export function BlogDisplayContextProvider({ children }) {
        const { state } = useBlogReducer();
        const [ blogs, setBlogs ] = useState(state.blogs);

        return (
                <BlogDisplayContext.Provider value={{ blogs, setBlogs }}>
                        { children }
                </BlogDisplayContext.Provider>
        );
}
