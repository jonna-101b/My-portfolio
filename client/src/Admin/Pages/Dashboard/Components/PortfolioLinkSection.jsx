import useProfileReducer from '../../../../Hooks/useProfileReducer';
import { Link } from 'react-router-dom';
import WritingImage from '../../../../assets/Images/Admin/writing.svg';
import GoToIcon from '../../../../assets/Icons/Admin/Dashboard/go-to.png';
import '../Styles/PortfolioLinkSection.css';


function PortfolioLinkSection () {
        const { profile } = useProfileReducer();
        const { picture, nickName } = profile;

        return (
                <div className="portfolio-link-section">
                        <div className="contents">
                                <p className="logo">
                                        <img src={picture} alt="Logo" />
                                        { nickName }
                                </p>

                                <p className="text">
                                        <span className="title">Visit now!</span>

                                        <span>Take a look at your portfolio, click the button below</span>
                                </p>

                                <Link className="portfolio-link" to={'/'} >
                                        Visit portfolio
                                        <img src={GoToIcon} alt="Go to icon" />
                                </Link>
                        </div>

                        <p className="image">
                                <img src={WritingImage} alt="Writing image" />
                        </p>
                </div>
        );
}

export default PortfolioLinkSection;