import { useEffect, useState } from 'react';
import Select, { components } from "react-select";
import AddIcon from '../../../../../assets/Icons/Admin/Common/Edit/add.png';
import AddBlackIcon from '../../../../../assets/Icons/Admin/Common/Edit/add-black.png';
import CancelIcon from '../../../../../assets/Icons/Admin/Common/Edit/cancel-hover.png';
import CheckBlackIcon from '../../../../../assets/Icons/Admin/Common/Edit/checkmark-black.png';
import DeleteIcon from '../../../../../assets/Icons/Admin/Common/Edit/delete.png';
import DeleteHoverIcon from '../../../../../assets/Icons/Admin/Common/Edit/delete-hover.png';
import '../Styles/TagInput.css';
import useProfileReducer from '../../../../../Hooks/useProfileReducer';


const Option = (props) => (
        <components.Option {...props}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img
                                src={props.data.icon}
                                alt={props.data.name}
                                width="17.5"
                                height="17.5"
                        />
                        <span>{props.data.name}</span>
                </div>
        </components.Option>
);

const SingleValue = (props) => (
        <components.SingleValue {...props}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img
                                src={props.data.icon}
                                alt={props.data.name}
                                width="17.5"
                                height="17.5"
                        />
                        <span>{props.data.name}</span>
                </div>
        </components.SingleValue>
);

function NewTag({ inputs, tag, handleCancel, handleMore, handleDone, handleChange }) {
        return (
                <div className="new-tag">
                        <p className="label">{`New ${tag.subLabel}`}</p>

                        <div className="inputs">
                                { inputs.map((input, index) => (
                                        <div className="input" key={index} >
                                                { tag.type === "select" ?
                                                        <Select
                                                                className="select"
                                                                classNamePrefix="select"
                                                                options={tag.options}
                                                                isSearchable={true}   // makes it searchable
                                                                placeholder={`Search/select ${tag.subLabel}`}
                                                                components={{ Option, SingleValue }}
                                                                onChange={(value) => {handleChange(value, index)}}
                                                        />
                                                        :
                                                        <input
                                                                type="text"
                                                                name={tag.subLabel}
                                                                id={tag.subLabel}
                                                                placeholder={`Add your ${tag.subLabel} here`}
                                                                onChange={(e) => {handleChange(e.target.value, index)}}
                                                        /> 
                                                }

                                                <p className="cancel" onClick={() => {handleCancel(index)}}>
                                                        cancel
                                                        <span className="icon">
                                                                <img src={CancelIcon} alt="Cancel icon" />
                                                        </span>
                                                </p>
                                        </div>
                                )) }
                        </div>
                        
                        <p className="more button" onClick={handleMore}>
                                <span className="icon">
                                        <img src={AddBlackIcon} alt="Add icon" />
                                </span>
                                more
                        </p>

                        <p className="done button" onClick={handleDone} >
                                done
                                <span className="icon">
                                        <img src={CheckBlackIcon} alt="Checkmark icon" />
                                </span>
                        </p>
                </div>
        );
}

function TagInput({ tag, values }) {
        const { addSocialLinks, deleteSocialLink } = useProfileReducer();
        const [ inputs, setInputs ] = useState([]);
        const [ valuesSet, setValuesSet ] = useState(new Set( tag.icon ? [...values] : (values.map(value => value.name)) ));

        const handleAdd = () => {
                setInputs(prev => prev.length ? [] : [""] );
        };

        const handleChange = (value, index) => {
                const updatedInputs = [...inputs];
                updatedInputs[index] = value;
                setInputs(updatedInputs);
        };

        const handleCancel = (index) => {
                const updatedInputs = [...inputs];
                updatedInputs.splice(index, 1);
                setInputs(updatedInputs);
        }

        const handleMore = () => {
                setInputs((prev) => [ ...prev, "" ]);
        };
        

        const handleDone = () => {
                let newEntries = [];
                let newValuesSet = new Set(valuesSet);
                let editedState = false;

                for (let input of inputs) {
                        if ( tag.icon && input && !newValuesSet.has(input) ) {
                                newEntries.push(input);
                                editedState = true;
                                newValuesSet.add(input);
                        }
                        else if ( !tag.icon && input.name && !newValuesSet.has(input.name)) {
                                newEntries.push(input);
                                editedState = true;
                                newValuesSet.add(input.name);
                        }
                }
                addSocialLinks(newEntries);
                setInputs([]);
        };

        const handleRemove = (value) => {
                deleteSocialLink(value._id);
        }; 

        useEffect(() => {
                setValuesSet(new Set( tag.icon ? [...values] : (values.map(value => value.name)) ));
        }, [values]);

        return (
                <div className="tag-input" >
                        <p className="label">
                                { tag.label }
                        </p>

                        <div className="list">
                                { inputs.length ? 
                                        <NewTag inputs={inputs}  tag={tag} handleCancel={handleCancel} handleChange={handleChange} handleDone={handleDone} handleMore={handleMore} />
                                        :
                                        null
                                }

                                { values.length ?
                                        values.map((value, index) => (
                                                <div key={index} className={ `sub-label ${tag.subLabel}` } >
                                                        <p className="value">
                                                                <span className="icon">
                                                                        <img src={ tag.icon ? tag.icon : value.icon } />
                                                                </span>

                                                                <span className="name">
                                                                        { tag.icon ? value : value.name }
                                                                </span>
                                                        </p>

                                                        <p className="delete" onClick={() => { handleRemove(value) }}>
                                                                <img src={DeleteIcon} alt="Delete icon" className="main" />
                                                                <img src={DeleteHoverIcon} alt="Delete icon" className="hover" />
                                                        </p>
                                                </div>
                                        ))
                                        :
                                        <p className="no-values">{ `No ${tag.subLabel} yet!` }</p>
                                }
                        </div>

                        <p className="add" onClick={handleAdd}>
                                <span className="icon">
                                        <img src={AddIcon} alt="Add icon" />
                                </span>
                                add
                        </p>
                </div>
        );
}

export default TagInput;