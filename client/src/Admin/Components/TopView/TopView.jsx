import { NavLink } from 'react-router-dom';
import useProfileReducer from '../../../Hooks/useProfileReducer';
import ClockIcon from '../../../assets/Icons/Admin/Common/clock.png';
import BellIcon from '../../../assets/Icons/Admin/Notifications/bell.png';
import SettingsIcon from '../../../assets/Icons/Admin/Common/settings.png';
import SettingsHoverIcon from '../../../assets/Icons/Admin/Common/settings-hover.png';
import SettingsActiveIcon from '../../../assets/Icons/Admin/Common/settings-active.png';
import './TopView.css';



function TopView({ page }) {
        const { profile } = useProfileReducer();
        const { firstName, lastName, nickName, picture } = profile;
        const date = new Date();
  
        const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        };

        const friendlyDate = date.toLocaleDateString('en-US', options);

        return (
                <div className="top-view">
                        <div className="page">
                                <p className="eyebrow">Admin workspace</p>

                                <p className="heading">{ page }</p>

                                <p className="subtext">Command center for content, activity, and profile management.</p>
                        </div>

                        <div className="main-content">
                                <NavLink className="tool bell"  to={'/admin/settings/notifications'} aria-label="Open notifications">
                                        <img src={BellIcon} alt="Notifications icon" className="main"/>
                                        <img src={BellIcon} alt="Notifications icon" className="hover"/>
                                </NavLink>

                                <NavLink className="tool settings"  to={'/admin/settings'} aria-label="Open settings">
                                        <img src={SettingsIcon} alt="Settings icon" className="main"/>
                                        <img src={SettingsHoverIcon} alt="Settings icon" className="hover"/>
                                        <img src={SettingsActiveIcon} alt="Settings icon" className="active"/>
                                </NavLink>

                                <div className="date">
                                        <p className="icon">
                                                <img src={ ClockIcon } alt="Clock icon" />
                                        </p>

                                        <p className="text">{ friendlyDate }</p>
                                </div>

                                <NavLink className="profile-chip" to={'/admin/profile'} aria-label="Open profile">
                                        <span className="avatar">
                                                <img src={picture} alt="Profile picture" />
                                        </span>

                                        <span className="meta">
                                                <span className="name">{nickName || `${firstName} ${lastName}`}</span>
                                                <span className="role">Admin user</span>
                                        </span>
                                </NavLink>
                        </div>
                </div>
        );
}

export default TopView;