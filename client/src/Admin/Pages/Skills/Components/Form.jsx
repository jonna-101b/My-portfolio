import techs from "../../Projects/trialTechs";


export function technicalForm(skill) {
	const name = skill ? (skill.name || "") : "";
	const label = skill ? (skill.label || "") : "";
	const icon = skill ? (skill.icon || skill.name || "") : "";
	const otherAttr = skill && skill._id ? { _id: skill._id, createdAt: skill.createdAt, updatedAt: skill.updatedAt } : {};

	const form = [
		{ name: "name", label: "Technology", value: name, icon: icon, required: true, inputType: "tech-select-input" },
		{ name: "label", label: "Category / Label", value: label, required: true, inputType: "creatable-select-input" },
		{ name: "icon", label: "Icon Slug", value: icon, required: true, inputType: "text-input" },
	];
	return { label: "technicalSkills", value: form, name: name, ...otherAttr };
}

export function conceptualForm(skill) {
        const title = skill ? (skill.title || "") : "";
        const description = skill ? (skill.description || "") : "";
        const otherAttr = skill && skill._id ? { _id: skill._id, createdAt: skill.createdAt, updatedAt: skill.updatedAt } : {};

        const form = [
                { name: "title", label: "Title", value: title, required: true, inputType: "text-input" },
                { name: "description", label: "Description", value: description, type: "single", required: true, inputType: "textarea-input" },
        ];
        return { label: "conceptualSkills", value: form, ...otherAttr };
}