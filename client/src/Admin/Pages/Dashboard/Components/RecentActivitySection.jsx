import { formatDistanceToNow } from "date-fns";
import ContactNotificationIcon from '../../../../assets/Icons/Admin/Notifications/message.png';
import "../Styles/RecentActivitySection.css";
import useActivitiesReducer from "../../../../Hooks/useActivitiesReducer";
import { Link } from "react-router-dom";


function Activity({ activity }) {
        return (
                <div className="action">
                        <p className="icon">
                                <img src={ContactNotificationIcon} alt="Action type icon" />
                        </p>

                        <div className="details">
                                <p className="main">{`${activity.action.charAt(0).toUpperCase() + activity.action.slice(1)} ${activity.destination}`}</p>

                                <p className="time">
                                        {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                                </p>
                        </div>
                </div>
        );
}

function RecentActivitySection() {
        const { state } = useActivitiesReducer();
        const { activities } = state;

        return (
                <div className="recent-activity-section">
                        <p className="title">Recent Actions</p>

                        <div className="actions">
                                {activities.slice(0, 3).map((activity, index) => (
                                        <Activity key={index} activity={activity} />
                                ))}

                                <Link className="see-all" to={'/admin/settings/activities'} >
                                        See all
                                </Link>
                        </div>
        </div>
        );
}

export default RecentActivitySection;
