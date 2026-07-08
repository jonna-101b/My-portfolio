import { useEffect, useState } from 'react';
import useProfileReducer from '../../../../../Hooks/useProfileReducer';
import EditIcon from '../../../../../assets/Icons/Admin/Common/Edit/edit.png';
import CancelIcon from '../../../../../assets/Icons/Admin/Common/Edit/cancel-hover.png';
import '../Styles/SelectInput.css';


function SelectInput({ select }) {
        const { updateProfile } = useProfileReducer();
        const [ selected, setSelected ] = useState(select.value);
        const [ display, setDisplay ] = useState(false);

        const handleDisplay = () => {
                setDisplay((prev) =>  !prev);
        };

        const handleChange = (option) => {
                updateProfile({ [select.name]: option });
                handleDisplay();
        };

        useEffect(() => {
                setSelected(select.value);
        }, [select.value]);

        return (
                <div className="select-input">
                        <p className="label">
                                { select.label }
                        </p>

                        <p className="value">
                                <input 
                                        type="select" 
                                        name={ select } 
                                        id={ select } 
                                        value={ selected } 
                                        disabled={true}
                                />
                        </p>

                        <p className={`edit-button ${display ? "cancel" : "" }`} onClick={handleDisplay}>
                                {display ? 
                                        ( 
                                                <>
                                                        cancel
                                                        <span className="icon">
                                                                <img src={CancelIcon} alt="Cancel icon" />
                                                        </span>
                                                </>
                                        )
                                        :
                                        (
                                                <>
                                                        change
                                                        <span className="icon">
                                                                        <img src={EditIcon} alt="Edit icon" />
                                                        </span>
                                                </>
                                        ) 
                                }
                        </p>

                        { display ? 
                                <div className="new-select">
                                        { select.options.map((option, index) => (
                                                <p 
                                                        className={`option ${selected === option ? "focused" : ""}` } 
                                                        key={index} 
                                                        onClick={(e) => {selected === option ? null :  handleChange(option)}} 
                                                >
                                                        <span></span>
                                                        { option }
                                                </p>
                                        )) }
                                </div> 
                                : null
                        }

                </div>
        );
}

export default SelectInput;