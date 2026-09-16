import { createContext, useReducer, useEffect } from "react";
import { fetchProfile } from "../api/ProfileApi";
import { APIError } from "../api/APIError";
import profile from '../Mock/trialProfile';

export const ProfileContext = createContext();

const profileReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload ?? true, error: null };

		case "SET_ERROR":
			return { ...state, loading: false, error: action.payload };

		case "CLEAR_ERROR":
			return { ...state, error: null };

		case "SET_PROFILE":
			return { ...state, profile: action.payload ?? null, loading: false, error: null };

		case "UPDATE_PROFILE":
			return { ...state, profile: { ...state.profile, ...action.payload }, loading: false, error: null };

		case "ADD_SOCIAL_LINKS":
			return {
				...state,
				profile: {
					...state.profile,
					socialLinks: [...(state.profile?.socialLinks || []), ...(Array.isArray(action.payload) ? action.payload : [action.payload])],
				},
				loading: false,
				error: null
			};

		case "UPDATE_SOCIAL_LINK":
			return {
				...state,
				profile: {
					...state.profile,
					socialLinks: (state.profile?.socialLinks || []).map((link) =>
						link._id === action.payload._id ? { ...link, ...action.payload } : link
					),
				},
				loading: false,
				error: null
			};

		case "DELETE_SOCIAL_LINK":
			return {
				...state,
				profile: {
					...state.profile,
					socialLinks: (state.profile?.socialLinks || []).filter(
						(link) => link._id !== action.payload
					),
				},
				loading: false,
				error: null
			};

		case "UPDATE_DESCRIPTION":
			return {
				...state,
				profile: {
					...state.profile,
					description: { ...(state.profile?.description || {}), ...action.payload },
				},
				loading: false,
				error: null
			};

		default:
			return state;
	}
};

export function ProfileContextProvider({ children }) {
	const [state, dispatch] = useReducer(profileReducer, {
		profile: profile,
		loading: true,
		error: null
	});

	useEffect(() => {
		let isMounted = true;

		const loadProfile = async () => {
			try {
				dispatch({ type: "SET_LOADING", payload: true });
				const res = await fetchProfile();
				if (isMounted && res) {
					dispatch({ type: "SET_PROFILE", payload: res });
				}
			} catch (error) {
				if (isMounted) {
					const apiError = APIError.fromAxiosError(error, "Failed to fetch profile");
					console.error("Error fetching profile on mount:", apiError);
					dispatch({ type: "SET_ERROR", payload: apiError });
				}
			}
		};

		loadProfile();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<ProfileContext.Provider value={{ state, dispatch }}>
			{children}
		</ProfileContext.Provider>
	);
}