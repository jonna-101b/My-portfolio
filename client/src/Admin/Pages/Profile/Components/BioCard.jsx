import { useState, useEffect, useRef } from 'react';
import useProfileReducer from '../../../../Hooks/useProfileReducer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../Styles/BioCard.css';

function BioCard() {
        const { profile, updateProfile } = useProfileReducer();
        const bio = profile?.bio || "";
        const [value, setValue] = useState(bio);
        const [isEditing, setIsEditing] = useState(false);
        const textareaRef = useRef(null);

        useEffect(() => {
                setValue(bio);
        }, [bio]);

        useEffect(() => {
                if (isEditing && textareaRef.current) {
                        textareaRef.current.focus();
                }
        }, [isEditing]);

        const handleEditToggle = () => {
                if (isEditing) {
                        setValue(bio);
                        setIsEditing(false);
                } else {
                        setIsEditing(true);
                }
        };

        const handleSave = () => {
                updateProfile({ bio: value });
                setIsEditing(false);
        };

        return (
                <div className="bio-card">
                        <div className="card-header">
                                <h3 className="card-title">Bio</h3>
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
                                                aria-label="Edit bio"
                                        >
                                                <span>edit</span>
                                                <EditOutlinedIcon style={{ fontSize: '0.95rem' }} />
                                        </button>
                                )}
                        </div>

                        <div className={`bio-content-box ${isEditing ? "editing" : ""}`}>
                                {isEditing ? (
                                        <>
                                                <textarea
                                                        ref={textareaRef}
                                                        value={value}
                                                        onChange={(e) => setValue(e.target.value)}
                                                        maxLength={400}
                                                        placeholder="Write a brief bio about yourself..."
                                                        className="bio-textarea"
                                                        rows={3}
                                                />
                                                <span className="char-count">{value.length} / 400</span>
                                        </>
                                ) : (
                                        <p className="bio-text">{bio || "No bio added yet."}</p>
                                )}
                        </div>
                </div>
        );
}

export default BioCard;
