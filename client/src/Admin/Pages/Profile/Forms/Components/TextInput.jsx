import { useState, useRef, useEffect } from 'react';
import useProfileReducer from '../../../../../Hooks/useProfileReducer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../Styles/TextInput.css';

const TextInput = ({ text }) => {
        const { updateProfile } = useProfileReducer();
        const [value, setValue] = useState(text.value || "");
        const [edited, setEdited] = useState(false);
        const [disabled, setDisabled] = useState(true);
        const inputRef = useRef(null);

        useEffect(() => {
                setValue(text.value || "");
        }, [text.value]);

        useEffect(() => {
                if (!disabled && inputRef.current) {
                        inputRef.current.focus();
                }
        }, [disabled]);

        const handleEditToggle = () => {
                if (!disabled) {
                        // Canceling
                        setValue(text.value || "");
                        setEdited(false);
                        setDisabled(true);
                } else {
                        setDisabled(false);
                }
        };

        const handleChange = (event) => {
                const newVal = event.target.value;
                setValue(newVal);
                setEdited(newVal !== (text.value || ""));
        };

        const handleSave = () => {
                updateProfile({ [text.name]: value });
                setDisabled(true);
                setEdited(false);
        };

        const handleKeyDown = (e) => {
                if (e.key === 'Enter') {
                        handleSave();
                } else if (e.key === 'Escape') {
                        handleEditToggle();
                }
        };

        return (
                <div className="profile-text-row">
                        <span className="row-label">
                                {text.label}
                                {edited && <span className="edited-dot" />}
                        </span>

                        <div className="row-input-wrapper">
                                <input
                                        ref={inputRef}
                                        type={text.type || "text"}
                                        name={text.name}
                                        id={text.name}
                                        value={value}
                                        disabled={disabled}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder={`Enter ${text.label.toLowerCase()}`}
                                        className="row-input"
                                />
                        </div>

                        <div className="row-actions">
                                {disabled ? (
                                        <button
                                                type="button"
                                                className="row-action-btn edit"
                                                onClick={handleEditToggle}
                                                aria-label={`Edit ${text.label}`}
                                        >
                                                <span>edit</span>
                                                <EditOutlinedIcon style={{ fontSize: '0.95rem' }} />
                                        </button>
                                ) : (
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
                                )}
                        </div>
                </div>
        );
};

export default TextInput;