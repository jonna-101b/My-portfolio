import { useState, useContext } from 'react';
import { NewContext } from './Context/NewContext';
import ImageInput from './Components/ImageInput';
import TextInput from './Components/TextInput';
import SelectInput from './Components/SelectInput';
import TextAreaInput from './Components/TextAreaInput';
import TagInput from './Components/TagInput';
import DateInput from './Components/DateInput';
import RadioInput from './Components/RadioInput';
import TechSelectInput from './Components/TechSelectInput';
import CreatableSelectInput from './Components/CreatableSelectInput';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './New.css';


function findInputs(arr) {
        let inputs = [];
        
        for ( let input of arr ) {
                let defaultValue;

                if ( input.inputType === "tag-input" ) {
                        defaultValue = Array.isArray(input.values) ? input.values : (Array.isArray(input.value) ? input.value : []);
                }
                else if ( input.inputType === "textarea-input" ) {
                        defaultValue = input.value ? input.value : (input.type === "single" ? "" : {brief: "", detailed: ""});
                }
                else if ( input.inputType === "image-input" || input.inputType === "date-input" ) {
                        defaultValue = input.value !== undefined ? input.value : null;
                }
                else {
                        defaultValue = input.value !== undefined && input.value !== null ? input.value : "";
                }
                inputs.push([ input.name, defaultValue ]);
        }
        const inputsObj = Object.fromEntries(inputs);
        return inputsObj;
};

const findRequirements = (arr) => {
        const reqs = arr.filter(input => input.required);
        const reqsObj = Object.fromEntries(reqs.map(input => {
                const isProvided = input.value !== undefined && input.value !== null && input.value !== "" && 
                        (!Array.isArray(input.value) || input.value.length > 0) &&
                        (!Array.isArray(input.values) || input.values.length > 0);
                return [input.name, Boolean(isProvided)];
        }));
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
                else if (inputType === "tech-select-input" && typeof change === "object" && change !== null) {
                        setInputs(prev => ({
                                ...prev,
                                name: change.name || "",
                                icon: change.icon || change.name || ""
                        }));
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
                                        else if (input.inputType === "tech-select-input" ) {
                                                return <TechSelectInput key={index} tech={input} value={inputs[input.name] || { name: inputs.name, icon: inputs.icon }} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "creatable-select-input" ) {
                                                return <CreatableSelectInput key={index} select={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
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
                                                         <CheckRoundedIcon fontSize="small" />
                                                 </span>
                                                 {`Create ${componentName}`}
                                        </button>   
                                        <button type="reset" className="discard" onClick={handleDisplay} disabled={!formAdded} >
                                                 Discard changes
                                                 <span className="icon">
                                                         <CloseRoundedIcon fontSize="small" />
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