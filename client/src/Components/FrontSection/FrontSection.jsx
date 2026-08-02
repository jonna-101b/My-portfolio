import { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeContext';
import useProfileReducer from '../../Hooks/useProfileReducer';
import SendIcon from '../../assets/Icons/Common/send.png';
import SendLightIcon from '../../assets/Icons/Common/send-light.png';
import MouseIcon from '../../assets/Icons/Common/mouse.png';
import ArrowIcon from '../../assets/Icons/Common/arrow-small-down.png';
import './FrontSection.css';


const ScrollDown = () => (
        <div className="scroll-down">
                <p className="image">
                        <img src={MouseIcon} alt="Mouse icon" />
                </p>

                <p>Scroll down</p>

                <p className="image">
                        <img src={ArrowIcon} alt="Arrow icon" />
                </p>
        </div>
);

function MainSection({ pageTitle, pageIntro, pageDescription, pageImage  }) {
        const { profile } = useProfileReducer();
        const { socialLinks } = profile;
        const{ theme } = useContext(ThemeContext);
        
        return (
                <div className="front-section">
                        <div className="intro">
                                <div className="social-links">
                                        { socialLinks.map((link) => (
                                                <a key={link._id} href={ link.url } target="_blank" className="social-link" >
                                                        <img src={link.icon } alt={link.name} />
                                                </a>
                                        )) }
                                </div>

                                <div className="info">
                                        <p className="title">{ pageTitle }</p>

                                        <p className="intro-text">{ pageIntro }</p>

                                        <p className="details">{ pageDescription }</p>


                                        <div className="contact">
                                                <button>Contact me
                                                        <img src={ theme === 'dark' ? SendIcon : SendLightIcon } alt="Send icon" />
                                                </button>
                                        </div>
                                </div>

                                <div className="image">
                                        <img src={ pageImage } alt="About image" />
                                </div>
                        </div>
                        
                        <ScrollDown />
                </div>
        );
}

export default MainSection;