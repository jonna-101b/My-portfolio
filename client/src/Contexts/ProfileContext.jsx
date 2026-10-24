import { createContext, useReducer, useEffect } from "react";
import { fetchProfile } from "../api/ProfileApi";
import { APIError } from "../api/APIError";
import { parseImageUrl } from "../Utils/imageUtils";

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

		case "UPDATE_LOGO_VISIBILITY": {
			const logoVisible = typeof action.payload === 'object' && action.payload !== null && 'logoVisible' in action.payload
				? Boolean(action.payload.logoVisible)
				: Boolean(action.payload);
			return {
				...state,
				profile: {
					...state.profile,
					logoVisible,
				},
				loading: false,
				error: null
			};
		}

		default:
			return state;
	}
};

export function ProfileContextProvider({ children }) {
	const [state, dispatch] = useReducer(profileReducer, {
		profile: {},
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

	// Synchronize document title and favicon dynamically from profile
	useEffect(() => {
		if (!state.profile || Object.keys(state.profile).length === 0) return;

		const { nickName, firstName, lastName, logo } = state.profile;

		// Dynamic Title: Nickname if available, otherwise First Name + Last Name
		const trimmedNick = typeof nickName === 'string' ? nickName.trim() : '';
		const trimmedFirst = typeof firstName === 'string' ? firstName.trim() : '';
		const trimmedLast = typeof lastName === 'string' ? lastName.trim() : '';
		const fullName = [trimmedFirst, trimmedLast].filter(Boolean).join(' ');

		const resolvedTitle = trimmedNick || fullName;
		if (resolvedTitle) {
			document.title = resolvedTitle;
		}

		// Dynamic Favicon: Brand logo from profile or fallback icon
		const fallbackFavicon = "../assets/Logo/Logo.png";
		const resolvedFavicon = logo ? (parseImageUrl(logo) || fallbackFavicon) : fallbackFavicon;

		let faviconLink = document.querySelector("link[rel*='icon']");
		if (!faviconLink) {
			faviconLink = document.createElement("link");
			faviconLink.rel = "icon";
			document.head.appendChild(faviconLink);
		}
		faviconLink.href = resolvedFavicon;
	}, [state.profile]);

	return (
		<ProfileContext.Provider value={{ state, dispatch }}>
			{children}
		</ProfileContext.Provider>
	);
}