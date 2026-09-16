import TopView from "../../Components/TopView/TopView";
import PictureInfo from "./Components/PictureInfo";
import LogoCard from "./Components/LogoCard";
import ResumeCard from "./Components/ResumeCard";
import ProfessionsCard from "./Components/ProfessionsCard";
import SocialLinksCard from "./Components/SocialLinksCard";
import BasicInfo from "./Components/BasicInfo";
import ContactInfo from "./Components/ContactInfo";
import BioCard from "./Components/BioCard";
import AboutCard from "./Components/AboutCard";
import './Profile.css';

function Profile() {
        return (
                <div className="profile-page-container">
                        <TopView page={"Personal profile"} />

                        <div className="profile-content-grid">
                                <div className="profile-left-column">
                                        <PictureInfo />
                                        <LogoCard />
                                        <ResumeCard />
                                        <ProfessionsCard />
                                        <SocialLinksCard />
                                </div>

                                <div className="profile-right-column">
                                        <BasicInfo />
                                        <ContactInfo />
                                        <BioCard />
                                        <AboutCard />
                                </div>
                        </div>
                </div>
        );
}

export default Profile;