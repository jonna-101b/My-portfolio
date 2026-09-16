import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import { ViewContext } from '../Contexts/ViewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import { DeleteContext } from '../../../Components/ConfirmDelete/Context/DeleteContext';
import useTestimonialsReducer from '../../../../Hooks/useTestimonialsReducer';
import useTestimonialsDisplayReducer from '../Hooks/useTestimonialsDisplayReducer';
import { getInitials } from '../../../../Utils/avatarUtils';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/quote-shadow.png';
import Form from './Form';
import { getAssetUrl } from '../../../../Utils/assetUtils';
import { AdminTableSkeleton, AdminGridSkeleton } from '../../../../Components/Skeletons/AdminSkeletons';
import '../Styles/MainSection.css';


function TestimonialsLayout({ testimonial, layout }) {
        const { setView } = useContext(ViewContext);
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { openDeleteModal } = useContext(DeleteContext);
        const { deleteTestimonial } = useTestimonialsReducer();
        const [imgError, setImgError] = useState(false);

        const handleView = () => {
                setView(testimonial);
        };

        const handleEdit = () => {
                setEdit(Form(testimonial));
        };

        const handleDelete = () => {
                openDeleteModal({
                        id: testimonial._id,
                        title: testimonial.name,
                        type: "Testimonial",
                        componentName: "testimonial",
                        details: testimonial.position ? `${testimonial.position}${testimonial.company ? ` at ${testimonial.company}` : ''}` : testimonial.company,
                        onConfirm: async () => {
                                try {
                                        await deleteTestimonial(testimonial._id);
                                        setAction({ type: "delete", component: "testimonial", name: testimonial.name });
                                } catch (error) {
                                        console.error("Error deleting testimonial in admin:", error);
                                        setAction({ type: "error", component: "testimonial", message: error?.message || "Failed to delete testimonial" });
                                }
                        }
                });
        };

        const formatDate = (date) => {
                if (!date) return "";
                try {
                        return format(new Date(date), "MMMM do, yyyy");
                } catch {
                        return "";
                }
        };

        if (layout) {
                return (
                        <div className="testimonial-layout list-layout">
                                <p className="name">{ testimonial.name }</p>
                                <p className="position">{ testimonial.position }</p>
                                <p className="company"><span>{ testimonial.company ? testimonial.company : "Unknown" }</span></p>
                                <p className="date">{ formatDate(testimonial.createdAt) }</p>
                                <div className="actions">
                                        <button type="button" className="action-btn view-button" onClick={handleView} title="View" aria-label="View">
                                                <VisibilityOutlinedIcon />
                                        </button>
                                        <button type="button" className="action-btn edit-button" onClick={handleEdit} title="Edit" aria-label="Edit">
                                                <EditOutlinedIcon />
                                        </button>
                                        <button type="button" className="action-btn delete-button" onClick={handleDelete} title="Delete" aria-label="Delete">
                                                <DeleteOutlineOutlinedIcon />
                                        </button>
                                </div>
                        </div>
                );
        }

        return (
                <div className="testimonial-layout">
                        <div className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </div>

                        <div className="card-header">
                                <div className="avatar-container">
                                        { testimonial.picture && !imgError ? (
                                                <img 
                                                        src={getAssetUrl(testimonial.picture)} 
                                                        alt={testimonial.name} 
                                                        className="avatar-img" 
                                                        onError={() => setImgError(true)}
                                                />
                                        ) : (
                                                <span className="avatar-initials">{ getInitials(testimonial.name) }</span>
                                        ) }
                                </div>

                                <div className="author-info">
                                        <h3 className="name">{ testimonial.name }</h3>
                                        <p className="position">{ testimonial.position }</p>
                                </div>
                        </div>

                        { testimonial.company && (
                                <p className="company">{ testimonial.company }</p>
                        ) }

                        <div className="testimony">
                                <p>"{ testimonial.testimony }"</p>
                        </div>

                        <div className="card-divider" />

                        <div className="card-footer">
                                <p className="date">{ formatDate(testimonial.createdAt) }</p>

                                <div className="actions">
                                        <button type="button" className="action-btn view-button" onClick={handleView} title="View" aria-label="View">
                                                <VisibilityOutlinedIcon />
                                        </button>

                                        <button type="button" className="action-btn edit-button" onClick={handleEdit} title="Edit" aria-label="Edit">
                                                <EditOutlinedIcon />
                                        </button>

                                        <button type="button" className="action-btn delete-button" onClick={handleDelete} title="Delete" aria-label="Delete">
                                                <DeleteOutlineOutlinedIcon />
                                        </button>
                                </div>
                        </div>
                </div>
        );
}

function MainSection() {
        const { testimonials, loading } = useTestimonialsDisplayReducer();
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
                                        <p>Name</p>
                                        <p>Position</p>
                                        <p>Company</p>
                                        <p>Date</p>
                                        <p>Actions</p>
                                </div>
                                : ""
                        }

                        <div className={ layout ? "list" : "grid" }>
                                { testimonials.map((testimonial, index) => (
                                        <TestimonialsLayout key={index} testimonial={testimonial} layout={layout} />
                                )) }
                        </div>
                </div>
        );
}

export default MainSection;