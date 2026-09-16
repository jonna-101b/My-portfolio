import { formatDistanceToNow } from "date-fns";
import useNotificationsReducer from "../../../../Hooks/useNotificationsReducer";
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { AdminNotificationsSkeleton } from "../../../../Components/Skeletons/AdminSkeletons";
import "../Styles/RecentNotificationsSection.css";


function getNotificationIcon(type) {
	switch (type) {
		case 'contact':
		case 'message':
			return <MailOutlineRoundedIcon sx={{ fontSize: '3vh', color: 'var(--admin-accent)' }} />;
		case 'testimonial':
			return <FormatQuoteRoundedIcon sx={{ fontSize: '3vh', color: 'var(--admin-accent)' }} />;
		case 'password':
		case 'recovery':
		case 'security':
			return <LockResetRoundedIcon sx={{ fontSize: '3vh', color: 'var(--admin-accent)' }} />;
		case 'edit':
			return <EditOutlinedIcon sx={{ fontSize: '3vh', color: 'var(--admin-accent)' }} />;
		case 'add':
			return <AddCircleOutlineRoundedIcon sx={{ fontSize: '3vh', color: 'var(--admin-accent)' }} />;
		case 'delete':
			return <DeleteOutlineRoundedIcon sx={{ fontSize: '3vh', color: 'var(--admin-danger)' }} />;
		default:
			return <NotificationsNoneRoundedIcon sx={{ fontSize: '3vh', color: 'var(--admin-accent)' }} />;
	}
}

function Notification({ notification }) {
	const typeStr = notification?.type ? String(notification.type) : 'Notification';
	const pageStr = notification?.page || notification?.title || '';
	const dateVal = notification?.timestamp || notification?.createdAt || notification?.date;
	let timeStr = 'Recently';
	try {
		if (dateVal) {
			timeStr = formatDistanceToNow(new Date(dateVal), { addSuffix: true });
		}
	} catch {
		timeStr = 'Recently';
	}

	return (
		<div className="notification">
			<p className="icon">
				{getNotificationIcon(notification.type)}
			</p>

			<div className="details">
				<p className="main">
					{`${typeStr.charAt(0).toUpperCase() + typeStr.slice(1)} ${pageStr}`.trim()}
				</p>

				<p className="time">
					{timeStr}
				</p>
			</div>
		</div>
	);
}

function RecentNotificationsSection() {
        const { state } = useNotificationsReducer();
        const loading = state?.loading;
        const notifications = state?.notifications || [];
        const recentList = notifications.slice(0, 5);

        if (loading) {
                return <AdminNotificationsSkeleton />;
        }

        return (
                <div className="recent-notifications-section">
                        <p className="title">Recent notifications</p>

                        <div className="notifications">
                                {recentList.length > 0 ? (
                                        recentList.map((notification, index) => (
                                                <Notification key={notification._id || index} notification={notification} />
                                        ))
                                ) : (
                                        <p style={{ color: "var(--admin-text-dim)", fontSize: "0.85rem", padding: "16px 0", textAlign: "center" }}>
                                                No notifications yet.
                                        </p>
                                )}

                                <p 
                                        className="see-all" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-admin-notifications'))}
                                >
                                        See all
                                </p>
                        </div>
                </div>
        );
}

export default RecentNotificationsSection;