import { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import useActivitiesReducer from '../../../Hooks/useActivitiesReducer';

// MUI Icons
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import HistoryToggleOffRoundedIcon from '@mui/icons-material/HistoryToggleOffRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { AdminActivitySkeleton } from '../../../Components/Skeletons/AdminSkeletons';

import '../TopView/TopView.css';

function capitalizeFirstLetter(str) {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getActivityIcon(action) {
	const act = (action || "").toLowerCase();
	if (act.includes("edit") || act.includes("update")) {
		return <EditOutlinedIcon className="act-type-icon edit" fontSize="small" />;
	}
	if (act.includes("add") || act.includes("create") || act.includes("new")) {
		return <AddCircleOutlineRoundedIcon className="act-type-icon add" fontSize="small" />;
	}
	if (act.includes("delete") || act.includes("remove")) {
		return <DeleteOutlineRoundedIcon className="act-type-icon delete" fontSize="small" />;
	}
	if (act.includes("login")) {
		return <LoginRoundedIcon className="act-type-icon login" fontSize="small" />;
	}
	if (act.includes("logout")) {
		return <LogoutRoundedIcon className="act-type-icon logout" fontSize="small" />;
	}
	if (act.includes("password") || act.includes("security") || act.includes("lock")) {
		return <LockOutlinedIcon className="act-type-icon lock" fontSize="small" />;
	}
	return <BoltRoundedIcon className="act-type-icon default" fontSize="small" />;
}

function Activities({ isOpen, onToggle, onClose }) {
	const { state: actState, deleteActivity, deleteActivities } = useActivitiesReducer();
	const activities = actState?.activities || [];

	const [showInternal, setShowInternal] = useState(false);
	const actContainerRef = useRef(null);

	const isControlled = typeof isOpen === 'boolean';
	const showActivities = isControlled ? isOpen : showInternal;

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
			if (actContainerRef.current && !actContainerRef.current.contains(e.target)) {
				handleClose();
			}
		};

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};

		const handleOpenActivities = () => {
			if (onToggle && !isOpen) {
				onToggle();
			} else {
				setShowInternal(true);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		window.addEventListener('open-admin-activities', handleOpenActivities);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('open-admin-activities', handleOpenActivities);
		};
	}, [isOpen, onToggle, onClose]);

	const handleClearAllActivities = () => {
		const allIds = activities.map((a) => a._id);
		if (allIds.length > 0) {
			deleteActivities(allIds);
		}
	};

	return (
		<div className="topview-popover-container" ref={actContainerRef}>
			<button 
				type="button" 
				className={`topview-header-btn ${showActivities ? "active" : ""}`}
				onClick={handleToggle}
				aria-label="View recent activities"
				title="Recent Activities"
			>
				<HistoryRoundedIcon className="header-action-icon" />
			</button>

			{showActivities && (
				<div className="topview-dropdown-card activities-popover" role="dialog" aria-label="Activities popup">
					<div className="popover-header">
						<div className="popover-header-title">
							<HistoryRoundedIcon className="popover-title-icon" fontSize="small" />
							<span className="title-text">Recent Activities</span>
							<span className="popover-count-chip">{activities.length} recorded</span>
						</div>

						<div className="popover-header-actions">
							{activities.length > 0 && (
								<button 
									type="button" 
									className="popover-text-action-btn"
									onClick={handleClearAllActivities}
									title="Clear all activities"
								>
									<ClearAllRoundedIcon fontSize="small" />
									<span>Clear</span>
								</button>
							)}
							<button 
								type="button" 
								className="popover-close-btn"
								onClick={handleClose}
								aria-label="Close activities popup"
							>
								<CloseRoundedIcon fontSize="small" />
							</button>
						</div>
					</div>

					<div className="popover-content-list custom-scrollbar">
						{actState?.loading ? (
							<AdminActivitySkeleton rows={3} />
						) : activities.length === 0 ? (
							<div className="popover-empty-state">
								<div className="empty-icon-circle">
									<HistoryToggleOffRoundedIcon fontSize="medium" />
								</div>
								<p className="empty-title">No Recent Activities</p>
								<p className="empty-desc">Your administrative logs and events will appear here.</p>
							</div>
						) : (
							activities.map((act, index) => {
								let timeAgo = "Recently";
								try {
									if (act.date) {
										timeAgo = formatDistanceToNow(new Date(act.date), { addSuffix: true });
									}
								} catch {
									timeAgo = "Recently";
								}

								return (
									<div key={act._id || index} className="popover-activity-item">
										<div className="activity-icon-col">
											{getActivityIcon(act.action)}
										</div>

										<div className="activity-info-col">
											<div className="activity-action-line">
												<span className="act-verb">{capitalizeFirstLetter(act.action)} </span>
												{act.destination && (
													<span className="act-destination">{act.destination}</span>
												)}
											</div>
											{act.title && (
												<p className="act-title-text">"{act.title}"</p>
											)}
											<span className="act-timestamp">
												<CalendarTodayRoundedIcon fontSize="inherit" />
												{timeAgo}
											</span>
										</div>

										<button 
											type="button"
											className="item-delete-btn"
											onClick={() => deleteActivity(act._id)}
											title="Delete entry"
											aria-label="Delete entry"
										>
											<DeleteOutlineRoundedIcon fontSize="small" />
										</button>
									</div>
								);
							})
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Activities;
