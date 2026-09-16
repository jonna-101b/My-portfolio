import { useContext } from 'react';
import { ViewContext } from '../Contexts/ViewContext';
import { getYear } from 'date-fns';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import '../Styles/View.css';


function Wrapper({ qualification, handleDisplay }) {
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

        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation(); }}>
                        <div className="view-modal-header">
                                <div className="component-name">
                                        <SchoolOutlinedIcon className="header-icon" />
                                        <span>Qualification Details</span>
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
                                <div className="hero-section">
                                        <div className="icon-wrapper">
                                                <SchoolOutlinedIcon className="mortarboard-icon" />
                                        </div>
                                        <div className="hero-details">
                                                <h2 className="discipline">{qualification.discipline}</h2>
                                                <p className="organization">{qualification.organization}</p>
                                        </div>
                                </div>

                                <div className="meta-badges-row">
                                        {qualification.type && (
                                                <span className="type-badge">
                                                        <WorkspacePremiumOutlinedIcon className="badge-icon" />
                                                        {qualification.type}
                                                </span>
                                        )}

                                        {qualification.duration && (
                                                <span className="duration-badge">
                                                        <AccessTimeOutlinedIcon className="badge-icon" />
                                                        {formatDuration(qualification.duration)}
                                                </span>
                                        )}

                                        {qualification.active ? (
                                                <span className="status-badge active">
                                                        <span className="pulse-dot" />
                                                        Active
                                                </span>
                                        ) : (
                                                <span className="status-badge completed">
                                                        <CheckCircleOutlineRoundedIcon className="badge-icon" />
                                                        Completed
                                                </span>
                                        )}
                                </div>

                                {qualification.description && (
                                        <div className="content-section">
                                                <div className="section-label">
                                                        <DescriptionOutlinedIcon className="section-icon" />
                                                        <span>Description & Highlights</span>
                                                </div>
                                                <div className="description-card">
                                                        <p>{qualification.description}</p>
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
                        {isEmptyObject(view) ? "" : <Wrapper qualification={view} handleDisplay={handleDisplay} />}
                </div>
        );
}

export default View;