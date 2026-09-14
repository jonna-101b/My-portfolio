import { useMemo } from 'react';
import useProfileReducer from '../../../Hooks/useProfileReducer';
import useTechnicalSkillsReducer from '../../../Hooks/useTechnicalSkillsReducer';

import SimpleIcon from '../../../Utils/simpleIcons';
import '../Styles/MainSection.css';

function MainSection() {
        const { profile } = useProfileReducer();
        const { skills = [] } = useTechnicalSkillsReducer();

        const {
                picture = 'https://randomuser.me/api/portraits/men/32.jpg',
                firstName = 'Johnny',
                lastName = 'Doe',
                nickName = 'Johnny',
                email = 'johnny@portfolio.dev',
                availability = true,
                description = {},
                socialLinks = []
        } = profile || {};

	// Extract technical skills into a flat list of unique items
	const coreSkillsList = useMemo(() => {
		if (!Array.isArray(skills) || skills.length === 0) {
			return [
				{ _id: '1', name: 'Node.js' },
				{ _id: '2', name: 'Express.js' },
				{ _id: '3', name: 'React' },
				{ _id: '4', name: 'Redux' },
				{ _id: '5', name: 'MongoDB' },
				{ _id: '6', name: 'Springboot' },
				{ _id: '7', name: 'Tailwind' },
				{ _id: '8', name: 'JavaScript' }
			];
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
				// Backward compatibility for nested category items if any
				for (const tech of item.techStack) {
					if (tech && tech.name && !seen.has(tech.name.toLowerCase())) {
						seen.add(tech.name.toLowerCase());
						extracted.push(tech);
					}
				}
			}
		}

		return extracted.length > 0 ? extracted : [
			{ _id: '1', name: 'Node.js' },
			{ _id: '2', name: 'Express.js' },
			{ _id: '3', name: 'React' },
			{ _id: '4', name: 'Redux' },
			{ _id: '5', name: 'MongoDB' },
			{ _id: '6', name: 'Springboot' },
			{ _id: '7', name: 'Tailwind' },
			{ _id: '8', name: 'JavaScript' }
		];
	}, [skills]);

        // Connect links (fallback to code, work, web if empty)
        const connectLinks = useMemo(() => {
                if (socialLinks && socialLinks.length > 0) {
                        return socialLinks;
                }
                return [
                        { _id: 'conn-1', name: 'GitHub', url: 'https://github.com' },
                        { _id: 'conn-2', name: 'Portfolio', url: '#' },
                        { _id: 'conn-3', name: 'Terminal', url: '#' }
                ];
        }, [socialLinks]);

        // Split bio description into clean paragraphs
        const bioParagraphs = useMemo(() => {
                const text = description?.detailed || description?.brief;
                if (!text) {
                        return [
                                "I am a software engineer dedicated to building high-scale, resilient applications. My focus lies at the intersection of rigorous architecture and seamless user experience. I believe that elegant code is indistinguishable from magic, but it's built on a foundation of disciplined engineering.",
                                "Over the past decade, I've navigated complex technical terrains, leading teams to deliver mission-critical systems. Beyond writing code, I am deeply invested in mentoring the next generation of developers, fostering cultures of technical excellence and continuous learning."
                        ];
                }

                // If already containing linebreaks, split by newline
                if (text.includes('\n')) {
                        return text.split('\n').map(p => p.trim()).filter(Boolean);
                }

                // If it's a long paragraph, break it nicely into 2 coherent sections for layout balance
                const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
                if (sentences.length >= 4) {
                        const mid = Math.ceil(sentences.length / 2);
                        const p1 = sentences.slice(0, mid).join(' ').trim();
                        const p2 = sentences.slice(mid).join(' ').trim();
                        return [p1, p2];
                }

                return [text];
        }, [description]);

        const displayName = `${firstName || ''} ${lastName || ''}`.trim() || nickName || 'Johnny Doe';

        return (
                <div className="about-main-wrapper">
                        <section className="about-main-section">
                                {/* Left Column: Profile Card & Quick Info */}
                                <div className="about-profile-col">
                                        <div className="profile-image-card">
                                                <img
                                                        src={picture}
                                                        alt={displayName}
                                                        className="profile-photo-img"
                                                        loading="lazy"
                                                />
                                                {availability && (
                                                        <div className="availability-badge" aria-label="Available for work">
                                                                <span className="availability-dot" />
                                                                <span className="availability-text">AVAILABLE FOR WORK</span>
                                                        </div>
                                                )}
                                        </div>

                                        <div className="profile-info-card">
                                                <div className="info-item">
                                                        <span className="info-label">NAME</span>
                                                        <p className="info-val info-name">{displayName}</p>
                                                </div>

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
                                        </div>
                                </div>

                                {/* Right Column: Greeting, Story Narrative & Core Skills */}
                                <div className="about-content-col">
                                        <header className="about-greeting-header">
                                                <h1 className="greeting-line-1">Hi there!</h1>
                                                <h1 className="greeting-line-2">
                                                        <span className="greeting-accent-name">{nickName || firstName}</span>
                                                        <span className="greeting-here-text"> here.</span>
                                                </h1>
                                        </header>

                                        <article className="about-bio-text">
                                                {bioParagraphs.map((paragraph, index) => (
                                                        <p key={index} className="bio-paragraph">
                                                                {paragraph}
                                                        </p>
                                                ))}
                                        </article>

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
                                </div>
                        </section>
                </div>
        );
}

export default MainSection;