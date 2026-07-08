import useProfileReducer from '../../../../Hooks/useProfileReducer';
import ProfilePicture from '../../../../assets/Images/Admin/profile-picture.jpg';
import BackupIcon from '../../../../assets/Icons/Admin/Common/user.png';
import ImageInput from '../Forms/Components/ImageInput';
import '../Styles/PictureInfo.css';


function PictureInfo() {
        const { profile } = useProfileReducer();
        const { picture } = profile;
        const info = { name: "picture", label: "Profile picture", image: picture, backup: BackupIcon, type: "profile", inputType: "image" };
        
        return (
                <div className="picture-info info">
                        <ImageInput image={info} />
                </div>
        );
}

export default PictureInfo;