import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { uploadImage } from '../../../../../api/UploadApi';
import { getAssetUrl } from '../../../../../Utils/assetUtils';
import '../Styles/ImageInput.css';

function ImageUploadModal({ isOpen, onClose, onSave, title = "Update Image", currentImage, type = "profile" }) {
        const [preview, setPreview] = useState(getAssetUrl(currentImage) || null);
        const [selectedFile, setSelectedFile] = useState(null);
        const [isUploading, setIsUploading] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        useEffect(() => {
                if (isOpen) {
                        setPreview(getAssetUrl(currentImage) || null);
                        setSelectedFile(null);
                        setErrorMessage('');
                        setIsUploading(false);
                }
        }, [isOpen, currentImage]);

        const onDrop = (acceptedFiles, fileRejections) => {
                setErrorMessage('');
                if (fileRejections && fileRejections.length > 0) {
                        const rejection = fileRejections[0];
                        if (rejection.errors && rejection.errors[0]) {
                                setErrorMessage(rejection.errors[0].message);
                        } else {
                                setErrorMessage('Invalid file. Only JPG, PNG, WEBP, GIF, SVG up to 5MB are allowed.');
                        }
                        return;
                }

                const file = acceptedFiles[0];
                if (file) {
                        setSelectedFile(file);
                        setPreview(URL.createObjectURL(file));
                }
        };

        const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
                accept: {
                        'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg']
                },
                maxSize: 5 * 1024 * 1024, // 5MB
                multiple: false,
                noClick: true,
                onDrop,
        });

        if (!isOpen) return null;

        const handleDone = async () => {
                if (selectedFile) {
                        setIsUploading(true);
                        setErrorMessage('');
                        try {
                                const response = await uploadImage(selectedFile);
                                if (response && response.url) {
                                        await onSave(response.url);
                                }
                                onClose();
                        } catch (error) {
                                console.error('Image upload failed:', error);
                                setErrorMessage(error?.response?.data?.message || error?.message || 'Failed to upload image. Please try again.');
                        } finally {
                                setIsUploading(false);
                        }
                } else {
                        // User didn't change the file, or removed it
                        if (onSave) {
                                await onSave(preview);
                        }
                        onClose();
                }
        };

        const handleRemove = () => {
                setPreview(null);
                setSelectedFile(null);
                setErrorMessage('');
                if (onSave) {
                        onSave('');
                }
        };

        return (
                <div className="image-modal-overlay" onClick={isUploading ? undefined : onClose}>
                        <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="image-modal-header">
                                        <h3 className="modal-title">{title}</h3>
                                        <button type="button" className="close-btn" onClick={onClose} disabled={isUploading}>
                                                <CloseRoundedIcon style={{ fontSize: '1.25rem' }} />
                                        </button>
                                </div>

                                <div
                                        className={`dropzone-area ${isDragActive ? "active" : ""}`}
                                        {...getRootProps()}
                                >
                                        <input {...getInputProps()} />

                                        {preview ? (
                                                <div className="preview-container">
                                                        <img src={preview} alt="Preview" className={`preview-img ${type}`} />
                                                        <button 
                                                                type="button" 
                                                                className="remove-preview-btn" 
                                                                onClick={handleRemove} 
                                                                title="Remove image"
                                                                disabled={isUploading}
                                                        >
                                                                <DeleteOutlineRoundedIcon style={{ fontSize: '1.1rem' }} />
                                                        </button>
                                                </div>
                                        ) : (
                                                <div className="dropzone-placeholder">
                                                        <CloudUploadOutlinedIcon className="upload-icon" style={{ fontSize: '3rem' }} />
                                                        <p className="drag-text">Drag & drop your picture here</p>
                                                        <p className="or-text">or</p>
                                                </div>
                                        )}

                                        <button type="button" className="browse-btn" onClick={open} disabled={isUploading}>
                                                <FolderOpenOutlinedIcon style={{ fontSize: '1.2rem' }} />
                                                <span>Browse Files</span>
                                        </button>

                                        <p className="upload-tip">Supports JPG, PNG, WEBP, SVG (Max 5MB)</p>

                                        {errorMessage && (
                                                <p className="upload-error-msg" style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', textAlign: 'center' }}>
                                                        {errorMessage}
                                                </p>
                                        )}
                                </div>

                                <div className="image-modal-actions">
                                        <button type="button" className="cancel-btn" onClick={onClose} disabled={isUploading}>
                                                <CloseRoundedIcon style={{ fontSize: '1.1rem' }} />
                                                <span>Cancel</span>
                                        </button>
                                        <button type="button" className="save-btn" onClick={handleDone} disabled={isUploading}>
                                                {isUploading ? (
                                                        <>
                                                                <CircularProgress size={16} color="inherit" />
                                                                <span>Uploading...</span>
                                                        </>
                                                ) : (
                                                        <>
                                                                <CheckRoundedIcon style={{ fontSize: '1.1rem' }} />
                                                                <span>Save</span>
                                                        </>
                                                )}
                                        </button>
                                </div>
                        </div>
                </div>
        );
}

export default ImageUploadModal;
