import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import useProfileReducer from '../../Hooks/useProfileReducer';
import { ThemeContext } from '../../Contexts/ThemeContext';
import SunIcon from '../../assets/Icons/Nav/sun.png';
import SunHoverIcon from '../../assets/Icons/Nav/sun-hover.png';
import MoonIcon from '../../assets/Icons/Nav/moon.png';
import MoonHoverIcon from '../../assets/Icons/Nav/moon-hover.png';
import './Navbar.css';


function Navbar() {
        const { profile } = useProfileReducer();
        const { logo } = profile;
        const { theme, toggleTheme } = useContext(ThemeContext);

        return (
                <div className="navbar">
                        <Link className="logo" to={'/admin/dashboard'} >
                                <img src={logo} alt="Logo" />
                        </Link>

                        <nav>
                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/">Home</NavLink>

                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/about">About</NavLink>

                                {/* <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/skills">Skills</NavLink> */}

                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/projects">Projects</NavLink>

                                {/* <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/testimonials">Testimonials</NavLink> */}

                                {/* <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/blog">Blog</NavLink> */}

                                {/* <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/contacts">Contacts</NavLink> */}

                                <button
                                        className="appearance"
                                        type="button"
                                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                                        onClick={toggleTheme}
                                >
                                        <img src={theme === 'dark' ? SunIcon : MoonIcon} alt="Appearance icon" />
                                        <img src={theme === 'dark' ? SunHoverIcon : MoonHoverIcon} alt="Appearance icon" className="hover" />
                                </button>
                        </nav>
                </div>
        );
}

export default Navbar;