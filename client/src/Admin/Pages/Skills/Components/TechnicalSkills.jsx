import { useState, useContext, useMemo } from 'react';
import { NewContext } from '../../../Components/New/Context/NewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import useTechnicalSkillsReducer from '../../../../Hooks/useTechnicalSkillsReducer';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/star-shadow.png';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SimpleIcon from '../../../../Utils/simpleIcons';
import { technicalForm } from './Form';
import { AdminGridSkeleton } from '../../../../Components/Skeletons/AdminSkeletons';
import '../Styles/TechnicalSkills.css';

function TechBadge({ tech, onEdit, onDelete }) {
	return (
		<div className="admin-tech-item">
			<div className="admin-tech-info">
				<span className="admin-tech-icon">
					<SimpleIcon name={tech.icon || tech.name} size="20px" color="#c6ff00" />
				</span>
				<span className="admin-tech-name">{tech.name}</span>
			</div>
			<div className="admin-tech-actions">
				<button
					type="button"
					className="admin-mini-action edit"
					onClick={(e) => {
						e.stopPropagation();
						onEdit(tech);
					}}
					title={`Edit ${tech.name}`}
				>
					<EditOutlinedIcon fontSize="small" />
				</button>
				<button
					type="button"
					className="admin-mini-action delete"
					onClick={(e) => {
						e.stopPropagation();
						onDelete(tech);
					}}
					title={`Delete ${tech.name}`}
				>
					<DeleteOutlineOutlinedIcon fontSize="small" />
				</button>
			</div>
		</div>
	);
}

function CategoryCard({ category, onNewTech }) {
	const { setEdit } = useContext(EditContext);
	const { setAction } = useContext(NotifyContext);
	const { deleteSkill } = useTechnicalSkillsReducer();
	const [showAllModal, setShowAllModal] = useState(false);

	const techStack = category.techStack || [];
	const previewTechs = techStack.slice(0, 4);
	const remainingCount = techStack.length > 4 ? techStack.length - 4 : 0;

	const handleEdit = (tech) => {
		setEdit(technicalForm(tech));
	};

	const handleDelete = async (tech) => {
		try {
			await deleteSkill(tech._id);
			if (setAction) {
				setAction({ type: "delete", component: "skill", name: tech.name });
			}
		} catch (error) {
			console.error("Error deleting technical skill in admin:", error);
			if (setAction) {
				setAction({
					type: "error",
					component: "skill",
					message: error?.message || `Failed to delete ${tech.name}`,
				});
			}
		}
	};

	return (
		<>
			<div className="skill">
				<p className="shadow">
					<img src={ShadowIcon} alt="Shadow icon" />
				</p>

				<p className="title">{category.label}</p>

				<div className="tech-stack">
					{previewTechs.map((tech, index) => (
						<p style={{ left: `-${index * 2}vh`, zIndex: 4 - index }} key={tech._id || index}>
							<SimpleIcon name={tech.icon || tech.name} size="2.5vh" color="#c6ff00" />
						</p>
					))}

					{remainingCount > 0 ? <p className="more">+{remainingCount}</p> : null}
				</div>

				<p className="horizontal-line"></p>

				<div className="see-all">
					<p onClick={() => setShowAllModal(true)}>
						See all techs ({techStack.length})
					</p>
				</div>

				<div className="actions">
					<p
						className="add-button"
						onClick={() => onNewTech(category.label)}
						title={`Add tech to ${category.label}`}
					>
						<AddCircleOutlineOutlinedIcon />
					</p>
				</div>
			</div>

			{showAllModal && (
				<div className="admin-tech-modal-overlay" onClick={() => setShowAllModal(false)}>
					<div className="admin-tech-modal" onClick={(e) => e.stopPropagation()}>
						<div className="admin-tech-modal-header">
							<h3>{category.label} Technologies ({techStack.length})</h3>
							<button
								type="button"
								className="admin-modal-close"
								onClick={() => setShowAllModal(false)}
							>
								<CloseOutlinedIcon />
							</button>
						</div>

						<div className="admin-tech-modal-list">
							{techStack.map((tech) => (
								<TechBadge
									key={tech._id || tech.name}
									tech={tech}
									onEdit={handleEdit}
									onDelete={handleDelete}
								/>
							))}
						</div>

						<div className="admin-tech-modal-footer">
							<button
								type="button"
								className="admin-modal-add-btn"
								onClick={() => {
									setShowAllModal(false);
									onNewTech(category.label);
								}}
							>
								<AddRoundedIcon fontSize="small" />
								<span>Add Tech to {category.label}</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

function TechnicalSkills() {
	const { skills = [], loading } = useTechnicalSkillsReducer();
	const { setNew } = useContext(NewContext);

	// Memoized grouping of technical skills by their label (category)
	const categorizedSkills = useMemo(() => {
		if (!Array.isArray(skills) || skills.length === 0) return [];

		const groups = {};
		for (const skill of skills) {
			const category = (skill.label || "Other").trim();
			if (!groups[category]) {
				groups[category] = [];
			}
			groups[category].push(skill);
		}

		return Object.keys(groups).map((category) => ({
			label: category,
			techStack: groups[category],
		}));
	}, [skills]);

	const handleNew = (defaultCategory = "") => {
		setNew(technicalForm(defaultCategory ? { label: defaultCategory } : null));
	};

	if (loading) {
		return (
			<div className="technical-skills">
				<p className="title">Technical Skills</p>
				<AdminGridSkeleton count={4} />
			</div>
		);
	}

	return (
		<div className="technical-skills">
			<p className="title">Technical Skills</p>

			<p className="new-skill" onClick={() => handleNew()}>
				<span className="icon">
					<AddRoundedIcon fontSize="small" />
				</span>
				New Technical Skill
			</p>

			<div className="grid">
				{categorizedSkills.map((category) => (
					<CategoryCard
						key={category.label}
						category={category}
						onNewTech={handleNew}
					/>
				))}
			</div>
		</div>
	);
}

export default TechnicalSkills;