import { useContext } from 'react';
import { LayoutContext } from '../Contexts/LayoutContext';
import { ViewContext } from '../Contexts/ViewContext';
import { EditContext } from '../../../Components/Edit/Context/EditContext';
import { NotifyContext } from '../Contexts/NotifyContext';
import { format, formatDistanceToNow } from "date-fns";
import useArticlesDisplayReducer from '../Hooks/useArticlesDisplayReducer';
import useArticlesReducer from '../../../../Hooks/useArticlesReducer';
import EditIcon from '../../../../assets/Icons/Admin/Common/edit.png';
import EditHoverIcon from '../../../../assets/Icons/Admin/Common/edit-hover.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/delete-hover.png';
import ViewIcon from '../../../../assets/Icons/Admin/Common/view.png';
import ViewHoverIcon from '../../../../assets/Icons/Admin/Common/view-hover.png';
import ShadowIcon from '../../../../assets/Icons/Admin/Common/article-shadow.png';
import Form from './Form';
import '../Styles/MainSection.css';


function ArticleLayout({ article }) {
        const { setView } = useContext(ViewContext);
        const { setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const { deleteArticle } = useArticlesReducer();

        const handleView = () => {
                setView(article);
        };

        const handleEdit = () => {
                setEdit(Form(article));
        };

        const handleDelete = () => {
                deleteArticle(article._id);
                setAction({ type: "delete", component: "article", name: article.title });
        };

        return (
                <div className="article-layout">
                        <p className="shadow">
                                <img src={ShadowIcon} alt="Shadow icon" />
                        </p>
                        
                        <p className="title">{ article.title }</p>

                        <p className="author"><span>{ article.author }</span></p>

                        <p className="published-on">{ format(article.createdAt, "MMMM do, yyyy") }</p>

                        <p className="last-updated">{ formatDistanceToNow(article.updatedAt, {addSuffix: true}) }</p>

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
        const { articles} = useArticlesDisplayReducer();
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
                                { articles.map((article, index) => (
                                        <ArticleLayout key={index} article={article} />
                                )) }
                        </div>
                </div>
        );
}

export default MainSection;