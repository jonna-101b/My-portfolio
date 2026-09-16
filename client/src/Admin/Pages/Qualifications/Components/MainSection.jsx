import { useContext } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import { ViewContext } from '../Contexts/ViewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import { DeleteContext } from '../../../Components/ConfirmDelete/Context/DeleteContext';
import { getYear } from 'date-fns';
import useQualificationsDisplayReducer from '../Hooks/useQualificationsDisplayReducer';
import useQualificationsReducer from '../../../../Hooks/useQualificationsReducer';
import Form from './Form';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/medal-shadow.png';
import { AdminTableSkeleton, AdminGridSkeleton } from '../../../../Components/Skeletons/AdminSkeletons';
import '../Styles/MainSection.css';


function QualificationsLayout({ qualification, layout }) {
        const { setView } = useContext(ViewContext);
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { openDeleteModal } = useContext(DeleteContext);
        const { deleteQualification } = useQualificationsReducer();

        const handleView = () => {
                setView(qualification);
        };

        const handleEdit = () => {
                setEdit(Form(qualification));
        };

        const handleDelete = () => {
                openDeleteModal({
                        id: qualification._id,
                        title: qualification.discipline,
                        type: "Qualification",
                        componentName: "qualification",
                        details: `${qualification.organization}${qualification.type ? ` • ${qualification.type}` : ''}`,
                        onConfirm: async () => {
                                try {
                                        await deleteQualification(qualification._id);
                                        setAction({ type: "delete", component: "qualification", name: qualification.discipline });
                                } catch (error) {
                                        console.error("Error deleting qualification in admin:", error);
                                        setAction({ type: "error", component: "qualification", message: error?.message || "Failed to delete qualification" });
                                }
                        }
                });
        };

        const formatDuration = (duration) => {
                if (!duration) return "";
                try {
                        const from = duration.from ? getYear(new Date(duration.from)) : "";
                        const to = duration.to ? getYear(new Date(duration.to)) : "";
                        if (from && to) return `${from} — ${to}`;
                        if (from) return `${from}`;
                        return "";
                } catch {
                        return "";
                }
        };

        if (layout) {
                return (
                        <div className="qualification-layout list-layout">
                                <p className="discipline">{ qualification.discipline }</p>
                                <p className="type"><span className="type-tag">{ qualification.type }</span></p>
                                <p className="organization"><span>{ qualification.organization }</span></p>
                                <p className="duration">{ formatDuration(qualification.duration) }</p>
                                <div className="actions">
                                        <button type="button" className="action-btn view-icon" onClick={handleView} title="View" aria-label="View">
                                                <VisibilityOutlinedIcon />
                                        </button>
                                        <button type="button" className="action-btn edit-icon" onClick={handleEdit} title="Edit" aria-label="Edit">
                                                <EditOutlinedIcon />
                                        </button>
                                        <button type="button" className="action-btn delete-icon" onClick={handleDelete} title="Delete" aria-label="Delete">
                                                <DeleteOutlineOutlinedIcon />
                                        </button>
                                </div>
                        </div>
                );
        }

        return (
                <div className="qualification-layout">
                        <div className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </div>

                        <div className="card-top">
                                <div className="icon-wrapper">
                                        <SchoolOutlinedIcon className="mortarboard-icon" />
                                </div>
                                { qualification.type && (
                                        <span className="type-badge">{ qualification.type }</span>
                                ) }
                        </div>

                        <div className="card-body">
                                <p className="organization">{ qualification.organization }</p>
                                <h3 className="discipline">{ qualification.discipline }</h3>
                        </div>

                        <div className="card-divider" />

                        <div className="card-footer">
                                <div className="duration">
                                        <AccessTimeOutlinedIcon className="clock-icon" />
                                        <span>{ formatDuration(qualification.duration) }</span>
                                </div>

                                <div className="actions">
                                        <button type="button" className="action-btn view-icon" onClick={handleView} title="View" aria-label="View">
                                                <VisibilityOutlinedIcon />
                                        </button>

                                        <button type="button" className="action-btn edit-icon" onClick={handleEdit} title="Edit" aria-label="Edit">
                                                <EditOutlinedIcon />
                                        </button>

                                        <button type="button" className="action-btn delete-icon" onClick={handleDelete} title="Delete" aria-label="Delete">
                                                <DeleteOutlineOutlinedIcon />
                                        </button>
                                </div>
                        </div>
                </div>
        );
}

function MainSection() {
        const { qualifications, loading } = useQualificationsDisplayReducer();
        const { layout } = useContext(LayoutContext);

        if (loading) {
                return (
                        <div className="main-section">
                                { layout ? <AdminTableSkeleton rows={5} /> : <AdminGridSkeleton count={6} /> }
                        </div>
                );
        }

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