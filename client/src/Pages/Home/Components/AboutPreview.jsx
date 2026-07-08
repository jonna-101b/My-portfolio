import { Link } from 'react-router-dom';
import useProfileReducer from '../../../Hooks/useProfileReducer';
import MaleIllustration from '../../../assets/Icons/Home/man.png';
import FemaleIllustration from '../../../assets/Icons/Home/pharmacist.png';
import GoToIcon from '../../../assets/Icons/Home/right-arrow with a line.png';
import '../Styles/AboutPreview.css';

function AboutPreview() {
        const { profile } = useProfileReducer();
        const { firstName, lastName, description, picture, availability, gender } = profile;

        return (
                <div className="about-preview">
                        <div className="title">
                                <p>About me</p>
                        </div>

                        <div className="intro-text">
                                <p>Here's a little about who I am and what I do</p>
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
                                                <img src={ gender.toLowerCase() === "male" ? MaleIllustration : FemaleIllustration } alt="Man illustration" />
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