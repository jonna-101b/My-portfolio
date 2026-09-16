import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import '../Styles/TextInput.css';


const TextInput = ({ text, added, value, handleValueChange, handleAdd }) => {
        const [ disabled, setDisabled ] = useState(true);

        const handleDisable = () => {
                setDisabled((prev) =>  !prev);
        };

        const handleChange = (event) => {
                handleValueChange(text.name, text.inputType, event.target.value);
                
                if (text.required) {
                        if (event.target.value.trim() !== "" ) {
                                handleAdd(text.name, true);
                        }
                        else {
                                handleAdd(text.name, false);
                        }
                }
        };

        return (
                <div className="text-input">
                        <p className="label">
                                { text.label }
                                { text.required ? <span className={`add-state ${added ? "added" : ""}`}></span> : null }
                        </p>

                        <div className="value">
                                <input 
                                        type="text" 
                                        name={ text.name } 
                                        id={ text.name } 
                                        placeholder={ `Add ${text.label.toLowerCase()}` }
                                        value={value} 
                                        disabled={disabled}
                                        onChange={handleChange}
                                />

                                <p className={`edit-button ${disabled ? "" : "focused"}`} onClick={handleDisable}>
                                       { disabled ? 
                                                <>
                                                        edit
                                                        <span className="icon">
                                                                <EditOutlinedIcon fontSize="small" />
                                                        </span>
                                                </> :
                                                <>
                                                        done
                                                        <span className="icon">
                                                                <CheckRoundedIcon fontSize="small" />
                                                        </span>
                                                </>
                                        }
                                </p>
                        </div>
                </div>
        );
};

export default TextInput;