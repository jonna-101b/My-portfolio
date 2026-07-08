import { useState } from 'react';
import useProfileReducer from '../../../../../Hooks/useProfileReducer';
import EditIcon from '../../../../../assets/Icons/Admin/Common/Edit/edit.png';
import CheckIcon from '../../../../../assets/Icons/Admin/Common/Edit/checkmark-hover.png';
import CancelIcon from '../../../../../assets/Icons/Admin/Common/Edit/cancel-hover.png';
import '../Styles/TextInput.css';


const TextInput = ({ text }) => {
        const { updateProfile } = useProfileReducer();
        const [ value, setValue ] = useState(text.value);
        const [ edited, setEdited ] = useState(false);
        const [ disabled, setDisabled ] = useState(true);
        
        const handleDisable = () => {
                setDisabled((prev) =>  !prev);
        };
        
        const handleEdit = (bool) => {
                setEdited(bool);
        };

        const handleChange = (event) => {
                if (event.target.value !== text.value ) {
                        handleEdit(true);
                }
                else {
                        handleEdit(false);
                }
                setValue(event.target.value);
        };

        const handleSave = () => {
                updateProfile({ [text.name]: value });
                handleDisable();
                handleEdit(false);
        };

        return (
                <div className="text-input input">
                        <p className="label">
                                { text.label }
                                <span className={edited ? "edited" : "" }></span>
                        </p>

                        <div className="value">
                                <input 
                                        type={text.type} 
                                        name={ text.name } 
                                        id={ text.name } 
                                        value={ value } 
                                        disabled={disabled}
                                        onChange={handleChange}
                                />
                        </div>
                        
                        <p className={`edit-button ${disabled ? "" : ( edited ? "save" : "cancel" )}`} onClick={edited ? handleSave : handleDisable}>
                                {disabled ? (
                                        <>
                                                edit
                                                <span className="icon">
                                                                <img src={EditIcon} alt="Edit icon" />
                                                </span>
                                        </>
                                ) : ( edited ?
                                        <>
                                                done
                                                <span className="icon">
                                                        <img src={CheckIcon} alt="Save icon" />
                                                </span>
                                        </>
                                        :
                                        <>
                                                cancel
                                                <span className="icon">
                                                        <img src={CancelIcon} alt="Cancel icon" />
                                                </span>
                                        </>
                                )}
                        </p>
                </div>
        );
};

export default TextInput;