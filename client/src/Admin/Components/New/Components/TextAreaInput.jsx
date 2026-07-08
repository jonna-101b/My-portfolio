import { useEffect, useState } from 'react';
import EditIcon from '../../../../assets/Icons/Admin/Common/New/edit.png';
import CheckIcon from '../../../../assets/Icons/Admin/Common/New/checkmark-hover.png';
import '../Styles/TextAreaInput.css';


function SingleValue({ textarea, value, handleValueChange, added, handleAdd }) {
        const [disabled, setDisabled] = useState(true);

        const handleDisable = () => {
                setDisabled((prev) => !prev);
        };

        const handleChange = (event) => {
                handleValueChange(textarea.name, textarea.inputType, event.target.value);

                if (textarea.required){
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
                                        value={value}
                                        placeholder="Write something down..."
                                        onChange={handleChange}
                                />

                                <p className={`edit-button ${disabled ? "" : "focused"}`} onClick={handleDisable}>
                                        {disabled ? (
                                                <>
                                                        edit
                                                        <span className="icon">
                                                                        <img src={EditIcon} alt="Edit icon" />
                                                        </span>
                                                </>
                                        ) : (
                                                <>
                                                        done
                                                        <span className="icon">
                                                                <img src={CheckIcon} alt="Save icon" />
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

function Options({ textarea, value, handleValueChange, handleAdd }) {
        const [type, setType] = useState("brief");
        const [disabled, setDisabled] = useState(true);
        const [ added, setAdded ] = useState({ "brief": false, "detailed": false });

        const handleDisable = () => {
                setDisabled((prev) => !prev);
        };

        const handleType = (newType) => {
                setType(newType);
                setDisabled(true);
        };

        const handleChange = (event) => {
                handleValueChange(textarea.name, textarea.inputType, {type: type, value: event.target.value});

                if ( event.target.value.trim() === "") {
                        setAdded(prev => ({ ...prev, [type]: false }));
                }
                else {
                        setAdded(prev => ({ ...prev, [type]: true }));
                }
        };

        const optionsAdded = Object.values(added).every(Boolean);
        
        useEffect(() => {
                if (textarea.required) handleAdd(textarea.name, optionsAdded)
        }, [optionsAdded])

        return (
                <div className="textarea-input">
                        <p className="label">
                                { textarea.label }
                                { textarea.required ? <span className={`add-state ${optionsAdded ? "added" : ""}`}></span> : null }
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
                                        maxLength={type === "brief" ? 100 : 10000000000}
                                        placeholder="Write something down..."
                                        value={value[type]}
                                        onChange={handleChange}
                                />

                                <p className={`edit-button ${disabled ? "" : "focused"}`} onClick={handleDisable}>
                                        {disabled ? (
                                                <>
                                                        edit
                                                        <span className="icon">
                                                                        <img src={EditIcon} alt="Edit icon" />
                                                        </span>
                                                </>
                                        ) : (
                                                <>
                                                        done
                                                        <span className="icon">
                                                                <img src={CheckIcon} alt="Save icon" />
                                                        </span>
                                                </>
                                        )}
                                </p>

                                {type === "brief" ? (
                                        <p className={`editing-text ${disabled ? "disabled" : ""}`}>
                                                Maximum 100 characters
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
                <Options textarea={textarea} value={value} handleValueChange={handleValueChange} handleAdd={handleAdd} />
        ;
}

export default TextAreaInput;