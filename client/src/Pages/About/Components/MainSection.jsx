import { useMemo } from 'react';
import useProfileReducer from '../../../Hooks/useProfileReducer';
import useTechnicalSkillsReducer from '../../../Hooks/useTechnicalSkillsReducer';
import SimpleIcon from '../../../Utils/simpleIcons';
import { getInitials } from '../../../Utils/avatarUtils';
import AboutMainSectionSkeleton from '../../../Components/Skeletons/AboutMainSectionSkeleton';
import '../Styles/MainSection.css';

function MainSection() {
	const { profile, loading } = useProfileReducer();
	const { skills = [] } = useTechnicalSkillsReducer();

	if (loading) {
		return <AboutMainSectionSkeleton />;
	}

	const {
		picture,
		firstName,
		lastName,
		nickName,
		email,
		availability,
		description,
		socialLinks
	} = profile || {};

	// Extract technical skills into a flat list of unique items
	const coreSkillsList = useMemo(() => {
		if (!Array.isArray(skills) || skills.length === 0) {
			return [];
		}

		const extracted = [];
		const seen = new Set();

		for (const item of skills) {
			if (!item) continue;

			// Support flat skill items
			if (item.name && !seen.has(item.name.toLowerCase())) {
				seen.add(item.name.toLowerCase());
				extracted.push(item);
			} else if (item.techStack && Array.isArray(item.techStack)) {
				for (const tech of item.techStack) {
					if (tech && tech.name && !seen.has(tech.name.toLowerCase())) {
						seen.add(tech.name.toLowerCase());
						extracted.push(tech);
					}
				}
			}
		}

		return extracted;
	}, [skills]);

	const connectLinks = useMemo(() => {
		if (Array.isArray(socialLinks) && socialLinks.length > 0) {
			return socialLinks;
		}
		return [];
	}, [socialLinks]);

	const bioParagraphs = useMemo(() => {
		const text = description?.detailed || description?.brief;
		if (!text) {
			return [];
		}

		if (text.includes('\n')) {
			return text.split('\n').map((p) => p.trim()).filter(Boolean);
		}

		const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
		if (sentences.length >= 4) {
			const mid = Math.ceil(sentences.length / 2);
			const p1 = sentences.slice(0, mid).join(' ').trim();
			const p2 = sentences.slice(mid).join(' ').trim();
			return [p1, p2];
		}

		return [text];
	}, [description]);

	const displayName = `${firstName || ''} ${lastName || ''}`.trim() || nickName || '';

	return (
		<div className="about-main-wrapper">
			<section className="about-main-section">
				{/* Left Column: Profile Card & Quick Info */}
				<div className="about-profile-col">
					<div className="profile-image-card">
						{picture ? (
							<img
								src={picture}
								alt={displayName || "Profile photo"}
								className="profile-photo-img"
								loading="lazy"
							/>
						) : (
							<div className="profile-photo-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card-bg, #1e293b)' }}>
								<span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--admin-accent, #c6ff00)' }}>
									{getInitials(displayName)}
								</span>
							</div>
						)}

						{availability ? (
							<div className="availability-badge" aria-label="Available for work">
								<span className="availability-dot" />
								<span className="availability-text">AVAILABLE FOR WORK</span>
							</div>
						) : null}
					</div>

					<div className="profile-info-card">
						{displayName ? (
							<div className="info-item">
								<span className="info-label">NAME</span>
								<p className="info-val info-name">{displayName}</p>
							</div>
						) : null}

						{email ? (
							<div className="info-item">
								<span className="info-label">EMAIL</span>
								<a
									href={`mailto:${email}`}
									className="info-val info-link info-email"
									title={`Send email to ${email}`}
								>
									{email}
								</a>
							</div>
						) : null}

						{connectLinks.length > 0 ? (
							<div className="info-item info-connect-item">
								<span className="info-label">CONNECT</span>
								<div className="connect-actions-list">
									{connectLinks.map((link, idx) => (
										<a
											key={link._id || idx}
											href={link.url || '#'}
											target="_blank"
											rel="noopener noreferrer"
											className="connect-btn"
											title={link.name || 'Connect'}
											aria-label={link.name || 'Connect'}
										>
											<SimpleIcon name={link.icon || link.name} size="1.25em" color="currentColor" />
										</a>
									))}
								</div>
							</div>
						) : null}
					</div>
				</div>

				{/* Right Column: Greeting, Story Narrative & Core Skills */}
				<div className="about-content-col">
					{(nickName || firstName) ? (
						<header className="about-greeting-header">
							<h1 className="greeting-line-1">Hi there!</h1>
							<h1 className="greeting-line-2">
								<span className="greeting-accent-name">{nickName || firstName}</span>
								<span className="greeting-here-text"> here.</span>
							</h1>
						</header>
					) : null}

					{bioParagraphs.length > 0 ? (
						<article className="about-bio-text">
							{bioParagraphs.map((paragraph, index) => (
								<p key={index} className="bio-paragraph">
									{paragraph}
								</p>
							))}
						</article>
					) : null}

					{coreSkillsList.length > 0 ? (
						<div className="core-skills-block">
							<h2 className="core-skills-heading">Core Skills</h2>
							<div className="core-skills-pills">
								{coreSkillsList.map((skill, index) => (
									<div key={skill._id || `${skill.name}-${index}`} className="skill-pill-item">
										<span className="skill-pill-icon-wrapper" aria-hidden="true">
											<SimpleIcon name={skill.icon || skill.name} size="1.15em" color="var(--icon-opt-1)" />
										</span>
										<span className="skill-pill-title">{skill.name}</span>
									</div>
								))}
							</div>
						</div>
					) : null}
				</div>
			</section>
		</div>
	);
}

export default MainSection;