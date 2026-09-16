import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useProfileReducer from '../../../../Hooks/useProfileReducer';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { uploadDocument } from '../../../../api/UploadApi';
import { getAssetUrl } from '../../../../Utils/assetUtils';
import '../Styles/ResumeCard.css';

function ResumeCard() {
        const { profile, updateProfile } = useProfileReducer();
        const { resumeLink, firstName } = profile || {};
        const [isUploading, setIsUploading] = useState(false);
        const [uploadProgress, setUploadProgress] = useState(0);
        const [errorMessage, setErrorMessage] = useState('');

        const onDrop = async (acceptedFiles, fileRejections) => {
                setErrorMessage('');
                if (fileRejections && fileRejections.length > 0) {
                        const rej = fileRejections[0];
                        if (rej.errors && rej.errors[0]) {
                                setErrorMessage(rej.errors[0].message);
                        } else {
                                setErrorMessage('Invalid document format. Only PDF, DOC, DOCX up to 15MB are allowed.');
                        }
                        return;
                }

                const file = acceptedFiles[0];
                if (!file) return;

                setIsUploading(true);
                setUploadProgress(0);
                try {
                        const response = await uploadDocument(file, (progress) => {
                                setUploadProgress(progress);
                        });

                        if (response && response.url) {
                                await updateProfile({ resumeLink: response.url });
                        }
                } catch (error) {
                        console.error('Resume upload error:', error);
                        setErrorMessage(
                                error?.response?.data?.message || error?.message || 'Failed to upload resume. Please try again.'
                        );
                } finally {
                        setIsUploading(false);
                }
        };

        const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
                accept: {
                        'application/pdf': ['.pdf'],
                        'application/msword': ['.doc'],
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                        'text/plain': ['.txt'],
                },
                maxSize: 15 * 1024 * 1024, // 15MB
                multiple: false,
                noClick: true,
                onDrop,
        });

        const handleRemoveResume = async () => {
                if (window.confirm('Are you sure you want to remove the resume document?')) {
                        await updateProfile({ resumeLink: '' });
                }
        };

        const resolvedResumeUrl = getAssetUrl(resumeLink);
        const resumeDisplayName = resumeLink
                ? resumeLink.split('/').pop()
                : 'No resume attached';

        return (
                <div className="resume-card" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <h3 className="card-title">Resume / CV Document</h3>

                        {resumeLink ? (
                                <div className="resume-content">
                                        <div className="resume-file-info">
                                                <div className="resume-file-icon">
                                                        <DescriptionOutlinedIcon style={{ fontSize: '1.6rem' }} />
                                                </div>
                                                <div className="resume-file-meta">
                                                        <p className="resume-filename" title={resumeDisplayName}>
                                                                {resumeDisplayName}
                                                        </p>
                                                        <p className="resume-status-badge">Attached & ready for download</p>
                                                </div>
                                        </div>

                                        <div className="resume-actions-row">
                                                <a
                                                        href={resolvedResumeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="resume-action-btn"
                                                >
                                                        <VisibilityOutlinedIcon style={{ fontSize: '1rem' }} />
                                                        <span>Preview</span>
                                                </a>

                                                <a
                                                        href={resolvedResumeUrl}
                                                        download={`${firstName || 'my'}_resume`}
                                                        className="resume-action-btn"
                                                >
                                                        <FileDownloadOutlinedIcon style={{ fontSize: '1rem' }} />
                                                        <span>Download</span>
                                                </a>

                                                <button
                                                        type="button"
                                                        className="resume-action-btn"
                                                        onClick={open}
                                                        disabled={isUploading}
                                                >
                                                        <CloudUploadOutlinedIcon style={{ fontSize: '1rem' }} />
                                                        <span>Replace</span>
                                                </button>

                                                <button
                                                        type="button"
                                                        className="resume-action-btn danger"
                                                        onClick={handleRemoveResume}
                                                        disabled={isUploading}
                                                >
                                                        <DeleteOutlineRoundedIcon style={{ fontSize: '1rem' }} />
                                                        <span>Remove</span>
                                                </button>
                                        </div>
                                </div>
                        ) : null}

                        <div
                                className={`resume-upload-dropzone ${isDragActive ? 'active' : ''}`}
                                onClick={open}
                        >
                                {isUploading ? (
                                        <>
                                                <CircularProgress size={28} />
                                                <p className="dropzone-title">Uploading document... {uploadProgress}%</p>
                                        </>
                                ) : (
                                        <>
                                                <CloudUploadOutlinedIcon className="dropzone-icon" style={{ fontSize: '2.2rem' }} />
                                                <p className="dropzone-title">
                                                        {resumeLink ? 'Click or drag a file here to replace resume' : 'Upload your Resume / CV'}
                                                </p>
                                                <p className="dropzone-hint">Supports PDF, DOC, DOCX (Max 15MB)</p>
                                        </>
                                )}
                        </div>

                        {errorMessage && (
                                <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>
                                        {errorMessage}
                                </p>
                        )}
                </div>
        );
}

export default ResumeCard;
