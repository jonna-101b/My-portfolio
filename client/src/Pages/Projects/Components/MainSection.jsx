import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useProjectsReducer from '../../../Hooks/useProjectsReducer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded';
import SimpleIcon from '../../../Utils/simpleIcons';
import ProjectsMainSectionSkeleton from '../../../Components/Skeletons/ProjectsMainSectionSkeleton';
import '../Styles/MainSection.css';


const Domain = ({ domain, isSelected, handleDomainSelection }) => (
        <p className={ isSelected  === domain ? "focused"  : ""} onClick={ () => {handleDomainSelection(domain)} }>{ domain }</p>
);

function Project({ project }) {
        const descriptionText = typeof project.description === 'object' 
                ? (project.description?.detailed || project.description?.brief || "") 
                : (project.description || "");

        return (
                <div className="project">
                        <div className="project-image-column">
                                {project.image ? (
                                        <img src={project.image} alt={project.title} className="project-cover-image" />
                                ) : (
                                        <div className="project-image-placeholder">
                                                <ImageNotSupportedRoundedIcon className="placeholder-icon" />
                                                <p className="placeholder-text">No preview image available</p>
                                        </div>
                                )}
                        </div>

                        <div className="project-info-column">
                                <h2 className="project-title">{project.title}</h2>

                                {Array.isArray(project.domains) && project.domains.length > 0 && (
                                        <div className="project-domains">
                                                {project.domains.map((domain, index) => (
                                                        <span key={index} className="domain-pill">{domain}</span>
                                                ))}
                                        </div>
                                )}

                                {descriptionText && (
                                        <p className="project-description">{descriptionText}</p>
                                )}

                                {Array.isArray(project.features) && project.features.length > 0 && (
                                        <ul className="project-features">
                                                {project.features.map((feature, index) => (
                                                        <li key={index} className="feature-item">{feature}</li>
                                                ))}
                                        </ul>
                                )}

                                {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                                        <div className="project-tech-stack">
                                                {project.techStack.map((tech, index) => {
                                                        const icon = typeof tech === 'object' ? tech?.icon : null;
                                                        const name = typeof tech === 'object' ? tech?.name : tech;
                                                        return (
                                                                <div key={index} className="tech-pill">
                                                                        <SimpleIcon name={icon || name} size="16px" color="var(--icon-opt-1)" className="tech-pill-icon" />
                                                                        <span className="tech-pill-name">{name}</span>
                                                                </div>
                                                        );
                                                })}
                                        </div>
                                )}

                                <div className="project-action-buttons">
                                        {project.githubLink && (
                                                <a 
                                                        className="action-pill-btn github-btn" 
                                                        href={project.githubLink} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        aria-label="GitHub repository"
                                                >
                                                        <span>Github link</span>
                                                        <GitHubIcon className="btn-icon" />
                                                </a>
                                        )}

                                        {project.projectLink && (
                                                <a 
                                                        className="action-pill-btn project-btn" 
                                                        href={project.projectLink} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        aria-label="View live project"
                                                >
                                                        <span>Project link</span>
                                                        <LinkRoundedIcon className="btn-icon" />
                                                </a>
                                        )}
                                </div>
                        </div>
                </div>
        );
}

function ProjectCard({ project, handleProjectSelection }) {
        const visibleTechCount = 3;
        const techStack = Array.isArray(project.techStack) ? project.techStack.slice(0, visibleTechCount) : [];
        const remainingTechCount = Array.isArray(project.techStack) && project.techStack.length > visibleTechCount 
                ? project.techStack.length - visibleTechCount 
                : 0;

        return (
                <div className="project-card">
                        <div className="card-image-wrapper">
                                {project.image ? (
                                        <img src={project.image} alt={project.title} className="card-image" />
                                ) : (
                                        <div className="card-image-placeholder">
                                                <ImageNotSupportedRoundedIcon className="placeholder-icon" />
                                                <span className="placeholder-text">No preview image</span>
                                        </div>
                                )}
                        </div>

                        <div className="card-content">
                                <div className="card-header">
                                        <h3 className="title">{project.title}</h3>
                                        {project.contribution && (
                                                <span className="contribution-badge">{project.contribution}</span>
                                        )}
                                </div>

                                <div className="tech-stack">
                                        {techStack.map((tech, index) => {
                                                const icon = typeof tech === 'object' ? tech?.icon : null;
                                                const name = typeof tech === 'object' ? tech?.name : tech;
                                                return (
                                                        <div 
                                                                key={index} 
                                                                className="tech-avatar" 
                                                                style={{ zIndex: visibleTechCount - index }}
                                                                title={name || "Technology"}
                                                        >
                                                                <SimpleIcon name={icon || name} size="20px" color="var(--icon-opt-1)" />
                                                        </div>
                                                );
                                        })}
                                        {remainingTechCount > 0 && (
                                                <div className="tech-avatar remaining-badge" style={{ zIndex: 0 }}>
                                                        +{remainingTechCount}
                                                </div>
                                        )}
                                </div>

                                <div className="card-divider" />

                                <div className="card-footer">
                                        <div className="card-actions-left">
                                                {project.githubLink && (
                                                        <a 
                                                                className="action-btn github-btn" 
                                                                href={project.githubLink} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                aria-label="GitHub repository"
                                                                title="GitHub Repository"
                                                        >
                                                                <GitHubIcon className="card-action-icon" />
                                                        </a>
                                                )}
                                                {project.projectLink && (
                                                        <a 
                                                                className="action-btn link-btn" 
                                                                href={project.projectLink} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                aria-label="View live project"
                                                                title="View Live Project"
                                                        >
                                                                <LinkRoundedIcon className="card-action-icon" />
                                                        </a>
                                                )}
                                        </div>

                                        <button 
                                                type="button" 
                                                className="view-project-btn" 
                                                onClick={() => handleProjectSelection(project)}
                                        >
                                                <span>view project</span>
                                                <VisibilityRoundedIcon className="btn-icon" />
                                        </button>
                                </div>
                        </div>
                </div>
        );
}

const findDomains = (projects = []) => {
        let domainsSet = new Set();
        if (!Array.isArray(projects)) return domainsSet;
        for (let project of projects) {
                if (Array.isArray(project?.domains)) {
                        for (let domain of project.domains) {
                                if (domain) domainsSet.add(domain);
                        }
                }
        }

        return domainsSet;
};

function MainSection() {
        const { state } = useProjectsReducer();
        const projects = state?.projects || [];
        const loading = state?.loading;
        const [ view, setView ] = useState([]);
        const { projectId } = useParams();
        const [ previewedProject, setPreviewedProject ] = useState(null);
        const [ isSelected, setIsSelected ] = useState("All");
        const domains = [ ...findDomains(projects) ];
        const mainSectionRef = useRef(null);
        let navigate = useNavigate();

        const handleDomainSelection = (domain) => {
                setIsSelected(domain);
                if (projectId) {
                        navigate('/projects');
                } else {
                        setPreviewedProject(null);
                }
        };

        const handleProjectSelection = (project) => {
                navigate(`/projects/${project._id}`);
        };

        useEffect(() => {
                if (!Array.isArray(projects)) {
                        setView([]);
                        return;
                }
                isSelected === "All"
                        ? setView(projects)
                        : setView(projects.filter((project) => Array.isArray(project?.domains) && project.domains.includes(isSelected)));
        }, [isSelected, projects]);

        useEffect(() => {
                if (projectId && Array.isArray(projects)) {
                        const project = projects.find((project) => project._id === projectId);
                        if (project) {
                                setPreviewedProject(project);
                                setIsSelected(null);
                                const timer = setTimeout(() => {
                                        if (mainSectionRef.current) {
                                                mainSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                }, 80);
                                return () => clearTimeout(timer);
                        }
                } else {
                        setPreviewedProject(null);
                }
        }, [projectId, projects]);

        if (loading) {
                return <ProjectsMainSectionSkeleton />;
        }

        return (
                <div className="main-section" ref={mainSectionRef}>

                        <div className="categories">
                                <Domain domain={"All"} isSelected={isSelected} handleDomainSelection={handleDomainSelection} />
                                { domains.map((domain, index) => (<Domain key={index} domain={domain} isSelected={isSelected} handleDomainSelection={handleDomainSelection} />)) }
                                { previewedProject ? <p className="focused">{ previewedProject.title }</p> : null }
                        </div>

                        { previewedProject ? 
                                <Project project={ previewedProject } /> 
                                : 
                                <div className="projects">
                                        { (view || []).map((project) => (<ProjectCard key={project._id} project={ project } handleProjectSelection={ handleProjectSelection } />))}
                                </div>
                        }
                </div>
        );
}

export default MainSection;