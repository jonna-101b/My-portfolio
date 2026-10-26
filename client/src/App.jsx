import { lazy, Suspense, useState, useEffect } from 'react';
import { ProfileContextProvider } from './Contexts/ProfileContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QualificationsContextProvider } from './Contexts/QualificationsContext';
import { TechnicalSkillsContextProvider } from './Contexts/TechnicalSkillsContext';
import { ConceptualSkillsContextProvider } from './Contexts/ConceptualSkillsContext';
import { ProjectsContextProvider } from './Contexts/ProjectsContext';
import { TestimonialsContextProvider } from './Contexts/TestimonialsContext';
import { BlogContextProvider } from './Contexts/BlogContext';
import { NotificationsContextProvider } from './Contexts/NotificationsContext';
import { RatingsContextProvider } from './Contexts/RatingsContext';
import { ActivitiesContextProvider } from './Contexts/ActivitiesContext';
import { ThemeContextProvider } from './Contexts/ThemeContext';
import { AdminAuthContextProvider } from './Contexts/AdminAuthContext';
import Navbar from './Components/Navbar/Navbar';
import Contacts from './Components/Contacts/Contacts';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Splash from './Pages/Splash/Splash';
import DottedBackground from './assets/Images/Background/DottedBackground';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import ServerNotification from './Components/ServerNotification/ServerNotification';
import useProjectsReducer from './Hooks/useProjectsReducer';
import useProfileReducer from './Hooks/useProfileReducer';
import { parseImageUrl } from './Utils/imageUtils';
import './App.css';

const About = lazy(() => import('./Pages/About/About'));
const Projects = lazy(() => import('./Pages/Projects/Projects'));
const Admin = lazy(() => import('./Admin/Admin'));


function MainLayout() {
	const { profile, loading: profileLoading } = useProfileReducer();
	const [splashDone, setSplashDone] = useState(false);
	const [logoImageLoaded, setLogoImageLoaded] = useState(false);
	const { state: projectsState } = useProjectsReducer();
	const hasProjects = Array.isArray(projectsState?.projects) && projectsState.projects.length > 0;

	// ONLY whether logo is provided from backend determines if splash displays (logoVisible does not gate splash)
	const hasLogo = Boolean(profile?.logo && typeof profile.logo === 'string' && profile.logo.trim() !== '');

	// Preload logo image as soon as profile is fetched so there is zero glitch
	useEffect(() => {
		if (!profileLoading) {
			if (hasLogo) {
				const parsed = parseImageUrl(profile.logo);
				if (parsed) {
					const img = new Image();
					const timer = setTimeout(() => {
						setLogoImageLoaded(true);
					}, 1500);

					const handleDone = () => {
						clearTimeout(timer);
						setLogoImageLoaded(true);
					};

					img.onload = handleDone;
					img.onerror = handleDone;
					img.src = parsed;

					if (img.complete) {
						handleDone();
					}

					return () => clearTimeout(timer);
				} else {
					setSplashDone(true);
				}
			} else {
				setSplashDone(true);
			}
		}
	}, [profileLoading, hasLogo, profile?.logo]);

	// If splash has finished (or if no logo was provided by backend), render normal public pages
	if (splashDone || (!profileLoading && !hasLogo)) {
		return (
			<div className="main-layout">
				<ServerNotification />
				<Navbar />

				<div className="pages">
					<Suspense fallback={null}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							{hasProjects && (
								<>
									<Route path="/projects" element={<Projects />} />
									<Route path="/projects/:projectId" element={<Projects />} />
								</>
							)}
						</Routes>
					</Suspense>
				</div>

				<Contacts />
				<Footer />
				<DottedBackground />
			</div>
		);
	}

	// While fetching profile from backend, or preloading the provided logo image:
	// Hold on a clean background without showing skeletons, page contents, or fallback text/monograms
	if (profileLoading || !logoImageLoaded) {
		return (
			<div 
				style={{ 
					position: 'fixed', 
					inset: 0, 
					backgroundColor: 'var(--bg)', 
					zIndex: 999999 
				}} 
			/>
		);
	}

	// Directly render Splash screen with the loaded logo and nickname/name (no fallbacks)
	return <Splash profile={profile} onFinish={() => setSplashDone(true)} />;
}


function App() {
	return (
		<ProfileContextProvider>
			<TechnicalSkillsContextProvider>
				<ConceptualSkillsContextProvider>
					<QualificationsContextProvider>
						<ProjectsContextProvider>
							<TestimonialsContextProvider>
								<BlogContextProvider>
									<NotificationsContextProvider>
										<RatingsContextProvider>

										<ThemeContextProvider>
											<div className="app">
												<BrowserRouter>
													<ScrollToTop />
													<AdminAuthContextProvider>
													<Routes>
														<Route path="/*" element={<MainLayout />} />

														<Route 
															path="/admin/*" 
															element={
																<Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
																	<ActivitiesContextProvider>
																		<Admin />
																	</ActivitiesContextProvider>
																</Suspense>
															} 
														/>
													</Routes>
													</AdminAuthContextProvider>
												</BrowserRouter>
											</div>
										</ThemeContextProvider>

										</RatingsContextProvider>
									</NotificationsContextProvider>
								</BlogContextProvider>
							</TestimonialsContextProvider>
						</ProjectsContextProvider>
					</QualificationsContextProvider>
				</ConceptualSkillsContextProvider>
			</TechnicalSkillsContextProvider>
		</ProfileContextProvider>
	);
}

export default App;