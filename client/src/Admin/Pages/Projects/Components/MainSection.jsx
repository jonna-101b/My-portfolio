import { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import { ViewContext } from '../Contexts/ViewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import { format, formatDistanceToNow } from "date-fns";
import useProjectsReducer from '../../../../Hooks/useProjectsReducer';
import EditIcon from '../../../../assets/Icons/Admin/Common/edit.png';
import EditHoverIcon from '../../../../assets/Icons/Admin/Common/edit-hover.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/delete-hover.png';
import ViewIcon from '../../../../assets/Icons/Admin/Common/view.png';
import ViewHoverIcon from '../../../../assets/Icons/Admin/Common/view-hover.png';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/cube-shadow.png';
import useProjectsDisplayReducer from '../Hooks/useProjectsDisplayReducer';
import '../Styles/MainSection.css';
import Form from './Form';


function ProjectLayout({ project }) {
        const { setView } = useContext(ViewContext);
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { deleteProject } = useProjectsReducer();

        const handleView = () => {
                setView(project);
        };

        const handleEdit = () => {
                setEdit(Form(project));
        };

        const handleDelete = async () => {
                try {
                        await deleteProject(project._id);
                        setAction({ type: "delete", component: "project", name: project.title });
                } catch (error) {
                        console.error("Error deleting project in admin:", error);
                        setAction({ type: "error", component: "project", message: error?.message || "Failed to delete project" });
                }
        };


        return (
                <div className="project-layout">
                        <p className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </p>
                        
                        <p className="title">{ project.title }</p>

                        <p className="contribution"><span>{ project.contribution }</span></p>

                        <p className="published-on">{ format(project.createdAt, "MMMM do, yyyy") }</p>

                        <p className="last-updated">{ formatDistanceToNow(project.updatedAt, {addSuffix: true}) }</p>

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
        const { projects } = useProjectsDisplayReducer();
        const { layout } = useContext(LayoutContext);

        return (
                <div className="main-section">
                        { layout ? 
                                <div className="labels">
                                        <p>Title</p>

                                        <p>Contribution</p>

                                        <p>Published on</p>

                                        <p>Last updated</p>

                                        <p>Actions</p>
                                </div>
                        : "" }

                        <div className={ layout ? "list" : "grid" }>
                                { projects.map((project, index) => (
                                        <ProjectLayout key={index} project={project} />
                                )) }
                        </div>
                </div>
        );
}

export default MainSection;