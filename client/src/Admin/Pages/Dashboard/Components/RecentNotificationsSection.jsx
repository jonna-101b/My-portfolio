import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import ContactNotificationIcon from '../../../../assets/Icons/Admin/Notifications/message.png';
import TestimonialNotificationIcon from '../../../../assets/Icons/Admin/Notifications/rating.png';
import "../Styles/RecentNotificationsSection.css";


function Notification({ notification }) {
        const notificationIcons = {"contact": ContactNotificationIcon, "testimonial": TestimonialNotificationIcon};
        const icon = notificationIcons[notification.type] || ContactNotificationIcon;

        return (
                <div className="notification">
                        <p className="icon">
                                <img src={icon} alt="notification icon" />
                        </p>

                        <div className="details">
                                <p className="main">
                                        {`${notification.type.charAt(0).toUpperCase() + notification.type.slice(1)} ${notification.page}`}

                                </p>

                                <p className="time">
                                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                        {/* {" • "}
                                        {new Date(notification.timestamp).toLocaleString()} */}
                                </p>
                        </div>
                </div>
        );
}

function RecentNotificationsSection() {
        const [notifications, setNotifications] = useState([]);

        useEffect(() => {
                setNotifications([
                        {
                                type: "edit",
                                page: "About Page",
                                detail: "Updated Bio",
                                timestamp: "2025-08-11T15:32:00Z",
                                user: "Admin"
                        },
                        {
                                type: "add",
                                page: "Projects Page",
                                detail: "Added Portfolio Website Project",
                                timestamp: "2025-08-10T12:15:00Z",
                                user: "Admin"
                        },
                        {
                                type: "delete",
                                page: "Testimonials Page",
                                detail: "Removed Outdated Testimonial",
                                timestamp: "2025-08-09T18:45:00Z",
                                user: "Admin"
                        }
                ]);
        }, []);

        return (
                <div className="recent-notifications-section">
                        <p className="title">Recent notifications</p>

                        <div className="notifications">
                                {notifications.map((notification, index) => (
                                        <Notification key={index} notification={notification} />
                                ))}

                                <p className="see-all">
                                        See all
                                </p>
                        </div>
        </div>
        );
}

export default RecentNotificationsSection;