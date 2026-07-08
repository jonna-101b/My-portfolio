import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useProjectsReducer from '../../../Hooks/useProjectsReducer';
import GithubIcon from '../../../assets/Icons/Home/github.png';
import ExternalLinkIcon from '../../../assets/Icons/Home/external.png';
import InfoIcon from '../../../assets/Icons/Home/info.png';
import GoToIcon from '../../../assets/Icons/Home/right-arrow with a line.png';
import '../Styles/ProjectsPreview.css';


const Project = ({ project }) => {
        const [ shownTechs ] = useState(project.techStack.length > 4 ? project.techStack.slice(0, 4) : project.techStack);
        const [ hiddenTechs ] = useState(project.techStack.length > 4 ? project.techStack.slice(4) : []);

        return (
                <div className="project">
                        <div className="image">
                                <img src={ project.image } alt={ project.title } className="main" />

                                <p className="contribution">{ project.contribution }</p>

                                <Link className="detail" to={`/projects/${project._id}`}>
                                        <img src={InfoIcon} alt="Info icon" />
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
                                                <img src={tech.icon} />
                                        </p>
                                )) }

                                { hiddenTechs.length ? <p className='more-techs'>+ { hiddenTechs.length }</p> : "" }
                        </div>

                        <div className="links">
                                <a className="github-link" href={project.githubLink} target="_blank" >
                                        Github repo
                                        <img src={ GithubIcon } alt="Github logo" className="main" />
                                </a>

                                <a className="project-link"  href={project.projectLink} target="_blank" >
                                        View project
                                        <img src={ ExternalLinkIcon } alt="External link Icon" />
                                </a>
                        </div>
                </div>
        );
};

function ProjectsPreview() {
        const { state } = useProjectsReducer();
        const [ projects, setProjects ] = useState(state.projects);
        const projectsRef = useRef(null);
        const [ pagination, setPagination ] = useState(Array.from({ length: state.projects.length-2 }, (_, i) => i + 1));
        const [ currentIndex, setCurrentIndex ] = useState(state.projects.length ? 1 : 0); 
        const indicesRef = useRef(null);
        const [ currentIndices, setCurrentIndices ] = useState(state.projects.length >= 6 ? 1 : 0);
        // const [ isSliding, setIsSliding ] = useState(false);

        const handleProjectsSlide = (newIndex) => {
                if (projectsRef.current && currentIndex !== newIndex) {
                        const slideBy = -(newIndex - 1) * 30;
                        projectsRef.current.style.transform = `translateX(${slideBy}vw)`;
                        setCurrentIndex(newIndex);
                }
        };

        const handlePrevIndicesSlide = () => {
                if (indicesRef.current && currentIndices !== 1 ) {
                        const slideBy = (-(currentIndices - 2) * 40) - 2 * (currentIndices - 2);
                        indicesRef.current.style.transform = `translateX(${slideBy}vh)`;
                        setCurrentIndices(prev => prev-1);
                }
        };

        const handleNextIndicesSlide = () => {
                if (indicesRef.current && currentIndices !== Math.ceil((projects.length-2) / 6) ) {
                        const slideBy = (-(currentIndices) * 40) - 2 * (currentIndices);
                        indicesRef.current.style.transform = `translateX(${slideBy}vh)`;
                        setCurrentIndices(prev => prev+1);
                }
        };

        // useEffect(() => {
        //         if (projectsRef.current) {
        //                 const interval = setInterval(() => {
        //                         if (currentIndex !== pagination.length) {
        //                                 if (currentIndex % 6 === 1 && currentIndex !== 1) {
        //                                         handleNextIndicesSlide();
        //                                 }
                                        
        //                                 handleProjectsSlide(currentIndex + 1);
        //                         }
        //                         else {
        //                                 setCurrentIndex(1);
        //                                 setCurrentIndices(1);
        //                                 projectsRef.current.style.transform = `translateX(0vw)`;
        //                                 indicesRef.current.style.transform = `translateX(0vh)`;
        //                         }
        //                 }, 10000);

        //                 return () => clearInterval(interval);
        //         }
        // }, []);

        useEffect(() => {
                setProjects(state.projects);
                setPagination(Array.from({ length: state.projects.length-2 }, (_, i) => i + 1));
                setCurrentIndex(state.projects.length ? 1 : 0);
                setCurrentIndices(state.projects.length >= 6 ? 1 : 0);
        }, [state.projects]);

        return (
                <div className="projects-preview">
                        <div className="title">
                                <p>My projects</p>
                        </div>

                        <div className="projects-message">
                                <p>A look at the things I've been tinkering with.</p>
                        </div>

                        <div className="projects">
                                { projects.length ? 
                                        <div className="wrapper" ref={projectsRef} >
                                                { projects.map((project) => 
                                                        (<Project key={project._id} project={project} />)
                                                )}
                                        </div>
                                        : 
                                        <p className="no-project">No projects yet!</p> 
                                }
                        </div>

                        <div className="pagination">
                                <button 
                                        className="prev slide" 
                                        disabled={currentIndices === 1} 
                                        onClick={handlePrevIndicesSlide} 
                                >
                                        Prev
                                </button>

                                <div className="indices">
                                        <div className="wrapper" ref={indicesRef} >
                                                { pagination.map((index) => (
                                                        <p className={currentIndex === index ? "focused" : null} key={index} onClick={() => {handleProjectsSlide(index)}} >{index}</p>
                                                )) }
                                        </div>
                                </div>

                                <button 
                                        className="next slide" 
                                        disabled={currentIndices === Math.ceil((projects.length-2) / 6)} 
                                        onClick={handleNextIndicesSlide} 
                                >
                                        Next
                                </button>
                        </div>

                        <div className="more">
                                <Link className="button" to="/projects">
                                        View all projects
                                        <img src={ GoToIcon } alt="Go to icon" />
                                </Link>
                        </div>
                </div>
        );
}

export default ProjectsPreview;