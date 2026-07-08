import useProfileReducer from '../../../../Hooks/useProfileReducer';
import TextInput from '../Forms/Components/TextInput';
import TagInput from '../Forms/Components/TagInput';
import allSocialLinks from '../trialSocialLinks';
import '../Styles/ContactInfo.css';


function ContactInfo() {
        const { profile } = useProfileReducer();
        const { phone, email, address, socialLinks } = profile;

        const info = [
                { name: "phone", label: "Phone", value: phone, type: "phone", inputType: "text" },
                { name: "email", label: "Email", value: email, type: "email", inputType: "text" },
                { name: "address", label: "Address", value: address, type: "text", inputType: "text"},
                { name: "socialLinks", label: "Social links", subLabel: "platform", type: "select", options: allSocialLinks, icon: null,  inputType: "tag" },
        ];

        return (
                <div className="contact-info">
                        <p className="title">Contact info</p>

                        <div className="info">
                                <TextInput text={info[0]} />
                                <TextInput text={info[1]} />
                                <TextInput text={info[2]} />
                                <TagInput tag={info[3]} values={socialLinks} />
                        </div>

                </div>
        );
}

export default ContactInfo;