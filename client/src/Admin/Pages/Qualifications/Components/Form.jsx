function Form(qualification) {
        const discipline = qualification ? qualification.discipline : null;
        const organization = qualification ? qualification.organization : null;
        const description = qualification ? qualification.description : null;
        const duration = qualification ? qualification.duration : null;
        const active = qualification ? qualification.active : null;
        const type = qualification ? qualification.type : null;
        const otherAttr = qualification ? { _id: qualification._id, createdAt: qualification.createdAt, updatedAt: qualification.updatedAt } : {};

        const activeOptions = [
                { label: "True", value: true },
                { label: "False", value: false },
        ];
        
        const typeOptions = [
                { label: "Education", value: "education" },
                { label: "Experience", value: "experience" },
        ];

        const form = [
                { name: "discipline", label: "Discipline", value: discipline, required: true, inputType: "text-input" },
                { name: "organization", label: "Organization", value: organization,  required: true, inputType: "text-input" },
                { name: "description", label: "Description", value: description, type: "single",  required: true, inputType: "textarea-input" },
                { name: "duration", label: "Duration", value: duration, type: "duration",  required: true, inputType: "date-input" },
                { name: "active", label: "Active", value: active, options: activeOptions,  required: false, inputType: "radio-input" },
                { name: "type", label: "Qualification type", value: type, options: typeOptions,  required: false, inputType: "radio-input" },
        ];

        return {label: "qualifications", value: form, ...otherAttr };
}

export default Form;