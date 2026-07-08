import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../../../../../assets/Icons/Admin/Common/Edit/upload-white.png';
import UploadDropIcon from '../../../../../assets/Icons/Admin/Common/Edit/upload-drop.png';
import CancelBlackIcon from '../../../../../assets/Icons/Admin/Common/Edit/cancel-black.png';
import CameraIcon from '../../../../../assets/Icons/Admin/Common/Edit/add-photo.png';
import CameraHoverIcon from '../../../../../assets/Icons/Admin/Common/Edit/add-photo-hover.png';
import FileSearchIcon from '../../../../../assets/Icons/Admin/Common/Edit/folder.png';
import '../Styles/ImageInput.css';
import useProfileReducer from '../../../../../Hooks/useProfileReducer';


function ImageInput({ image }) {
        const { updateProfile } = useProfileReducer();
        const [preview, setPreview] = useState(image.image || null);
        const [ uploading, setUploading ] = useState(false);
        const [ imageError, setImageError ] = useState(false);

        const onDrop = (acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file) {
                        updateProfile({ [image.name]: URL.createObjectURL(file) });
                }
                setImageError(false);
                handleUploading();
        };

        const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
                accept: { 'image/*': [] },
                multiple: false,
                noClick: true, // prevent default click so only your Browse button works
                onDrop,
        });

        const handleUploading = () => {
                setUploading((prev) => !prev);
        };

        const handleImageError = (bool) => {
                setImageError(bool);
        };

        useEffect(() => {
                setPreview(image.image);
        }, [image.image]);

        const value =
                <div className={`value ${image.type}`}>
                        { imageError ? <img src={image.backup} className="preview-image backup" /> : <img src={preview} className="preview-image" onError={() => {handleImageError(true)}} /> }

                        <div className="upload-button" onClick={handleUploading} >
                                <p>
                                        <span className="icon">
                                                <img src={CameraIcon} alt="Camera icon" className="main" />
                                                <img src={CameraHoverIcon} alt="Camera icon" className="hover" />
                                        </span>
                                        { image.type === "other" ? "upload image" : null}
                                </p>
                        </div>
                </div>
        ;

        const upload = 
                <div className={`upload ${image.type}`} {...getRootProps()} style={{ backgroundColor: isDragActive ? "rgba(198, 255, 0, 0.1)" : "transparent", borderColor: isDragActive ? "#c6ff00" : "#ededed" }}>
                        <input {...getInputProps()} />

                        <p className={`icon upload-icon ${isDragActive ? "drop-active" : ""}`}>
                                <img src={ UploadIcon } alt="Upload icon" className="main" />
                                <img src={ UploadDropIcon } alt="Upload icon" className="drop" />
                        </p>

                        <p className="drag" style={{ color: isDragActive ? "#c6ff00" : "#ededed" }} >Drag and drop picture</p>

                        { image.type === "other" ? <p className="or">or</p> : null }

                        <p  className="browse" onClick={open}>
                                <span className="icon">
                                        <img src={FileSearchIcon} alt="File search icon" />
                                </span>
                                { image.type === "other" ? "browse" : null }
                        </p>

                        { image.type === "other" ? 
                                <>
                                        <p className="detail">
                                                At least 800×800 px recommended.
                                        </p>

                                        <p className="detail">
                                                JPG or PNG is allowed.
                                        </p>
                                </>
                                :
                                null
                        }

                        <p className="cancel" onClick={handleUploading}>
                                { image.type === "other" ?  "cancel" : null }
                                <span className="icon">
                                        <img src={CancelBlackIcon} alt="Save icon" />
                                </span>
                        </p>
                </div>
        ;

        const profileInput = 
                <div className="image-input">
                        { uploading ? upload : value }

                        <p className={`label ${image.type}`} >
                                { image.label }
                        </p>
                </div>
        ;

        const otherInput = 
                <div className="image-input">
                        <p className="label">
                                { image.label }
                        </p>

                        { uploading ? upload : value }
                </div>
        ;

        return ( image.type === "other" ? otherInput : profileInput );
}

export default ImageInput;