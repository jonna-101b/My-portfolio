import { useState, useRef, useEffect } from 'react';
import useProfileReducer from '../../../../Hooks/useProfileReducer';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import '../Styles/ProfessionsCard.css';

function ProfessionsCard() {
        const { profile, updateProfile } = useProfileReducer();
        const professions = profile?.professions || [];
        const [isAddOpen, setIsAddOpen] = useState(false);
        const [newInputs, setNewInputs] = useState([""]);
        const popupRef = useRef(null);

        const handleAddToggle = () => {
                setIsAddOpen(prev => !prev);
                setNewInputs([""]);
        };

        const handleInputChange = (val, index) => {
                const updated = [...newInputs];
                updated[index] = val;
                setNewInputs(updated);
        };

        const handleAddRow = () => {
                setNewInputs(prev => [...prev, ""]);
        };

        const handleRemoveInputRow = (index) => {
                if (newInputs.length === 1) {
                        setNewInputs([""]);
                } else {
                        setNewInputs(prev => prev.filter((_, i) => i !== index));
                }
        };

        const handleSaveNewProfessions = () => {
                const validNew = newInputs.map(t => t.trim()).filter(Boolean);
                if (validNew.length > 0) {
                        const existingSet = new Set(professions);
                        const uniqueToAdd = validNew.filter(p => !existingSet.has(p));
                        if (uniqueToAdd.length > 0) {
                                updateProfile({ professions: [...professions, ...uniqueToAdd] });
                        }
                }
                setIsAddOpen(false);
                setNewInputs([""]);
        };

        const handleDeleteProfession = (indexToDelete) => {
                const updated = professions.filter((_, i) => i !== indexToDelete);
                updateProfile({ professions: updated });
        };

        // Close popup when clicking outside
        useEffect(() => {
                const handleClickOutside = (e) => {
                        if (popupRef.current && !popupRef.current.contains(e.target)) {
                                setIsAddOpen(false);
                        }
                };
                if (isAddOpen) {
                        document.addEventListener("mousedown", handleClickOutside);
                }
                return () => {
                        document.removeEventListener("mousedown", handleClickOutside);
                };
        }, [isAddOpen]);

        return (
                <div className="professions-card" ref={popupRef}>
                        <div className="card-header">
                                <h3 className="card-title">Professions</h3>
                                <button
                                        type="button"
                                        className={`add-pill-btn ${isAddOpen ? "active" : ""}`}
                                        onClick={handleAddToggle}
                                        aria-label="Add profession"
                                >
                                        <AddRoundedIcon style={{ fontSize: '1rem' }} />
                                        <span>Add</span>
                                </button>
                        </div>

                        {/* Anchored Popup right below + Add button */}
                        {isAddOpen && (
                                <div className="profession-popup">
                                        <div className="popup-top">
                                                <span className="popup-heading">New Profession</span>
                                                <button type="button" className="popup-close-btn" onClick={() => setIsAddOpen(false)}>
                                                        <CloseRoundedIcon style={{ fontSize: '1.1rem' }} />
                                                </button>
                                        </div>

                                        <div className="popup-inputs-list">
                                                {newInputs.map((inputVal, index) => (
                                                        <div className="popup-input-row" key={index}>
                                                                <input
                                                                        type="text"
                                                                        placeholder="e.g. Full Stack Developer"
                                                                        value={inputVal}
                                                                        onChange={(e) => handleInputChange(e.target.value, index)}
                                                                        className="popup-input"
                                                                        autoFocus={index === newInputs.length - 1}
                                                                        onKeyDown={(e) => {
                                                                                if (e.key === 'Enter') handleSaveNewProfessions();
                                                                        }}
                                                                />
                                                                {newInputs.length > 1 && (
                                                                        <button
                                                                                type="button"
                                                                                className="input-remove-btn"
                                                                                onClick={() => handleRemoveInputRow(index)}
                                                                                title="Remove row"
                                                                        >
                                                                                <CloseRoundedIcon style={{ fontSize: '0.9rem' }} />
                                                                        </button>
                                                                )}
                                                        </div>
                                                ))}
                                        </div>

                                        <div className="popup-actions-row">
                                                <button type="button" className="btn-more" onClick={handleAddRow}>
                                                        <AddRoundedIcon style={{ fontSize: '0.95rem' }} />
                                                        <span>More</span>
                                                </button>
                                                <div className="popup-primary-actions">
                                                        <button type="button" className="btn-cancel" onClick={() => setIsAddOpen(false)}>
                                                                <span>Cancel</span>
                                                        </button>
                                                        <button type="button" className="btn-done" onClick={handleSaveNewProfessions}>
                                                                <CheckRoundedIcon style={{ fontSize: '0.95rem' }} />
                                                                <span>Done</span>
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        )}

                        <div className="professions-list">
                                {professions.length > 0 ? (
                                        professions.map((prof, index) => (
                                                <div className="profession-item" key={index}>
                                                        <div className="item-info">
                                                                <WorkOutlineRoundedIcon className="item-icon" style={{ fontSize: '1.15rem' }} />
                                                                <span className="item-text">{prof}</span>
                                                        </div>
                                                        <button
                                                                type="button"
                                                                className="item-delete-btn"
                                                                onClick={() => handleDeleteProfession(index)}
                                                                aria-label={`Delete ${prof}`}
                                                                title="Delete profession"
                                                        >
                                                                <DeleteOutlineRoundedIcon style={{ fontSize: '1.15rem' }} />
                                                        </button>
                                                </div>
                                        ))
                                ) : (
                                        <p className="no-items-text">No professions added yet.</p>
                                )}
                        </div>
                </div>
        );
}

export default ProfessionsCard;
