import { NavLink } from 'react-router-dom';
import useProfileReducer from '../../Hooks/useProfileReducer';
import './Footer.css';

function Footer() {
        const { profile } = useProfileReducer();
        const { firstName, lastName, logo, socialLinks } = profile;
        
        return (
                <div className="footer">
                        <div className="top">
                                <p className="logo">
                                        <img src={logo} alt="Logo" />
                                </p>

                                <div className="nav">
                                        <NavLink className="home nav-link" to={"/"} >Home</NavLink>

                                        <NavLink className="about nav-link" to={"/about"} >About</NavLink>

                                        <NavLink className="projects nav-link" to={"/projects"} >Projects</NavLink>
                                </div>

                                <div className="social-links">
                                        { socialLinks.map((link, index) => (
                                                <a key={index} href={ link.url } target="_blank" className="social-link" >
                                                        <img src={link.icon} />
                                                </a>
                                        )) }
                                </div>
                        </div>
                                

                        <div className="copyright">{`© 2025 ${firstName} ${lastName}. All rights reserved.`}</div>
                </div>
        );
}

export default Footer;