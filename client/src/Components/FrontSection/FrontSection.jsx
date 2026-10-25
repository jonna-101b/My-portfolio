import useProfileReducer from '../../Hooks/useProfileReducer';
import MouseRoundedIcon from '@mui/icons-material/MouseRounded';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import { ImageWithFallback } from '../../Utils/imageUtils';
import SimpleIcon from '../../Utils/simpleIcons';
import './FrontSection.css';


const ScrollDown = () => {
        const handleScrollDown = () => {
                window.scrollBy({
                        top: window.innerHeight,
                        behavior: 'smooth'
                });
        };

        return (
                <div
                        className="scroll-down"
                        onClick={handleScrollDown}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleScrollDown();
                                }
                        }}
                        aria-label="Scroll down"
                >
                        <p className="image">
                                <MouseRoundedIcon className="scroll-mouse-icon" />
                        </p>

                        <p>Scroll down</p>

                        <p className="image">
                                <SouthRoundedIcon className="scroll-arrow-icon" />
                        </p>
                </div>
        );
};

function MainSection({ pageTitle, pageIntro, pageDescription, pageImage  }) {
        const { profile } = useProfileReducer();
        const { socialLinks = [] } = profile || {};
        
        const handleScrollToContacts = () => {
                const contactsSection = document.getElementById('contacts');
                if (contactsSection) {
                        contactsSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                        window.scrollTo({
                                top: document.documentElement.scrollHeight,
                                behavior: 'smooth'
                        });
                }
        };

        return (
                <div className="front-section">
                        <div className="intro">
                                <div className="social-links">
                                        { socialLinks && socialLinks.map((link, index) => (
                                                <a
                                                        key={link._id || index}
                                                        href={ link.url || "#" }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="social-link"
                                                        title={link.name || "Social link"}
                                                        aria-label={link.name || "Social link"}
                                                >
                                                        <SimpleIcon name={link.icon || link.name} size="24px" color="currentColor" />
                                                </a>
                                        )) }
                                </div>

                                <div className="info">
                                        <p className="title">{ pageTitle }</p>

                                        <p className="intro-text">{ pageIntro }</p>

                                        <p className="details">{ pageDescription }</p>


                                        <div className="contact">
                                                <button type="button" onClick={handleScrollToContacts} aria-label="Contact me">Contact me
                                                        <NearMeRoundedIcon className="send-icon" />
                                                </button>
                                        </div>
                                </div>

                                <div className="image">
                                        <ImageWithFallback 
                                                src={pageImage} 
                                                alt={pageTitle || "Page header image"}
                                                fallbackColor="rgba(198, 255, 0, 0.04)"
                                                fallbackText={pageTitle || "Illustration"}
                                        />
                                </div>
                        </div>
                        
                        <ScrollDown />
                </div>
        );
}

export default MainSection;