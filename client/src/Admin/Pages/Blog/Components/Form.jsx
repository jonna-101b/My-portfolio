import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';


function Form(blog) {
	const image = blog ? blog.image : null;
	const title = blog ? blog.title : null;
	const author = blog ? blog.author : null;
	const intro = blog ? blog.intro : null;
	const description = blog ? blog.description : null;
	const tags = blog ? blog.tags : [];
	const links = blog ? blog.links.map(link => link.url): [];
	const otherAttr = blog ? { _id: blog._id, createdAt: blog.createdAt, updatedAt: blog.updatedAt } : {};
	
	const form = [
		{ name: "image", label: "Blog image", value: image, backup: ImageOutlinedIcon, type: "other", required: true, inputType: "image-input" },
		{ name: "title", label: "Title", value: title, required: true, inputType: "text-input" },
		{ name: "author", label: "Author", value: author, required: true, inputType: "text-input" },
		{ name: "intro", label: "Intro", value: intro, type: "single", required: true, inputType: "textarea-input" },
		{ name: "description", label: "Description", value: description, type: "single", required: true, inputType: "textarea-input" },
		{ name: "tags", label: "Tags", subLabel: "tag", values: tags, options: null, icon: LocalOfferOutlinedIcon, type: "input", required: true, inputType: "tag-input" },
		{ name: "links", label: "Links", subLabel: "link", values: links, options: null, icon: LinkRoundedIcon, type: "input", required: true, inputType: "tag-input" },
	];
	return {label: "blogs", value: form, ...otherAttr };
}

export default Form;