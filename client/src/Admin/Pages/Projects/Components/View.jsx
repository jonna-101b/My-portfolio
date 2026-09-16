import { useContext } from 'react';
import { ViewContext } from '../Contexts/ViewContext';
import { format } from 'date-fns';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import SimpleIcon from '../../../../Utils/simpleIcons';
import '../Styles/View.css';


const Tech = ({ tech }) => {
        const name = typeof tech === 'object' ? tech.name : tech;
        const iconName = typeof tech === 'object' ? (tech.icon || tech.name) : tech;

        return (
                <div className="tech-chip">
                        <span className="tech-icon">
                                <SimpleIcon name={iconName} size="18px" color="#c6ff00" />
                        </span>
                        <span className="tech-name">{name}</span>
                </div>
        );
};

function Wrapper({ project, handleDisplay }) {
        const descriptionText = typeof project.description === 'object'
                ? (project.description?.detailed || project.description?.brief || "")
                : (project.description || "");

        const formatDate = (date) => {
                if (!date) return "";
                try {
                        return format(new Date(date), "MMMM do, yyyy");
                } catch {
                        return "";
                }
        };

        const handleOpenLink = (url) => {
                if (url) {
                        window.open(url, "_blank", "noopener,noreferrer");
                }
        };

        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation(); }}>
                        <div className="view-modal-header">
                                <div className="component-name">
                                        <CodeOutlinedIcon className="header-icon" />
                                        <span>Project Details</span>
                                </div>
                                <button
                                        type="button"
                                        className="view-close-btn"
                                        onClick={handleDisplay}
                                        title="Close"
                                        aria-label="Close details"
                                >
                                        <CloseRoundedIcon />
                                </button>
                        </div>

                        <div className="container">
                                <div className="hero-banner-section">
                                        <div className="banner-image-wrapper">
                                                {project.image ? (
                                                        <img src={project.image} alt={project.title || "Project preview"} />
                                                ) : (
                                                        <div className="placeholder-banner">
                                                                <CodeOutlinedIcon className="placeholder-icon" />
                                                                <span>No Banner Preview</span>
                                                        </div>
                                                )}
                                                {project.contribution && (
                                                        <span className="contribution-pill">{project.contribution}</span>
                                                )}
                                        </div>

                                        <div className="project-title-meta">
                                                <h2 className="title">{project.title}</h2>
                                                {project.createdAt && (
                                                        <span className="published-date">
                                                                <CalendarTodayOutlinedIcon className="date-icon" />
                                                                {formatDate(project.createdAt)}
                                                        </span>
                                                )}
                                        </div>
                                </div>

                                {project.domains && project.domains.length > 0 && (
                                        <div className="domains-section">
                                                <div className="section-label">
                                                        <CategoryOutlinedIcon className="section-icon" />
                                                        <span>Domains</span>
                                                </div>
                                                <div className="domains-list">
                                                        {project.domains.map((domain, index) => (
                                                                <span key={index} className="domain-pill">
                                                                        {domain}
                                                                </span>
                                                        ))}
                                                </div>
                                        </div>
                                )}

                                {descriptionText && (
                                        <div className="content-section">
                                                <div className="section-label">
                                                        <DescriptionOutlinedIcon className="section-icon" />
                                                        <span>Description</span>
                                                </div>
                                                <div className="description-card">
                                                        <p>{descriptionText}</p>
                                                </div>
                                        </div>
                                )}

                                {project.features && project.features.length > 0 && (
                                        <div className="features-section">
                                                <div className="section-label">
                                                        <CheckCircleOutlineRoundedIcon className="section-icon" />
                                                        <span>Key Features</span>
                                                </div>
                                                <div className="features-grid">
                                                        {project.features.map((feature, index) => (
                                                                <div key={index} className="feature-item">
                                                                        <ArrowForwardRoundedIcon className="feature-bullet" />
                                                                        <span>{feature}</span>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                )}

                                {project.techStack && project.techStack.length > 0 && (
                                        <div className="tech-section">
                                                <div className="section-label">
                                                        <TerminalOutlinedIcon className="section-icon" />
                                                        <span>Tech Stack</span>
                                                </div>
                                                <div className="tech-stack-list">
                                                        {project.techStack.map((tech, index) => (
                                                                <Tech key={index} tech={tech} />
                                                        ))}
                                                </div>
                                        </div>
                                )}
                        </div>

                        <div className="view-modal-footer">
                                <div className="action-links">
                                        {project.githubLink && (
                                                <button
                                                        type="button"
                                                        className="action-link-btn github-btn"
                                                        onClick={() => handleOpenLink(project.githubLink)}
                                                >
                                                        <GitHubIcon className="btn-icon" />
                                                        <span>View GitHub</span>
                                                </button>
                                        )}

                                        {project.projectLink && (
                                                <button
                                                        type="button"
                                                        className="action-link-btn live-btn"
                                                        onClick={() => handleOpenLink(project.projectLink)}
                                                >
                                                        <LaunchRoundedIcon className="btn-icon" />
                                                        <span>Live Demo</span>
                                                </button>
                                        )}
                                </div>

                                <button type="button" className="close-action-btn" onClick={handleDisplay}>
                                        Close
                                </button>
                        </div>
                </div>
        );
}

function isEmptyObject(obj) {
        if (typeof obj !== "object" || obj === null) return false;
        return Object.keys(obj).length === 0;
}

function View() {
        const { view, setView } = useContext(ViewContext);

        const handleDisplay = () => {
                setView({});
        };

        return (
                <div className={`view ${isEmptyObject(view) ? "" : "active"}`} onClick={handleDisplay}>
                        {isEmptyObject(view) ? "" : <Wrapper project={view} handleDisplay={handleDisplay} />}
                </div>
        );
}

export default View;