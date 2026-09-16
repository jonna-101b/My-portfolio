import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useProjectsReducer from '../../../Hooks/useProjectsReducer';
import ProjectsPreviewSkeleton from '../../../Components/Skeletons/ProjectsPreviewSkeleton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SimpleIcon from '../../../Utils/simpleIcons';
import { getAssetUrl } from '../../../Utils/assetUtils';
import '../Styles/ProjectsPreview.css';


const Project = ({ project }) => {
        const [ shownTechs ] = useState(project.techStack.length > 4 ? project.techStack.slice(0, 4) : project.techStack);
        const [ hiddenTechs ] = useState(project.techStack.length > 4 ? project.techStack.slice(4) : []);

        return (
                <div className="project">
                        <div className="image">
                                <img src={ getAssetUrl(project.image) } alt={ project.title } className="main" />

                                <p className="contribution">{ project.contribution }</p>

                                <Link className="detail" to={`/projects/${project._id}`}>
                                        <InfoOutlinedIcon className="info-icon" />
                                </Link>
                        </div>

                        <p className="project-title">{ project.title }</p>

                        <div className="domains">
                                { project.domains.map((domain, index) => (
                                        <p key={index} >{ domain }</p>
                                )) }
                        </div>

                        <p className="description">{ project.description.brief }</p>

                        <div className="techs">
                                { shownTechs.map((tech, index) => (
                                        <p className="tech" key={index} style={{ transform: `translateX(${-3 * index}vh)`, zIndex: 4-index }} >
                                                <SimpleIcon name={tech.icon || tech.name} size="2.5vh" color="var(--icon-opt-1)" />
                                        </p>
                                )) }

                                { hiddenTechs.length ? <p className='more-techs'>+ { hiddenTechs.length }</p> : "" }
                        </div>

                        <div className="links">
                                <a className="github-link" href={project.githubLink} target="_blank" >
                                        Github repo
                                        <GitHubIcon className="github-icon" />
                                </a>

                                <a className="project-link"  href={project.projectLink} target="_blank" >
                                        View project
                                        <LaunchRoundedIcon className="external-link-icon" />
                                </a>
                        </div>
                </div>
        );
};

function ProjectsPreview() {
        const { state, loading } = useProjectsReducer();
        const [ projects, setProjects ] = useState(state.projects);
        const projectsRef = useRef(null);
        const indicesRef = useRef(null);
        
        const [ visibleCount, setVisibleCount ] = useState(3);
        const [ currentIndex, setCurrentIndex ] = useState(1);
        const [ currentIndices, setCurrentIndices ] = useState(1);

        const updateVisibleCount = () => {
                if (typeof window === 'undefined') return;
                if (window.innerWidth < 680) {
                        setVisibleCount(1);
                } else if (window.innerWidth < 1024) {
                        setVisibleCount(2);
                } else {
                        setVisibleCount(3);
                }
        };

        useEffect(() => {
                updateVisibleCount();
                window.addEventListener('resize', updateVisibleCount);
                return () => window.removeEventListener('resize', updateVisibleCount);
        }, []);

        const maxIndex = Math.max(1, (projects?.length || 0) - visibleCount + 1);
        const pagination = Array.from({ length: maxIndex }, (_, i) => i + 1);

        const slideTo = (index) => {
                if (!projectsRef.current) return;
                const safeIndex = Math.max(1, Math.min(index, maxIndex));
                const children = projectsRef.current.children;
                if (children && children[safeIndex - 1] && children[0]) {
                        const offset = children[safeIndex - 1].offsetLeft - children[0].offsetLeft;
                        projectsRef.current.style.transform = `translateX(-${offset}px)`;
                }
                setCurrentIndex(safeIndex);
        };

        const handleProjectsSlide = (newIndex) => {
                if (currentIndex !== newIndex) {
                        slideTo(newIndex);
                }
        };

        const handlePrevIndicesSlide = () => {
                if (currentIndex > 1) {
                        slideTo(currentIndex - 1);
                }
        };

        const handleNextIndicesSlide = () => {
                if (currentIndex < maxIndex) {
                        slideTo(currentIndex + 1);
                }
        };

        useEffect(() => {
                setProjects(state.projects);
                slideTo(1);
        }, [state.projects, visibleCount]);

        if (loading) {
                return <ProjectsPreviewSkeleton />;
        }

        if (!Array.isArray(projects) || projects.length === 0) {
                return null;
        }

        return (
                <div className="projects-preview">
                        <div className="title">
                                <p>My Projects</p>
                        </div>

                        <div className="projects-message">
                                <p>A Look at the Things I've Been Tinkering with</p>
                        </div>

                        <div className="projects">
                                <div className="wrapper" ref={projectsRef} >
                                        { projects.map((project) => 
                                                (<Project key={project._id} project={project} />)
                                        )}
                                </div>
                        </div>

                        {pagination.length > 1 && (
                                <div className="pagination">
                                        <button 
                                                className="prev slide" 
                                                disabled={currentIndex <= 1} 
                                                onClick={handlePrevIndicesSlide} 
                                                aria-label="Previous project"
                                        >
                                                Prev
                                        </button>

                                        <div className="indices">
                                                <div className="wrapper" ref={indicesRef} >
                                                        { pagination.map((index) => (
                                                                <p 
                                                                        className={currentIndex === index ? "focused" : ""} 
                                                                        key={index} 
                                                                        onClick={() => handleProjectsSlide(index)} 
                                                                >
                                                                        {index}
                                                                </p>
                                                        )) }
                                                </div>
                                        </div>

                                        <button 
                                                className="next slide" 
                                                disabled={currentIndex >= maxIndex} 
                                                onClick={handleNextIndicesSlide} 
                                                aria-label="Next project"
                                        >
                                                Next
                                        </button>
                                </div>
                        )}

                        <div className="more">
                                <Link className="button" to="/projects">
                                        View all projects
                                        <ArrowForwardRoundedIcon className="goto-icon" />
                                </Link>
                        </div>
                </div>
        );
}

export default ProjectsPreview;