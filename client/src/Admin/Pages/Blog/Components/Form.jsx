import TagIcon from '../../../../assets/Icons/Admin/Articles/tag.png';
import LinkIcon from '../../../../assets/Icons/Admin/Articles/link.png';
import ImageIcon from '../../../../assets/Icons/Admin/Common/image.png';


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
                { name: "image", label: "Blog image", value: image, backup: ImageIcon, type: "other", required: true, inputType: "image-input" },
                { name: "title", label: "Title", value: title, required: true, inputType: "text-input" },
                { name: "author", label: "Author", value: author, required: true, inputType: "text-input" },
                { name: "intro", label: "Intro", value: intro, type: "single", required: true, inputType: "textarea-input" },
                { name: "description", label: "Description", value: description, type: "single", required: true, inputType: "textarea-input" },
                { name: "tags", label: "Tags", subLabel: "tag", values: tags, options: null, icon: TagIcon, type: "input", required: true, inputType: "tag-input" },
                { name: "links", label: "Links", subLabel: "link", values: links, options: null, icon: LinkIcon, type: "input", required: true, inputType: "tag-input" },
        ];
        return {label: "blogs", value: form, ...otherAttr };
}

export default Form;