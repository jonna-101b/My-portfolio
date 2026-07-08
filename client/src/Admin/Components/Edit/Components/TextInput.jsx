import { useState } from 'react';
import EditIcon from '../../../../assets/Icons/Admin/Common/Edit/edit.png';
import CheckIcon from '../../../../assets/Icons/Admin/Common/Edit/checkmark-hover.png';
import '../Styles/TextInput.css';


const TextInput = ({ text, value, handleValueChange, edited, handleEdit }) => {
        const [ disabled, setDisabled ] = useState(true);

        const handleDisable = () => {
                setDisabled((prev) =>  !prev);
        };

        const handleChange = (event) => {
                handleValueChange(text.name, text.inputType, event.target.value);

                if (event.target.value !== text.value ) {
                        handleEdit(text.name, true);
                }
                else {
                        handleEdit(text.name, false);
                }
        };

        return (
                <div className="text-input">
                        <p className="label">
                                { text.label }
                                <span className={edited ? "edited" : "" }></span>
                        </p>

                        <div className="value">
                                <input 
                                        type="text" 
                                        name={ text.name } 
                                        id={ text.name } 
                                        value={ value } 
                                        disabled={disabled}
                                        onChange={handleChange}
                                />

                                <p className={`edit-button ${disabled ? "" : "focused"}`} onClick={handleDisable}>
                                       { disabled ? 
                                                <>
                                                        edit
                                                        <span className="icon">
                                                                <img src={EditIcon} alt="Edit icon" />
                                                        </span>
                                                </> :
                                                <>
                                                        done
                                                        <span className="icon">
                                                                <img src={CheckIcon} alt="Save icon" />
                                                        </span>
                                                </>
                                        }
                                </p>
                        </div>
                </div>
        );
};

export default TextInput;