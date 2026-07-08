import techs from "../../Projects/trialTechs";
import IconIcon from '../../../../assets/Icons/Admin/Common/figures.png';


export function technicalForm(skill) {
        const title = skill ? skill.title : null;
        const techStack = skill ? skill.techStack : [];
        const otherAttr = skill ? { _id: skill._id, createdAt: skill.createdAt, updatedAt: skill.updatedAt } : {};

        const form = [
                { name: "title", label: "Title", value: title, required: true, inputType: "text-input" },
                { name: "techStack", label: "Tech stack", subLabel: "tech", values: techStack, icon: null, type: "select", options: techs, required: true, inputType: "tag-input" },
        ];
        return {label: "technicalSkills", value: form, ...otherAttr };
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