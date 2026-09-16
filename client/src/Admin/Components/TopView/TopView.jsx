import { NavLink } from 'react-router-dom';
import useProfileReducer from '../../../Hooks/useProfileReducer';
import Activities from '../Activities/Activities';
import Notifications from '../Notifications/Notifications';
import { getAssetUrl } from '../../../Utils/assetUtils';
import './TopView.css';

function TopView({ page, subtitle }) {
	const { profile } = useProfileReducer();

	const { firstName, lastName, nickName, picture } = profile || {};
	const displayName = firstName && lastName ? `${firstName} ${lastName}` : (nickName || "Admin User");
	const initials = firstName && lastName 
		? `${firstName[0]}${lastName[0]}`.toUpperCase() 
		: (displayName ? displayName.slice(0, 2).toUpperCase() : "AU");

	const defaultSubtitle = page === "Dashboard" 
		? "Welcome back to your workspace." 
		: `Manage and customize your ${page?.toLowerCase() || "content"}.`;

	return (
		<header className="admin-topview">
			<div className="topview-actions-area">
				{/* Activities Trigger & Popover */}
				<Activities />

				{/* Notifications Trigger & Popover */}
				<Notifications />

				<div className="topview-separator" />

				{/* Profile Pill */}
				<NavLink 
					to="/admin/profile" 
					className={({ isActive }) => isActive ? "topview-profile-pill active" : "topview-profile-pill"}
					title="View Profile"
				>
					<span className="profile-avatar">
						{picture ? (
							<img src={getAssetUrl(picture)} alt={displayName} className="avatar-img" />
						) : (
							<span className="avatar-initials">{initials}</span>
						)}
					</span>
					<span className="profile-name">{displayName}</span>
				</NavLink>
			</div>

			<div className="topview-title-area">
				<h1 className="page-heading">{page}</h1>
				<p className="page-subheading">{subtitle || defaultSubtitle}</p>
			</div>
		</header>
	);
}

export default TopView;