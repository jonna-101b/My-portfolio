import { useState } from 'react';
import useProfileReducer from '../../../../Hooks/useProfileReducer';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ImageUploadModal from '../Forms/Components/ImageUploadModal';
import '../Styles/PictureInfo.css';

function PictureInfo() {
        const { profile, updateProfile } = useProfileReducer();
        const { picture, firstName, lastName, nickName, email, availability } = profile || {};
        const [isUploadOpen, setIsUploadOpen] = useState(false);

        const displayName = firstName && lastName ? `${firstName} ${lastName}` : (nickName || "Admin User");
        const isAvailable = availability === true || availability === "true";

        const handleToggleAvailability = () => {
                updateProfile({ availability: !isAvailable });
        };

        const handleSaveImage = (newImage) => {
                updateProfile({ picture: newImage });
        };

        return (
                <div className="profile-overview-card">
                        <div className="avatar-wrapper">
                                <div className="avatar-circle">
                                        {picture ? (
                                                <img src={picture} alt={displayName} className="avatar-image" />
                                        ) : (
                                                <div className="avatar-fallback">
                                                        <PersonOutlineRoundedIcon style={{ fontSize: '3.5rem', color: 'var(--admin-text-muted)' }} />
                                                        <span className="fallback-text">No photo</span>
                                                </div>
                                        )}
                                </div>

                                <button
                                        type="button"
                                        className="avatar-camera-btn"
                                        onClick={() => setIsUploadOpen(true)}
                                        aria-label="Upload profile picture"
                                        title="Change profile picture"
                                >
                                        <CameraAltOutlinedIcon style={{ fontSize: '1.15rem' }} />
                                </button>
                        </div>

                        <div className="profile-details">
                                <h2 className="profile-name">{displayName}</h2>
                                <p className="profile-email">{email || "No email set"}</p>
                        </div>

                        <div className="availability-row">
                                <span className="availability-label">Availability for hire</span>
                                <button
                                        type="button"
                                        role="switch"
                                        aria-checked={isAvailable}
                                        className={`toggle-switch ${isAvailable ? "on" : "off"}`}
                                        onClick={handleToggleAvailability}
                                        title={isAvailable ? "Set as unavailable" : "Set as available for hire"}
                                >
                                        <span className="toggle-thumb" />
                                </button>
                        </div>

                        <ImageUploadModal
                                isOpen={isUploadOpen}
                                onClose={() => setIsUploadOpen(false)}
                                onSave={handleSaveImage}
                                currentImage={picture}
                                title="Update Profile Picture"
                                type="profile"
                        />
                </div>
        );
}

export default PictureInfo;