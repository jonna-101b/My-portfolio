import { useState, useContext, useCallback } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import { uploadImage } from '../../../api/UploadApi';
import './New.css';


function findInputs(arr) {
        let inputs = [];

        for (let input of arr) {
                let defaultValue;

                if (input.inputType === "tag-input") {
                        defaultValue = Array.isArray(input.values) ? input.values : (Array.isArray(input.value) ? input.value : []);
                }
                else if (input.inputType === "textarea-input") {
                        if (input.type === "single") {
                                defaultValue = typeof input.value === "string" ? input.value : null;
                        } else {
                                defaultValue = typeof input.value === "object" && input.value !== null
                                        ? { brief: input.value.brief || null, detailed: input.value.detailed || null }
                                        : { brief: typeof input.value === "string" ? input.value : null, detailed: null };
                        }
                }
                else if (input.inputType === "image-input" || input.inputType === "date-input") {
                        defaultValue = input.value !== undefined ? input.value : null;
                }
                else if (input.inputType === "select-input" || input.inputType === "radio-input") {
                        defaultValue = input.value !== undefined && input.value !== null && input.value !== null
                                ? input.value
                                : (input.options?.[0]?.value || null);
                }
                else {
                        defaultValue = input.value !== undefined && input.value !== null ? input.value : null;
                }
                inputs.push([input.name, defaultValue]);
        }
        return Object.fromEntries(inputs);
}

const isValueProvided = (input) => {
        const val = input.value !== undefined && input.value !== null ? input.value : input.values;
        if (val === undefined || val === null || val === "") return false;
        if (Array.isArray(val)) return val.length > 0;
        if (typeof val === "object") {
                if (input.inputType === "textarea-input" && input.type === "options") {
                        return Boolean(val.brief && String(val.brief).trim() && val.detailed && String(val.detailed).trim());
                }
                if (input.inputType === "tech-select-input") {
                        return Boolean(val.name && String(val.name).trim() !== "");
                }
                if (input.inputType === "date-input" && input.type === "duration") {
                        return Boolean(val.from && val.to);
                }
                if (input.inputType === "image-input") {
                        return Boolean(val.file || val.preview || (typeof val === "string" && val.trim() !== ""));
                }
                return Object.values(val).some(v => v !== undefined && v !== null && v !== "");
        }
        if (typeof val === "string") return val.trim().length > 0;
        return Boolean(val);
};

const findRequirements = (arr) => {
        const reqs = arr.filter(input => input.required);
        const reqsObj = Object.fromEntries(reqs.map(input => [input.name, isValueProvided(input)]));
        return reqsObj;
};

function Wrapper({ componentName, component, createComponent, handleDisplay, setAction }) {
        const [inputs, setInputs] = useState(findInputs(component));
        const [added, setAdded] = useState(findRequirements(component));
        const [isSubmitting, setIsSubmitting] = useState(false);

        const handleInputsChange = useCallback((name, inputType, change) => {
                if (inputType === "tag-input") {
                        if (change.action === "entry") {
                                setInputs(prev => ({
                                        ...prev,
                                        [name]: [...(prev[name] || []), ...change.values]
                                }));
                        }
                        else {
                                setInputs(prev => {
                                        const newValues = [...(prev[name] || [])];
                                        newValues.splice(change.index, 1);
                                        return {
                                                ...prev,
                                                [name]: newValues
                                        };
                                });
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
                        if (change && change.type) {
                                setInputs(prev => ({
                                        ...prev,
                                        [name]: {
                                                ...(prev[name] || {}),
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
        }, []);

        const handleAdd = useCallback((name, bool) => {
                setAdded((prev) => {
                        if (prev[name] === bool) return prev;
                        return {
                                ...prev,
                                [name]: bool,
                        };
                });
        }, []);

        // form is "added" if all inputs are added
        const formAdded = Object.values(added).every(Boolean);

        const handleSubmit = async () => {
                setIsSubmitting(true);
                const newComponent = {};
                try {
                        for (let input of component) {
                                let val = inputs[input.name];
                                // Handle file uploads
                                if (Array.isArray(val)) {
                                        const uploadedList = [];
                                        for (const item of val) {
                                                if (item && typeof item === 'object' && item.file instanceof File) {
                                                        const uploadRes = await uploadImage(item.file);
                                                        uploadedList.push(uploadRes.url);
                                                } else if (item instanceof File) {
                                                        const uploadRes = await uploadImage(item);
                                                        uploadedList.push(uploadRes.url);
                                                } else if (item && typeof item === 'object' && item.preview && !item.file) {
                                                        uploadedList.push(item.preview);
                                                } else if (typeof item === 'string') {
                                                        uploadedList.push(item);
                                                } else {
                                                        uploadedList.push(item);
                                                }
                                        }
                                        val = uploadedList;
                                } else if (val && typeof val === 'object' && val.file instanceof File) {
                                        const uploadRes = await uploadImage(val.file);
                                        val = uploadRes.url;
                                } else if (val instanceof File) {
                                        const uploadRes = await uploadImage(val);
                                        val = uploadRes.url;
                                } else if (val && typeof val === 'object' && val.preview && !val.file) {
                                        val = val.preview;
                                }
                                newComponent[input.name] = val;
                        }

                        if (createComponent) {
                                await createComponent(newComponent);
                        }
                        handleDisplay();
                        if (setAction) {
                                setAction({ type: "add", component: componentName, name: "" });
                        }
                } catch (error) {
                        console.error(`Error creating ${componentName}:`, error?.response?.data || error);
                        if (setAction) {
                                setAction({
                                        type: "error",
                                        component: componentName,
                                        message: error?.response?.data?.message || error?.message || `Failed to create ${componentName}`
                                });
                        }
                } finally {
                        setIsSubmitting(false);
                }
        };

        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation() }}>
                        <form action={handleSubmit}>
                                <p className="component-name">{`New ${componentName}`}</p>

                                {component.map((input, index) => {
                                        if (input.inputType === "image-input") {
                                                return <ImageInput key={index} image={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        if (input.inputType === "text-input") {
                                                return <TextInput key={index} text={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "tech-select-input") {
                                                return <TechSelectInput key={index} tech={input} value={inputs[input.name] || { name: inputs.name, icon: inputs.icon }} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "creatable-select-input") {
                                                return <CreatableSelectInput key={index} select={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "select-input") {
                                                return <SelectInput key={index} select={input} added={added[input.name]} value={inputs[input.name]} handleValueChange={handleInputsChange} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "textarea-input") {
                                                return <TextAreaInput key={index} textarea={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "tag-input") {
                                                return <TagInput key={index} tag={input} values={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "date-input") {
                                                return <DateInput key={index} date={input} value={inputs[input.name]} handleValueChange={handleInputsChange} added={added[input.name]} handleAdd={handleAdd} />
                                        }
                                        else if (input.inputType === "radio-input") {
                                                return <RadioInput key={index} radio={input} value={inputs[input.name]} handleValueChange={handleInputsChange} />
                                        }
                                })}

                                <div className="changes">
                                        <button type="submit" className="save" disabled={!formAdded || isSubmitting} >
                                                <span className="icon">
                                                        {isSubmitting ? <CircularProgress size={14} color="inherit" /> : <CheckRoundedIcon fontSize="small" />}
                                                </span>
                                                {isSubmitting ? `Creating ${componentName}...` : `Create ${componentName}`}
                                        </button>
                                        <button type="reset" className="discard" onClick={handleDisplay} disabled={!formAdded || isSubmitting} >
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
                <div className={`new ${isEmptyObject(New) ? "" : "active"}`} onClick={handleDisplay} >
                        {isEmptyObject(New) ? "" : <Wrapper componentName={componentName} component={New.value} createComponent={createComponent} handleDisplay={handleDisplay} setAction={setAction} />}
                </div>
        );
}

export default New;
