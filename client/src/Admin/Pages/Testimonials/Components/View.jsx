import { useContext, useState } from 'react';
import { ViewContext } from '../Contexts/ViewContext';
import { format } from 'date-fns';
import { getInitials } from '../../../../Utils/avatarUtils';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { getAssetUrl } from '../../../../Utils/assetUtils';
import '../Styles/View.css';


function Wrapper({ testimonial, handleDisplay }) {
        const [imgError, setImgError] = useState(false);

        const formatDate = (date) => {
                if (!date) return "";
                try {
                        return format(new Date(date), "MMMM do, yyyy");
                } catch {
                        return "";
                }
        };

        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation(); }}>
                        <div className="view-modal-header">
                                <div className="component-name">
                                        <FormatQuoteRoundedIcon className="header-icon" />
                                        <span>Testimonial Details</span>
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
                                <div className="author-hero-card">
                                        <div className="avatar-wrapper">
                                                {testimonial.picture && !imgError ? (
                                                        <img 
                                                                src={getAssetUrl(testimonial.picture)} 
                                                                alt={testimonial.name || "Author avatar"} 
                                                                onError={() => setImgError(true)}
                                                        />
                                                ) : (
                                                        <span className="avatar-initials">{getInitials(testimonial.name)}</span>
                                                )}
                                        </div>

                                        <div className="author-info">
                                                <h2 className="name">{testimonial.name}</h2>

                                                <div className="role-company">
                                                        <WorkOutlineRoundedIcon className="meta-icon" />
                                                        <span>
                                                                {testimonial.position}
                                                                {testimonial.company ? ` at ${testimonial.company}` : ""}
                                                        </span>
                                                </div>

                                                {testimonial.email && (
                                                        <a href={`mailto:${testimonial.email}`} className="email-link">
                                                                <EmailOutlinedIcon className="meta-icon" />
                                                                <span>{testimonial.email}</span>
                                                        </a>
                                                )}
                                        </div>
                                </div>

                                <div className="testimony-card">
                                        <FormatQuoteRoundedIcon className="quote-watermark" />
                                        <div className="testimony-body">
                                                <p>"{testimonial.testimony}"</p>
                                        </div>
                                </div>

                                {testimonial.createdAt && (
                                        <div className="date-meta-row">
                                                <CalendarTodayOutlinedIcon className="meta-icon" />
                                                <span>Submitted on {formatDate(testimonial.createdAt)}</span>
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
                        {isEmptyObject(view) ? "" : <Wrapper testimonial={view} handleDisplay={handleDisplay} />}
                </div>
        );
}

export default View;