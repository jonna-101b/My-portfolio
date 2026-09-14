import { Link } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../Styles/PortfolioLinkSection.css';

function PortfolioLinkSection() {
        return (
                <div className="portfolio-live-card">
                        <div className="live-badge-icon">
                                <RocketLaunchIcon className="rocket-icon" />
                        </div>

                        <div className="live-content">
                                <h3 className="live-title">Portfolio is Live</h3>
                                <p className="live-description">
                                        Check out how your public profile looks to visitors and recruiters.
                                </p>
                        </div>

                        <Link to="/" target="_blank" rel="noopener noreferrer" className="visit-portfolio-btn">
                                <span>Visit portfolio</span>
                                <ArrowForwardIcon className="arrow-icon" fontSize="small" />
                        </Link>
                </div>
        );
}

export default PortfolioLinkSection;