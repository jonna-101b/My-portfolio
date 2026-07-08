import TopView from "../../Components/TopView/TopView";
import PictureInfo from "./Components/PictureInfo";
import BasicInfo from "./Components/BasicInfo";
import ContactInfo from "./Components/ContactInfo";
import MoreInfo from "./Components/MoreInfo";
import './Profile.css';

function Profile() {
    return (
        <div className="profile">
                <TopView page={"Personal profile"} />

                <PictureInfo />

                <BasicInfo />

                <ContactInfo />

                <MoreInfo />
        </div>
    );
}

export default Profile;