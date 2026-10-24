import { useState } from 'react';
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

function Options({ textarea, value, handleValueChange, edited, handleEdit }) {
        const [type, setType] = useState("brief");
        const [disabled, setDisabled] = useState(true);

        const initialBrief = textarea?.value?.brief ?? textarea?.brief ?? "";
        const initialDetailed = textarea?.value?.detailed ?? textarea?.detailed ?? "";
        const typeMap = { brief: initialBrief, detailed: initialDetailed };

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

                if (handleEdit) {
                        const isCurrentEdited = newText !== (typeMap[type] || "");
                        const otherType = type === "brief" ? "detailed" : "brief";
                        const otherVal = value && typeof value === 'object' ? (value[otherType] || "") : "";
                        const isOtherEdited = otherVal !== (typeMap[otherType] || "");
                        handleEdit(textarea.name, isCurrentEdited || isOtherEdited);
                }
        };

        const isBriefEdited = (value?.brief || "") !== (typeMap.brief || "");
        const isDetailedEdited = (value?.detailed || "") !== (typeMap.detailed || "");
        const optionsEdited = isBriefEdited || isDetailedEdited;

        return (
                <div className="textarea-input">
                        <p className="label">
                                { textarea.label }
                                <span className={ (edited || optionsEdited) ? "edited" : "" } ></span>
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

function TextAreaInput({ textarea, value, handleValueChange, edited, handleEdit }) {
        return textarea.type === "single" ? 
                <SingleValue textarea={textarea} value={value} handleValueChange={handleValueChange} edited={edited} handleEdit={handleEdit} /> 
                : 
                <Options textarea={textarea} value={value} handleValueChange={handleValueChange} edited={edited} handleEdit={handleEdit} />
        ;
}

export default TextAreaInput;