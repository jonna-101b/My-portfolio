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
                                        color="var(--admin-accent)"
                                />
                                <span style={{ color: "var(--admin-text-primary)", fontSize: "0.85rem" }}>
                                        {props.data.name || props.data.label}
                                </span>
                        </div>
                        {props.data.isAvailable && (
                                <span style={{ fontSize: "0.65rem", color: "var(--admin-accent)", background: "var(--admin-accent-soft)", padding: "1px 5px", borderRadius: "4px" }}>
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
                                color="var(--admin-accent)"
                        />
                        <span style={{ color: "var(--admin-text-primary)", fontSize: "0.85rem" }}>
                                {props.data.name || props.data.label}
                        </span>
                </div>
        </components.SingleValue>
);

function SocialLinksCard() {
        const { profile, addSocialLinks, deleteSocialLink } = useProfileReducer();
        const socialLinks = profile?.socialLinks || [];
        const [isAddOpen, setIsAddOpen] = useState(false);
        const [selectedOption, setSelectedOption] = useState(null);
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

        const handleSelectChange = (val) => {
                setSelectedOption(val);
        };

        const handleInputChange = (inputValue, { action }) => {
                if (action === "input-change") {
                        setSearchQuery(inputValue);
                }
        };

        const handleAddLink = () => {
                if (!selectedOption) return;
                const name = selectedOption.name || selectedOption.label || selectedOption.value;
                const icon = selectedOption.icon || selectedOption.slug || name;
                const url = selectedOption.url || `https://${name.toLowerCase()}.com`;

                const existing = socialLinks.some(s => (typeof s === 'object' ? s.name : s)?.toLowerCase() === name.toLowerCase());
                if (!existing && addSocialLinks) {
                        addSocialLinks([{
                                _id: `soc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                                name,
                                icon,
                                url
                        }]);
                }

                setSelectedOption(null);
                setIsAddOpen(false);
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
                        backgroundColor: 'var(--admin-bg-page)',
                        borderColor: state.isFocused ? 'var(--admin-accent)' : 'var(--admin-border-base)',
                        borderRadius: '12px',
                        minHeight: '38px',
                        boxShadow: 'none',
                        '&:hover': { borderColor: 'var(--admin-border-medium)' }
                }),
                menu: (base) => ({
                        ...base,
                        backgroundColor: 'var(--admin-surface-main)',
                        border: '1px solid var(--admin-border-base)',
                        borderRadius: '14px',
                        padding: '6px',
                        zIndex: 999,
                        boxShadow: '0 12px 28px var(--admin-overlay-heavy)'
                }),
                option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? 'var(--admin-control-bg-hover)' : 'transparent',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        color: 'var(--admin-text-primary)'
                }),
                input: (base) => ({ ...base, color: 'var(--admin-text-primary)' }),
                placeholder: (base) => ({ ...base, color: 'var(--admin-text-dim)', fontSize: '0.8125rem' }),
                singleValue: (base) => ({ ...base, color: 'var(--admin-text-primary)' }),
                groupHeading: (base) => ({ ...base, color: 'var(--admin-text-muted)', fontSize: '0.7rem', fontWeight: 600 }),
                dropdownIndicator: (base) => ({ ...base, color: 'var(--admin-text-muted)', padding: '4px' }),
                indicatorSeparator: () => ({ display: 'none' })
        };

        return (
                <div className="social-links-card" ref={popupRef}>
                        <div className="card-header">
                                <h3 className="card-title">Social Links</h3>
                                <button
                                        type="button"
                                        className={`add-pill-btn ${isAddOpen ? "active" : ""}`}
                                        onClick={() => setIsAddOpen(prev => !prev)}
                                        aria-label="Add social link"
                                >
                                        <AddRoundedIcon style={{ fontSize: '1rem' }} />
                                        <span>Add</span>
                                </button>
                        </div>

                        {/* Add Link Popup */}
                        {isAddOpen && (
                                <div className="social-popup">
                                        <div className="popup-top">
                                                <span className="popup-heading">Select Platform</span>
                                                <button
                                                        type="button"
                                                        className="popup-close-btn"
                                                        onClick={() => setIsAddOpen(false)}
                                                        aria-label="Close popup"
                                                >
                                                        <CloseRoundedIcon style={{ fontSize: '1.1rem' }} />
                                                </button>
                                        </div>

                                        <div className="popup-select-row">
                                                <div className="select-container-wrapper">
                                                        <Select
                                                                options={selectOptions}
                                                                value={selectedOption}
                                                                onChange={handleSelectChange}
                                                                onInputChange={handleInputChange}
                                                                components={{ Option, SingleValue }}
                                                                styles={customSelectStyles}
                                                                placeholder="Search or pick a platform..."
                                                                isClearable
                                                                isSearchable
                                                                autoFocus
                                                                menuIsOpen={true}
                                                        />
                                                </div>
                                        </div>

                                        <div className="popup-actions-row">
                                                <button
                                                        type="button"
                                                        className="btn-cancel"
                                                        onClick={() => {
                                                                setSelectedOption(null);
                                                                setIsAddOpen(false);
                                                        }}
                                                >
                                                        Cancel
                                                </button>
                                                <button
                                                        type="button"
                                                        className="btn-done"
                                                        onClick={handleAddLink}
                                                        disabled={!selectedOption}
                                                >
                                                        <CheckRoundedIcon style={{ fontSize: '1rem' }} />
                                                        <span>Add</span>
                                                </button>
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
                                                                                <SimpleIcon name={linkIcon} size="18px" color="var(--admin-accent)" />
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
