import { useState, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { ImageWithFallback, parseImageUrl } from '../../../../Utils/imageUtils';
import '../Styles/ImageInput.css';

function ImageInput({ image, value, handleValueChange, edited, handleEdit }) {
	const [uploading, setUploading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [activePreviewIndex, setActivePreviewIndex] = useState(0);

	const isMultiple = Boolean(image.multiple);
	const maxImages = image.maxImages || 10;

	const imagesList = useMemo(() => {
		if (!isMultiple) return [];
		if (Array.isArray(value)) return value;
		if (value) return [value];
		return [];
	}, [isMultiple, value]);

	// Keep active index within bounds
	useEffect(() => {
		if (activePreviewIndex >= imagesList.length && imagesList.length > 0) {
			setActivePreviewIndex(imagesList.length - 1);
		}
	}, [imagesList.length, activePreviewIndex]);

	const onDrop = (acceptedFiles, fileRejections) => {
		setErrorMessage('');
		if (fileRejections && fileRejections.length > 0) {
			setErrorMessage('Invalid image format or size exceeds 5MB.');
			return;
		}

		if (isMultiple) {
			if (!acceptedFiles || acceptedFiles.length === 0) return;
			const remainingSlots = maxImages - imagesList.length;
			if (remainingSlots <= 0) {
				setErrorMessage(`Maximum of ${maxImages} images reached.`);
				return;
			}

			const filesToAdd = acceptedFiles.slice(0, remainingSlots);
			if (acceptedFiles.length > remainingSlots) {
				setErrorMessage(`Only ${remainingSlots} more image(s) could be added (max ${maxImages}).`);
			}

			const newEntries = filesToAdd.map((file) => ({
				file,
				preview: URL.createObjectURL(file),
			}));

			const updated = [...imagesList, ...newEntries];
			handleValueChange(image.name, image.inputType, updated);
			if (handleEdit) {
				handleEdit(image.name, true);
			}
			setUploading(false);
			setActivePreviewIndex(updated.length - 1);
			return;
		}

		// Single image mode
		const file = acceptedFiles[0];
		if (file) {
			const previewUrl = URL.createObjectURL(file);
			handleValueChange(image.name, image.inputType, { file, preview: previewUrl });
			if (handleEdit) {
				handleEdit(image.name, true);
			}
		}
		handleUploading();
	};

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg'] },
		maxSize: 5 * 1024 * 1024,
		multiple: isMultiple,
		noClick: true,
		onDrop,
	});

	const handleUploading = () => {
		setUploading((prev) => !prev);
		setErrorMessage('');
	};

	const handleRemoveImage = (indexToRemove, e) => {
		if (e) e.stopPropagation();
		const updated = imagesList.filter((_, idx) => idx !== indexToRemove);
		handleValueChange(image.name, image.inputType, updated);
		if (handleEdit) {
			handleEdit(image.name, true);
		}
		if (activePreviewIndex >= updated.length) {
			setActivePreviewIndex(Math.max(0, updated.length - 1));
		}
	};

	const upload = (
		<div className={`upload ${image.type}`} {...getRootProps()} style={{ backgroundColor: isDragActive ? "var(--admin-accent-subtle)" : "var(--admin-surface-darkest)", borderColor: isDragActive ? "var(--admin-accent)" : "var(--admin-border-base)" }}>
			<input {...getInputProps()} />

			<p className={`icon upload-icon ${isDragActive ? "drop-active" : ""}`}>
				<CloudUploadOutlinedIcon sx={{ fontSize: image.type === 'other' ? '6vh' : '5vh', color: isDragActive ? 'var(--admin-accent)' : 'var(--admin-text-muted)' }} />
			</p>

			<p className="drag" style={{ color: isDragActive ? "var(--admin-accent)" : "var(--admin-text-primary)" }}>
				{isMultiple ? `Drag and drop up to ${maxImages} pictures` : 'Drag and drop picture'}
			</p>

			{image.type === "other" ? <p className="or">or</p> : null}

			<p className="browse" onClick={open}>
				<span className="icon">
					<FolderOpenOutlinedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
				</span>
				{image.type === "other" ? (isMultiple ? "browse images" : "browse") : null}
			</p>

			{image.type === "other" ? (
				<>
					<p className="detail">JPG, PNG, WEBP allowed (Max 5MB per image).</p>
					{isMultiple && <p className="detail">Up to {maxImages} images supported for slideshow.</p>}
				</>
			) : null}

			{errorMessage ? (
				<p style={{ color: '#ef4444', fontSize: '0.75rem', textAlign: 'center', margin: '4px 0' }}>{errorMessage}</p>
			) : null}

			{(image.type === "other" && (!isMultiple || imagesList.length > 0)) ? (
				<p className="cancel" onClick={handleUploading}>
					cancel
					<span className="icon">
						<CloseRoundedIcon sx={{ fontSize: '1.4vh', color: 'currentColor' }} />
					</span>
				</p>
			) : null}
		</div>
	);

	// Multiple images preview mode
	const multiplePreview = (
		<div className="multiple-image-input-container">
			<div className={`value ${image.type} multiple-value`}>
				{imagesList.length > 0 ? (
					<>
						<ImageWithFallback
							src={parseImageUrl(imagesList[activePreviewIndex] || imagesList[0])}
							className="preview-image"
							fallbackIcon={typeof image.backup === 'function' || (typeof image.backup === 'object' && image.backup !== null) ? image.backup : null}
							fallbackColor="var(--admin-surface-darkest, #151515)"
							iconSize="6vh"
							iconColor="var(--admin-text-muted)"
							alt={`Preview ${activePreviewIndex + 1}`}
						/>

						<div className="multiple-counter-badge">
							{activePreviewIndex + 1} / {imagesList.length} (Max {maxImages})
						</div>

						<div className="upload-button" onClick={handleUploading}>
							<p>
								<span className="icon">
									<AddPhotoAlternateOutlinedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
								</span>
								add more
							</p>
						</div>
					</>
				) : (
					<div className="empty-multiple-preview" onClick={handleUploading}>
						<ImageWithFallback
							src=""
							fallbackIcon={typeof image.backup === 'function' || (typeof image.backup === 'object' && image.backup !== null) ? image.backup : null}
							fallbackColor="var(--admin-surface-darkest, #151515)"
							iconSize="6vh"
							iconColor="var(--admin-text-muted)"
							fallbackText="No images selected yet"
						/>
						<div className="upload-button" onClick={handleUploading}>
							<p>
								<span className="icon">
									<CameraAltOutlinedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
								</span>
								upload images
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Thumbnails strip */}
			{imagesList.length > 0 && (
				<div className="multiple-thumbnails-strip">
					{imagesList.map((imgItem, idx) => (
						<div
							key={idx}
							className={`multiple-thumbnail-item ${idx === activePreviewIndex ? 'active' : ''}`}
							onClick={() => setActivePreviewIndex(idx)}
						>
							<ImageWithFallback
								src={parseImageUrl(imgItem)}
								alt={`Thumbnail ${idx + 1}`}
								fallbackColor="var(--admin-surface-darkest, #151515)"
							/>
							<button
								type="button"
								className="multiple-thumbnail-remove"
								onClick={(e) => handleRemoveImage(idx, e)}
								title="Remove image"
							>
								<CloseRoundedIcon sx={{ fontSize: '12px' }} />
							</button>
						</div>
					))}

					{imagesList.length < maxImages && (
						<button
							type="button"
							className="multiple-add-thumbnail"
							onClick={handleUploading}
							title="Add more images"
						>
							<AddPhotoAlternateOutlinedIcon sx={{ fontSize: '20px' }} />
							<span>+ Add</span>
						</button>
					)}
				</div>
			)}
		</div>
	);

	// Single image preview
	const imgSrc = parseImageUrl(value);
	const singlePreview = (
		<div className={`value ${image.type}`}>
			<ImageWithFallback 
				src={imgSrc} 
				className="preview-image"
				fallbackImage={typeof image.backup === 'string' ? image.backup : null}
				fallbackIcon={typeof image.backup === 'function' || (typeof image.backup === 'object' && image.backup !== null) ? image.backup : null}
				fallbackColor="var(--admin-surface-darkest, #151515)"
				iconSize={image.type === 'profile' ? '8vh' : '6vh'}
				iconColor="var(--admin-text-muted)"
				alt="Preview"
			/>

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

	const preview = isMultiple ? multiplePreview : singlePreview;

	const profileInput = (
		<div className="image-input">
			{uploading ? upload : preview}
			<p className={`label ${image.type}`}>
				{image.label}
				<span className={edited ? "edited" : ""}></span>
			</p>
		</div>
	);

	const otherInput = (
		<div className="image-input">
			<p className="label">
				{image.label}
				<span className={edited ? "edited" : ""}></span>
			</p>
			{uploading ? upload : preview}
		</div>
	);

	return (image.type === "other" ? otherInput : profileInput);
}

export default ImageInput;