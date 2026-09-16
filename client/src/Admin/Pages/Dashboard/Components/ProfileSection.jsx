import useProfileReducer from '../../../../Hooks/useProfileReducer';
import SimpleIcon from '../../../../Utils/simpleIcons';
import { AdminProfileSectionSkeleton } from '../../../../Components/Skeletons/AdminSkeletons';
import '../Styles/ProfileSection.css';

function ProfileSection() {
	const { profile, loading } = useProfileReducer();

	if (loading) {
		return <AdminProfileSectionSkeleton />;
	}

	const { 
		firstName, 
		lastName, 
		nickName, 
		picture, 
		socialLinks = [], 
		email, 
		address, 
		bio,
		availability
	} = profile || {};

	const displayName = `${firstName || ''} ${lastName || ''}`.trim() || nickName || 'Admin';
	const initials = firstName && lastName 
		? `${firstName[0]}${lastName[0]}`.toUpperCase() 
		: (displayName ? displayName.slice(0, 2).toUpperCase() : "AU");

	return (
		<div className="dash-profile-card">
			<div className="profile-image-container">
				<div className="profile-image-frame">
					{picture ? (
						<img src={picture} alt={displayName} className="profile-photo" />
					) : (
						<span className="avatar-initials" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--admin-accent)' }}>
							{initials}
						</span>
					)}
				</div>
			</div>

			<div className="profile-details-container">
				<div className="profile-badge-row">
					<span className="availability-badge">
						<span className="badge-dot"></span>
						{availability ? "AVAILABLE FOR HIRE" : "NOT AVAILABLE"}
					</span>
				</div>

				<h2 className="profile-greeting">
					Hello {nickName || firstName || "Admin"}!
				</h2>

				{bio ? (
					<p className="profile-bio">
						{bio}
					</p>
				) : null}

				<div className="profile-meta-grid">
					{email ? (
						<div className="meta-item">
							<span className="meta-label">EMAIL</span>
							<span className="meta-value">{email}</span>
						</div>
					) : null}

					{address ? (
						<div className="meta-item">
							<span className="meta-label">LOCATION</span>
							<span className="meta-value">{address}</span>
						</div>
					) : null}
				</div>

				{socialLinks && socialLinks.length > 0 ? (
					<div className="profile-socials-row">
						<span className="socials-label">SOCIALS</span>
						<div className="social-icons-list">
							{socialLinks.map((link, index) => (
								<a 
									key={link._id || link.name || index} 
									href={link.url || "#"} 
									target="_blank" 
									rel="noopener noreferrer" 
									className="social-btn" 
									title={link.name}
									aria-label={link.name}
								>
									<SimpleIcon name={link.icon || link.name} size="1.25rem" color="#ededed" />
								</a>
							))}
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default ProfileSection;