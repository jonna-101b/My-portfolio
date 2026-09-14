import { useState, useRef, useEffect, useMemo } from 'react';
import useProfileReducer from '../../../../Hooks/useProfileReducer';
import SimpleIcon, { searchSimpleIcons } from '../../../../Utils/simpleIcons';
import allSocialLinks from '../trialSocialLinks';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Select, { components } from 'react-select';
import '../Styles/SocialLinksCard.css';

const Option = (props) => (
        <components.Option {...props}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <SimpleIcon
                                        name={props.data.icon || props.data.slug || props.data.name}
                                        size="16px"
                                        color="#c6ff00"
                                />
                                <span style={{ color: "#ededed", fontSize: "0.85rem" }}>
                                        {props.data.name || props.data.label}
                                </span>
                        </div>
                        {props.data.isAvailable && (
                                <span style={{ fontSize: "0.65rem", color: "#c6ff00", background: "rgba(198, 255, 0, 0.1)", padding: "1px 5px", borderRadius: "4px" }}>
                                        Available
                                </span>
                        )}
                </div>
        </components.Option>
);

const SingleValue = (props) => (
        <components.SingleValue {...props}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <SimpleIcon
                                name={props.data.icon || props.data.slug || props.data.name}
                                size="16px"
                                color="#c6ff00"
                        />
                        <span style={{ color: "#ededed", fontSize: "0.85rem" }}>
                                {props.data.name || props.data.label}
                        </span>
                </div>
        </components.SingleValue>
);

function SocialLinksCard() {
        const { profile, addSocialLinks, deleteSocialLink } = useProfileReducer();
        const socialLinks = profile?.socialLinks || [];
        const [isAddOpen, setIsAddOpen] = useState(false);
        const [inputs, setInputs] = useState([""]);
        const [searchQuery, setSearchQuery] = useState("");
        const popupRef = useRef(null);

        // Flatten available social links
        const availableOptions = useMemo(() => {
                let flat = [];
                if (Array.isArray(allSocialLinks)) {
                        if (allSocialLinks.length > 0 && allSocialLinks[0].options) {
                                flat = allSocialLinks[0].options;
                        } else {
                                flat = allSocialLinks;
                        }
                }
                return flat.map((s) => ({
                        name: s.name,
                        label: s.name,
                        value: s.name,
                        icon: s.icon || s.name,
                        url: s.url || `https://${(s.icon || s.name || '').toLowerCase()}.com`,
                        isAvailable: true,
                }));
        }, []);

        const selectOptions = useMemo(() => {
                const q = searchQuery.trim().toLowerCase();
                const matchedAvailable = availableOptions.filter(
                        (opt) => !q || opt.name.toLowerCase().includes(q) || (opt.icon && opt.icon.toLowerCase().includes(q))
                );

                const simpleIconResults = searchSimpleIcons(searchQuery, 20);
                const matchedIcons = simpleIconResults.filter(
                        (icon) => !matchedAvailable.some((r) => r.name.toLowerCase() === icon.name.toLowerCase())
                );

                if (q) {
                        const groups = [];
                        if (matchedAvailable.length > 0) {
                                groups.push({ label: "Available Platforms", options: matchedAvailable });
                        }
                        if (matchedIcons.length > 0) {
                                groups.push({ label: "Icon Library", options: matchedIcons });
                        }
                        return groups.length > 0 ? groups : matchedIcons;
                }

                return [
                        ...(matchedAvailable.length > 0 ? [{ label: "Available Platforms", options: matchedAvailable }] : []),
                        { label: "Popular Platforms", options: matchedIcons }
                ];
        }, [searchQuery, availableOptions]);

        const handleAddToggle = () => {
                setIsAddOpen(prev => !prev);
                setInputs([""]);
                setSearchQuery("");
        };

        const handleSelectChange = (val, index) => {
                const updated = [...inputs];
                if (val && typeof val === 'object') {
                        updated[index] = {
                                name: val.name || val.label || val.value,
                                icon: val.icon || val.slug || val.value,
                                url: val.url || `https://${(val.icon || val.slug || val.name || '').toLowerCase()}.com`
                        };
                } else {
                        updated[index] = val;
                }
                setInputs(updated);
        };

        const handleAddRow = () => {
                setInputs(prev => [...prev, ""]);
        };

        const handleRemoveRow = (index) => {
                if (inputs.length === 1) {
                        setInputs([""]);
                } else {
                        setInputs(prev => prev.filter((_, i) => i !== index));
                }
        };

        const handleSave = () => {
                const newEntries = [];
                const existingNames = new Set(socialLinks.map(s => typeof s === 'object' ? s.name : s));

                for (let input of inputs) {
                        if (!input) continue;
                        const itemObj = typeof input === 'object'
                                ? {
                                        _id: `soc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                                        name: input.name,
                                        icon: input.icon || input.name,
                                        url: input.url || `https://${input.name.toLowerCase()}.com`
                                  }
                                : {
                                        _id: `soc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                                        name: input,
                                        icon: input,
                                        url: `https://${input.toLowerCase()}.com`
                                  };

                        if (itemObj.name && !existingNames.has(itemObj.name)) {
                                newEntries.push(itemObj);
                                existingNames.add(itemObj.name);
                        }
                }

                if (newEntries.length > 0 && addSocialLinks) {
                        addSocialLinks(newEntries);
                }

                setIsAddOpen(false);
                setInputs([""]);
                setSearchQuery("");
        };

        const handleDeleteLink = (link) => {
                if (deleteSocialLink) {
                        const idToDelete = typeof link === 'object' ? (link._id || link.name) : link;
                        deleteSocialLink(idToDelete);
                }
        };

        // Click outside handler
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

        // Custom React-Select styles strictly matching colors
        const customSelectStyles = {
                control: (base, state) => ({
                        ...base,
                        backgroundColor: '#131313',
                        borderColor: state.isFocused ? '#c6ff00' : '#262626',
                        borderRadius: '12px',
                        minHeight: '38px',
                        boxShadow: 'none',
                        '&:hover': { borderColor: '#333333' }
                }),
                menu: (base) => ({
                        ...base,
                        backgroundColor: '#171717',
                        border: '1px solid #262626',
                        borderRadius: '14px',
                        padding: '6px',
                        zIndex: 999,
                        boxShadow: '0 12px 28px rgba(0,0,0,0.6)'
                }),
                option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? 'rgba(237, 237, 237, 0.1)' : 'transparent',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        color: '#ededed'
                }),
                input: (base) => ({ ...base, color: '#ededed' }),
                placeholder: (base) => ({ ...base, color: '#666666', fontSize: '0.8125rem' }),
                singleValue: (base) => ({ ...base, color: '#ededed' }),
                groupHeading: (base) => ({ ...base, color: '#888888', fontSize: '0.7rem', fontWeight: 600 }),
                dropdownIndicator: (base) => ({ ...base, color: '#888888', padding: '4px' }),
                indicatorSeparator: () => ({ display: 'none' })
        };

        return (
                <div className="social-links-card" ref={popupRef}>
                        <div className="card-header">
                                <h3 className="card-title">Social Links</h3>
                                <button
                                        type="button"
                                        className={`add-pill-btn ${isAddOpen ? "active" : ""}`}
                                        onClick={handleAddToggle}
                                        aria-label="Add social link"
                                >
                                        <AddRoundedIcon style={{ fontSize: '1rem' }} />
                                        <span>Add</span>
                                </button>
                        </div>

                        {/* Anchored Popup right below + Add button */}
                        {isAddOpen && (
                                <div className="social-popup">
                                        <div className="popup-top">
                                                <span className="popup-heading">New Platform</span>
                                                <button type="button" className="popup-close-btn" onClick={() => setIsAddOpen(false)}>
                                                        <CloseRoundedIcon style={{ fontSize: '1.1rem' }} />
                                                </button>
                                        </div>

                                        <div className="popup-inputs-list">
                                                {inputs.map((_, index) => (
                                                        <div className="popup-select-row" key={index}>
                                                                <div className="select-container-wrapper">
                                                                        <Select
                                                                                options={selectOptions}
                                                                                isSearchable={true}
                                                                                onInputChange={(val, { action }) => {
                                                                                        if (action === "input-change") setSearchQuery(val);
                                                                                }}
                                                                                filterOption={() => true}
                                                                                placeholder="Search platform..."
                                                                                components={{ Option, SingleValue }}
                                                                                styles={customSelectStyles}
                                                                                onChange={(val) => handleSelectChange(val, index)}
                                                                                autoFocus={index === inputs.length - 1}
                                                                        />
                                                                </div>
                                                                {inputs.length > 1 && (
                                                                        <button
                                                                                type="button"
                                                                                className="input-remove-btn"
                                                                                onClick={() => handleRemoveRow(index)}
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
                                                        <button type="button" className="btn-done" onClick={handleSave}>
                                                                <CheckRoundedIcon style={{ fontSize: '0.95rem' }} />
                                                                <span>Done</span>
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        )}

                        <div className="social-list">
                                {socialLinks.length > 0 ? (
                                        socialLinks.map((link, index) => {
                                                const linkName = typeof link === 'object' ? link.name : link;
                                                const linkIcon = typeof link === 'object' ? (link.icon || link.name) : link;

                                                return (
                                                        <div className="social-item" key={index}>
                                                                <div className="item-info">
                                                                        <span className="platform-icon">
                                                                                <SimpleIcon name={linkIcon} size="18px" color="#c6ff00" />
                                                                        </span>
                                                                        <span className="item-text">{linkName}</span>
                                                                </div>
                                                                <button
                                                                        type="button"
                                                                        className="item-delete-btn"
                                                                        onClick={() => handleDeleteLink(link)}
                                                                        aria-label={`Delete ${linkName}`}
                                                                        title="Delete link"
                                                                >
                                                                        <DeleteOutlineRoundedIcon style={{ fontSize: '1.15rem' }} />
                                                                </button>
                                                        </div>
                                                );
                                        })
                                ) : (
                                        <p className="no-items-text">No social links added yet.</p>
                                )}
                        </div>
                </div>
        );
}

export default SocialLinksCard;
