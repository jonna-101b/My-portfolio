import techs from "../../Projects/trialTechs";
import IconIcon from '../../../../assets/Icons/Admin/Common/figures.png';


export function technicalForm(skill) {
	const name = skill ? skill.name : "";
	const label = skill ? skill.label : "";
	const icon = skill ? skill.icon : "";
	const otherAttr = skill ? { _id: skill._id, createdAt: skill.createdAt, updatedAt: skill.updatedAt } : {};

	const form = [
		{ name: "name", label: "Technology Name", value: name, required: true, inputType: "text-input" },
		{ name: "label", label: "Category / Label", value: label, required: true, inputType: "text-input" },
		{ name: "icon", label: "Icon (Name or URL)", value: icon, required: true, inputType: "text-input" },
	];
	return { label: "technicalSkills", value: form, name: name, ...otherAttr };
}

export function conceptualForm(skill) {
        const icon = skill ? skill.icon : null;
        const title = skill ? skill.title : null;
        const description = skill ? skill.description : null;
        const otherAttr = skill ? { _id: skill._id, createdAt: skill.createdAt, updatedAt: skill.updatedAt } : {};

        const form = [
                { name: "icon", label: "Icon", value: icon, backup: IconIcon, type: "icon", required: true, inputType: "image-input" },
                { name: "title", label: "Title", value: title, required: true, inputType: "text-input" },
                { name: "description", label: "Description", value: description, type: "single", required: true, inputType: "textarea-input" },
        ];
        return {label: "conceptualSkills", value: form, ...otherAttr };
}