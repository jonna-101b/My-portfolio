import { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import useNotificationsReducer from '../../../Hooks/useNotificationsReducer';

// MUI Icons
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { AdminNotificationsSkeleton } from '../../../Components/Skeletons/AdminSkeletons';

import '../TopView/TopView.css';

export const formatNotificationCount = (count) => {
	if (!count || count <= 0) return null;
	if (count <= 99) return `${count}`;
	if (count < 1000) return "99+";
	if (count < 1000000) {
		const k = count / 1000;
		const formatted = k >= 100 ? Math.floor(k) : (k % 1 === 0 ? k : k.toFixed(1));
		return `${formatted}k+`;
	}
	const m = count / 1000000;
	const formatted = m >= 100 ? Math.floor(m) : (m % 1 === 0 ? m : m.toFixed(1));
	return `${formatted}m+`;
};

function capitalizeFirstLetter(str) {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getNotificationIcon(subject) {
	const sub = (subject || "").toLowerCase();
	if (sub.includes("password") || sub.includes("recovery") || sub.includes("security key")) {
		return <LockResetRoundedIcon className="noti-type-icon security" fontSize="small" />;
	}
	if (sub.includes("testimony") || sub.includes("testimonial")) {
		return <FormatQuoteRoundedIcon className="noti-type-icon testimony" fontSize="small" />;
	}
	if (sub.includes("security") || sub.includes("lock") || sub.includes("password")) {
		return <ShieldOutlinedIcon className="noti-type-icon security" fontSize="small" />;
	}
	if (sub.includes("billing") || sub.includes("invoice") || sub.includes("payment")) {
		return <ReceiptLongOutlinedIcon className="noti-type-icon billing" fontSize="small" />;
	}
	if (sub.includes("feature") || sub.includes("request") || sub.includes("idea")) {
		return <TipsAndUpdatesOutlinedIcon className="noti-type-icon feature" fontSize="small" />;
	}
	if (sub.includes("support") || sub.includes("help") || sub.includes("issue")) {
		return <ContactSupportOutlinedIcon className="noti-type-icon support" fontSize="small" />;
	}
	return <EmailOutlinedIcon className="noti-type-icon message" fontSize="small" />;
}

function Notifications({ isOpen, onToggle, onClose }) {
	const { state: notifState, deleteNotification, deleteNotifications } = useNotificationsReducer();
	const notifications = notifState?.notifications || [];

	const [showInternal, setShowInternal] = useState(false);
	const [selectedNotification, setSelectedNotification] = useState(null);
	const [notificationFilter, setNotificationFilter] = useState('all');
	const notifContainerRef = useRef(null);

	const isControlled = typeof isOpen === 'boolean';
	const showNotifications = isControlled ? isOpen : showInternal;

	const handleToggle = () => {
		if (onToggle) {
			onToggle();
		} else {
			setShowInternal((prev) => !prev);
		}
	};

	const handleClose = () => {
		if (onClose) {
			onClose();
		} else {
			setShowInternal(false);
		}
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (notifContainerRef.current && !notifContainerRef.current.contains(e.target)) {
				handleClose();
			}
		};

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				handleClose();
				setSelectedNotification(null);
			}
		};

		const handleOpenNotifications = () => {
			if (onToggle && !isOpen) {
				onToggle();
			} else {
				setShowInternal(true);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		window.addEventListener('open-admin-notifications', handleOpenNotifications);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('open-admin-notifications', handleOpenNotifications);
		};
	}, [isOpen, onToggle, onClose]);

	const handleClearAllNotifications = () => {
		const allIds = notifications.map((n) => n._id);
		if (allIds.length > 0) {
			deleteNotifications(allIds);
		}
	};

	const filteredNotifications = notifications.filter((notif) => {
		if (notificationFilter === 'testimonials') {
			return (notif.subject || "").toLowerCase() === 'testimony' || (notif.subject || "").toLowerCase() === 'testimonial';
		}
		if (notificationFilter === 'messages') {
			return (notif.subject || "").toLowerCase() !== 'testimony' && (notif.subject || "").toLowerCase() !== 'testimonial';
		}
		return true;
	});

	const formattedNotifCount = formatNotificationCount(notifications.length);

	return (
		<div className="topview-popover-container" ref={notifContainerRef}>
			<button 
				type="button" 
				className={`topview-header-btn ${showNotifications ? "active" : ""}`}
				onClick={handleToggle}
				aria-label="View notifications"
				title="Notifications"
			>
				{notifications.length > 0 ? (
					<NotificationsActiveOutlinedIcon className="header-action-icon notif-bell-active" />
				) : (
					<NotificationsOutlinedIcon className="header-action-icon" />
				)}
				
				{/* Green badge ONLY rendered when there are notifications */}
				{formattedNotifCount && (
					<span className="notification-badge-circle" title={`${notifications.length} unread notifications`}>
						{formattedNotifCount}
					</span>
				)}
			</button>

			{showNotifications && (
				<div className="topview-dropdown-card notifications-popover" role="dialog" aria-label="Notifications popup">
					<div className="popover-header">
						<div className="popover-header-title">
							<NotificationsOutlinedIcon className="popover-title-icon" fontSize="small" />
							<span className="title-text">Notifications</span>
							<span className="popover-count-chip">
								{notifications.length > 0 ? `${notifications.length} new` : "All caught up"}
							</span>
						</div>

						<div className="popover-header-actions">
							{notifications.length > 0 && (
								<button 
									type="button" 
									className="popover-text-action-btn"
									onClick={handleClearAllNotifications}
									title="Clear all notifications"
								>
									<ClearAllRoundedIcon fontSize="small" />
									<span>Clear all</span>
								</button>
							)}
							<button 
								type="button" 
								className="popover-close-btn"
								onClick={handleClose}
								aria-label="Close notifications popup"
							>
								<CloseRoundedIcon fontSize="small" />
							</button>
						</div>
					</div>

					{/* Filter tabs if notifications exist */}
					{notifications.length > 0 && (
						<div className="popover-filter-tabs">
							<button 
								type="button" 
								className={`popover-filter-tab ${notificationFilter === 'all' ? 'active' : ''}`}
								onClick={() => setNotificationFilter('all')}
							>
								All ({notifications.length})
							</button>
							<button 
								type="button" 
								className={`popover-filter-tab ${notificationFilter === 'messages' ? 'active' : ''}`}
								onClick={() => setNotificationFilter('messages')}
							>
								Messages
							</button>
							<button 
								type="button" 
								className={`popover-filter-tab ${notificationFilter === 'testimonials' ? 'active' : ''}`}
								onClick={() => setNotificationFilter('testimonials')}
							>
								Testimonials
							</button>
						</div>
					)}

					<div className="popover-content-list custom-scrollbar">
						{notifState?.loading ? (
							<AdminNotificationsSkeleton rows={3} />
						) : filteredNotifications.length === 0 ? (
							<div className="popover-empty-state">
								<div className="empty-icon-circle notif-empty">
									<NotificationsOffOutlinedIcon fontSize="medium" />
								</div>
								<p className="empty-title">No Notifications</p>
								<p className="empty-desc">You are all caught up with your alerts and messages!</p>
							</div>
						) : (
							filteredNotifications.map((notif, index) => {
								const isTestimony = (notif.subject || "").toLowerCase() === "testimony";
								let timeAgo = "Recently";
								try {
									if (notif.date) {
										timeAgo = formatDistanceToNow(new Date(notif.date), { addSuffix: true });
									}
								} catch {
									timeAgo = "Recently";
								}

								return (
									<div 
										key={notif._id || index} 
										className="popover-notification-item"
										onClick={() => setSelectedNotification(notif)}
									>
										<div className="noti-icon-col">
											{getNotificationIcon(notif.subject)}
										</div>

										<div className="noti-info-col">
											<div className="noti-header-line">
												<span className="noti-sender-name">{capitalizeFirstLetter(notif.name || "Anonymous")}</span>
												<span className={`noti-subject-tag ${isTestimony ? "testimony-tag" : "message-tag"}`}>
													{capitalizeFirstLetter(notif.subject || "Message")}
												</span>
											</div>

											<p className="noti-message-preview">
												{notif.message || (isTestimony ? "Has shared a testimonial on your portfolio." : "Has sent you an inquiry.")}
											</p>

											<span className="noti-timestamp">
												<CalendarTodayRoundedIcon fontSize="inherit" />
												{timeAgo}
											</span>
										</div>

										<div className="noti-item-actions" onClick={(e) => e.stopPropagation()}>
											<button 
												type="button" 
												className="item-view-btn"
												onClick={() => setSelectedNotification(notif)}
												title="View complete message"
												aria-label="View message"
											>
												<VisibilityOutlinedIcon fontSize="small" />
											</button>

											<button 
												type="button" 
												className="item-delete-btn"
												onClick={() => deleteNotification(notif._id)}
												title="Delete notification"
												aria-label="Delete notification"
											>
												<DeleteOutlineRoundedIcon fontSize="small" />
											</button>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			)}

			{/* Notification Detail Preview Modal */}
			{selectedNotification && (
				<div className="topview-modal-backdrop" onClick={() => setSelectedNotification(null)}>
					<div className="topview-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
						<div className="modal-header">
							<div className="modal-sender-info">
								<div className="modal-avatar-badge">
									<PersonOutlineRoundedIcon />
								</div>
								<div>
									<h3 className="modal-sender-name">{capitalizeFirstLetter(selectedNotification.name || "Anonymous")}</h3>
									{selectedNotification.email && (
										<a href={`mailto:${selectedNotification.email}`} className="modal-sender-email">
											{selectedNotification.email}
										</a>
									)}
								</div>
							</div>

							<button 
								type="button" 
								className="modal-close-btn"
								onClick={() => setSelectedNotification(null)}
								aria-label="Close dialog"
							>
								<CloseRoundedIcon />
							</button>
						</div>

						<div className="modal-meta-row">
							<span className="modal-subject-chip">
								{capitalizeFirstLetter(selectedNotification.subject || "Inquiry")}
							</span>
							<span className="modal-date">
								{selectedNotification.date ? formatDistanceToNow(new Date(selectedNotification.date), { addSuffix: true }) : "Recently"}
							</span>
						</div>

						<div className="modal-body-content custom-scrollbar">
							<p className="modal-message-text">{selectedNotification.message}</p>
						</div>

						<div className="modal-footer">
							<button 
								type="button" 
								className="modal-delete-btn"
								onClick={() => {
									deleteNotification(selectedNotification._id);
									setSelectedNotification(null);
								}}
							>
								<DeleteOutlineRoundedIcon fontSize="small" />
								<span>Delete</span>
							</button>

							<button 
								type="button" 
								className="modal-done-btn"
								onClick={() => setSelectedNotification(null)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Notifications;
