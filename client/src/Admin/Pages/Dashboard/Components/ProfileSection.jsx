import useProfileReducer from '../../../../Hooks/useProfileReducer';
import SimpleIcon from '../../../../Utils/simpleIcons';
import '../Styles/ProfileSection.css';

function ProfileSection() {
        const { profile } = useProfileReducer();
        const { 
                firstName = "John", 
                lastName = "Doe", 
                nickName = "Johnny", 
                picture = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", 
                socialLinks = [], 
                email = "johnny.dev@portfolio.io", 
                address = "San Francisco, CA",
                bio = "Senior Full-Stack Engineer & Interaction Designer specializing in immersive digital experiences."
        } = profile || {};

        const defaultSocials = [
                { _id: '1', name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
                { _id: '2', name: 'GitHub', icon: 'github', url: 'https://github.com' },
                { _id: '3', name: 'Twitter', icon: 'x', url: 'https://x.com' }
        ];

        return (
                <div className="dash-profile-card">
                        <div className="profile-image-container">
                                <div className="profile-image-frame">
                                        <img src={picture} alt={`${firstName} ${lastName}`} className="profile-photo" />
                                </div>
                        </div>

                        <div className="profile-details-container">
                                <div className="profile-badge-row">
                                        <span className="availability-badge">
                                                <span className="badge-dot"></span>
                                                AVAILABLE FOR HIRE
                                        </span>
                                </div>

                                <h2 className="profile-greeting">
                                        Hello {nickName || firstName}!
                                </h2>

                                <p className="profile-bio">
                                        {bio}
                                </p>

                                <div className="profile-meta-grid">
                                        <div className="meta-item">
                                                <span className="meta-label">EMAIL</span>
                                                <span className="meta-value">{email}</span>
                                        </div>

                                        <div className="meta-item">
                                                <span className="meta-label">LOCATION</span>
                                                <span className="meta-value">{address}</span>
                                        </div>
                                </div>

                                <div className="profile-socials-row">
                                        <span className="socials-label">SOCIALS</span>
                                        <div className="social-icons-list">
                                                {socialLinks && socialLinks.length > 0 ? (
                                                        socialLinks.map((link, index) => (
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
                                                        ))
                                                ) : (
                                                        defaultSocials.map((social) => (
                                                                <a 
                                                                        key={social._id} 
                                                                        href={social.url} 
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="social-btn" 
                                                                        title={social.name}
                                                                        aria-label={social.name}
                                                                >
                                                                        <SimpleIcon name={social.icon || social.name} size="1.25rem" color="#ededed" />
                                                                </a>
                                                        ))
                                                )}
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default ProfileSection;