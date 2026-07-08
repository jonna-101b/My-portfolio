import { useState } from 'react';
import CheckIcon from '../../../../assets/Icons/Admin/Common/Edit/checkmark-hover.png';
import '../Styles/RadioInput.css';


function RadioInput({ radio, value, handleValueChange, edited, handleEdit }) {
        const handleChange = (newValue) => {
                handleValueChange(radio.name, radio.inputType, newValue);

                if (newValue === radio.value) {
                        handleEdit(radio.name, false);
                } else {
                        handleEdit(radio.name, true);
                }
        };

        return (
                <div className="radio-input">
                        <p className="label">
                                {radio.label}
                                <span className={edited ? "edited" : ""}></span>
                        </p>

                        <div className="options">
                                {radio.options.map((option, index) => (
                                        <p key={index} className={`option ${value === option.value ? "checked" : ""}`} onClick={() => {handleChange(option.value)}} >
                                                <input
                                                        type="radio"
                                                        name={radio.name}                 // all radios in the group must share the same `name`
                                                        value={option.value}
                                                        checked={value === option.value}
                                                        onChange={() => {handleChange(option.value)}}
                                                />

                                                <span className="icon">
                                                        <img src={CheckIcon} alt='Check icon' />
                                                </span>

                                                <span className="sub-label" >
                                                        { option.label }
                                                </span>
                                        </p>
                                ))}
                        </div>

                </div>
        );
}

export default RadioInput;