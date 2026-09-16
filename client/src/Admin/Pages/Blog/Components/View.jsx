import { useContext } from 'react';
import { ViewContext } from '../Contexts/ViewContext';
import { format } from 'date-fns';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { getAssetUrl } from '../../../../Utils/assetUtils';
import '../Styles/View.css';


function Wrapper({ blog, handleDisplay }) {
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

        const handleOpenLink = (url) => {
                if (url) {
                        const targetUrl = url.startsWith('http') ? url : `https://${url}`;
                        window.open(targetUrl, "_blank", "noopener,noreferrer");
                }
        };

        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation(); }}>
                        <div className="view-modal-header">
                                <div className="component-name">
                                        <ArticleOutlinedIcon className="header-icon" />
                                        <span>Blog Post Details</span>
                                </div>
                                <button
                                        type="button"
                                        className="view-close-btn"
                                        onClick={handleDisplay}
                                        title="Close"
                                        aria-label="Close details"
                                >
                                        <CloseRoundedIcon />
                                </button>
                        </div>

                        <div className="container">
                                <div className="hero-banner-section">
                                        <div className="banner-image-wrapper">
                                                {blog.image ? (
                                                        <img src={getAssetUrl(blog.image)} alt={blog.title || "Blog banner"} />
                                                ) : (
                                                        <div className="placeholder-banner">
                                                                <ArticleOutlinedIcon className="placeholder-icon" />
                                                                <span>No Banner Preview</span>
                                                        </div>
                                                )}
                                        </div>

                                        <div className="blog-title-meta">
                                                <h2 className="title">{blog.title}</h2>

                                                <div className="author-meta-row">
                                                        <div className="author-info">
                                                                <span className="author-avatar">{getInitials(blog.author)}</span>
                                                                <span className="author-name">{blog.author}</span>
                                                        </div>

                                                        {blog.createdAt && (
                                                                <span className="published-date">
                                                                        <CalendarTodayOutlinedIcon className="date-icon" />
                                                                        {formatDate(blog.createdAt)}
                                                                </span>
                                                        )}
                                                </div>
                                        </div>
                                </div>

                                {blog.tags && blog.tags.length > 0 && (
                                        <div className="tags-section">
                                                <div className="section-label">
                                                        <LocalOfferOutlinedIcon className="section-icon" />
                                                        <span>Tags</span>
                                                </div>
                                                <div className="tags-list">
                                                        {blog.tags.map((tag, index) => (
                                                                <span key={index} className="tag-pill">
                                                                        {tag}
                                                                </span>
                                                        ))}
                                                </div>
                                        </div>
                                )}

                                {blog.intro && (
                                        <div className="intro-callout-card">
                                                <p className="intro-text">{blog.intro}</p>
                                        </div>
                                )}

                                {blog.description && (
                                        <div className="content-section">
                                                <div className="section-label">
                                                        <DescriptionOutlinedIcon className="section-icon" />
                                                        <span>Article Content</span>
                                                </div>
                                                <div className="description-card">
                                                        <p>{blog.description}</p>
                                                </div>
                                        </div>
                                )}

                                {blog.links && blog.links.length > 0 && (
                                        <div className="links-section">
                                                <div className="section-label">
                                                        <LinkRoundedIcon className="section-icon" />
                                                        <span>Related Links</span>
                                                </div>
                                                <div className="links-list">
                                                        {blog.links.map((link, index) => {
                                                                const linkTitle = typeof link === 'object' ? (link.title || link.url || `Link ${index + 1}`) : link;
                                                                const linkUrl = typeof link === 'object' ? link.url : link;
                                                                return (
                                                                        <button
                                                                                key={index}
                                                                                type="button"
                                                                                className="reference-link-btn"
                                                                                onClick={() => handleOpenLink(linkUrl)}
                                                                        >
                                                                                <span>{linkTitle}</span>
                                                                                <LaunchRoundedIcon className="btn-icon" />
                                                                        </button>
                                                                );
                                                        })}
                                                </div>
                                        </div>
                                )}
                        </div>

                        <div className="view-modal-footer">
                                <button type="button" className="close-action-btn" onClick={handleDisplay}>
                                        Close
                                </button>
                        </div>
                </div>
        );
}

function isEmptyObject(obj) {
        if (typeof obj !== "object" || obj === null) return false;
        return Object.keys(obj).length === 0;
}

function View() {
        const { view, setView } = useContext(ViewContext);

        const handleDisplay = () => {
                setView({});
        };

        return (
                <div className={`view ${isEmptyObject(view) ? "" : "active"}`} onClick={handleDisplay}>
                        {isEmptyObject(view) ? "" : <Wrapper blog={view} handleDisplay={handleDisplay} />}
                </div>
        );
}

export default View;