import { useContext } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import { ViewContext } from '../Contexts/ViewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import { format, formatDistanceToNow } from "date-fns";
import useBlogDisplayReducer from '../Hooks/useBlogDisplayReducer';
import useBlogReducer from '../../../../Hooks/useBlogReducer';
import EditIcon from '../../../../assets/Icons/Admin/Common/edit.png';
import EditHoverIcon from '../../../../assets/Icons/Admin/Common/edit-hover.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/delete-hover.png';
import ViewIcon from '../../../../assets/Icons/Admin/Common/view.png';
import ViewHoverIcon from '../../../../assets/Icons/Admin/Common/view-hover.png';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/blog-shadow.png';
import Form from './Form';
import '../Styles/MainSection.css';


function BlogLayout({ blog }) {
        const { setView } = useContext(ViewContext);
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { deleteBlog } = useBlogReducer();

        const handleView = () => {
                setView(blog);
        };

        const handleEdit = () => {
                setEdit(Form(blog));
        };

        const handleDelete = () => {
                deleteBlog(blog._id);
                setAction({ type: "delete", component: "blog", name: blog.title });
        };

        return (
                <div className="blog-layout">
                        <p className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </p>
                        
                        <p className="title">{ blog.title }</p>

                        <p className="author"><span>{ blog.author }</span></p>

                        <p className="published-on">{ format(blog.createdAt, "MMMM do, yyyy") }</p>

                        <p className="last-updated">{ formatDistanceToNow(blog.updatedAt, {addSuffix: true}) }</p>

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
        const { blogs } = useBlogDisplayReducer();
        const { layout } = useContext(LayoutContext);

        return (
                <div className="main-section">
                        { layout ? 
                                <div className="labels">
                                        <p>Title</p>

                                        <p>Author</p>

                                        <p>Published on</p>

                                        <p>Last updated</p>

                                        <p>Actions</p>
                                </div>
                        : "" }

                        <div className={ layout ? "list" : "grid" }>
                                { blogs.map((blog, index) => (
                                        <BlogLayout key={index} blog={blog} />
                                )) }
                        </div>
                </div>
        );
}

export default MainSection;