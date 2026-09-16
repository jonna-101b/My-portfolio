import { useContext } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import { ViewContext } from '../Contexts/ViewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import { DeleteContext } from '../../../Components/ConfirmDelete/Context/DeleteContext';
import { format, formatDistanceToNow } from "date-fns";
import useProjectsReducer from '../../../../Hooks/useProjectsReducer';
import useProjectsDisplayReducer from '../Hooks/useProjectsDisplayReducer';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/cube-shadow.png';
import SimpleIcon from '../../../../Utils/simpleIcons';
import Form from './Form';
import { AdminTableSkeleton, AdminGridSkeleton } from '../../../../Components/Skeletons/AdminSkeletons';
import '../Styles/MainSection.css';


function ProjectLayout({ project, layout }) {
        const { setView } = useContext(ViewContext);
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { openDeleteModal } = useContext(DeleteContext);
        const { deleteProject } = useProjectsReducer();

        const handleView = () => {
                setView(project);
        };

        const handleEdit = () => {
                setEdit(Form(project));
        };

        const handleDelete = () => {
                openDeleteModal({
                        id: project._id,
                        title: project.title,
                        type: "Project",
                        componentName: "project",
                        details: project.contribution || (project.domains ? project.domains.join(', ') : null),
                        onConfirm: async () => {
                                try {
                                        await deleteProject(project._id);
                                        if (setAction) {
                                                setAction({ type: "delete", component: "project", name: project.title });
                                        }
                                } catch (error) {
                                        console.error("Error deleting project:", error);
                                        if (setAction) {
                                                setAction({ type: "error", component: "project", message: error?.message || "Failed to delete project" });
                                        }
                                }
                        }
                });
        };

        const formatDate = (date) => {
                try {
                        return format(new Date(date), "MMMM do, yyyy");
                } catch {
                        return "";
                }
        };

        const renderTechStack = (techStack) => {
                if (!techStack || !Array.isArray(techStack) || techStack.length === 0) return null;
                const visibleTechs = techStack.slice(0, 3);
                const remainingCount = techStack.length - 3;

                return (
                        <div className="tech-stack-avatars">
                                {visibleTechs.map((tech, idx) => {
                                        const iconSrc = typeof tech === 'object' ? tech?.icon : null;
                                        const name = typeof tech === 'object' ? tech?.name : tech;
                                        return (
                                                <div key={idx} className="tech-avatar" title={name}>
                                                        <SimpleIcon name={iconSrc || name} size="20px" color="#c6ff00" />
                                                </div>
                                        );
                                })}
                                {remainingCount > 0 && (
                                        <div className="tech-avatar remaining-count">
                                                +{remainingCount}
                                        </div>
                                )}
                        </div>
                );
        };

        if (layout) {
                return (
                        <div className="project-layout list-layout">
                                <p className="title">{ project.title }</p>
                                <p className="contribution"><span>{ project.contribution }</span></p>
                                <p className="published-on">{ formatDate(project.createdAt) }</p>
                                <p className="last-updated">{ project.updatedAt ? formatDistanceToNow(new Date(project.updatedAt), {addSuffix: true}) : "" }</p>
                                <div className="actions">
                                        <button type="button" className="action-btn view-icon" onClick={handleView} title="View" aria-label="View">
                                                <VisibilityOutlinedIcon />
                                        </button>
                                        <button type="button" className="action-btn edit-icon" onClick={handleEdit} title="Edit" aria-label="Edit">
                                                <EditOutlinedIcon />
                                        </button>
                                        <button type="button" className="action-btn delete-icon" onClick={handleDelete} title="Delete" aria-label="Delete">
                                                <DeleteOutlineOutlinedIcon />
                                        </button>
                                </div>
                        </div>
                );
        }

        return (
                <div className="project-layout">
                        <div className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </div>

                        <div className="banner-container">
                                { project.image ? (
                                        <img src={project.image} alt={project.title} className="banner-image" />
                                ) : (
                                        <div className="placeholder-banner">
                                                <div className="placeholder-icon-box">
                                                        <CodeOutlinedIcon className="placeholder-icon" />
                                                </div>
                                                <span className="placeholder-text">Project Preview</span>
                                        </div>
                                )}
                                { project.contribution && (
                                        <span className="contribution-badge">{ project.contribution }</span>
                                )}
                        </div>

                        <div className="card-middle">
                                <h3 className="title">{ project.title }</h3>
                                { renderTechStack(project.techStack) }
                        </div>

                        <div className="card-divider" />

                        <div className="card-footer">
                                <p className="date">{ formatDate(project.createdAt) }</p>

                                <div className="actions">
                                        <button type="button" className="action-btn view-icon" onClick={handleView} title="View" aria-label="View">
                                                <VisibilityOutlinedIcon />
                                        </button>

                                        <button type="button" className="action-btn edit-icon" onClick={handleEdit} title="Edit" aria-label="Edit">
                                                <EditOutlinedIcon />
                                        </button>

                                        <button type="button" className="action-btn delete-icon" onClick={handleDelete} title="Delete" aria-label="Delete">
                                                <DeleteOutlineOutlinedIcon />
                                        </button>
                                </div>
                        </div>
                </div>
        );
}

function MainSection() {
        const { projects, loading } = useProjectsDisplayReducer();
        const { layout } = useContext(LayoutContext);

        if (loading) {
                return (
                        <div className="main-section">
                                { layout ? <AdminTableSkeleton rows={5} /> : <AdminGridSkeleton count={6} /> }
                        </div>
                );
        }

        return (
                <div className="main-section">
                        { layout ? 
                                <div className="labels">
                                        <p>Title</p>
                                        <p>Contribution</p>
                                        <p>Published on</p>
                                        <p>Last updated</p>
                                        <p>Actions</p>
                                </div>
                        : "" }

                        <div className={ layout ? "list" : "grid" }>
                                { projects.map((project, index) => (
                                        <ProjectLayout key={index} project={project} layout={layout} />
                                )) }
                        </div>
                </div>
        );
}

export default MainSection;