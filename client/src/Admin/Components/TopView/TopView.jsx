import { NavLink } from 'react-router-dom';
import ClockIcon from '../../../assets/Icons/Admin/Common/clock.png';
import SettingsIcon from '../../../assets/Icons/Admin/Common/settings.png';
import SettingsHoverIcon from '../../../assets/Icons/Admin/Common/settings-hover.png';
import SettingsActiveIcon from '../../../assets/Icons/Admin/Common/settings-active.png';
import './TopView.css';



function TopView({ page }) {
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
                                <p>{ page }</p>
                        </div>

                        <div className="main-content">
                                <NavLink className="tool"  to={'/admin/settings'} >
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
                        </div>
                </div>
        );
}

export default TopView;