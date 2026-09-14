import useProfileReducer from '../../../../Hooks/useProfileReducer';
import TextInput from '../Forms/Components/TextInput';
import '../Styles/ContactInfo.css';

function ContactInfo() {
        const { profile } = useProfileReducer();
        const { phone = "", email = "", address = "" } = profile || {};

        const info = [
                { name: "phone", label: "Phone", value: phone, type: "tel" },
                { name: "email", label: "Email", value: email, type: "email" },
                { name: "address", label: "Address", value: address, type: "text" },
        ];

        return (
                <div className="contact-info-card">
                        <h3 className="card-title">Contact Info</h3>

                        <div className="info-rows-list">
                                <TextInput text={info[0]} />
                                <TextInput text={info[1]} />
                                <TextInput text={info[2]} />
                        </div>
                </div>
        );
}

export default ContactInfo;