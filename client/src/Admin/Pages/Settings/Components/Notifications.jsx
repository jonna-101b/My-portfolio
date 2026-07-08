import useNotificationsReducer from "../../../../Hooks/useNotificationsReducer";
import { formatDistanceToNow } from "date-fns";
import EditIcon from '../../../../assets/Icons/Admin/Common/edit.png';
import EditHoverIcon from '../../../../assets/Icons/Admin/Common/edit-hover.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/delete-hover.png';
import ViewIcon from '../../../../assets/Icons/Admin/Common/view.png';
import ViewHoverIcon from '../../../../assets/Icons/Admin/Common/view-hover.png';
import NotificationIcon from '../../../../assets/Icons/Admin/Notifications/bell.png';
import '../Styles/Notifications.css';


function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
}

function Notification({ notification }) {
        const testimony = notification.subject === "testimony" ? true : false;
        const description = testimony ? 
                `${capitalizeFirstLetter(notification.name)} has shared a testimony` :
                `${capitalizeFirstLetter(notification.name)} has sent you a message`;

        return (
                <div className="notification">
                        <div className="icon">
                                <img src={ NotificationIcon } alt="Icon" />
                        </div>

                        <div className="content">
                                <p className="subject">
                                        { capitalizeFirstLetter(notification.subject) }
                                </p>

                                <p className="description">
                                        { description }
                                </p>
                        </div>

                        <div className="other">
                                <div className="actions">
                                        {/* { testimony ? 
                                                <p className="edit">
                                                        <img src={EditIcon} alt="Edit icon" className="main" />
                                                        <img src={EditHoverIcon} alt="Edit icon" className="hover" />
                                                </p>
                                                : ""
                                        } */}

                                        <p className="delete">
                                                <img src={DeleteIcon} alt="Delete icon" className="main" />
                                                <img src={DeleteHoverIcon} alt="Delete icon" className="hover" />
                                        </p>

                                        <p className="view">
                                                <img src={ViewIcon} alt="View icon" className="main" />
                                                <img src={ViewHoverIcon} alt="View icon" className="hover" />
                                        </p>
                                </div>

                                <p className="date">{ formatDistanceToNow(notification.date, {addSuffix: true}) }</p>
                        </div>
                </div>
        );
}

function Notifications() {
        const { state } = useNotificationsReducer();
        const notifications = state.notifications;

        return (
                <div className="notifications">
                        <div className="messages category">
                                <p className="title">Pending messages</p>

                                <div className="list">
                                        { notifications.map((notification, index) => (
                                                <Notification key={index} notification={notification} />
                                        )) }
                                </div>
                        </div>
                </div>
        );
}

export default Notifications;