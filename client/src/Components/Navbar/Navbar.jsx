import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import useProfileReducer from '../../Hooks/useProfileReducer';
import useProjectsReducer from '../../Hooks/useProjectsReducer';
import { ThemeContext } from '../../Contexts/ThemeContext';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './Navbar.css';


function Navbar() {
        const { profile } = useProfileReducer();
        const { logo, nickName = '' } = profile || {};
        const { state: projectsState } = useProjectsReducer();
        const hasProjects = Array.isArray(projectsState?.projects) && projectsState.projects.length > 0;
        const { theme, toggleTheme } = useContext(ThemeContext);
        const [isVisible, setIsVisible] = useState(true);
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        const location = useLocation();

        const handleNavClick = (targetPath) => {
                setIsMobileMenuOpen(false);
                if (location.pathname === targetPath) {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }
        };

        // Always show the navbar and close mobile menu when changing routes
        useEffect(() => {
                setIsVisible(true);
                setIsMobileMenuOpen(false);
        }, [location.pathname]);

        // Handle smooth slide in/out on scroll
        useEffect(() => {
                let lastScrollY = window.scrollY;

                const handleScroll = () => {
                        const currentScrollY = window.scrollY;

                        // Always display navbar at or near the top of the page
                        if (currentScrollY <= 10) {
                                setIsVisible(true);
                                lastScrollY = currentScrollY;
                                return;
                        }

                        // Ignore negative scroll values (e.g. bounce effect on macOS/iOS)
                        if (currentScrollY < 0) {
                                return;
                        }

                        const delta = currentScrollY - lastScrollY;

                        // Threshold to avoid micro-jitter
                        if (Math.abs(delta) < 8) {
                                return;
                        }

                        if (delta > 0 && currentScrollY > 70) {
                                // Scrolling down -> slide out upwards
                                setIsVisible(false);
                        } else if (delta < 0) {
                                // Scrolling up -> slide in downwards
                                setIsVisible(true);
                        }

                        lastScrollY = currentScrollY;
                };

                window.addEventListener('scroll', handleScroll, { passive: true });

                return () => {
                        window.removeEventListener('scroll', handleScroll);
                };
        }, []);

        return (
                <header className={`navbar ${isVisible ? '' : 'navbar-hidden'} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                        <div className="navbar-container">
                                <Link className="logo" to={'/admin/dashboard'} onClick={() => setIsMobileMenuOpen(false)}>
                                        {logo ?
                                                <img src={logo} alt="Logo" />
                                                :
                                                <span className='logo-name'>
                                                        {nickName}.
                                                </span>
                                        }
                                </Link>

                                <div className="nav-actions-group">
                                        <button
                                                className="appearance appearance-mobile"
                                                type="button"
                                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                                                onClick={toggleTheme}
                                        >
                                                {theme === 'dark' ? (
                                                        <LightModeRoundedIcon className="theme-toggle-icon" />
                                                ) : (
                                                        <DarkModeRoundedIcon className="theme-toggle-icon" />
                                                )}
                                        </button>

                                        <button
                                                className="mobile-menu-toggle"
                                                type="button"
                                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                                aria-expanded={isMobileMenuOpen}
                                                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                                        >
                                                {isMobileMenuOpen ? (
                                                        <CloseRoundedIcon className="menu-icon" />
                                                ) : (
                                                        <MenuRoundedIcon className="menu-icon" />
                                                )}
                                        </button>
                                </div>

                                <nav className={`nav-links-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                                        <NavLink
                                                to="/"
                                                end
                                                onClick={() => handleNavClick('/')}
                                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                        >
                                                Home
                                        </NavLink>

                                        <NavLink
                                                to="/about"
                                                onClick={() => handleNavClick('/about')}
                                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                        >
                                                About
                                        </NavLink>

                                        {hasProjects && (
                                                <NavLink
                                                        to="/projects"
                                                        onClick={() => handleNavClick('/projects')}
                                                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                                >
                                                        Projects
                                                </NavLink>
                                        )}

                                        <button
                                                className="appearance appearance-desktop"
                                                type="button"
                                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                                                onClick={toggleTheme}
                                        >
                                                {theme === 'dark' ? (
                                                        <LightModeRoundedIcon className="theme-toggle-icon" />
                                                ) : (
                                                        <DarkModeRoundedIcon className="theme-toggle-icon" />
                                                )}
                                        </button>
                                </nav>
                        </div>
                </header>
        );
}

export default Navbar;
