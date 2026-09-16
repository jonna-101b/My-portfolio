import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import techs from '../trialTechs';



function Form(project) {
	const image = project ? project.image : null;
	const title = project ? project.title : null;
	const contribution = project ? project.contribution : null;
	const description = project ? project.description : null;
	const domains = project ? project.domains : [];
	const features = project ? project.features : [];
	const techStack = project ? project.techStack : [];
	const githubLink = project ? project.githubLink : null;
	const projectLink = project ? project.projectLink : null;
	const otherAttr = project ? { _id: project._id, createdAt: project.createdAt, updatedAt: project.updatedAt } : {};

	const options = [
		{ value: "personal", label: "personal" },
		{ value: "team", label: "team" },
		{ value: "organization", label: "organization" },
		{ value: "open source", label: "open source" },
		{ value: "academic", label: "academic" },
		{ value: "research", label: "research" },
		{ value: "freelance", label: "freelance" },
		{ value: "hackathon", label: "hackathon" },
		{ value: "entrepreneurial", label: "entrepreneurial" },
	];

	const form = [
		{ name: "image", label: "Project image", value: image, backup: ImageOutlinedIcon, type: "other", required: true, inputType: "image-input" },
		{ name: "title", label: "Title", value: title, required: true, inputType: "text-input" },
		{ name: "contribution", label: "Contribution", value: contribution, options: options, required: true, inputType: "select-input" },
		{ name: "description", label: "Description", value: description, type: "options", required: true, inputType: "textarea-input" },
		{ name: "domains", label: "Domains", subLabel: "domain", values: domains, options: null, icon: HubOutlinedIcon, type: "input", required: true, inputType: "tag-input" },
		{ name: "features", label: "Features", subLabel: "feature", values: features, options: null, icon: ExtensionOutlinedIcon, type: "input", required: false, inputType: "tag-input" },
		{ name: "techStack", label: "Tech stack", subLabel: "tech", values: techStack, options: techs, icon: null, type: "select",  required: true, inputType: "tag-input" },
		{ name: "githubLink", label: "Github link", value: githubLink, required: true, inputType: "text-input" },
		{ name: "projectLink", label: "Project link", value: projectLink, required: true, inputType: "text-input" },
	];
	return {label: "projects", value: form, ...otherAttr };
}

export default Form;