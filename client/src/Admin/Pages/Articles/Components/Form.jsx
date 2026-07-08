import TagIcon from '../../../../assets/Icons/Admin/Articles/tag.png';
import LinkIcon from '../../../../assets/Icons/Admin/Articles/link.png';
import ImageIcon from '../../../../assets/Icons/Admin/Common/image.png';


function Form(article) {
        const image = article ? article.image : null;
        const title = article ? article.title : null;
        const author = article ? article.author : null;
        const intro = article ? article.intro : null;
        const description = article ? article.description : null;
        const tags = article ? article.tags : [];
        const links = article ? article.links.map(link => link.url): [];
        const otherAttr = article ? { _id: article._id, createdAt: article.createdAt, updatedAt: article.updatedAt } : {};
        
        const form = [
                { name: "image", label: "Article image", value: image, backup: ImageIcon, type: "other", required: true, inputType: "image-input" },
                { name: "title", label: "Title", value: title, required: true, inputType: "text-input" },
                { name: "author", label: "Author", value: author, required: true, inputType: "text-input" },
                { name: "intro", label: "Intro", value: intro, type: "single", required: true, inputType: "textarea-input" },
                { name: "description", label: "Description", value: description, type: "single", required: true, inputType: "textarea-input" },
                { name: "tags", label: "Tags", subLabel: "tag", values: tags, options: null, icon: TagIcon, type: "input", required: true, inputType: "tag-input" },
                { name: "links", label: "Links", subLabel: "link", values: links, options: null, icon: LinkIcon, type: "input", required: true, inputType: "tag-input" },
        ];
        return {label: "articles", value: form, ...otherAttr };
}

export default Form;