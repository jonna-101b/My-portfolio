import { useEffect, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import '../Styles/TextAreaInput.css';


function SingleValue({ textarea, value, handleValueChange, edited, handleEdit }) {
        const [disabled, setDisabled] = useState(true);

        const handleDisable = () => {
                setDisabled((prev) => !prev);
        };

        const handleChange = (event) => {
                handleValueChange(textarea.name, textarea.inputType, event.target.value);

                if ( event.target.value === textarea.value) {
                        handleEdit(textarea.name, false)
                }
                else {
                        handleEdit(textarea.name, true)
                }
        };

        return (
                <div className="textarea-input single">
                        <p className="label">
                                { textarea.label }
                                <span className={ edited ? "edited" : "" } ></span>
                        </p>

                        <div className="value">
                                <textarea
                                        name={textarea.name}
                                        disabled={disabled}
                                        maxLength={400}
                                        value={value}
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

function Options({ textarea, value, handleValueChange, handleEdit }) {
        const [type, setType] = useState("brief");
        const [disabled, setDisabled] = useState(true);
        const [ edited, setEdited ] = useState({ "brief": false, "detailed": false });

        const typeMap = { "brief": textarea.brief, "detailed": textarea.detailed };

        const handleDisable = () => {
                setDisabled((prev) => !prev);
        };

        const handleType = (newType) => {
                setType(newType);
                setDisabled(true);
        };

        const handleChange = (event) => {
                handleValueChange(textarea.name, textarea.inputType, {type: type, value: event.target.value});

                if ( event.target.value === typeMap[type]) {
                        setEdited(prev => ({ ...prev, [type]: false }));
                }
                else {
                        setEdited(prev => ({ ...prev, [type]: true }));
                }
        };

        const optionsEdited = Object.values(edited).some(Boolean);
        
        useEffect(() => {
                handleEdit(textarea.name, optionsEdited)
        }, [optionsEdited])

        return (
                <div className="textarea-input">
                        <p className="label">
                                { textarea.label }
                                <span className={ optionsEdited ? "edited" : "" } ></span>
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

function TextAreaInput({ textarea, value, handleValueChange, edited, handleEdit }) {
        return textarea.type === "single" ? 
                <SingleValue textarea={textarea} value={value} handleValueChange={handleValueChange} edited={edited} handleEdit={handleEdit} /> 
                : 
                <Options textarea={textarea} value={value} handleValueChange={handleValueChange} handleEdit={handleEdit} />
        ;
}

export default TextAreaInput;