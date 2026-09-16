import { useState, useContext, useMemo } from "react";
import { ThemeContext } from '../../../Contexts/ThemeContext';
import useTechnicalSkillsReducer from '../../../Hooks/useTechnicalSkillsReducer';
import useConceptualSkillsReducer from '../../../Hooks/useConceptualSkillsReducer';
import SkillsPreviewSkeleton from '../../../Components/Skeletons/SkillsPreviewSkeleton';
import SimpleIcon from '../../../Utils/simpleIcons';
import ShadowIcon from '../../../assets/Icons/Common/star-shadow.png';
import ShadowLightIcon from '../../../assets/Icons/Common/star-light.png';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import '../Styles/SkillsPreview.css';

// Backward compatibility helper
export const getTechIconUrl = (icon) => {
	if (!icon) return "";
	if (icon.startsWith("http://") || icon.startsWith("https://") || icon.startsWith("/") || icon.startsWith("data:")) {
		return icon;
	}
	const clean = icon.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
	return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${clean}/${clean}-original.svg`;
};

const Tech = ({ tech, color = "var(--icon-opt-1)" }) => {
	return (
		<div className="tech">
			<p className="icon">
				<SimpleIcon name={tech.icon || tech.name} color={color} size="clamp(2.25rem, 5vw, 3.25rem)" />
			</p>
			<p className="name">{tech.name}</p>
		</div>
	);
};

function ConceptualSkill({ skill }) {
	const { theme } = useContext(ThemeContext);
	return (
		<div className="skill">
			<p className="icon">
				<LightbulbIcon />
			</p>

			<p className="shadow">
				<img src={theme === 'dark' ? ShadowIcon : ShadowLightIcon} alt="Shadow icon" />
			</p>

			<div className="main-content">
				<div className="title">{skill.title}</div>
				<div className="description">{skill.description}</div>
			</div>
		</div>
	);
}

function SkillsPreview() {
	const { skills: hardSkills = [], loading: techLoading } = useTechnicalSkillsReducer();
	const { skills: softSkills = [], loading: conceptLoading } = useConceptualSkillsReducer();

	// Heavy calculation memoized: group flat technical skills by their category (label)
	const categorizedSkills = useMemo(() => {
		if (!Array.isArray(hardSkills) || hardSkills.length === 0) return [];

		const groups = {};
		for (const skill of hardSkills) {
			const category = (skill.label || "Other").trim();
			if (!groups[category]) {
				groups[category] = [];
			}
			groups[category].push(skill);
		}

		return Object.keys(groups).map((category) => ({
			label: category,
			techs: groups[category],
		}));
	}, [hardSkills]);

	const [selectedCategory, setSelectedCategory] = useState("");

	const activeCategory = useMemo(() => {
		if (selectedCategory && categorizedSkills.some((cat) => cat.label === selectedCategory)) {
			return selectedCategory;
		}
		return categorizedSkills[0]?.label || "";
	}, [categorizedSkills, selectedCategory]);

	const visibleTechs = useMemo(() => {
		const current = categorizedSkills.find((cat) => cat.label === activeCategory);
		return current ? current.techs : [];
	}, [categorizedSkills, activeCategory]);

	if (techLoading || conceptLoading) {
		return <SkillsPreviewSkeleton />;
	}

	const hasTechnical = categorizedSkills.length > 0 && visibleTechs.length > 0;
	const hasConceptual = Array.isArray(softSkills) && softSkills.length > 0;

	if (!hasTechnical && !hasConceptual) {
		return null;
	}

	return (
		<div className="skills-preview">
			<div className="main-title">
				<p>My Skills</p>
			</div>

			{hasTechnical && (
				<div className="technical-skills">
					<div className="sub-title">
						<p>Technical Skills</p>
					</div>

					<div className="skills">
						{categorizedSkills.map((category) => (
							<p
								key={category.label}
								className={activeCategory === category.label ? "focused" : ""}
								onClick={() => setSelectedCategory(category.label)}
							>
								{category.label}
							</p>
						))}
					</div>

					<div className="techs">
						{visibleTechs.map((tech) => (
							<Tech key={tech._id || tech.name} tech={tech} />
						))}
					</div>
				</div>
			)}

			{hasConceptual && (
				<div className="conceptual-skills">
					<div className="sub-title">
						<p>Conceptual Skills</p>
					</div>

					<div className="skills-loop">
						<div className="skills-track">
							{softSkills.map((skill) => (
								<ConceptualSkill key={skill._id} skill={skill} />
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SkillsPreview;