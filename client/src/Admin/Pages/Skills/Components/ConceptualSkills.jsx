import { useContext } from 'react';
import { NewContext } from '../../../Components/New/Context/NewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import { DeleteContext } from '../../../Components/ConfirmDelete/Context/DeleteContext';
import useConceptualSkillsReducer from '../../../../Hooks/useConceptualSkillsReducer';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/star-shadow.png';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { conceptualForm } from './Form';
import { AdminGridSkeleton } from '../../../../Components/Skeletons/AdminSkeletons';
import '../Styles/ConceptualSkills.css';


function Skill({ skill }) {
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { openDeleteModal } = useContext(DeleteContext);
        const { deleteSkill } = useConceptualSkillsReducer();

        const handleEdit = () => {
                setEdit(conceptualForm(skill));
        };

        const handleDelete = () => {
                openDeleteModal({
                        id: skill._id,
                        title: skill.title,
                        type: "Conceptual Skill",
                        componentName: "skill",
                        details: skill.description,
                        onConfirm: async () => {
                                try {
                                        await deleteSkill(skill._id);
                                        setAction({ type: "delete", component: "skill", name: skill.title });
                                } catch (error) {
                                        console.error("Error deleting conceptual skill in admin:", error);
                                        setAction({ type: "error", component: "skill", message: error?.message || "Failed to delete skill" });
                                }
                        }
                });
        };


        return (
                <div className="skill">
                        <p className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </p>

                        <div className="content">
                                <p className="icon">
                                        <LightbulbIcon />
                                </p>

                                <p className="title">{ skill.title }</p>
                        </div>

                        <p className="description">{ skill.description }</p>

                        <p className="horizontal-line"></p>

                        <div className="actions">
                                <p className="edit-button" onClick={handleEdit} >
                                        <EditOutlinedIcon />
                                </p>

                                <p className="delete-button" onClick={handleDelete} >
                                        <DeleteOutlineOutlinedIcon />
                                </p>
                        </div>
                </div>
        );
}

function ConceptualSkills() {
        const { skills, loading } = useConceptualSkillsReducer();
        const { setNew } = useContext(NewContext);

        const handleNew = () => {
                setNew(conceptualForm());
        };

        if (loading) {
                return (
                        <div className="conceptual-skills">
                                <p className="title">Conceptual Skills</p>
                                <AdminGridSkeleton count={4} />
                        </div>
                );
        }

        return (
                <div className="conceptual-skills">
                        <p className="title">Conceptual Skills</p>

                        <p className="new-skill" onClick={handleNew} >
                                <span className="icon">
                                        <AddRoundedIcon fontSize="small" />
                                </span>
                                New Conceptual Skill
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