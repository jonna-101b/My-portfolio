import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../Contexts/ThemeContext';
import useProfileReducer from '../../../Hooks/useProfileReducer';
import MaleIllustration from '../../../assets/Icons/Home/man.png';
import MaleLightIllustration from '../../../assets/Icons/Home/man-light.png';
import FemaleIllustration from '../../../assets/Icons/Home/pharmacist.png';
import GoToIcon from '../../../assets/Icons/Home/right-arrow with a line.png';
import '../Styles/AboutPreview.css';

function AboutPreview() {
        const { profile } = useProfileReducer();
        const { firstName, lastName, description, picture, availability, gender } = profile;
        const { theme, toggleTheme } = useContext(ThemeContext);

        return (
                <div className="about-preview">
                        <div className="title">
                                <p>About Me</p>
                        </div>

                        <div className="intro-text">
                                <p>Here's a Little About Who I Am and What I Do</p>
                        </div>

                        <div className="main-content">
                                <div className="top">
                                        <p className="profile-picture">
                                                <img src={ picture } alt="Profile picture" />
                                        </p>

                                        <div className="right">
                                                <p className="name">
                                                        { `${firstName} ${lastName}` }
                                                </p>

                                                <p className={`availability ${ availability ? "available" : "not-available" }`}>
                                                        <span>{ availability ? "Available for work" : "Not available for work" }</span>
                                                </p>
                                        </div>

                                        <div className="shadow">
                                                <img src={ gender.toLowerCase() === "male" ? ( theme === 'dark' ? MaleIllustration : MaleLightIllustration ) : FemaleIllustration } alt="Man illustration" />
                                        </div>
                                </div>


                                <p className="description">
                                        { description.brief }
                                </p>
                        </div>

                        <div className="more">
                                <Link className="button" to="/about">
                                        Learn more
                                        <img src={ GoToIcon } alt="Go to icon" />
                                </Link>
                        </div>
                </div>
        );
}

export default AboutPreview;