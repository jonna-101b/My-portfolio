import { Link, NavLink, useNavigate } from 'react-router-dom';
import useProfileReducer from '../../Hooks/useProfileReducer';
import SunIcon from '../../assets/Icons/Nav/sun.png';
import SunHoverIcon from '../../assets/Icons/Nav/sun-hover.png';
import './Navbar.css';


function Navbar() {
        const { profile } = useProfileReducer();
        const { logo } = profile;

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

                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/articles">Articles</NavLink>

                                {/* <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to="/contacts">Contacts</NavLink> */}

                                <div className="appearance">
                                                <img src={SunIcon} alt="Sun icon" />
                                                <img src={SunHoverIcon} alt="Sun icon" className="hover" />
                                </div>
                        </nav>
                </div>
        );
}

export default Navbar;