import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import '../Styles/ImageInput.css';

function ImageUploadModal({ isOpen, onClose, onSave, title = "Update Image", currentImage, type = "profile" }) {
        const [preview, setPreview] = useState(currentImage || null);
        const [selectedFile, setSelectedFile] = useState(null);

        const onDrop = (acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file) {
                        setSelectedFile(file);
                        setPreview(URL.createObjectURL(file));
                }
        };

        const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
                accept: { 'image/*': [] },
                multiple: false,
                noClick: true,
                onDrop,
        });

        if (!isOpen) return null;

        const handleDone = () => {
                if (preview) {
                        onSave(preview);
                }
                onClose();
        };

        const handleRemove = () => {
                setPreview(null);
                setSelectedFile(null);
                onSave(null);
        };

        return (
                <div className="image-modal-overlay" onClick={onClose}>
                        <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="image-modal-header">
                                        <h3 className="modal-title">{title}</h3>
                                        <button type="button" className="close-btn" onClick={onClose}>
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
                                                        <button type="button" className="remove-preview-btn" onClick={handleRemove} title="Remove image">
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

                                        <button type="button" className="browse-btn" onClick={open}>
                                                <FolderOpenOutlinedIcon style={{ fontSize: '1.2rem' }} />
                                                <span>Browse Files</span>
                                        </button>

                                        <p className="upload-tip">Supports JPG, PNG, WEBP (Max 5MB)</p>
                                </div>

                                <div className="image-modal-actions">
                                        <button type="button" className="cancel-btn" onClick={onClose}>
                                                <CloseRoundedIcon style={{ fontSize: '1.1rem' }} />
                                                <span>Cancel</span>
                                        </button>
                                        <button type="button" className="save-btn" onClick={handleDone}>
                                                <CheckRoundedIcon style={{ fontSize: '1.1rem' }} />
                                                <span>Save</span>
                                        </button>
                                </div>
                        </div>
                </div>
        );
}

export default ImageUploadModal;
