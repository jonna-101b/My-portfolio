import useProfileReducer from '../../Hooks/useProfileReducer';
import SimpleIcon from '../../Utils/simpleIcons';
import './Footer.css';

function Footer() {
        const { profile } = useProfileReducer();
        const { firstName, lastName, socialLinks } = profile || {};
        const currentYear = new Date().getFullYear();
        const fullName = [firstName, lastName].filter(Boolean).join(' ');

        return (
                <footer className="footer">
                        <p className="copyright">
                                {`© ${currentYear} ${fullName}. All rights reserved.`}
                        </p>

                        <div className="social-links">
                                {socialLinks && socialLinks.map((link, index) => (
                                        <a
                                                key={link._id || index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-link"
                                                title={link.name || "Social link"}
                                                aria-label={link.name || "Social link"}
                                        >
                                                <SimpleIcon name={link.icon || link.name} size="22px" color="currentColor" />
                                        </a>
                                ))}
                        </div>
                </footer>
        );
}

export default Footer;
