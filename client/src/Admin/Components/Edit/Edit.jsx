import { useState, useContext } from 'react';
import { EditContext } from './Context/EditContext';
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
import CircularProgress from '@mui/material/CircularProgress';
import { uploadImage } from '../../../api/UploadApi';
import './Edit.css';


function findInputs(arr) {
        let inputs = [];
        
        for ( let input of arr ) {
                let defaultValue = input.inputType === "tag-input" ? input.values : input.value;
                inputs.push([ input.name, defaultValue ]);
        }

        const inputsObj = Object.fromEntries(inputs);
        return inputsObj;
}

function Wrapper({ componentName, component, editComponent, attr, handleDisplay, setAction }) {
        const [ inputs, setInputs ] = useState( findInputs(component) );
        const [ edited, setEdited ] = useState( Object.fromEntries(component.map(input => [input.name, false])) );
        const [ isSubmitting, setIsSubmitting ] = useState(false);

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

        const handleEdit = (name, bool) => {
                setEdited((prev) => ({
                        ...prev,
                        [name]: bool,
                }));
        };

        // form is "edited" if at least one input is edited
        const formEdited = Object.values(edited).some(Boolean);

        const handleSubmit = async () => {
                setIsSubmitting(true);
                const editedComponent = {};
                try {
                        for (let input of component) {
                                let val = inputs[input.name];
                                // Handle file uploads
                                if (val && typeof val === 'object' && val.file instanceof File) {
                                        const uploadRes = await uploadImage(val.file);
                                        val = uploadRes.url;
                                } else if (val instanceof File) {
                                        const uploadRes = await uploadImage(val);
                                        val = uploadRes.url;
                                } else if (val && typeof val === 'object' && val.preview && !val.file) {
                                        val = val.preview;
                                }
                                editedComponent[input.name] = val;
                        }
                        editedComponent["_id"] = attr._id;
                        editedComponent["createdAt"] = attr.createdAt;
                        editedComponent["updatedAt"] = new Date(Date.now());
                        
                        if (editComponent) {
                                await editComponent(editedComponent);
                        }
                        handleDisplay();
                        if (setAction) {
                                setAction({ type: "edit", component: componentName, name: attr?.name || "" });
                        }
                } catch (error) {
                        console.error(`Error updating ${componentName}:`, error);
                        if (setAction) {
                                setAction({
                                        type: "error",
                                        component: componentName,
                                        message: error?.message || `Failed to update ${componentName}`
                                });
                        }
                } finally {
                        setIsSubmitting(false);
                }
        };

        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation() }}>
                        <form action={handleSubmit}>
                                <p className="component-name">{ `Edit ${componentName}` }</p>

                                { component.map((input, index) => {
                                        if (input.inputType === "image-input" ) {
                                                return <ImageInput key={index} image={input} value={inputs[input.name]} handleValueChange={handleInputsChange} edited={edited[input.name]} handleEdit={handleEdit} />
                                        }
                                        if (input.inputType === "text-input" ) {
                                                return <TextInput key={index} text={input} value={inputs[input.name]} handleValueChange={handleInputsChange} edited={edited[input.name]} handleEdit={handleEdit} />
                                        }
                                        else if (input.inputType === "tech-select-input" ) {
                                                return <TechSelectInput key={index} tech={input} value={inputs[input.name] || { name: inputs.name, icon: inputs.icon }} handleValueChange={handleInputsChange} edited={edited[input.name]} handleEdit={handleEdit} />
                                        }
                                        else if (input.inputType === "creatable-select-input" ) {
                                                return <CreatableSelectInput key={index} select={input} value={inputs[input.name]} handleValueChange={handleInputsChange} edited={edited[input.name]} handleEdit={handleEdit} />
                                        }
                                        else if (input.inputType === "select-input" ) {
                                                return <SelectInput key={index} select={input} value={inputs[input.name]} handleValueChange={handleInputsChange} edited={edited[input.name]} handleEdit={handleEdit} />
                                        } 
                                        else if (input.inputType === "textarea-input" ) {
                                                return <TextAreaInput key={index} textarea={input} value={inputs[input.name]} handleValueChange={handleInputsChange} edited={edited[input.name]} handleEdit={handleEdit} />
                                        }
                                        else if (input.inputType === "tag-input" ) {
                                                return <TagInput key={index} tag={input} values={inputs[input.name]} handleValueChange={handleInputsChange} edited={edited[input.name]} handleEdit={handleEdit} />
                                        }
                                        else if (input.inputType === "date-input" ) {
                                                return <DateInput key={index} date={input} value={inputs[input.name]} handleValueChange={handleInputsChange} edited={edited[input.name]} handleEdit={handleEdit} />
                                        }
                                        else if (input.inputType === "radio-input" ) {
                                                return <RadioInput key={index} radio={input} value={inputs[input.name]} handleValueChange={handleInputsChange} edited={edited[input.name]} handleEdit={handleEdit} />
                                        }
                                }) }

                                <div className="changes">
                                        <button type="submit" className="save" disabled={!formEdited || isSubmitting} >
                                                 <span className="icon">
                                                         {isSubmitting ? <CircularProgress size={14} color="inherit" /> : <CheckRoundedIcon fontSize="small" />}
                                                 </span>
                                                 {isSubmitting ? 'Saving changes...' : 'Save changes'}
                                        </button>   
                                        <button type="reset" className="discard" onClick={handleDisplay} disabled={!formEdited || isSubmitting} >
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

function Edit({ componentName, NotifyContext, updateHook }) {
        const { edit, setEdit } = useContext(EditContext);
        const { setAction } = useContext(NotifyContext);
        const editComponent = isEmptyObject(edit) ? null : (edit.label === "technicalSkills" || edit.label === "conceptualSkills" ? updateHook[edit.label] : updateHook);

        const handleDisplay = () => {
                setEdit({});
        };

        return (
                <div className={`edit ${isEmptyObject(edit) ?  "" : "active" }`} onClick={handleDisplay} >
                        { isEmptyObject(edit) ? "" : <Wrapper componentName={componentName} component={edit.value} attr={{ _id: edit._id, name: edit.name, createdAt: edit.createdAt, updatedAt: edit.updatedAt}} editComponent={editComponent} handleDisplay={handleDisplay} setAction={setAction} /> }      
                </div>
        );
}

export default Edit;