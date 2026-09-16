import { useState, useMemo } from 'react';
import Select, { components } from "react-select";
import useTechnicalSkillsReducer from '../../../../Hooks/useTechnicalSkillsReducer';
import SimpleIcon, { searchSimpleIcons } from '../../../../Utils/simpleIcons';
import '../Styles/TechSelectInput.css';

const Option = (props) => (
        <components.Option {...props}>
                <div className="tech-select-option">
                        <div className="tech-select-option-left">
                                <SimpleIcon
                                        name={props.data.icon || props.data.slug || props.data.name}
                                        size="20px"
                                        color="#c6ff00"
                                />
                                <span className="tech-select-name">
                                        {props.data.name || props.data.label}
                                </span>
                        </div>
                        {props.data.isReducerSkill && (
                                <span className="tech-saved-badge">
                                        Saved
                                </span>
                        )}
                </div>
        </components.Option>
);

const SingleValue = (props) => (
        <components.SingleValue {...props}>
                <div className="tech-select-single-value">
                        <SimpleIcon
                                name={props.data.icon || props.data.slug || props.data.name}
                                size="20px"
                                color="#c6ff00"
                        />
                        <span className="tech-select-name">
                                {props.data.name || props.data.label}
                        </span>
                </div>
        </components.SingleValue>
);

function TechSelectInput({ tech, value, handleValueChange, added, handleAdd }) {
        const [searchQuery, setSearchQuery] = useState("");
        const { skills = [] } = useTechnicalSkillsReducer();

        const currentName = typeof value === 'object' && value !== null ? (value.name || "") : (value || "");
        const currentIcon = typeof value === 'object' && value !== null ? (value.icon || value.name || "") : (tech?.icon || value || "");

        // Saved technical skills from reducer
        const reducerOptions = useMemo(() => {
                if (!Array.isArray(skills)) return [];
                return skills.map((s) => ({
                        name: s.name,
                        label: s.name,
                        value: s.name,
                        icon: s.icon || s.name,
                        slug: s.icon || s.name,
                        isReducerSkill: true,
                }));
        }, [skills]);

        // Combined options with simple-icons search
        const selectOptions = useMemo(() => {
                const q = searchQuery.trim().toLowerCase();
                const matchedReducer = reducerOptions.filter(
                        (opt) => !q || opt.name.toLowerCase().includes(q)
                );

                const simpleIconResults = searchSimpleIcons(searchQuery, 30);
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
        }, [searchQuery, reducerOptions]);

        const selectedOption = useMemo(() => {
                if (!currentName) return null;
                return {
                        name: currentName,
                        label: currentName,
                        value: currentName,
                        icon: currentIcon || currentName,
                        slug: currentIcon || currentName
                };
        }, [currentName, currentIcon]);

        const handleSelectChange = (option) => {
                if (!option) {
                        handleValueChange(tech.name, tech.inputType, { name: "", icon: "" });
                        if (tech.required) handleAdd(tech.name, false);
                        return;
                }

                const chosenName = option.name || option.label || option.value;
                const chosenIcon = option.icon || option.slug || option.value || chosenName;

                handleValueChange(tech.name, tech.inputType, { name: chosenName, icon: chosenIcon });
                if (tech.required) handleAdd(tech.name, Boolean(chosenName));
        };

        return (
                <div className="tech-select-input">
                        <div className="tech-select-header">
                                <p className="label">
                                        {tech.label}
                                        {tech.required ? <span className={`add-state ${added ? "added" : ""}`}></span> : null}
                                </p>
                        </div>

                        <div className="tech-select-wrapper">
                                <Select
                                        className="select"
                                        classNamePrefix="select"
                                        options={selectOptions}
                                        value={selectedOption}
                                        isSearchable={true}
                                        isClearable={true}
                                        onInputChange={(val, { action }) => {
                                                if (action === "input-change") {
                                                        setSearchQuery(val);
                                                }
                                        }}
                                        filterOption={() => true}
                                        placeholder={`Search technology or icon (e.g. React, Docker, Python)...`}
                                        components={{ Option, SingleValue }}
                                        onChange={handleSelectChange}
                                />
                        </div>

                        {currentName && (
                                <div className="tech-live-preview-box">
                                        <div className="preview-icon-wrapper">
                                                <SimpleIcon name={currentIcon || currentName} size="24px" color="#c6ff00" />
                                        </div>
                                        <div className="preview-text-info">
                                                <span className="preview-tech-name">{currentName}</span>
                                                <span className="preview-tech-slug">icon slug: <code>{currentIcon || currentName}</code></span>
                                        </div>
                                </div>
                        )}
                </div>
        );
}

export default TechSelectInput;
