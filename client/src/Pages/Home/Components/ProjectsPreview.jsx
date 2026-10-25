import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback, memo } from 'react';
import useProjectsReducer from '../../../Hooks/useProjectsReducer';
import ProjectsPreviewSkeleton from '../../../Components/Skeletons/ProjectsPreviewSkeleton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SimpleIcon from '../../../Utils/simpleIcons';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { ImageWithFallback } from '../../../Utils/imageUtils';
import '../Styles/ProjectsPreview.css';


const Project = memo(function Project({ project }) {
        const techStack = Array.isArray(project.techStack) ? project.techStack : [];
        const shownTechs = techStack.length > 4 ? techStack.slice(0, 4) : techStack;
        const hiddenTechs = techStack.length > 4 ? techStack.slice(4) : [];

        return (
                <div className="project">
                        <div className="image">
                                <ImageWithFallback
                                        src={project.image}
                                        alt={project.title}
                                        className="main"
                                        fallbackColor="transparent"
                                        fallbackIcon={<CodeOutlinedIcon style={{ fontSize: '2.5rem', color: 'var(--accent, #c6ff00)' }} />}
                                        fallbackText={project.title || "Project Preview"}
                                />

                                <p className="contribution">{project.contribution}</p>

                                <Link className="detail" to={`/projects/${project._id}`}>
                                        <InfoOutlinedIcon className="info-icon" />
                                </Link>
                        </div>

                        <p className="project-title">{project.title}</p>

                        <div className="domains">
                                {project.domains.map((domain, index) => (
                                        <p key={index} >{domain}</p>
                                ))}
                        </div>

                        <p className="description">{project.description.brief}</p>

                        <div className="techs">
                                {shownTechs.map((tech, index) => (
                                        <p className="tech" key={index} style={{ transform: `translateX(${-3 * index}vh)`, zIndex: 4 - index }} >
                                                <SimpleIcon name={tech.icon || tech.name} size="2.5vh" color="var(--icon-opt-1)" />
                                        </p>
                                ))}

                                {hiddenTechs.length ? <p className='more-techs'>+ {hiddenTechs.length}</p> : ""}
                        </div>

                        <div className="links">
                                <a className="github-link" href={project.githubLink} target="_blank" >
                                        Github repo
                                        <GitHubIcon className="github-icon" />
                                </a>

                                <a className="project-link" href={project.projectLink} target="_blank" >
                                        View project
                                        <LaunchRoundedIcon className="external-link-icon" />
                                </a>
                        </div>
                </div>
        );
});

function ProjectsPreview() {
        const { state, loading } = useProjectsReducer();
        const [projects, setProjects] = useState(state.projects);
        const projectsRef = useRef(null);
        const indicesRef = useRef(null);

        const [visibleCount, setVisibleCount] = useState(3);
        const [currentIndex, setCurrentIndex] = useState(1);
        const [currentIndices, setCurrentIndices] = useState(1);

        const updateVisibleCount = () => {
                if (typeof window === 'undefined') return;
                if (window.innerWidth <= 680) {
                        setVisibleCount(1);
                } else if (window.innerWidth < 1024) {
                        setVisibleCount(2);
                } else {
                        setVisibleCount(3);
                }
        };

        useEffect(() => {
                let resizeTimer;
                const handleResize = () => {
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(() => {
                                updateVisibleCount();
                        }, 100);
                };

                updateVisibleCount();
                window.addEventListener('resize', handleResize, { passive: true });
                return () => {
                        clearTimeout(resizeTimer);
                        window.removeEventListener('resize', handleResize);
                };
        }, []);

        const groupSize = visibleCount === 1 ? 3 : 6;
        const maxIndex = Math.max(1, (projects?.length || 0) - visibleCount + 1);
        const totalGroups = Math.ceil(maxIndex / groupSize);
        const pagination = Array.from({ length: maxIndex }, (_, i) => i + 1);

        const startGroupIdx = (currentIndices - 1) * groupSize;
        const currentGroupIndices = pagination.slice(startGroupIdx, startGroupIdx + groupSize);

        const slideTo = useCallback((index) => {
                if (!projectsRef.current) return;
                const safeIndex = Math.max(1, Math.min(index, maxIndex));
                const children = projectsRef.current.children;
                if (children && children[safeIndex - 1] && children[0]) {
                        const offset = children[safeIndex - 1].offsetLeft - children[0].offsetLeft;
                        projectsRef.current.style.transform = `translateX(-${offset}px)`;
                }
                setCurrentIndex(safeIndex);

                const targetGroup = Math.ceil(safeIndex / groupSize);
                setCurrentIndices(prev => targetGroup !== prev ? targetGroup : prev);
        }, [maxIndex, groupSize]);

        const handleProjectsSlide = (newIndex) => {
                if (currentIndex !== newIndex) {
                        slideTo(newIndex);
                }
        };

        const handlePrevIndicesSlide = () => {
                if (totalGroups > 1) {
                        if (currentIndices > 1) {
                                const prevGroup = currentIndices - 1;
                                setCurrentIndices(prevGroup);
                                const targetIndex = (prevGroup - 1) * groupSize + 1;
                                slideTo(targetIndex);
                        }
                } else {
                        if (currentIndex > 1) {
                                slideTo(currentIndex - 1);
                        }
                }
        };

        const handleNextIndicesSlide = () => {
                if (totalGroups > 1) {
                        if (currentIndices < totalGroups) {
                                const nextGroup = currentIndices + 1;
                                setCurrentIndices(nextGroup);
                                const targetIndex = Math.min((nextGroup - 1) * groupSize + 1, maxIndex);
                                slideTo(targetIndex);
                        }
                } else {
                        if (currentIndex < maxIndex) {
                                slideTo(currentIndex + 1);
                        }
                }
        };

        useEffect(() => {
                setProjects(state.projects);
                setCurrentIndex(1);
                setCurrentIndices(1);
                slideTo(1);
        }, [state.projects, visibleCount, slideTo]);

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
                                        {projects.map((project) =>
                                                (<Project key={project._id} project={project} />)
                                        )}
                                </div>
                        </div>

                        {pagination.length > 1 && (
                                <div className="pagination">
                                        <button
                                                className="prev slide"
                                                disabled={totalGroups > 1 ? currentIndices <= 1 : currentIndex <= 1}
                                                onClick={handlePrevIndicesSlide}
                                                aria-label="Previous projects"
                                        >
                                                Prev
                                        </button>

                                        <div className="indices">
                                                <div className="wrapper" ref={indicesRef} >
                                                        {currentGroupIndices.map((index) => (
                                                                <p
                                                                        className={currentIndex === index ? "focused" : ""}
                                                                        key={index}
                                                                        onClick={() => handleProjectsSlide(index)}
                                                                >
                                                                        {index}
                                                                </p>
                                                        ))}
                                                </div>
                                        </div>

                                        <button
                                                className="next slide"
                                                disabled={totalGroups > 1 ? currentIndices >= totalGroups : currentIndex >= maxIndex}
                                                onClick={handleNextIndicesSlide}
                                                aria-label="Next projects"
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