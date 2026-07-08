import { useContext } from 'react';
import { NewContext } from '../../../Components/New/Context/NewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import useTechnicalSkillsReducer from '../../../../Hooks/useTechnicalSkillsReducer';
import AddIcon from '../../../../assets/Icons/Admin/Common/plus.png';
import EditIcon from '../../../../assets/Icons/Admin/Common/edit.png';
import EditHoverIcon from '../../../../assets/Icons/Admin/Common/edit-hover.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/delete-hover.png';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/star-shadow.png';
import { technicalForm } from './Form';
import '../Styles/TechnicalSkills.css';



function Skill({ skill }) {
        // const { setView } = useContext(ViewContext);
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { deleteSkill } = useTechnicalSkillsReducer();

        const techStack = skill.techStack.slice(0, 4);
        const skillLength = skill.techStack.length - 4 > 0 ? skill.techStack.length-4 : 0;

        const handleEdit = () => {
                setEdit(technicalForm(skill));
        };

        const handleDelete = () => {
                deleteSkill(skill._id);
                setAction({ type: "delete", component: "skill", name: skill.title });
        }

        return (
                <div className="skill">
                        <p className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </p>

                        <p className="title">{ skill.title }</p>

                        <div className="tech-stack">
                                { techStack.map((tech, index) => (
                                        <p style={{ left: `-${index * 2}vh`, zIndex: 4-index }} key={index}>
                                                <img src={tech.icon} />
                                        </p>
                                )) }

                                { skillLength ? <p className="more" >+{ skillLength }</p> : "" }
                        </div>

                        <div className="see-all">
                                <p className="see-all">See all techs</p>
                        </div>

                        <div className="actions">
                                <p className="edit-button" onClick={handleEdit} >
                                        <img src={EditIcon} alt="Edit icon" className="main" />
                                        <img src={EditHoverIcon} alt="Edit icon" className="hover" />
                                </p>

                                <p className="delete-button" onClick={handleDelete} >
                                        <img src={DeleteIcon} alt="Delete icon" className="main" />
                                        <img src={DeleteHoverIcon} alt="Delete icon" className="hover" />
                                </p>
                        </div>
                </div>
        );
}

function TechnicalSkills() {
        const { skills } = useTechnicalSkillsReducer();
        const { setNew } = useContext(NewContext);

        const handleNew = () => {
                setNew(technicalForm());
        };

        return (
                <div className="technical-skills">
                        <p className="title">Technical Skills</p>

                        <p className="new-skill" onClick={handleNew} >
                                <span className="icon">
                                        <img src={AddIcon} alt="Add icon" />
                                </span>
                                New technical skill
                        </p>

                        <div className="grid">
                                { skills.map((skill, index) => (
                                        <Skill key={index} skill={skill} />
                                )) }
                        </div>
                </div>
        );
}

export default TechnicalSkills;