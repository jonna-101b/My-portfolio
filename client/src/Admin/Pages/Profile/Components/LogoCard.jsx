import { useState } from 'react';
import useProfileReducer from '../../../../Hooks/useProfileReducer';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ImageUploadModal from '../Forms/Components/ImageUploadModal';
import { ImageWithFallback } from '../../../../Utils/imageUtils';
import LogoVisibilityToggle from './LogoVisibilityToggle';
import '../Styles/LogoCard.css';

function LogoCard() {
        const { profile, updateProfile } = useProfileReducer();
        const { logo } = profile || {};
        const [isUploadOpen, setIsUploadOpen] = useState(false);

        const handleSaveLogo = (newLogo) => {
                updateProfile({ logo: newLogo });
        };

        return (
                <div className="logo-card">
                        <h3 className="card-title">Logo</h3>

                        <div className="logo-preview-wrapper">
                                <div className="logo-circle">
                                        <ImageWithFallback 
                                                src={logo} 
                                                alt="Brand Logo" 
                                                className="logo-image"
                                                fallbackIcon={<ImageOutlinedIcon style={{ fontSize: '2.25rem', color: 'var(--admin-text-muted)' }} />}
                                                fallbackText="No logo set"
                                                fallbackColor="var(--admin-surface-darkest, #151515)"
                                        />
                                </div>

                                <button
                                        type="button"
                                        className="logo-camera-btn"
                                        onClick={() => setIsUploadOpen(true)}
                                        aria-label="Upload brand logo"
                                        title="Change brand logo"
                                >
                                        <CameraAltOutlinedIcon style={{ fontSize: '1.15rem' }} />
                                </button>
                        </div>

                        <p className="logo-caption">Your brand logo.</p>

                        <LogoVisibilityToggle />

                        <ImageUploadModal
                                isOpen={isUploadOpen}
                                onClose={() => setIsUploadOpen(false)}
                                onSave={handleSaveLogo}
                                currentImage={logo}
                                title="Update Brand Logo"
                                type="logo"
                        />
                </div>
        );
}

export default LogoCard;
