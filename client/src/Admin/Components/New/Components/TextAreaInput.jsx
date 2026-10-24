import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import '../Styles/TextAreaInput.css';


function SingleValue({ textarea, value, handleValueChange, added, handleAdd }) {
        const [disabled, setDisabled] = useState(true);

        const handleDisable = () => {
                setDisabled((prev) => !prev);
        };

        const handleChange = (event) => {
                handleValueChange(textarea.name, textarea.inputType, event.target.value);

                if (textarea.required && handleAdd){
                        if ( event.target.value.trim() === "") {
                                handleAdd(textarea.name, false);
                        }
                        else {
                                handleAdd(textarea.name, true);
                        }
                }
        };

        return (
                <div className="textarea-input single">
                        <p className="label">
                                { textarea.label }
                                { textarea.required ? <span className={`add-state ${added ? "added" : ""}`}></span> : null }
                        </p>

                        <div className="value">
                                <textarea
                                        name={textarea.name}
                                        disabled={disabled}
                                        maxLength={400}
                                        value={value || ""}
                                        placeholder="Write something down..."
                                        onChange={handleChange}
                                />

                                <p className={`edit-button ${disabled ? "" : "focused"}`} onClick={handleDisable}>
                                        {disabled ? (
                                                <>
                                                        edit
                                                        <span className="icon">
                                                                <EditOutlinedIcon fontSize="small" />
                                                        </span>
                                                </>
                                        ) : (
                                                <>
                                                        done
                                                        <span className="icon">
                                                                <CheckRoundedIcon fontSize="small" />
                                                        </span>
                                                </>
                                        )}
                                </p>

                                
                                <p className={`editing-text ${disabled ? "disabled" : ""}`}>
                                        Maximum 400 characters
                                </p>
                        </div>
                </div>
        );
}

function Options({ textarea, value, handleValueChange, added, handleAdd }) {
        const [type, setType] = useState("brief");
        const [disabled, setDisabled] = useState(true);

        const handleDisable = () => {
                setDisabled((prev) => !prev);
        };

        const handleType = (newType) => {
                setType(newType);
                setDisabled(true);
        };

        const handleChange = (event) => {
                const newText = event.target.value;
                handleValueChange(textarea.name, textarea.inputType, { type: type, value: newText });

                if (textarea.required && handleAdd) {
                        const otherType = type === "brief" ? "detailed" : "brief";
                        const isCurrentFilled = newText.trim() !== "";
                        const otherVal = value && typeof value === 'object' ? (value[otherType] || "") : "";
                        const isOtherFilled = Boolean(otherVal && String(otherVal).trim() !== "");
                        handleAdd(textarea.name, isCurrentFilled && isOtherFilled);
                }
        };

        const isBriefFilled = Boolean(value?.brief && String(value.brief).trim() !== "");
        const isDetailedFilled = Boolean(value?.detailed && String(value.detailed).trim() !== "");
        const optionsAdded = isBriefFilled && isDetailedFilled;

        return (
                <div className="textarea-input">
                        <p className="label">
                                { textarea.label }
                                { textarea.required ? <span className={`add-state ${added || optionsAdded ? "added" : ""}`}></span> : null }
                        </p>

                        <div className="value">
                                <div className="type">
                                        <p className={`label ${type === "brief" ? "focused" : ""}`} onClick={() => handleType("brief")} >
                                                Brief
                                        </p>

                                        <p className={`label ${type === "detailed" ? "focused" : ""}`} onClick={() => handleType("detailed")} >
                                                Detailed
                                        </p>
                                </div>

                                <textarea
                                        name={type}
                                        disabled={disabled}
                                        maxLength={type === "brief" ? 200 : 1000}
                                        placeholder="Write something down..."
                                        value={value && typeof value === 'object' ? (value[type] || "") : ""}
                                        onChange={handleChange}
                                />

                                <p className={`edit-button ${disabled ? "" : "focused"}`} onClick={handleDisable}>
                                        {disabled ? (
                                                <>
                                                        edit
                                                        <span className="icon">
                                                                <EditOutlinedIcon fontSize="small" />
                                                        </span>
                                                </>
                                        ) : (
                                                <>
                                                        done
                                                        <span className="icon">
                                                                <CheckRoundedIcon fontSize="small" />
                                                        </span>
                                                </>
                                        )}
                                </p>

                                {type === "brief" ? (
                                        <p className={`editing-text ${disabled ? "disabled" : ""}`}>
                                                Maximum 200 characters
                                        </p>
                                ) : null}
                        </div>
                </div>
        );
}

function TextAreaInput({ textarea, value, handleValueChange, added, handleAdd }) {
        return textarea.type === "single" ? 
                <SingleValue textarea={textarea} value={value} handleValueChange={handleValueChange} added={added} handleAdd={handleAdd} /> 
                : 
                <Options textarea={textarea} value={value} handleValueChange={handleValueChange} added={added} handleAdd={handleAdd} />
        ;
}

export default TextAreaInput;