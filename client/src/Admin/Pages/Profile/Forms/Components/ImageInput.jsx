import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import '../Styles/ImageInput.css';
import useProfileReducer from '../../../../../Hooks/useProfileReducer';
import { uploadImage } from '../../../../../api/UploadApi';
import { getAssetUrl } from '../../../../../Utils/assetUtils';

function ImageInput({ image }) {
	const { updateProfile } = useProfileReducer();
	const [preview, setPreview] = useState(image.image || null);
	const [uploading, setUploading] = useState(false);
	const [isServerUploading, setIsServerUploading] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const onDrop = async (acceptedFiles, fileRejections) => {
		setErrorMessage('');
		if (fileRejections && fileRejections.length > 0) {
			setErrorMessage('Invalid file. JPG, PNG, WEBP, SVG up to 5MB allowed.');
			return;
		}

		const file = acceptedFiles[0];
		if (file) {
			setIsServerUploading(true);
			try {
				const response = await uploadImage(file);
				if (response && response.url) {
					setPreview(response.url);
					await updateProfile({ [image.name]: response.url });
					setImageError(false);
					setUploading(false);
				}
			} catch (error) {
				console.error('Image upload failed:', error);
				setErrorMessage(error?.response?.data?.message || 'Failed to upload image.');
			} finally {
				setIsServerUploading(false);
			}
		}
	};

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg'] },
		maxSize: 5 * 1024 * 1024,
		multiple: false,
		noClick: true,
		onDrop,
	});

	const handleUploading = () => {
		if (isServerUploading) return;
		setUploading((prev) => !prev);
		setErrorMessage('');
	};

	const handleImageError = (bool) => {
		setImageError(bool);
	};

	useEffect(() => {
		setPreview(image.image);
	}, [image.image]);

	const displayUrl = getAssetUrl(preview);

	const value = (
		<div className={`value ${image.type}`}>
			{imageError || !displayUrl ? (
				typeof image.backup === 'function' || (typeof image.backup === 'object' && image.backup !== null) ? (
					<image.backup sx={{ fontSize: image.type === 'profile' ? '8vh' : '6vh', color: 'var(--admin-text-muted)', placeSelf: 'center' }} />
				) : (
					<img src={getAssetUrl(image.backup)} className="preview-image backup" alt="Preview backup" />
				)
			) : (
				<img src={displayUrl} className="preview-image" onError={() => { handleImageError(true); }} alt="Preview" />
			)}

			<div className="upload-button" onClick={handleUploading} >
				<p>
					<span className="icon">
						<CameraAltOutlinedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
					</span>
					{image.type === "other" ? "upload image" : null}
				</p>
			</div>
		</div>
	);

	const upload = (
		<div className={`upload ${image.type}`} {...getRootProps()} style={{ backgroundColor: isDragActive ? "var(--admin-accent-subtle)" : "transparent", borderColor: isDragActive ? "var(--admin-accent)" : "var(--admin-text-primary)" }}>
			<input {...getInputProps()} />

			{isServerUploading ? (
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
					<CircularProgress size={30} />
					<p className="drag">Uploading to server...</p>
				</div>
			) : (
				<>
					<p className={`icon upload-icon ${isDragActive ? "drop-active" : ""}`}>
						<CloudUploadOutlinedIcon sx={{ fontSize: image.type === 'other' ? '6vh' : '5vh', color: isDragActive ? 'var(--admin-accent)' : 'var(--admin-text-muted)' }} />
					</p>

					<p className="drag" style={{ color: isDragActive ? "var(--admin-accent)" : "var(--admin-text-primary)" }} >Drag and drop picture</p>

					{image.type === "other" ? <p className="or">or</p> : null}

					<p className="browse" onClick={open}>
						<span className="icon">
							<FolderOpenOutlinedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
						</span>
						{image.type === "other" ? "browse" : null}
					</p>

					{image.type === "other" ? (
						<>
							<p className="detail">At least 800×800 px recommended.</p>
							<p className="detail">JPG, PNG, WEBP allowed (Max 5MB).</p>
						</>
					) : null}

					{errorMessage ? (
						<p style={{ color: '#ef4444', fontSize: '0.75rem', textAlign: 'center', margin: '4px 0' }}>{errorMessage}</p>
					) : null}

					<p className="cancel" onClick={handleUploading}>
						{image.type === "other" ? "cancel" : null}
						<span className="icon">
							<CloseRoundedIcon sx={{ fontSize: '1.4vh', color: 'currentColor' }} />
						</span>
					</p>
				</>
			)}
		</div>
	);

	const profileInput = (
		<div className="image-input">
			{uploading ? upload : value}
			<p className={`label ${image.type}`}>
				{image.label}
			</p>
		</div>
	);

	const otherInput = (
		<div className="image-input">
			<p className="label">
				{image.label}
			</p>
			{uploading ? upload : value}
		</div>
	);

	return (image.type === "other" ? otherInput : profileInput);
}

export default ImageInput;