import useProfileReducer from '../../../../Hooks/useProfileReducer';
import phoneIcon from '../../../../assets/Icons/Admin/Dashboard/phone.png';
import emailIcon from '../../../../assets/Icons/Admin/Dashboard/envelope.png';
import addressIcon from '../../../../assets/Icons/Admin/Dashboard/location.png';
import DownloadIcon from '../../../../assets/Icons/Admin/Dashboard/downloads.png';
import '../Styles/ProfileSection.css';


const Info = ({ icon, infoName, infoValue }) => (
        <div className="info">
                <p className="icon">
                        <img src={icon} alt={`${infoName} icon`} />
                </p>

                <div className="details">
                        <p className="info-name">{infoName}</p>
                        <p className="info-value">{infoValue}</p>
                </div>
        </div>
);

function ProfileSection() {
        const { profile } = useProfileReducer();
        const {  firstName, lastName, nickName, professions, picture, socialLinks, phone, email, address, resumeLink } = profile;

        return (
                <div className="profile-section">
                        <div className="left-section">
                                <p className="badge">Available for hire</p>

                                <p className="profile-picture">
                                        <img src={picture} alt={`${firstName}'s picture`} />
                                </p>

                                <p className="full-name">
                                        {`${firstName} ${lastName}`}
                                </p>

                                <a href={resumeLink} download={`${firstName}'s resume`} className="resume">
                                        <img src={DownloadIcon} alt="Download icon" />
                                        Download Resume
                                </a>
                        </div>

                        <div className="right-section">
                                <p className="greeting">{`Hello ${nickName}!`}</p>

                                <p className="summary">Senior Full-Stack Engineer & Interaction Designer specializing in immersive digital experiences.</p>

                                <div className="professions">
                                        { professions.map((profession, index) => (
                                                <p key={index} >{profession}</p>
                                        )) }
                                </div>
                                
                                <div className="social-links">
                                        { socialLinks.map((link) => (
                                                <a key={link._id} href={link.url} target="_blank" rel="noopener noreferrer">
                                                        <img src={link.icon} />
                                                </a>
                                        )) }
                                </div>

                                <div className="contact-info">
                                        <Info icon={phoneIcon} infoName="Phone" infoValue={phone} />
                                        <Info icon={emailIcon} infoName="Email" infoValue={email} />
                                        <Info icon={addressIcon} infoName="Address" infoValue={address} />
                                </div>
                        </div>
                </div>
        );
}

export default ProfileSection;