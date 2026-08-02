import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../Contexts/ThemeContext";
import useProjectsReducer from '../../../Hooks/useProjectsReducer';
import ShadowIcon from '../../../assets/Icons/Common/cube-shadow.png';
import ShadowLightIcon from '../../../assets/Icons/Common/cube-light.png';
import ArrowIcon from '../../../assets/Icons/Projects/arrow-right.png';
import ViewIcon from '../../../assets/Icons/Projects/view.png';
import ViewLightIcon from '../../../assets/Icons/Projects/view-light.png';
import GithubIcon from '../../../assets/Icons/Projects/github.png';
import GithubLightIcon from '../../../assets/Icons/Projects/github-light.png';
import LinkIcon from '../../../assets/Icons/Projects/link.png';
import LinkLightIcon from '../../../assets/Icons/Projects/link-light.png';
import ExternalLinkIcon from '../../../assets/Icons/Projects/external.png';
import '../Styles/MainSection.css';


const Tech = ({ tech }) => (
        <div className="tech">
                <p className="icon">
                        <img src={ tech.icon } alt={null} />
                </p>

                <p className="name">{tech.name}</p>
        </div>
);

const Domain = ({ domain, isSelected, handleDomainSelection }) => (
        <p className={ isSelected  === domain ? "focused"  : ""} onClick={ () => {handleDomainSelection(domain)} }>{ domain }</p>
);

function Project({ project }) {
        const { theme } = useContext(ThemeContext);
        
        return (
                <div className="project">
                        <div className="sub-content">
                                <p className="image">
                                        <img src={ project.image } alt={ project.title } />
                                </p>
                        </div>


                        <div className="content">
                                <p className="title">{ project.title }</p>

                                <p className="description">{ project.description.detailed }</p>

                                <div className="features">
                                        { project.features.map((feature, index) => (<p key={index} > <img src={ ArrowIcon } alt="Arrow icon" /> { feature }</p>)) }
                                </div>

                                <div className="techStack">
                                        { project.techStack.map((tech) => (<Tech tech={tech} />)) }
                                </div>

                                <div className="links">
                                        <a className="github-link" href={project.githubLink} target="_blank" >
                                                Github repo
                                                <img src={ theme === 'dark' ? GithubIcon : GithubLightIcon } alt="Github logo" />
                                        </a>
        
                                        <a className="project-link" href={project.projectLink} target="_blank" >
                                                View project
                                                <img src={ theme === 'dark' ? LinkIcon : LinkLightIcon } alt="External link Icon" />
                                        </a>
                                </div>
                        </div>
                </div>
        );
}

function ProjectCard({ project, handleProjectSelection }) {
        const techStack = project.techStack.slice(0, 4);
        const leftTechLength = project.techStack.length - techStack.length;
        const { theme } = useContext(ThemeContext);

        return (
                <div className="project-card">
                        <p className="shadow">
                                <img src={theme === 'dark' ? ShadowIcon : ShadowLightIcon} alt="Shadow icon" />
                        </p>

                        <p className="title">{ project.title }</p>

                        <p className="contribution">{ project.contribution }</p>

                        <div className="techStack">
                                { techStack.map((tech, index) => (<p className="tech" style={{ position: "relative", left: `-${index * 2}vh`, zIndex: 3-index }} ><img src={ tech.icon } alt={ null } /></p>)) }
                                { leftTechLength ? <p className="left">+{leftTechLength}</p> : "" }
                        </div>

                        <div className="buttons">
                                <div className="links">
                                        <a className="github-icon" href={project.githubLink} target="_blank" >
                                                <img src={ theme === 'dark' ? GithubIcon : GithubLightIcon } alt="Github icon" />
                                        </a>
                                        
                                        <a className="link-icon" href={project.projectLink} target="_blank" >
                                                <img src={theme === 'dark' ? LinkIcon : LinkLightIcon } alt="Project icon" />
                                        </a>
                                </div>

                               <div className="view">
                                        <p onClick={ () => {handleProjectSelection(project)}} >
                                                view
                                                <span className="icon">
                                                        <img src={theme === 'dark' ? ViewIcon : ViewLightIcon} alt="View icon" />
                                                </span>
                                        </p>
                               </div>
                        </div>

                </div>
        );
}

const findDomains  = (projects) => {
        let domainsSet = new Set();
        for (let project of projects) {
                for (let domain of project.domains) {
                        domainsSet.add(domain);
                }
        }

        return domainsSet;
};

function MainSection() {
        const { state } = useProjectsReducer();
        const { projects } = state;
        const [ view, setView ] = useState([]);
        const { projectId } = useParams();
        const [ previewedProject, setPreviewedProject ] = useState(null);
        const [ isSelected, setIsSelected ] = useState("All");
        const domains = [ ...findDomains(projects) ];
        let navigate = useNavigate();

        const handleDomainSelection = (domain) => {
                setIsSelected(domain);
                setPreviewedProject(null);
        };

        const handleProjectSelection = (project) => {
                navigate(`/projects/${project._id}`);
        };

        useEffect(() => {
                isSelected === "All" ? setView(projects) : setView(projects.filter((project) => project.domains.includes(isSelected) ))
        }, [isSelected])

        useEffect(() => {
                if (projectId) {
                        const project = projects.find((project) => project._id === projectId);
                        if (project) {
                                setPreviewedProject(project);
                                setIsSelected(null);
                        }
                } else {
                        setPreviewedProject(null);
                }
        }, [projectId, projects]);

        return (
                <div className="main-section">

                        <div className="categories">
                                { <Domain domain={"All"} isSelected={isSelected} handleDomainSelection={handleDomainSelection} /> }
                                { domains.map((domain, index) => (<Domain key={index} domain={domain} isSelected={isSelected} handleDomainSelection={handleDomainSelection} />)) }
                                { previewedProject ? <p className="focused" >{ previewedProject.title }</p> : "" }
                        </div>

                        { previewedProject ? 
                                <Project project={ previewedProject } /> 
                                : 
                                <div className="projects">
                                        { view.map((project) => (<ProjectCard key={project._id} project={ project } handleProjectSelection={ handleProjectSelection } />))}
                                </div>
                        }
                </div>
        );
}

export default MainSection;