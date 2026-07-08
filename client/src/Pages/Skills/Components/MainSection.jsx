import { useEffect, useState } from "react";
import { TS, CS } from "../../Home/Components/Trial";
import GithubIcon from '../../../assets/Icons/Projects/github.png';
import '../Styles/MainSection.css';


const Tech = ({ tech }) => (
        <div className="tech">
                <p className="icon">
                        <img src={ GithubIcon } alt={null} />
                </p>

                <p className="name">{tech.name}</p>
        </div>
);

const TechnicalSkill = ({ skill, isSelected, handleSelection }) => (
        <p className={ isSelected  === skill.concept ? "focused"  : ""} onClick={ () => {handleSelection(skill)} }>{ skill.concept }</p>
);

function ConceptualSkill({ skill , bgColor}) {
        return (
                <div className="skill" style={{ backgroundColor: bgColor }}>
                        <div className="content">
                                <p className="icon">{ skill.icon }</p>

                                <p className="title">{ skill.title }</p>
                        </div>

                        <p className="description">{ skill.description }</p>
                </div>
        );
};

function MainSection() {
        const [ visibleSkills, setVisibleSkills ] = useState(TS[0] ? TS[0].techStack : [] );
        const [ isSelected, setIsSelected ] = useState(TS[0] ? TS[0].concept : "");
        const colors = [
                "#B64687", // magenta-pink
                "#FF9257", // peach-orange
                "#66FA72", // neon green
                "#51A3A3", // teal
                "#6C5DD3", // soft indigo-violet
                "#4DD0E1", // sky cyan
                "#FF6B81", // coral red
                "#A3E635", // lime chartreuse
                "#38BDF8", // light blue
                "#FCD34D"  // soft yellow
        ];


        const handleSelection = (skill) => {
                setIsSelected(skill.concept);
                setVisibleSkills(skill.techStack);
        };

        return (
                <div className="main-section">
                        <div className="technical-skills">
                                <div className="skills">
                                        { TS.map((skill) => (<TechnicalSkill skill={skill} isSelected={isSelected} handleSelection={handleSelection} />)) }
                                </div>

                                <div className="tech-stack">
                                        { visibleSkills.map((tech) => (<Tech tech={tech} />)) }
                                </div>
                        </div>

                        <div className="conceptual-skills">
                                <div className="skills">
                                        { CS.map((skill, index) => (<ConceptualSkill skill={skill} bgColor={ colors[index % 8] } />)) }
                                </div>
                        </div>  
                </div>
        );
}

export default MainSection;