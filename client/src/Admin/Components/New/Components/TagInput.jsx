import { useEffect, useState, useMemo } from 'react';
import Select, { components } from "react-select";
import useTechnicalSkillsReducer from '../../../../Hooks/useTechnicalSkillsReducer';
import SimpleIcon from '../../../../Utils/simpleIcons';
import { searchSimpleIcons } from '../../../../Utils/simpleIconSearch';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { ImageWithFallback, parseImageUrl } from '../../../../Utils/imageUtils';
import '../Styles/TagInput.css';

const Option = (props) => (
        <components.Option {...props}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <SimpleIcon
                                        name={props.data.icon || props.data.slug || props.data.name}
                                        size="18px"
                                        color="#c6ff00"
                                />
                                <span style={{ color: "#ededed", fontSize: "0.875rem" }}>
                                        {props.data.name || props.data.label}
                                </span>
                        </div>
                        {props.data.isReducerSkill && (
                                <span style={{ fontSize: "0.7rem", color: "#c6ff00", background: "rgba(198, 255, 0, 0.1)", padding: "1px 6px", borderRadius: "4px" }}>
                                        Saved
                                </span>
                        )}
                </div>
        </components.Option>
);

const SingleValue = (props) => (
        <components.SingleValue {...props}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <SimpleIcon
                                name={props.data.icon || props.data.slug || props.data.name}
                                size="18px"
                                color="#c6ff00"
                        />
                        <span style={{ color: "#ededed", fontSize: "0.875rem" }}>
                                {props.data.name || props.data.label}
                        </span>
                </div>
        </components.SingleValue>
);

function TagInput({ tag, values = [], handleValueChange, added, handleAdd }) {
        const [inputs, setInputs] = useState([]);
        const [searchQuery, setSearchQuery] = useState("");

        const isLink = tag.type === "link" || tag.name === "links" || tag.subLabel === "link";
        const isTechSkill = tag.type === "select" || tag.subLabel === "tech" || tag.name === "techStack";
        const { skills: reducerSkills = [] } = useTechnicalSkillsReducer();

        const getValueKey = (val) => {
                if (!val) return "";
                if (isLink) {
                        if (typeof val === 'string') return val.trim().toLowerCase();
                        return `${(val.title || '').trim().toLowerCase()}|${(val.url || '').trim().toLowerCase()}`;
                }
                if (tag.icon) {
                        return typeof val === 'string' ? val.trim() : (val.name || '');
                }
                return typeof val === 'object' ? (val.name || val.label || '') : String(val);
        };

        const getValuesKeySet = (vals) => new Set((vals || []).map(getValueKey).filter(Boolean));

        const [valuesSet, setValuesSet] = useState(() => getValuesKeySet(values));

        // Technical skills available in reducer
        const reducerOptions = useMemo(() => {
                if (!isTechSkill || !Array.isArray(reducerSkills)) return [];
                return reducerSkills.map((s) => ({
                        name: s.name,
                        label: s.name,
                        value: s.name,
                        icon: s.icon || s.name,
                        isReducerSkill: true,
                }));
        }, [isTechSkill, reducerSkills]);

        // Dynamic options combining reducer skills + simple-icons library search
        const selectOptions = useMemo(() => {
                if (!isTechSkill) {
                        return tag.options || [];
                }

                const q = searchQuery.trim().toLowerCase();
                const matchedReducer = reducerOptions.filter(
                        (opt) => !q || opt.name.toLowerCase().includes(q)
                );

                const simpleIconResults = searchSimpleIcons(searchQuery, 25);
                const matchedIcons = simpleIconResults.filter(
                        (icon) => !matchedReducer.some((r) => r.name.toLowerCase() === icon.name.toLowerCase())
                );

                if (q) {
                        const groups = [];
                        if (matchedReducer.length > 0) {
                                groups.push({ label: "My Technical Skills", options: matchedReducer });
                        }
                        if (matchedIcons.length > 0) {
                                groups.push({ label: "Simple Icons Library", options: matchedIcons });
                        }
                        return groups.length > 0 ? groups : matchedIcons;
                }

                return [
                        ...(matchedReducer.length > 0 ? [{ label: "My Technical Skills", options: matchedReducer }] : []),
                        { label: "Popular Technologies", options: matchedIcons }
                ];
        }, [isTechSkill, tag.options, searchQuery, reducerOptions]);

        const handleAdding = () => {
                setInputs(isLink ? [{ title: "", url: "" }] : [""]);
                setSearchQuery("");
        };

        const handleChange = (value, index) => {
                const updatedInputs = [...inputs];
                if (value && typeof value === 'object' && value.value) {
                        updatedInputs[index] = {
                                name: value.name || value.label || value.value,
                                icon: value.icon || value.slug || value.value
                        };
                } else {
                        updatedInputs[index] = value;
                }
                setInputs(updatedInputs);
        };

        const handleLinkChange = (index, field, value) => {
                const updatedInputs = [...inputs];
                const current = typeof updatedInputs[index] === 'object' && updatedInputs[index] !== null
                        ? updatedInputs[index]
                        : { title: '', url: '' };
                updatedInputs[index] = {
                        ...current,
                        [field]: value
                };
                setInputs(updatedInputs);
        };

        const handleCancel = (index) => {
                const updatedInputs = [...inputs];
                updatedInputs.splice(index, 1);
                setInputs(updatedInputs);
        };

        const handleMore = () => {
                setInputs((prev) => [...prev, isLink ? { title: "", url: "" } : ""]);
        };

        const handleKeyDown = (e) => {
                if (e.key === "Enter") {
                        e.preventDefault();
                        handleDone();
                }
        };

        const handleDone = () => {
                let newEntries = [];
                let newValuesSet = new Set(valuesSet);

                for (let input of inputs) {
                        if (!input) continue;

                        if (isLink) {
                                const title = typeof input === 'object' ? (input.title || '').trim() : '';
                                let url = typeof input === 'object' ? (input.url || '').trim() : (typeof input === 'string' ? input.trim() : '');

                                if (!title || !url) continue;

                                if (!/^https?:\/\//i.test(url)) {
                                        url = `https://${url}`;
                                }

                                const linkKey = `${title.toLowerCase()}|${url.toLowerCase()}`;
                                if (!newValuesSet.has(linkKey)) {
                                        newEntries.push({ title, url });
                                        newValuesSet.add(linkKey);
                                }
                        } else if (tag.icon) {
                                const valStr = typeof input === 'string' ? input.trim() : input.name;
                                if (valStr && !newValuesSet.has(valStr)) {
                                        newEntries.push(valStr);
                                        newValuesSet.add(valStr);
                                }
                        } else {
                                const itemObj = typeof input === 'object' ? input : { name: input, icon: input };
                                if (itemObj.name && !newValuesSet.has(itemObj.name)) {
                                        newEntries.push(itemObj);
                                        newValuesSet.add(itemObj.name);
                                }
                        }
                }

                if (newEntries.length > 0) {
                        handleValueChange(tag.name, tag.inputType, { action: "entry", values: newEntries });
                        if (tag.required && handleAdd) handleAdd(tag.name, true);
                }

                setValuesSet(new Set([...valuesSet, ...newValuesSet]));
                setInputs([]);
                setSearchQuery("");
        };

        const handleRemove = (index, value) => {
                const deletedKey = getValueKey(value);
                setValuesSet((prev) => {
                        const updatedSet = new Set(prev);
                        updatedSet.delete(deletedKey);
                        return updatedSet;
                });
                handleValueChange(tag.name, tag.inputType, { action: "delete", index: index });
                if (tag.required && handleAdd) {
                        handleAdd(tag.name, (values.length - 1) > 0);
                }
        };

        useEffect(() => {
                setValuesSet(getValuesKeySet(values));
        }, [values, tag.icon, isLink]);

        return (
                <div className="tag-input">
                        <p className="label">
                                {tag.label}
                                {tag.required ? <span className={`add-state ${added ? "added" : ""}`}></span> : null}
                        </p>

                        {inputs.length ? null : (
                                <p className="add" onClick={handleAdding}>
                                        <span className="icon">
                                                <AddRoundedIcon sx={{ fontSize: '1.6vh' }} />
                                        </span>
                                        add
                                </p>
                        )}

                        {inputs.length ? (
                                <div className="new-tag">
                                        <p className="label">{`New ${tag.subLabel}`}</p>

                                        <div className="inputs">
                                                {inputs.map((input, index) => (
                                                        <div className={`input ${isLink ? 'link-input-group' : ''}`} key={index}>
                                                                {isLink ? (
                                                                        <>
                                                                                <input
                                                                                        type="text"
                                                                                        className="link-title-input"
                                                                                        name={`${tag.subLabel}-title-${index}`}
                                                                                        id={`${tag.subLabel}-title-${index}`}
                                                                                        placeholder="Link title (e.g. GitHub)"
                                                                                        value={typeof input === 'object' ? (input.title || '') : ''}
                                                                                        onChange={(e) => {
                                                                                                handleLinkChange(index, 'title', e.target.value);
                                                                                        }}
                                                                                        onKeyDown={handleKeyDown}
                                                                                />
                                                                                <div className="link-input-divider" />
                                                                                <input
                                                                                        type="url"
                                                                                        className="link-url-input"
                                                                                        name={`${tag.subLabel}-url-${index}`}
                                                                                        id={`${tag.subLabel}-url-${index}`}
                                                                                        placeholder="Link URL (e.g. https://...)"
                                                                                        value={typeof input === 'object' ? (input.url || '') : (typeof input === 'string' ? input : '')}
                                                                                        onChange={(e) => {
                                                                                                handleLinkChange(index, 'url', e.target.value);
                                                                                        }}
                                                                                        onKeyDown={handleKeyDown}
                                                                                />
                                                                        </>
                                                                ) : (tag.type === "select" || isTechSkill) ? (
                                                                        <Select
                                                                                className="select"
                                                                                classNamePrefix="select"
                                                                                options={selectOptions}
                                                                                isSearchable={true}
                                                                                onInputChange={(val, { action }) => {
                                                                                        if (action === "input-change") {
                                                                                                setSearchQuery(val);
                                                                                        }
                                                                                }}
                                                                                filterOption={() => true}
                                                                                placeholder={`Search reducer skills or simple-icons for ${tag.subLabel}...`}
                                                                                components={{ Option, SingleValue }}
                                                                                onChange={(value) => {
                                                                                        handleChange(value, index);
                                                                                }}
                                                                        />
                                                                ) : (
                                                                        <input
                                                                                type="text"
                                                                                name={tag.subLabel}
                                                                                id={tag.subLabel}
                                                                                placeholder={`Add your ${tag.subLabel} here`}
                                                                                onChange={(e) => {
                                                                                        handleChange(e.target.value, index);
                                                                                }}
                                                                                onKeyDown={handleKeyDown}
                                                                        />
                                                                )}

                                                                <p className="cancel" onClick={() => { handleCancel(index); }}>
                                                                        cancel
                                                                        <span className="icon">
                                                                                <CloseRoundedIcon sx={{ fontSize: '1.4vh' }} />
                                                                        </span>
                                                                </p>
                                                        </div>
                                                ))}
                                        </div>

                                        <p className="more button" onClick={handleMore}>
                                                more
                                                <span className="icon">
                                                        <AddRoundedIcon sx={{ fontSize: '1.6vh' }} />
                                                </span>
                                        </p>

                                        <p className="done button" onClick={handleDone}>
                                                done
                                                <span className="icon">
                                                        <CheckRoundedIcon sx={{ fontSize: '1.6vh' }} />
                                                </span>
                                        </p>
                                </div>
                        ) : null}

                        <div className="list">
                                {values.length ? (
                                        values.map((value, index) => {
                                                const isCustomTag = Boolean(tag.icon);
                                                const valName = isCustomTag ? value : (typeof value === 'object' ? value.name : value);
                                                const valIcon = isCustomTag ? tag.icon : (typeof value === 'object' ? (value.icon || value.name) : value);

                                                return (
                                                        <div key={index} className={`sub-label ${tag.subLabel} ${isLink ? 'link-item' : ''}`}>
                                                                <div className="value">
                                                                        <span className="icon">
                                                                                {isCustomTag ? (
                                                                                        typeof tag.icon === 'function' || typeof tag.icon === 'object' ? (
                                                                                                <tag.icon sx={{ fontSize: '2vh', color: '#c6ff00' }} />
                                                                                        ) : typeof tag.icon === 'string' && (tag.icon.endsWith('.png') || tag.icon.startsWith('/') || tag.icon.startsWith('data:')) ? (
                                                                                                <ImageWithFallback 
                                                                                                        src={parseImageUrl(valIcon)} 
                                                                                                        alt={tag.subLabel} 
                                                                                                        fallbackColor="transparent"
                                                                                                        fallbackIcon={<SimpleIcon name="code" size="20px" color="#c6ff00" />}
                                                                                                />
                                                                                        ) : (
                                                                                                <SimpleIcon name={valIcon} size="20px" color="#c6ff00" />
                                                                                        )
                                                                                ) : (
                                                                                        <SimpleIcon name={valIcon} size="20px" color="#c6ff00" />
                                                                                )}
                                                                        </span>

                                                                        {isLink ? (
                                                                                <div className="link-info">
                                                                                        <span className="link-title">
                                                                                                {typeof value === 'object' ? (value.title || 'Untitled Link') : value}
                                                                                        </span>
                                                                                        {typeof value === 'object' && value.url ? (
                                                                                                <a
                                                                                                        href={value.url.startsWith('http') ? value.url : `https://${value.url}`}
                                                                                                        target="_blank"
                                                                                                        rel="noreferrer"
                                                                                                        className="link-url"
                                                                                                        onClick={(e) => e.stopPropagation()}
                                                                                                        title={value.url}
                                                                                                >
                                                                                                        {value.url}
                                                                                                </a>
                                                                                        ) : null}
                                                                                </div>
                                                                        ) : (
                                                                                <span className="name">
                                                                                        {valName}
                                                                                </span>
                                                                        )}
                                                                </div>

                                                                <p className="delete" onClick={() => { handleRemove(index, value); }}>
                                                                        <DeleteOutlineRoundedIcon  />
                                                                </p>
                                                        </div>
                                                );
                                        })
                                ) : (
                                        <p className="no-values">{`Add your ${tag.subLabel}s here!`}</p>
                                )}
                        </div>
                </div>
        );
}

export default TagInput;