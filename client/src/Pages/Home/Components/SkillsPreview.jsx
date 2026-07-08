import { Link } from 'react-router-dom';
import { useState } from "react";
import useTechnicalSkillsReducer from '../../../Hooks/useTechnicalSkillsReducer';
import useConceptualSkillsReducer from '../../../Hooks/useConceptualSkillsReducer';
import ShadowIcon from '../../../assets/Icons/Common/star-shadow.png';
import '../Styles/SkillsPreview.css';

const Tech = ({ tech }) => (
        <div className="tech">
                <p className="icon">
                        <img src={ tech.icon } alt={null} />
                </p>

                <p className="name">{tech.name}</p>
        </div>
);

function ConceptualSkill({ skill }) {
        return (
                <div className="skill">
                        <p className="icon">
                                <img src={skill.icon}/>
                        </p>

                        <p className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </p>

                        <div className="main-content">
                                <div className="title">{ skill.title }</div>

                                <div className="description">{ skill.description }</div>
                        </div>
                </div>
        );
};

function SkillsPreview() {
        const { skills: hardSkills } = useTechnicalSkillsReducer();
        const { skills: softSkills } = useConceptualSkillsReducer();
        const [ visibleTechs, setVisibleTechs ] = useState(hardSkills[0] ? hardSkills[0].techStack : [] );
        const [ isSelected, setIsSelected ] = useState(hardSkills[0] ? hardSkills[0].title : "");
        
        const handleSelection = (skill) => {
                setIsSelected(skill.title);
                setVisibleTechs(skill.techStack);
        };

        return (
                <div className="skills-preview">
                        <div className="main-title">
                                <p>My skills</p>
                        </div>

                        <div className="technical-skills">
                                <div className="sub-title">
                                        <p>Technical skills</p>
                                </div>

                                <div className="skills">
                                        { hardSkills.map((skill) => (
                                                <p key={skill._id} className={ isSelected  === skill.title ? "focused"  : ""} onClick={ () => {handleSelection(skill)} }>{ skill.title }</p>
                                        )) }
                                </div>

                                <div className="techs">
                                        { visibleTechs.map((tech) => (<Tech key={tech._id} tech={tech} />)) }
                                </div>

                        </div>

                        <div className="conceptual-skills">
                                <div className="sub-title">
                                        <p>Conceptual skills</p>
                                </div>

                                <div className="skills-loop">
                                        <div className="skills-track">
                                                { softSkills.map((skill) => (<ConceptualSkill key={skill._id} skill={skill} />)) }
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default SkillsPreview;