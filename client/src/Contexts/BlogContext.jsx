import { createContext, useReducer, useEffect } from 'react';
import { fetchBlogs } from '../api/BlogApi';
import { APIError } from '../api/APIError';
import blogs from '../mock/trialBlogs';

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
			return { 
				...state, 
				blogs: Array.isArray(action.payload) ? action.payload : (action.payload ? [action.payload] : []), 
				loading: false, 
				error: null 
			};

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
};

function BlogContextProvider({ children }) {
	const [state, dispatch] = useReducer(blogReducer, {
		blogs: [],
		loading: true,
		error: null
	});

	useEffect(() => {
		let isMounted = true;

		const loadBlogs = async () => {
			try {
				dispatch({ type: "SET_LOADING", payload: true });
				const res = await fetchBlogs();
				if (isMounted && res) {
					dispatch({ type: "SET_BLOGS", payload: res });
				}
			} catch (error) {
				if (isMounted) {
					const apiError = APIError.fromAxiosError(error, "Failed to fetch blogs");
					console.error("Error fetching blogs on mount:", apiError);
					dispatch({ type: "SET_ERROR", payload: apiError });
				}
			}
		};

		loadBlogs();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<BlogContext.Provider value={{ state, dispatch }}>
			{ children }
		</BlogContext.Provider>
	);
}

export { BlogContext, BlogContextProvider };