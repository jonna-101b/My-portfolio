import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAdminAuth from '../../../Hooks/useAdminAuth';

// MUI Icons
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SchoolIcon from '@mui/icons-material/School';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Styles
import './Sidebar.css';

function NavOption({ option }) {
        const IconComponent = option.icon;
        return (
                <NavLink 
                        className={({ isActive }) => isActive ? "nav-link focused" : "nav-link"} 
                        to={`/admin/${option.route || option.name.toLowerCase()}`}
                        title={option.name}
                >
                        <span className="icon">
                                <IconComponent className="mui-icon" />
                        </span>

                        <span className="name">
                                {option.name}
                        </span>
                </NavLink>
        );
}

function Sidebar() {
        const { logout } = useAdminAuth();
        const [collapsed, setCollapsed] = useState(false);

        const navOptions = [
                { name: "Dashboard", route: "dashboard", icon: SpaceDashboardIcon },
                { name: "Skills", route: "skills", icon: MilitaryTechIcon },
                { name: "Qualifications", route: "qualifications", icon: SchoolIcon },
                { name: "Projects", route: "projects", icon: FolderOutlinedIcon },
                { name: "Testimonials", route: "testimonials", icon: FormatQuoteIcon },
                { name: "Blog", route: "blog", icon: ArticleOutlinedIcon },
        ];

        const handleCollapse = () => {
                setCollapsed((prev) => !prev);
        };

        const handleLogoutClick = (e) => {
                e.preventDefault();
                logout();
        };

        return (
                <aside className={`admin-sidebar ${collapsed ? "collapsed" : "expanded"}`}>
                        <div className="sidebar-header">
                                <div className="brand-logo" onClick={() => setCollapsed(false)}>
                                        <span className="brand-accent">Admin</span>
                                        <span className="brand-white">Workspace</span>
                                </div>

                                <button 
                                        type="button" 
                                        className="collapse-btn" 
                                        onClick={handleCollapse}
                                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                                >
                                        {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
                                </button>
                        </div>

                        <nav className="sidebar-nav">
                                {navOptions.map((option, index) => (
                                        <NavOption option={option} key={index} />
                                ))}
                        </nav>

                        <div className="sidebar-footer">
                                <div className="footer-divider"></div>

                                <button 
                                        type="button" 
                                        className="footer-link logout-btn" 
                                        onClick={handleLogoutClick}
                                        title="Logout"
                                >
                                        <span className="icon">
                                                <LogoutOutlinedIcon className="mui-icon" />
                                        </span>
                                        <span className="name">Logout</span>
                                </button>
                        </div>
                </aside>
        );
}

export default Sidebar;