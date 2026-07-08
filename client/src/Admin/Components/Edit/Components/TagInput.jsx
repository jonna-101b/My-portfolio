import { useState } from 'react';
import Select, { components } from "react-select";
import AddIcon from '../../../../assets/Icons/Admin/Common/Edit/plus.png';
import CancelIcon from '../../../../assets/Icons/Admin/Common/Edit/cancel-hover.png';
import CheckBlackIcon from '../../../../assets/Icons/Admin/Common/Edit/checkmark-black.png';
import DeleteIcon from '../../../../assets/Icons/Admin/Common/Edit/delete.png';
import DeleteHoverIcon from '../../../../assets/Icons/Admin/Common/Edit/delete-hover.png';
import '../Styles/TagInput.css';


const Option = (props) => (
        <components.Option {...props}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img
                                src={props.data.icon}
                                alt={props.data.name}
                                width="20"
                                height="20"
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
                                width="20"
                                height="20"
                        />
                        <span>{props.data.name}</span>
                </div>
        </components.SingleValue>
);

function TagInput({ tag, values, handleValueChange, edited, handleEdit }) {
        const [ inputs, setInputs ] = useState([]);
        const [ valuesSet, setValuesSet ] = useState(new Set( tag.icon ? [...values] : (values.map(value => value.name)) ));

        const handleAdd = () => {
                setInputs([""]);
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
                handleValueChange(tag.name, tag.inputType, {action: "entry", values: newEntries});
                if (editedState) handleEdit(tag.name, true);
                setValuesSet(prev => new Set([...prev, ...newValuesSet]));
                setInputs([]);
        };

        const handleRemove = (index, value) => {
                setValuesSet(prev => {
                        const updatedSet = new Set(prev);
                        updatedSet.delete(value);
                        return updatedSet;
                });
                handleValueChange(tag.name, tag.inputType, {action: "delete", index: index});
                handleEdit(tag.name, true);
        }; 

        return (
                <div className="tag-input" >
                        <p className="label">
                                { tag.label }
                                <span className={ edited ? "edited" : "" }></span>
                        </p>

                        { inputs.length ? 
                                null :
                                <p className="add" onClick={handleAdd}>
                                        <span className="icon">
                                                <img src={AddIcon} alt="Add icon" />
                                        </span>
                                        add
                                </p>
                        }

                        { inputs.length ? 
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
                                                                                placeholder={`Search or select a ${tag.subLabel}...`}
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
                                                more
                                                <span className="icon">
                                                        <img src={AddIcon} alt="Add icon" />
                                                </span>
                                        </p>

                                        <p className="done button" onClick={handleDone} >
                                                done
                                                <span className="icon">
                                                        <img src={CheckBlackIcon} alt="Checkmark icon" />
                                                </span>
                                        </p>
                                </div>
                                :
                                null
                        }

                        <div className="list">
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

                                                        <p className="delete" onClick={() => { handleRemove(index, tag.icon ? value : value.name) }}>
                                                                <img src={DeleteIcon} alt="Delete icon" className="main" />
                                                                <img src={DeleteHoverIcon} alt="Delete icon" className="hover" />
                                                        </p>
                                                </div>
                                        ))
                                        :
                                        <p className="no-values">{ `No ${tag.subLabel} yet!` }</p>
                                }
                        </div>
                </div>
        );
}

export default TagInput;