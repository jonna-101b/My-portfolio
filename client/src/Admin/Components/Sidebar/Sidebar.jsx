import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useProfileReducer from '../../../Hooks/useProfileReducer';
// Icons
import DashboardIcon from '../../../assets/Icons/Admin/Sidebar/dashboard.png';
import QualificationsIcon from '../../../assets/Icons/Admin/Sidebar/medal.png';
import SkillsIcon from '../../../assets/Icons/Admin/Sidebar/star.png';
import ProjectsIcon from '../../../assets/Icons/Admin/Sidebar/cube.png';
import TestimonialsIcon from '../../../assets/Icons/Admin/Sidebar/quote.png';
import BlogIcon from '../../../assets/Icons/Admin/Sidebar/article.png';
import SidebarIcon from '../../../assets/Icons/Admin/Sidebar/sidebar.png';
// Icons for hover
import DashboardHoverIcon from '../../../assets/Icons/Admin/Sidebar/dashboard-hover.png';
import QualificationsHoverIcon from '../../../assets/Icons/Admin/Sidebar/medal-hover.png';
import SkillsHoverIcon from '../../../assets/Icons/Admin/Sidebar/star-hover.png';
import ProjectsHoverIcon from '../../../assets/Icons/Admin/Sidebar/cube-hover.png';
import TestimonialsHoverIcon from '../../../assets/Icons/Admin/Sidebar/quote-hover.png';
import BlogHoverIcon from '../../../assets/Icons/Admin/Sidebar/article-hover.png';
import SidebarHoverIcon from '../../../assets/Icons/Admin/Sidebar/sidebar-hover.png';
// Icons for active state
import DashboardActiveIcon from '../../../assets/Icons/Admin/Sidebar/dashboard-active.png';
import QualificationsActiveIcon from '../../../assets/Icons/Admin/Sidebar/medal-active.png';
import SkillsActiveIcon from '../../../assets/Icons/Admin/Sidebar/star-active.png';
import ProjectsActiveIcon from '../../../assets/Icons/Admin/Sidebar/cube-active.png';
import TestimonialsActiveIcon from '../../../assets/Icons/Admin/Sidebar/quote-active.png';
import BlogActiveIcon from '../../../assets/Icons/Admin/Sidebar/article-active.png';
import SidebarActiveIcon from '../../../assets/Icons/Admin/Sidebar/sidebar-active.png';
// Icons for active hover
import SidebarActiveHoverIcon from '../../../assets/Icons/Admin/Sidebar/sidebar-active-hover.png';
// Styles
import './Sidebar.css';


function NavOption({ option }) {
        return (
                <NavLink className={({ isActive }) => isActive ? "focused nav-link" : "nav-link"} to={ `/admin/${option.name.toLowerCase()}` }>
                        <span className="icon">
                                <img src={option.icon} alt={`${option.name} icon`} className="main" />
                                <img src={option.hoverIcon} alt={`${option.name} icon`} className="hover" />
                                <img src={option.activeIcon} alt={`${option.name} icon`} className="active" />
                        </span>

                        <p className="name">
                                { option.name }
                        </p>
                </NavLink >
        )
}

function Sidebar() {
        const { profile } = useProfileReducer();
        const {  firstName, lastName, picture, logo } = profile;

        const navOptions = [
                { name: "Dashboard", icon: DashboardIcon, hoverIcon: DashboardHoverIcon, activeIcon: DashboardActiveIcon },
                { name: "Skills", icon: SkillsIcon, hoverIcon: SkillsHoverIcon, activeIcon: SkillsActiveIcon },
                { name: "Qualifications", icon: QualificationsIcon, hoverIcon: QualificationsHoverIcon, activeIcon: QualificationsActiveIcon },
                { name: "Projects", icon: ProjectsIcon, hoverIcon: ProjectsHoverIcon, activeIcon: ProjectsActiveIcon },
                { name: "Testimonials", icon: TestimonialsIcon, hoverIcon: TestimonialsHoverIcon, activeIcon: TestimonialsActiveIcon },
                { name: "Blog", icon: BlogIcon, hoverIcon: BlogHoverIcon, activeIcon: BlogActiveIcon },
        ];

        const [ collapsed, setCollapsed ] = useState(false);

        const handleCollapse = () => {
                setCollapsed((prev) => !prev);
        }

        return (
                <div className={`side-bar ${ collapsed ? "collapsed" : "expanded"}`}>
                        <div className="top">
                                <p className="nothing-here"></p>

                                <p className="logo">
                                        <img src={logo} alt="Logo" />
                                </p>

                                <p className="layout" onClick={handleCollapse} >
                                        <img src={SidebarIcon} alt="Sidebar icon" className="main" />
                                        <img src={SidebarHoverIcon} alt="Sidebar icon" className="hover" />
                                        <img src={SidebarActiveIcon} alt="Sidebar icon" className="active" />
                                        <img src={SidebarActiveHoverIcon} alt="Sidebar icon" className="active-hover" />
                                </p>
                        </div>

                        <nav>
                                { navOptions.map((option, index) => (
                                        <NavOption option={option} key={index} />
                                )) }
                        </nav>
                        
                        <NavLink className={({ isActive }) => isActive ? "active profile-bar" : "profile-bar"} to={"/admin/profile"}>
                                <span className="picture">
                                        <img src={ picture } alt="Profile picture" />
                                </span>

                                <span className="info">
                                        <span className="user-name">{ `${firstName} ${lastName}` }</span>
                                        <span className="title">Admin</span>
                                </span>
                        </NavLink>
                </div>
        );
}

export default Sidebar;