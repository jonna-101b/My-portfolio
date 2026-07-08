import UserIcon from '../../../../assets/Icons/Admin/Common/user.png';


function Form(testimonial) {
        const picture = testimonial ? testimonial.picture : null;
        const name = testimonial ? testimonial.name : null;
        const email = testimonial ? testimonial.email : null;
        const position = testimonial ? testimonial.position : null;
        const testimony = testimonial ? testimonial.testimony : null;
        const company = testimonial ? testimonial.company : null;
        const otherAttr = testimonial ? { _id: testimonial._id, createdAt: testimonial.createdAt, updatedAt: testimonial.updatedAt } : {};

        const form = [
                { name: "picture", label: "Picture", value: picture, type: "profile", backup: UserIcon, required: true, inputType: "image-input" },
                { name: "name", label: "Name", value: name, required: true, inputType: "text-input" },
                { name: "email", label: "Email", value: email, required: true, inputType: "text-input" },
                { name: "position", label: "Position", value: position, required: true, inputType: "text-input" },
                { name: "testimony", label: "Testimony", value: testimony, type: "single", required: true, inputType: "textarea-input" },
                { name: "company", label: "Company", value: company, required: false, inputType: "text-input" },
        ];

        return {label: "testimonials", value: form, ...otherAttr };
}

export default Form;