import { format } from 'date-fns';
import { useContext } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import { ViewContext } from '../Contexts/ViewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import useTestimonialsReducer from '../../../../Hooks/useTestimonialsReducer';
import useTestimonialsDisplayReducer from '../Hooks/useTestimonialsDisplayReducer';
import EditIcon from '../../../../assets/Icons/Admin/Common/edit.png';
import EditHoverIcon from '../../../../assets/Icons/Admin/Common/edit-hover.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/delete-hover.png';
import ViewIcon from '../../../../assets/Icons/Admin/Common/view.png';
import ViewHoverIcon from '../../../../assets/Icons/Admin/Common/view-hover.png';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/quote-shadow.png';
import Form from './Form';
import '../Styles/MainSection.css';



function TestimonialsLayout({ testimonial }) {
        const { setView } = useContext(ViewContext);
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { deleteTestimonial} = useTestimonialsReducer();

        const handleView = () => {
                setView(testimonial);
        };

        const handleEdit = () => {
                setEdit(Form(testimonial));
        };

        const handleDelete = async () => {
                try {
                        await deleteTestimonial(testimonial._id);
                        setAction({ type: "delete", component: "testimonial", name: testimonial.name });
                } catch (error) {
                        console.error("Error deleting testimonial in admin:", error);
                        setAction({ type: "error", component: "testimonial", message: error?.message || "Failed to delete testimonial" });
                }
        };


        return (
                <div className={`testimonial-layout`}>
                        <p className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </p>
                        
                        <p className="name">{ testimonial.name }</p>

                        <p className="position">{ testimonial.position }</p>

                        <p className="company"><span>{ testimonial.company ? testimonial.company : "Unknown" }</span></p>

                        <p className="date">{ format(testimonial.createdAt, "MMMM do, yyyy") }</p>

                        <div className="actions">
                                <p className="view-button" onClick={handleView}>
                                        <img src={ViewIcon} alt="View icon" className="main" />
                                        <img src={ViewHoverIcon} alt="View icon" className="hover" />
                                </p>

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

function MainSection() {
        const { testimonials } = useTestimonialsDisplayReducer();
        const { layout } = useContext(LayoutContext);

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