import React, { useState, useEffect, useMemo } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { ImageWithFallback } from '../../Utils/imageUtils';
import './BlogImageSlideshow.css';

/**
 * Image slideshow component that supports single and multiple images (up to 10).
 * If a single image is passed, renders normally without sliding effects.
 * If multiple images are passed, animates smoothly by counter with auto-advance and controls.
 */
export default function BlogImageSlideshow({
	images,
	alt = 'Blog image',
	fallbackIcon,
	fallbackText,
	fallbackColor,
	className = '',
	intervalMs = 3500,
	children,
}) {
	const normalizedImages = useMemo(() => {
		if (!images) return [];
		if (Array.isArray(images)) {
			return images.filter((img) => Boolean(img));
		}
		if (typeof images === 'string' && images.trim().length > 0) {
			return [images.trim()];
		}
		if (typeof images === 'object') {
			return [images];
		}
		return [];
	}, [images]);

	const [counter, setCounter] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const total = normalizedImages.length;

	// Reset/clamp counter if image count changes
	useEffect(() => {
		if (counter >= total && total > 0) {
			setCounter(0);
		}
	}, [total, counter]);

	// Auto-sliding interval counter effect
	useEffect(() => {
		if (total <= 1 || isPaused) return;

		const timer = setInterval(() => {
			setCounter((prev) => (prev + 1) % total);
		}, intervalMs);

		return () => clearInterval(timer);
	}, [total, isPaused, intervalMs]);

	// Single image or empty state (no sliding effect needed)
	if (total <= 1) {
		const singleSrc = total === 1 ? normalizedImages[0] : null;

		return (
			<div className={`blog-slideshow-container single-image ${className}`.trim()}>
				<ImageWithFallback
					src={singleSrc}
					alt={alt}
					loading="lazy"
					fallbackIcon={fallbackIcon}
					fallbackText={fallbackText}
					fallbackColor={fallbackColor}
				/>
				{children}
			</div>
		);
	}

	// Multiple images: sliding slideshow controlled by counter
	return (
		<div
			className={`blog-slideshow-container multiple-images ${className}`.trim()}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			<div
				className="blog-slideshow-track"
				style={{
					transform: `translateX(-${counter * 100}%)`,
				}}
			>
				{normalizedImages.map((imgSrc, index) => (
					<div className="blog-slideshow-slide" key={index}>
						<ImageWithFallback
							src={imgSrc}
							alt={`${alt} • Slide ${index + 1}`}
							loading="lazy"
							fallbackIcon={fallbackIcon}
							fallbackText={fallbackText}
							fallbackColor={fallbackColor}
						/>
					</div>
				))}
			</div>

			{/* Arrow navigation */}
			<button
				type="button"
				className="slideshow-arrow arrow-prev"
				onClick={(e) => {
					e.stopPropagation();
					setCounter((prev) => (prev === 0 ? total - 1 : prev - 1));
				}}
				aria-label="Previous image"
			>
				<ChevronLeftRoundedIcon />
			</button>

			<button
				type="button"
				className="slideshow-arrow arrow-next"
				onClick={(e) => {
					e.stopPropagation();
					setCounter((prev) => (prev + 1) % total);
				}}
				aria-label="Next image"
			>
				<ChevronRightRoundedIcon />
			</button>

			{/* Bottom indicators and counter */}
			<div className="slideshow-footer-overlay">
				<div className="slideshow-indicators">
					{normalizedImages.map((_, idx) => (
						<button
							key={idx}
							type="button"
							className={`indicator-dot ${idx === counter ? 'active' : ''}`}
							onClick={(e) => {
								e.stopPropagation();
								setCounter(idx);
							}}
							aria-label={`Go to image ${idx + 1}`}
						/>
					))}
				</div>

				<span className="slideshow-counter">
					{counter + 1} / {total}
				</span>
			</div>

			{children}
		</div>
	);
}
