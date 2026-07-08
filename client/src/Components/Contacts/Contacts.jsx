import useProfileReducer from '../../Hooks/useProfileReducer';
import PhoneIcon from '../../assets/Icons/Common/phone.png';
import MailIcon from '../../assets/Icons/Common/envelope.png';
import LocationIcon from '../../assets/Icons/Common/location.png';
import './Contacts.css';

function Contacts() {
        const { profile } = useProfileReducer();
        const { phone, email, address } = profile;

        return (
                <div className="contacts">
                        <div className="get-in-touch">
                                <div className="title">
                                        <p>Get in Touch</p>
                                </div>

                                <div className="contact-message">
                                        <p>
                                                Got a project idea, question, or just want to say hi? 
                                                I'd love to hear from you. Fill out the form, send a 
                                                message, or try smoke signals (but email works best). 
                                                Let's connect
                                        </p>
                                </div>

                                <div className="call contact">
                                        <div className="icon">
                                                <img src={ PhoneIcon } alt="Phone icon" />
                                        </div>

                                        <div className="details">
                                                <p className="title">Call me</p>

                                                <p className="info">{ phone }</p>
                                        </div>
                                </div>

                                <div className="email contact">
                                        <div className="icon">
                                                <img src={ MailIcon } alt="Mail icon" />
                                        </div>

                                        <div className="details">
                                                <p className="title">Email me</p>

                                                <p className="info">{ email }</p>
                                        </div>
                                </div>

                                <div className="address contact">
                                        <div className="icon">
                                                <img src={ LocationIcon } alt="Location icon" />
                                        </div>

                                        <div className="details">
                                                <p className="title">Address</p>

                                                <p className="info">{ address }</p>
                                        </div>
                                </div>
                        </div>

                        <div className="form">
                                <form action="">
                                        <input type="text" name="name" id="name" placeholder='Name'/>

                                        <input type="text" name="email" id="email" placeholder='Email'/>

                                        <input type="text" name="subject" id="subject" placeholder='Subject'/>

                                        <textarea name="message" id="message" placeholder='Message'></textarea>

                                        <button type='submit'>Send message</button>
                                </form>
                        </div>
                </div>
        );
}

export default Contacts;