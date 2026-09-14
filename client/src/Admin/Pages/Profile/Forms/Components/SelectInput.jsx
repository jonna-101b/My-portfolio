import { useEffect, useState, useRef } from 'react';
import useProfileReducer from '../../../../../Hooks/useProfileReducer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import '../Styles/SelectInput.css';

function SelectInput({ select }) {
        const { updateProfile } = useProfileReducer();
        const [selected, setSelected] = useState(select.value || "");
        const [display, setDisplay] = useState(false);
        const popupRef = useRef(null);

        const handleDisplay = () => {
                setDisplay((prev) => !prev);
        };

        const handleChange = (option) => {
                setSelected(option);
                updateProfile({ [select.name]: option });
                setDisplay(false);
        };

        useEffect(() => {
                setSelected(select.value || "");
        }, [select.value]);

        useEffect(() => {
                const handleClickOutside = (e) => {
                        if (popupRef.current && !popupRef.current.contains(e.target)) {
                                setDisplay(false);
                        }
                };
                if (display) {
                        document.addEventListener("mousedown", handleClickOutside);
                }
                return () => {
                        document.removeEventListener("mousedown", handleClickOutside);
                };
        }, [display]);

        return (
                <div className="profile-select-row" ref={popupRef}>
                        <span className="row-label">
                                {select.label}
                        </span>

                        <div className="row-input-wrapper">
                                <span className="select-display-value">
                                        {selected || "Select..."}
                                </span>
                        </div>

                        <div className="row-actions">
                                <button
                                        type="button"
                                        className={`row-action-btn ${display ? "active-toggle" : ""}`}
                                        onClick={handleDisplay}
                                        aria-label={`Change ${select.label}`}
                                >
                                        <span>{display ? "cancel" : "change"}</span>
                                        {display ? (
                                                <CloseRoundedIcon style={{ fontSize: '0.95rem' }} />
                                        ) : (
                                                <EditOutlinedIcon style={{ fontSize: '0.95rem' }} />
                                        )}
                                </button>
                        </div>

                        {display && (
                                <div className="select-dropdown-popup">
                                        {select.options.map((option, index) => {
                                                const isFocused = selected === option;
                                                return (
                                                        <div
                                                                className={`select-option ${isFocused ? "focused" : ""}`}
                                                                key={index}
                                                                onClick={() => handleChange(option)}
                                                        >
                                                                <span className="option-indicator">
                                                                        {isFocused && <CheckRoundedIcon style={{ fontSize: '0.9rem' }} />}
                                                                </span>
                                                                <span className="option-text">{option}</span>
                                                        </div>
                                                );
                                        })}
                                </div>
                        )}
                </div>
        );
}

export default SelectInput;