import { useContext } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import { ViewContext } from '../Contexts/ViewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import { format, formatDistanceToNow } from "date-fns";
import useBlogDisplayReducer from '../Hooks/useBlogDisplayReducer';
import useBlogReducer from '../../../../Hooks/useBlogReducer';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/blog-shadow.png';
import Form from './Form';
import '../Styles/MainSection.css';


function BlogLayout({ blog, layout }) {
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

        const handleDelete = async () => {
                try {
                        await deleteBlog(blog._id);
                        setAction({ type: "delete", component: "blog", name: blog.title });
                } catch (error) {
                        console.error("Error deleting blog in admin:", error);
                        setAction({ type: "error", component: "blog", message: error?.message || "Failed to delete blog" });
                }
        };

        const getInitials = (name) => {
                if (!name) return "";
                const parts = name.trim().split(/\s+/);
                if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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
                        <div className="blog-layout list-layout">
                                <p className="title">{ blog.title }</p>
                                <p className="author"><span>{ blog.author }</span></p>
                                <p className="published-on">{ formatDate(blog.createdAt) }</p>
                                <p className="last-updated">{ blog.updatedAt ? formatDistanceToNow(new Date(blog.updatedAt), {addSuffix: true}) : "" }</p>
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
                <div className="blog-layout">
                        <div className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </div>

                        <div className="banner-container">
                                { blog.image ? (
                                        <img src={blog.image} alt={blog.title} className="banner-image" />
                                ) : (
                                        <div className="placeholder-banner">
                                                <div className="placeholder-icon-box">
                                                        <ArticleOutlinedIcon className="placeholder-icon" />
                                                </div>
                                                <span className="placeholder-text">Blog Post Preview</span>
                                        </div>
                                )}
                        </div>

                        <h3 className="title">{ blog.title }</h3>

                        <div className="author-meta">
                                <div className="author-avatar">
                                        <span className="initials">{ getInitials(blog.author) }</span>
                                </div>
                                <span className="author-name">{ blog.author }</span>
                                <span className="separator">•</span>
                                <span className="published-date">{ formatDate(blog.createdAt) }</span>
                        </div>

                        <div className="card-divider" />

                        <div className="card-footer">
                                <p className="date">{ formatDate(blog.createdAt) }</p>

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
                                        <BlogLayout key={index} blog={blog} layout={layout} />
                                )) }
                        </div>
                </div>
        );
}

export default MainSection;