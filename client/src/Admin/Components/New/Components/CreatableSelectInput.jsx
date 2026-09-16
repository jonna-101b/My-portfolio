import { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import useTechnicalSkillsReducer from '../../../../Hooks/useTechnicalSkillsReducer';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import '../Styles/CreatableSelectInput.css';

// Default standard tech categories to suggest if reducer is empty
const DEFAULT_CATEGORIES = [
        "Frontend",
        "Backend",
        "Databases",
        "Programming Languages",
        "DevOps & Containerization",
        "Cloud Platforms & Hosting",
        "Version Control & CI/CD",
        "UI/UX & Design",
        "Mobile Development",
        "Testing & QA",
        "AI & Machine Learning",
        "Data Analytics & Big Data"
];

function CreatableSelectInput({ select, value, handleValueChange, added, handleAdd }) {
        const { skills = [] } = useTechnicalSkillsReducer();

        // Extract all existing unique categories from current skills + defaults
        const categoryOptions = useMemo(() => {
                const uniqueSet = new Set();
                
                if (Array.isArray(skills)) {
                        skills.forEach((s) => {
                                if (s.label && s.label.trim()) {
                                        uniqueSet.add(s.label.trim());
                                }
                        });
                }

                DEFAULT_CATEGORIES.forEach((cat) => uniqueSet.add(cat));

                return Array.from(uniqueSet).map((cat) => ({
                        value: cat,
                        label: cat
                }));
        }, [skills]);

        const selectedOption = useMemo(() => {
                if (!value) return null;
                return {
                        value: value,
                        label: value
                };
        }, [value]);

        const handleChange = (option) => {
                const chosenVal = option ? option.value.trim() : "";
                handleValueChange(select.name, select.inputType, chosenVal);
                if (select.required && handleAdd) {
                        handleAdd(select.name, Boolean(chosenVal));
                }
        };

        return (
                <div className="creatable-select-input">
                        <div className="creatable-header">
                                <p className="label">
                                        <CategoryOutlinedIcon className="category-label-icon" />
                                        {select.label}
                                        {select.required ? <span className={`add-state ${added ? "added" : ""}`}></span> : null}
                                </p>
                        </div>

                        <div className="creatable-wrapper">
                                <CreatableSelect
                                        className="creatable-select"
                                        classNamePrefix="creatable"
                                        isClearable={true}
                                        isSearchable={true}
                                        options={categoryOptions}
                                        value={selectedOption}
                                        placeholder={`Select category, search, or type a new one...`}
                                        formatCreateLabel={(inputValue) => `+ Create new category: "${inputValue}"`}
                                        onChange={handleChange}
                                />
                        </div>
                </div>
        );
}

export default CreatableSelectInput;
