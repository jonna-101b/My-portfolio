import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import useProfileReducer from '../../Hooks/useProfileReducer';
import { ThemeContext } from '../../Contexts/ThemeContext';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import './Navbar.css';


function Navbar() {
        const { profile } = useProfileReducer();
        const { logo, nickName } = profile;
        const { theme, toggleTheme } = useContext(ThemeContext);
        const [isVisible, setIsVisible] = useState(true);
        const location = useLocation();

        const handleNavClick = (targetPath) => {
                if (location.pathname === targetPath) {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }
        };

        // Always show the navbar when changing routes
        useEffect(() => {
                setIsVisible(true);
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
                <div className={`navbar ${isVisible ? '' : 'navbar-hidden'}`}>
                        <Link className="logo" to={'/admin/dashboard'} >
                                {logo ?
                                        <img src={logo} alt="Logo" />
                                        :
                                        <span className='logo-name'>
                                                {nickName}.
                                        </span>
                                }
                        </Link>

                        <nav>
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

                                <NavLink
                                        to="/projects"
                                        onClick={() => handleNavClick('/projects')}
                                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                >
                                        Projects
                                </NavLink>

                                <button
                                        className="appearance"
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
        );
}

export default Navbar;
