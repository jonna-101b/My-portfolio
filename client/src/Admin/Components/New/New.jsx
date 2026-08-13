import { useState, useContext } from 'react';
import { NewContext } from './Context/NewContext';
import ImageInput from './Components/ImageInput';
import TextInput from './Components/TextInput';
import SelectInput from './Components/SelectInput';
import TextAreaInput from './Components/TextAreaInput';
import TagInput from './Components/TagInput';
import DateInput from './Components/DateInput';
import RadioInput from './Components/RadioInput';
import SaveBlackIcon from '../../../assets/Icons/Admin/Common/New/save-black.png';
import CancelBlackIcon from '../../../assets/Icons/Admin/Common/New/cancel-black.png';
import './New.css';


function findInputs(arr) {
        let inputs = [];
        
        for ( let input of arr ) {
                let defaultValue;

                if ( input.inputType === "tag-input" ) {
                        defaultValue = [];
                }
                else if ( input.inputType === "textarea-input" ) {
                        defaultValue = input.type === "single" ? "" : {brief: "", detailed: ""};
                }
                else if (  input.inputType === ("image-input" | "date-input") ) {
                        defaultValue = null;
                }
                else {
                        defaultValue = "";
                }
                inputs.push([ input.name, defaultValue ]);
        }
        const inputsObj = Object.fromEntries(inputs);
        return inputsObj;
};

const findRequirements = (arr) => {
        const reqs = arr.filter(input => input.required);
        const reqsObj = Object.fromEntries(reqs.map(input => [input.name, false]));
        return reqsObj;
};

function generateObjectId() {
        const timestamp = Math.floor(Date.now() / 1000).toString(16); // 4 bytes (8 hex chars)
  
        // 8 bytes = 16 hex chars (random)
        const random = Array.from({ length: 16 }, () =>
                Math.floor(Math.random() * 16).toString(16)
        ).join('');
  
        return timestamp + random;
}

function Wrapper({ componentName, component, createComponent, handleDisplay }) {
        const [ inputs, setInputs ] = useState( findInputs(component) );
        const [ added, setAdded ] = useState( findRequirements(component) );

        const handleInputsChange = (name, inputType, change) => {
                if (inputType === "tag-input" ) {
                        if ( change.action === "entry" ) {
                                setInputs(prev => ({
                                        ...prev,
                                        [name]: [ ...prev[name], ...change.values ]
                                }));
                        }
                        else {
                                const newValues = [...inputs[name]];
                                newValues.splice(change.index, 1);
                                setInputs(prev => ({
                                        ...prev,
                                        [name]: newValues
                                }));
                        }
                }
                else if (inputType === "textarea-input") {
                        if (change.type) {
                                setInputs(prev => ({
                                        ...prev,
                                        [name]: {
                                                ...prev[name],
                                                [change.type]: change.value
                                        }
                                }));
                        }
                        else {
                                setInputs(prev => ({
                                        ...prev,
                                        [name]: change
                                }));
                        }
                }
                else {
                        setInputs(prev => ({
                                ...prev,
                                [name]: change
                        }));
                }
        };

        const handleAdd = (name, bool) => {
                setAdded((prev) => ({
                        ...prev,
                        [name]: bool,
                }));
        };

        // form is "added" if all inputs are added
        const formAdded = Object.values(added).every(Boolean);

        const handleSubmit = async () => {
                const newComponent = {};
                for (let input of component) {
                        newComponent[input.name] = inputs[input.name];
                }

                try {
                        if (createComponent) {
                                await createComponent(newComponent);
                        }
                        handleDisplay();
                        if (setAction) {
                                setAction({ type: "add", component: componentName, name: "" });
                        }
                } catch (error) {
                        console.error(`Error creating ${componentName}:`, error);
                        if (setAction) {
                                setAction({
                                        type: "error",
                                        component: componentName,
                                        message: error?.message || `Failed to create ${componentName}`
                                });
                        }
                }
        };

        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation() }}>
                        <form action={handleSubmit}>
                                <p className="component-name">{ `New ${componentName}` }</p>

                                { component.map((input, index) => {
                                        if (input.inputType === "image-input" ) {
                                                return <ImageInput key={index} image={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        if (input.inputType === "text-input" ) {
                                                return <TextInput key={index} text={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "select-input" ) {
                                                return <SelectInput key={index} select={input} added={added[input.name]} value={inputs[input.name]} handleValueChange={handleInputsChange} handleAdd={handleAdd} />
                                        } 
                                        else if (input.inputType === "textarea-input" ) {
                                                return <TextAreaInput key={index} textarea={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "tag-input" ) {
                                                return <TagInput key={index}tag={input} values={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "date-input" ) {
                                                return <DateInput key={index} date={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "radio-input" ) {
                                                return <RadioInput key={index} radio={input} value={inputs[input.name]} handleValueChange={handleInputsChange} />
                                        }
                                }) }

                                <div className="changes">
                                        <button type="submit" className="save" disabled={!formAdded} >
                                                 <span className="icon">
                                                         <img src={SaveBlackIcon} alt="Save icon" />
                                                 </span>
                                                 {`Create ${componentName}`}
                                        </button>   
                                        <button type="reset" className="discard" onClick={handleDisplay} disabled={!formAdded} >
                                                 Discard changes
                                                 <span className="icon">
                                                         <img src={CancelBlackIcon} alt="Save icon" />
                                                 </span>
                                        </button>   
                                </div>
                        </form>
                </div>
        );
}

function isEmptyObject(obj) {
        if (typeof obj !== "object" || obj === null) return false;
  
        return Object.keys(obj).length === 0;
}

function New({ componentName, NotifyContext, createHook }) {
        const { New, setNew } = useContext(NewContext);
        const { setAction } = useContext(NotifyContext);
        const createComponent = isEmptyObject(New) ? null : ((New.label === "technicalSkills" || New.label === "conceptualSkills") ? createHook[New.label] : createHook);

        const handleDisplay = () => {
                setNew({});
        };

        return (
                <div className={`new ${isEmptyObject(New) ?  "" : "active" }`} onClick={handleDisplay} >
                        { isEmptyObject(New) ? "" : <Wrapper componentName={componentName} component={New.value} createComponent={createComponent} handleDisplay={handleDisplay} setAction={setAction} /> }      
                </div>
        );
}

export default New;