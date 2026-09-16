import { useState, useRef } from 'react';
import useProfileReducer from '../../Hooks/useProfileReducer';
import useNotificationsReducer from '../../Hooks/useNotificationsReducer';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import './Contacts.css';

function ContactItem({ type, icon, title, value, copyText }) {
        const [copied, setCopied] = useState(false);
        const timeoutRef = useRef(null);

        const handleCopy = async () => {
                if (!value) return;
                try {
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                                await navigator.clipboard.writeText(value);
                        } else {
                                const textArea = document.createElement("textarea");
                                textArea.value = value;
                                textArea.style.position = "fixed";
                                textArea.style.left = "-999999px";
                                document.body.appendChild(textArea);
                                textArea.focus();
                                textArea.select();
                                document.execCommand("copy");
                                textArea.remove();
                        }

                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        setCopied(true);
                        timeoutRef.current = setTimeout(() => {
                                setCopied(false);
                        }, 1500);
                } catch (err) {
                        console.error("Failed to copy:", err);
                }
        };

        const handleKeyDown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCopy();
                }
        };

        return (
                <div 
                        className={`${type} contact`}
                        onClick={handleCopy}
                        onKeyDown={handleKeyDown}
                        role="button"
                        tabIndex={0}
                        aria-label={`Copy ${title}: ${value}`}
                >
                        <div className="icon">
                                {icon}
                        </div>

                        <div className="details">
                                <p className="title">{title}</p>
                                <p className="info">{value || "Not provided"}</p>
                        </div>

                        <div className={`copy-tooltip ${copied ? 'copied' : ''}`} aria-hidden="true">
                                {copied ? 'Copied!' : copyText}
                        </div>
                </div>
        );
}

function Contacts() {
        const { profile } = useProfileReducer();
        const { phone, email, address } = profile || {};
        const { createNotification } = useNotificationsReducer();

        const [formData, setFormData] = useState({
                name: '',
                email: '',
                subject: '',
                message: ''
        });

        const [status, setStatus] = useState({
                submitting: false,
                success: null,
                error: null
        });

        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
                if (status.error || status.success) {
                        setStatus((prev) => ({ ...prev, error: null, success: null }));
                }
        };

        const handleSubmit = async (e) => {
                e.preventDefault();

                const { name, email, subject, message } = formData;
                if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
                        setStatus({
                                submitting: false,
                                success: null,
                                error: "Please fill out all fields before sending."
                        });
                        return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.trim())) {
                        setStatus({
                                submitting: false,
                                success: null,
                                error: "Please enter a valid email address."
                        });
                        return;
                }

                setStatus({ submitting: true, success: null, error: null });

                try {
                        await createNotification({
                                name: name.trim(),
                                email: email.trim(),
                                subject: subject.trim(),
                                message: message.trim()
                        });
                        setStatus({
                                submitting: false,
                                success: "Thank you! Your message has been sent successfully.",
                                error: null
                        });
                        setFormData({ name: '', email: '', subject: '', message: '' });
                } catch (err) {
                        const errorMsg =
                                err?.response?.data?.message ||
                                err?.message ||
                                "Failed to send message. Please try again later.";
                        setStatus({
                                submitting: false,
                                success: null,
                                error: errorMsg
                        });
                }
        };

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

                                <ContactItem
                                        type="call"
                                        icon={<PhoneRoundedIcon className="contact-icon" />}
                                        title="Call me"
                                        value={phone}
                                        copyText="Click to copy phone number"
                                />

                                <ContactItem
                                        type="email"
                                        icon={<EmailRoundedIcon className="contact-icon" />}
                                        title="Email me"
                                        value={email}
                                        copyText="Click to copy email address"
                                />

                                <ContactItem
                                        type="address"
                                        icon={<LocationOnRoundedIcon className="contact-icon" />}
                                        title="Address"
                                        value={address}
                                        copyText="Click to copy address"
                                />
                        </div>

                        <div className="form">
                                <form onSubmit={handleSubmit} noValidate>
                                        <input 
                                                type="text" 
                                                name="name" 
                                                id="name" 
                                                placeholder="Name" 
                                                value={formData.name}
                                                onChange={handleChange}
                                                disabled={status.submitting}
                                                required
                                        />

                                        <input 
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                placeholder="Email" 
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={status.submitting}
                                                required
                                        />

                                        <input 
                                                type="text" 
                                                name="subject" 
                                                id="subject" 
                                                placeholder="Subject" 
                                                value={formData.subject}
                                                onChange={handleChange}
                                                disabled={status.submitting}
                                                required
                                        />

                                        <textarea 
                                                name="message" 
                                                id="message" 
                                                placeholder="Message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                disabled={status.submitting}
                                                required
                                        ></textarea>

                                        {status.error && (
                                                <div className="form-feedback error" role="alert">
                                                        <ErrorOutlineRoundedIcon fontSize="small" />
                                                        <span>{status.error}</span>
                                                </div>
                                        )}

                                        {status.success && (
                                                <div className="form-feedback success" role="status">
                                                        <CheckCircleOutlineRoundedIcon fontSize="small" />
                                                        <span>{status.success}</span>
                                                </div>
                                        )}

                                        <button type="submit" disabled={status.submitting}>
                                                {status.submitting ? "Sending..." : "Send message"}
                                        </button>
                                </form>
                        </div>
                </div>
        );
}

export default Contacts;