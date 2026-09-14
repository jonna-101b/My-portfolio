import { useContext, useEffect, useState } from 'react';
import { ViewContext } from '../Contexts/ViewContext';
import ArrowIcon from '../../../../assets/Icons/Admin/Projects/arrow-right.png';
import GithubIcon from '../../../../assets/Icons/Admin/Projects/github.png';
import ExternalLinkIcon from '../../../../assets/Icons/Admin/Projects/external.png';
import SimpleIcon from '../../../../Utils/simpleIcons';
import '../Styles/View.css';


const Tech = ({ tech }) => (
        <div className="tech">
                <p className="icon">
                        <SimpleIcon name={tech.icon || tech.name} size="20px" color="#c6ff00" />
                </p>

                <p className="name">{tech.name}</p>
        </div>
);

function Wrapper({ project }) {
        const colors = [
                "#33FFF5", // aqua
                "#FF5733", // fiery red-orange
                "#FFD733", // gold
                "#33FF57", // bright green
                "#FF3380", // rose pink
                "#FF3333", // bright red
                "#3357FF", // vivid blue
                "#A133FF", // purple
                "#FF8633", // orange
                "#8DFF33", // lime green
                "#FF33A1", // hot pink
                "#33FFB5", // mint
                "#33A1FF", // sky blue
                "#FFB533", // amber
                "#DA33FF", // magenta
                "#33FF8A", // seafoam
                "#3366FF", // bold blue
                "#B8FF33", // neon yellow-green
                "#FF9933", // tangerine
                "#33D4FF"  // electric cyan
        ];

        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation() }}>
                        <div className="container">
                                <p className="title">{ project.title }</p>

                                <div className="image">
                                        <img src={ project.image } alt="Project image" />
                                        <p className="contribution">{ project.contribution }</p>
                                </div>

                                <div className="domains">
                                        { project.domains.map((domain, index) => (<p style={{ color: colors[index % colors.length] }}>{ domain }</p>)) }
                                </div>

                                <p className="description">{ project.description.detailed }</p>

                                <div className="features">
                                        { project.features.map((feature) => (<p> <img src={ ArrowIcon } alt="Arrow icon" /> { feature }</p>)) }
                                </div>

                                <div className="tech-stack">
                                        { project.techStack.map((tech) => (<Tech tech={tech} />)) }
                                </div>

                                <div className="links">
                                        <button className="github-link">
                                                View github repo
                                                <img src={ GithubIcon } alt="Github logo" />
                                        </button>

                                        <button className="project-link">
                                                View project
                                                <img src={ ExternalLinkIcon } alt="External link Icon" />
                                        </button>
                                </div>     
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
                <div className={`view ${isEmptyObject(view) ?  "" : "active" }`} onClick={handleDisplay} >
                        { isEmptyObject(view) ? "" : <Wrapper project={view} /> }      
                </div>
        );
}

export default View;