import { useContext } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import { ViewContext } from '../Contexts/ViewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import { getYear } from 'date-fns';
import useQualificationsDisplayReducer from '../Hooks/useQualificationsDisplayReducer';
import useQualificationsReducer from '../../../../Hooks/useQualificationsReducer';
import Form from './Form';
import EditIcon from '../../../../assets/Icons/Admin/Common/edit.png';
import EditHoverIcon from '../../../../assets/Icons/Admin/Common/edit-hover.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/delete-hover.png';
import ViewIcon from '../../../../assets/Icons/Admin/Common/view.png';
import ViewHoverIcon from '../../../../assets/Icons/Admin/Common/view-hover.png';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/medal-shadow.png';
import '../Styles/MainSection.css';


function QualificationsLayout({ qualification }) {
        const { setView } = useContext(ViewContext);
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { deleteQualification } = useQualificationsReducer();

        const handleView = () => {
                setView(qualification);
        };

        const handleEdit = () => {
                setEdit(Form(qualification));
        };

        const handleDelete = () => {
                deleteQualification(qualification._id);
                setAction({ type: "delete", component: "qualification", name: qualification.discipline });
        };

        return (
                <div className="qualification-layout">
                        <p className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </p>
                        
                        <p className="discipline">{ qualification.discipline }</p>

                        <p className="type">{ qualification.type }</p>

                        <p className="organization"><span>{ qualification.organization }</span></p>

                        <p className="duration">{ `${getYear(qualification.duration.from)} - ${getYear(qualification.duration.to)}` }</p>

                        <div className="actions">
                                <p className="view-icon" onClick={handleView}>
                                        <img src={ViewIcon} alt="View icon" className="main" />
                                        <img src={ViewHoverIcon} alt="View icon" className="hover" />
                                </p>

                                <p className="edit-icon" onClick={handleEdit}>
                                        <img src={EditIcon} alt="Edit icon" className="main" />
                                        <img src={EditHoverIcon} alt="Edit icon" className="hover" />
                                </p>

                                <p className="delete-icon" onClick={handleDelete} >
                                        <img src={DeleteIcon} alt="Delete icon" className="main" />
                                        <img src={DeleteHoverIcon} alt="Delete icon" className="hover" />
                                </p>
                        </div>
                </div>
        );
}

function MainSection() {
        const { qualifications } = useQualificationsDisplayReducer();
        const { layout } = useContext(LayoutContext);

        return (
                <div className="main-section">
                        { layout ? 
                                <div className="labels">
                                        <p>Discipline</p>

                                        <p>Type</p>

                                        <p>Organization</p>

                                        <p>Duration</p>

                                        <p>Actions</p>
                                </div>
                                : ""
                        }

                        <div className={ layout ? "list" : "grid" }>
                                { qualifications.map((qualification, index) => (
                                        <QualificationsLayout key={index} qualification={qualification} layout={layout} />
                                )) }
                        </div>
                </div>
        );
}

export default MainSection;