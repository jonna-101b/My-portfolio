import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../../Contexts/ThemeContext';
import useTestimonialsReducer from '../../../Hooks/useTestimonialsReducer';
import TestimonialsPreviewSkeleton from '../../../Components/Skeletons/TestimonialsPreviewSkeleton';
import { getInitials } from '../../../Utils/avatarUtils';
import QuoteShadowIcon from '../../../assets/Icons/Common/quote-shadow.png';
import QuoteLightShadowIcon from '../../../assets/Icons/Common/quote-light.png';
import "../Styles/TestimonialsPreview.css";

function Testimonial({ testimonial }) {
	const { theme } = useContext(ThemeContext);
	const [imgError, setImgError] = useState(false);

	const hasValidImage = testimonial?.picture && !imgError;

	return (
		<div className="testimonial">
			<p className="shadow">
				<img src={theme === 'dark' ? QuoteShadowIcon : QuoteLightShadowIcon} alt="Quote shadow icon" />
			</p>

			<div className="info">
				<div className="image">
					{hasValidImage ? (
						<img 
							src={ testimonial.picture } 
							alt={ testimonial.name || "Testimonial author" }
							onError={() => setImgError(true)}
						/>
					) : (
						<span className="avatar-initials">{ getInitials(testimonial?.name) }</span>
					)}
				</div>

				<div className="details">
					<p className="name">{ testimonial.name }</p>

					<p className="position">{ testimonial.company ? `${testimonial.position} at ` + testimonial.company : testimonial.position}</p>
				</div>
			</div>

			<div className="testimony">
				<p>{ testimonial.testimony }</p>
			</div>
		</div>
	);
}

function TestimonialsPreview() {
	const { state, loading } = useTestimonialsReducer();
	const [ testimonials, setTestimonials ] = useState(state.testimonials);
	const testimonialsRef = useRef(null);
	
	const [ visibleCount, setVisibleCount ] = useState(3);
	const [ currentIndex, setCurrentIndex ] = useState(1);

	const updateVisibleCount = () => {
		if (typeof window === 'undefined') return;
		if (window.innerWidth < 680) {
			setVisibleCount(1);
		} else if (window.innerWidth < 1024) {
			setVisibleCount(2);
		} else {
			setVisibleCount(3);
		}
	};

	useEffect(() => {
		updateVisibleCount();
		window.addEventListener('resize', updateVisibleCount);
		return () => window.removeEventListener('resize', updateVisibleCount);
	}, []);

	const maxIndex = Math.max(1, (testimonials?.length || 0) - visibleCount + 1);
	const pagination = Array.from({ length: maxIndex }, (_, i) => i + 1);

	const slideTo = (index) => {
		if (!testimonialsRef.current) return;
		const safeIndex = Math.max(1, Math.min(index, maxIndex));
		const children = testimonialsRef.current.children;
		if (children && children[safeIndex - 1] && children[0]) {
			const offset = children[safeIndex - 1].offsetLeft - children[0].offsetLeft;
			testimonialsRef.current.style.transform = `translateX(-${offset}px)`;
		}
		setCurrentIndex(safeIndex);
	};

	const handleTestimonialsSlide = (newIndex) => {
		if (currentIndex !== newIndex) {
			slideTo(newIndex);
		}
	};

	useEffect(() => {
		setTestimonials(state.testimonials);
		slideTo(1);
	}, [state.testimonials, visibleCount]);

	if (loading) {
		return <TestimonialsPreviewSkeleton />;
	}

	if (!Array.isArray(testimonials) || testimonials.length === 0) {
		return null;
	}

	return (
		<div className="testimonials-preview">
			<div className="title">
				<p>Testimonials</p>
			</div>

			<div className="testimonials-message">
				<p>Don't Just Take My Word For It — See What Others Have to Say</p>
			</div>

			<div className="testimonials">
				<div className="wrapper" ref={testimonialsRef} >
					{ testimonials.map((testimonial, index) => (
						<Testimonial key={testimonial._id || index} testimonial={ testimonial } />
					)) }
				</div>
			</div>

			{pagination.length > 1 && (
				<div className="pagination">
					{ pagination.map((index) => (
						<p 
							className={currentIndex === index ? "focused" : ""} 
							key={index} 
							onClick={() => handleTestimonialsSlide(index)}
							aria-label={`Go to slide ${index}`}
						/>
					)) }
				</div>
			)}
		</div>
	);
}

export default TestimonialsPreview;