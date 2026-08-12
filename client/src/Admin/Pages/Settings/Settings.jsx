import { useEffect, useState } from "react";
import { Routes, Route, NavLink, useLocation, Navigate } from "react-router-dom";
import useProfileReducer from '../../../Hooks/useProfileReducer';
import useAdminAuth from '../../../Hooks/useAdminAuth';
import TopView from "../../Components/TopView/TopView";
import Notifications from "./Components/Notifications";
import Activities from "./Components/Activities";
import AccountSettingIcon from '../../../assets/Icons/Admin/Settings/user.png';
import AccountSettingActiveIcon from '../../../assets/Icons/Admin/Settings/user-active.png';
import NotificationsIcon from '../../../assets/Icons/Admin/Settings/notifications.png';
import NotificationsActiveIcon from '../../../assets/Icons/Admin/Settings/notifications-active.png';
import ActivitiesIcon from '../../../assets/Icons/Admin/Settings/activities.png';
import ActivitiesActiveIcon from '../../../assets/Icons/Admin/Settings/activities-active.png';
import PrivacyIcon from '../../../assets/Icons/Admin/Settings/privacy-policy.png';
import PrivacyActiveIcon from '../../../assets/Icons/Admin/Settings/privacy-policy-active.png';
import LogOutIcon from '../../../assets/Icons/Admin/Settings/logout.png';
import LogOutActiveIcon from '../../../assets/Icons/Admin/Settings/logout-active.png';
import './Settings.css';


function NavOption({ option, handleNavigation }) {
        return (
                <NavLink 
                        className={({ isActive }) => isActive ? `focused nav-link ${option.name}-nav` : `nav-link ${option.name === "Log out" ? "log-out" : ""}` } 
                        to={`/admin/settings/${option.name}` }
                        onClick={() => {handleNavigation(option._id)}}
                >
                        <span className="icon">
                                <img src={option.icon} alt={`${option.name} icon`} className="main" />
                                <img src={option.activeIcon} alt={`${option.name} icon`} className="active" />
                        </span>

                        <p className="name">
                                { option.title }
                        </p>
                </NavLink >
        )
}

function Settings() {
        const { profile } = useProfileReducer();
        const { nickName, picture } = profile;
        const location = useLocation();
        const [transformY, setTransformY] = useState(0);
        const { logout } = useAdminAuth();

        const navOptions = [
                {  _id: 1, title: "Account settings", name: "account-settings", icon: AccountSettingIcon, activeIcon: AccountSettingActiveIcon },
                { _id: 4, title: "Privacy & Security", name: "privacy-&-Security", icon: PrivacyIcon, activeIcon: PrivacyActiveIcon },
                {  _id: 5, title: "Log out", name: "logout", icon: LogOutIcon, activeIcon: LogOutActiveIcon },
        ];

        const handleNavigation = (index) => {
                if (index === 5) {
                        logout();
                        return;
                }

                setTransformY((index - 1) * 8);
        };

        useEffect(() => {
                const route = location.pathname.slice(16);
                if (route) {
                        const foundOption = navOptions.find((option) => option.name === route);
                        if (foundOption) {
                                handleNavigation(foundOption._id);
                        }
                }
        }, [location]);

        return (
                <div className="settings">
                        <TopView  page={"Settings"} />

                        <div className="main-section">
                                <div className="settings-nav">
                                        <div className="hello-world" >
                                                <p className="picture">
                                                        <img src={picture} alt="Profile picture" />
                                                </p>

                                                <p className="name">
                                                        {nickName}
                                                </p>
                                        </div>

                                        <div className="scroll-bar" style={{ transform: `translateY(${transformY}vh)` }}>
                                                <p className="top"></p>

                                                <p className="middle">
                                                        <span></span>
                                                </p>

                                                <p className="bottom"></p>
                                        </div>

                                        { navOptions.map((option) => (
                                                <NavOption key={option._id} option={option} handleNavigation={handleNavigation} />
                                        )) }
                                </div>

                                <div className="settings-pages">
                                        <Routes>
                                                <Route index element={<Navigate to={"account-settings"} />} />
                                                <Route path="account-settings" element={<Notifications />} />
                                                <Route path="privacy-&-security" element={<Activities />} />
                                        </Routes>
                                </div>
                        </div>

                </div>
        );
}

export default Settings;