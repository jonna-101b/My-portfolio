import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { getAssetUrl } from '../../../../Utils/assetUtils';
import '../Styles/ImageInput.css';

function ImageInput({ image, value, handleValueChange, added, handleAdd }) {
	const [ uploading, setUploading ] = useState(false);
	const [ imageError, setImageError ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState('');

	const onDrop = (acceptedFiles, fileRejections) => {
		setErrorMessage('');
		if (fileRejections && fileRejections.length > 0) {
			setErrorMessage('Invalid image format or size exceeds 5MB.');
			return;
		}

		const file = acceptedFiles[0];
		if (file) {
			const previewUrl = URL.createObjectURL(file);
			handleValueChange(image.name, image.inputType, { file, preview: previewUrl });
			setImageError(false);
			if (handleAdd) {
				handleAdd(image.name, true);
			}
		}
		handleUploading();
	};

	const hasValue = Boolean(
		value && (
			(typeof value === 'object' && (value.file || value.preview)) ||
			(typeof value === 'string' && value.trim().length > 0)
		)
	);

	useEffect(() => {
		if (image.required && handleAdd) {
			handleAdd(image.name, hasValue && !imageError);
		}
	}, [hasValue, imageError]);

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg'] },
		maxSize: 5 * 1024 * 1024,
		multiple: false,
		noClick: true,
		onDrop,
	});

	const handleUploading = () => {
		setUploading((prev) => !prev);
		setErrorMessage('');
	};

	const handleImageError = (bool) => {
		setImageError(bool);
	};

	// Determine image source
	const imgSrc = typeof value === 'object' && value !== null && value.preview
		? value.preview
		: (typeof value === 'string' && value ? getAssetUrl(value) : null);

	const preview = (
		<div className={`value ${image.type}`}>
			{ imageError || !imgSrc ? (
				typeof image.backup === 'function' || (typeof image.backup === 'object' && image.backup !== null) ? (
					<image.backup sx={{ fontSize: image.type === 'profile' ? '8vh' : '6vh', color: 'var(--admin-text-muted)', placeSelf: 'center' }} />
				) : (
					<img src={getAssetUrl(image.backup)} className="preview-image backup" alt="Preview backup" />
				)
			) : (
				<img src={imgSrc} className="preview-image" onError={() => { handleImageError(true); }} alt="Preview" />
			)}

			<div className="upload-button" onClick={handleUploading} >
				<p>
					<span className="icon">
						<CameraAltOutlinedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
					</span>
					{ image.type === "other" ? "upload image" : null}
				</p>
			</div>
		</div>
	);

	const upload = (
		<div className={`upload ${image.type}`} {...getRootProps()} style={{ backgroundColor: isDragActive ? "var(--admin-accent-subtle)" : "var(--admin-surface-darkest)", borderColor: isDragActive ? "var(--admin-accent)" : "var(--admin-border-base)" }}>
			<input {...getInputProps()} />

			<p className={`icon upload-icon ${isDragActive ? "drop-active" : ""}`}>
				<CloudUploadOutlinedIcon sx={{ fontSize: image.type === 'other' ? '6vh' : '5vh', color: isDragActive ? 'var(--admin-accent)' : 'var(--admin-text-muted)' }} />
			</p>

			<p className="drag" style={{ color: isDragActive ? "var(--admin-accent)" : "var(--admin-text-primary)" }} >Drag and drop picture</p>

			{ image.type === "other" ? <p className="or">or</p> : null }

			<p className="browse" onClick={open}>
				<span className="icon">
					<FolderOpenOutlinedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
				</span>
				{ image.type === "other" ? "browse" : null }
			</p>

			{ image.type === "other" ? (
				<>
					<p className="detail">At least 800×800 px recommended.</p>
					<p className="detail">JPG, PNG, WEBP allowed (Max 5MB).</p>
				</>
			) : null}

			{errorMessage ? (
				<p style={{ color: '#ef4444', fontSize: '0.75rem', textAlign: 'center', margin: '4px 0' }}>{errorMessage}</p>
			) : null}

			<p className="cancel" onClick={handleUploading}>
				{ image.type === "other" ? "cancel" : null }
				<span className="icon">
					<CloseRoundedIcon sx={{ fontSize: '1.4vh', color: 'currentColor' }} />
				</span>
			</p>
		</div>
	);

        const profileInput = (
                <div className="image-input">
                        { uploading ? upload : preview }
                        <p className={`label ${image.type}`} >
                                { image.label }
                                { image.required ? <span className={`add-state ${added ? "added" : ""}`}></span> : null }
                        </p>
                </div>
        );

        const otherInput = (
                <div className="image-input">
                        <p className="label">
                                { image.label }
                                { image.required ? <span className={`add-state ${added ? "added" : ""}`}></span> : null }
                        </p>
                        { uploading ? upload : preview }
                </div>
        );

        return ( image.type === "other" ? otherInput : profileInput );
}

export default ImageInput;