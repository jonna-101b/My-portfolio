import { useState, useEffect, useRef } from 'react';
import useProfileReducer from '../../../../Hooks/useProfileReducer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../Styles/AboutCard.css';

function AboutCard() {
        const { profile, updateDescription } = useProfileReducer();
        const description = profile?.description || { brief: "", detailed: "" };
        const [tab, setTab] = useState("brief");
        const [isEditing, setIsEditing] = useState(false);
        const [descriptions, setDescriptions] = useState({
                brief: description.brief || "",
                detailed: description.detailed || "",
        });
        const textareaRef = useRef(null);

        useEffect(() => {
                setDescriptions({
                        brief: description.brief || "",
                        detailed: description.detailed || "",
                });
        }, [description]);

        useEffect(() => {
                if (isEditing && textareaRef.current) {
                        textareaRef.current.focus();
                }
        }, [isEditing, tab]);

        const handleTabChange = (newTab) => {
                setTab(newTab);
                setIsEditing(false);
        };

        const handleEditToggle = () => {
                if (isEditing) {
                        setDescriptions({
                                brief: description.brief || "",
                                detailed: description.detailed || "",
                        });
                        setIsEditing(false);
                } else {
                        setIsEditing(true);
                }
        };

        const handleChangeText = (e) => {
                setDescriptions((prev) => ({
                        ...prev,
                        [tab]: e.target.value,
                }));
        };

        const handleSave = () => {
                updateDescription(descriptions);
                setIsEditing(false);
        };

        const currentText = descriptions[tab] || "";

        return (
                <div className="about-card">
                        <div className="card-header">
                                <h3 className="card-title">About</h3>

                                <div className="about-segmented-control">
                                        <button
                                                type="button"
                                                className={`segment-btn ${tab === "brief" ? "active" : ""}`}
                                                onClick={() => handleTabChange("brief")}
                                        >
                                                Brief
                                        </button>
                                        <button
                                                type="button"
                                                className={`segment-btn ${tab === "detailed" ? "active" : ""}`}
                                                onClick={() => handleTabChange("detailed")}
                                        >
                                                Detailed
                                        </button>
                                </div>
                        </div>

                        <div className={`about-content-box ${isEditing ? "editing" : ""}`}>
                                {isEditing ? (
                                        <textarea
                                                ref={textareaRef}
                                                value={currentText}
                                                onChange={handleChangeText}
                                                maxLength={tab === "brief" ? 300 : 2000}
                                                placeholder={`Write your ${tab} about description...`}
                                                className="about-textarea"
                                                rows={tab === "brief" ? 6 : 10}
                                        />
                                ) : (
                                        <p className="about-text">
                                                {currentText || `No ${tab} description added yet.`}
                                        </p>
                                )}

                                <div className="about-bottom-actions">
                                        {isEditing && (
                                                <span className="char-count">
                                                        {currentText.length} / {tab === "brief" ? 300 : 2000}
                                                </span>
                                        )}

                                        <div className="actions-wrapper">
                                                {isEditing ? (
                                                        <div className="editing-actions">
                                                                <button
                                                                        type="button"
                                                                        className="row-action-btn cancel"
                                                                        onClick={handleEditToggle}
                                                                        title="Cancel"
                                                                >
                                                                        <CloseRoundedIcon style={{ fontSize: '0.95rem' }} />
                                                                </button>
                                                                <button
                                                                        type="button"
                                                                        className="row-action-btn save"
                                                                        onClick={handleSave}
                                                                        title="Save"
                                                                >
                                                                        <span>done</span>
                                                                        <CheckRoundedIcon style={{ fontSize: '0.95rem' }} />
                                                                </button>
                                                        </div>
                                                ) : (
                                                        <button
                                                                type="button"
                                                                className="row-action-btn edit"
                                                                onClick={handleEditToggle}
                                                                aria-label="Edit about description"
                                                        >
                                                                <span>edit</span>
                                                                <EditOutlinedIcon style={{ fontSize: '0.95rem' }} />
                                                        </button>
                                                )}
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default AboutCard;
