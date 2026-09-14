import { useEffect, useState, useMemo } from 'react';
import Select, { components } from "react-select";
import useTechnicalSkillsReducer from '../../../../Hooks/useTechnicalSkillsReducer';
import SimpleIcon, { searchSimpleIcons } from '../../../../Utils/simpleIcons';
import AddIcon from '../../../../assets/Icons/Admin/Common/New/plus.png';
import CancelIcon from '../../../../assets/Icons/Admin/Common/New/cancel-hover.png';
import CheckBlackIcon from '../../../../assets/Icons/Admin/Common/New/checkmark-black.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/New/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/New/delete-hover.png';
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
        const [valuesSet, setValuesSet] = useState(() => new Set(
                tag.icon ? [...values] : values.map(v => typeof v === 'object' ? v.name : v)
        ));
        const [searchQuery, setSearchQuery] = useState("");

        const isTechSkill = tag.type === "select" || tag.subLabel === "tech" || tag.name === "techStack";
        const { skills: reducerSkills = [] } = useTechnicalSkillsReducer();

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
                setInputs([""]);
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

        const handleCancel = (index) => {
                const updatedInputs = [...inputs];
                updatedInputs.splice(index, 1);
                setInputs(updatedInputs);
        };

        const handleMore = () => {
                setInputs((prev) => [...prev, ""]);
        };

        const handleDone = () => {
                let newEntries = [];
                let newValuesSet = new Set(valuesSet);
                let addedState = false;

                for (let input of inputs) {
                        if (!input) continue;

                        if (tag.icon) {
                                const valStr = typeof input === 'string' ? input.trim() : input.name;
                                if (valStr && !newValuesSet.has(valStr)) {
                                        newEntries.push(valStr);
                                        addedState = true;
                                        newValuesSet.add(valStr);
                                }
                        } else {
                                const itemObj = typeof input === 'object' ? input : { name: input, icon: input };
                                if (itemObj.name && !newValuesSet.has(itemObj.name)) {
                                        newEntries.push(itemObj);
                                        addedState = true;
                                        newValuesSet.add(itemObj.name);
                                }
                        }
                }

                if (newEntries.length > 0) {
                        handleValueChange(tag.name, tag.inputType, { action: "entry", values: newEntries });
                        if (tag.required) handleAdd(tag.name, true);
                }

                setValuesSet(new Set([...valuesSet, ...newValuesSet]));
                setInputs([]);
                setSearchQuery("");
        };

        const handleRemove = (index, deletedValue) => {
                setValuesSet((prev) => {
                        const updatedSet = new Set(prev);
                        updatedSet.delete(deletedValue);
                        return updatedSet;
                });
                handleValueChange(tag.name, tag.inputType, { action: "delete", index: index });
        };

        useEffect(() => {
                if (!values.length && tag.required) handleAdd(tag.name, false);
                setValuesSet(new Set(tag.icon ? [...values] : values.map(v => typeof v === 'object' ? v.name : v)));
        }, [values]);

        return (
                <div className="tag-input">
                        <p className="label">
                                {tag.label}
                                {tag.required ? <span className={`add-state ${added ? "added" : ""}`}></span> : null}
                        </p>

                        {inputs.length ? null : (
                                <p className="add" onClick={handleAdding}>
                                        <span className="icon">
                                                <img src={AddIcon} alt="Add icon" />
                                        </span>
                                        add
                                </p>
                        )}

                        {inputs.length ? (
                                <div className="new-tag">
                                        <p className="label">{`New ${tag.subLabel}`}</p>

                                        <div className="inputs">
                                                {inputs.map((input, index) => (
                                                        <div className="input" key={index}>
                                                                {tag.type === "select" || isTechSkill ? (
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
                                                                        />
                                                                )}

                                                                <p className="cancel" onClick={() => { handleCancel(index); }}>
                                                                        cancel
                                                                        <span className="icon">
                                                                                <img src={CancelIcon} alt="Cancel icon" />
                                                                        </span>
                                                                </p>
                                                        </div>
                                                ))}
                                        </div>

                                        <p className="more button" onClick={handleMore}>
                                                more
                                                <span className="icon">
                                                        <img src={AddIcon} alt="Add icon" />
                                                </span>
                                        </p>

                                        <p className="done button" onClick={handleDone}>
                                                done
                                                <span className="icon">
                                                        <img src={CheckBlackIcon} alt="Checkmark icon" />
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
                                                        <div key={index} className={`sub-label ${tag.subLabel}`}>
                                                                <p className="value">
                                                                        <span className="icon">
                                                                                {isCustomTag ? (
                                                                                        <img src={valIcon} alt={tag.subLabel} />
                                                                                ) : (
                                                                                        <SimpleIcon name={valIcon} size="20px" color="#c6ff00" />
                                                                                )}
                                                                        </span>

                                                                        <span className="name">
                                                                                {valName}
                                                                        </span>
                                                                </p>

                                                                <p className="delete" onClick={() => { handleRemove(index, valName); }}>
                                                                        <img src={DeleteIcon} alt="Delete icon" className="main" />
                                                                        <img src={DeleteHoverIcon} alt="Delete icon" className="hover" />
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