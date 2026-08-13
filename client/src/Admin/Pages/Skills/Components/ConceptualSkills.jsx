import { useContext } from 'react';
import { NewContext } from '../../../Components/New/Context/NewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import useConceptualSkillsReducer from '../../../../Hooks/useConceptualSkillsReducer';
import AddIcon from '../../../../assets/Icons/Admin/Common/plus.png';
import EditIcon from '../../../../assets/Icons/Admin/Common/edit.png';
import EditHoverIcon from '../../../../assets/Icons/Admin/Common/edit-hover.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/delete-hover.png';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/star-shadow.png';
import { conceptualForm } from './Form';
import '../Styles/ConceptualSkills.css';



function Skill({ skill }) {
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { deleteSkill } = useConceptualSkillsReducer();

        const handleEdit = () => {
                setEdit(conceptualForm(skill));
        };

        const handleDelete = async () => {
                try {
                        await deleteSkill(skill._id);
                        setAction({ type: "delete", component: "skill", name: skill.title });
                } catch (error) {
                        console.error("Error deleting conceptual skill in admin:", error);
                        setAction({ type: "error", component: "skill", message: error?.message || "Failed to delete skill" });
                }
        };


        return (
                <div className="skill">
                        <p className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </p>

                        <div className="content">
                                <p className="icon">
                                        <img src={ skill.icon } />
                                </p>

                                <p className="title">{ skill.title }</p>
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

                        <p className="description">{ skill.description }</p>
                </div>
        );
}

function ConceptualSkills() {
        const { skills } = useConceptualSkillsReducer();
        const { setNew } = useContext(NewContext);

        const handleNew = () => {
                setNew(conceptualForm());
        };

        return (
                <div className="conceptual-skills">
                        <p className="title">Conceptual Skills</p>

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

export default ConceptualSkills;