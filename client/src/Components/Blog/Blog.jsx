import { useEffect, useMemo, useState } from 'react';
import useBlogReducer from '../../Hooks/useBlogReducer';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import './Blog.css';

function getInitials(name) {
	if (!name || typeof name !== 'string') return 'J';
	const parts = name.trim().split(/\s+/);
	if (parts.length >= 2) {
		return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
	}
	return name.slice(0, 2).toUpperCase();
}

function formatFeaturedDate(dateValue) {
	if (!dateValue) return 'JAN-10, 2023';
	try {
		const date = new Date(dateValue);
		if (isNaN(date.getTime())) return 'JAN-10, 2023';
		const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
		const month = monthNames[date.getMonth()];
		const day = String(date.getDate()).padStart(2, '0');
		const year = date.getFullYear();
		return `${month}-${day}, ${year}`;
	} catch {
		return 'JAN-10, 2023';
	}
}

function formatStoryDate(dateValue) {
	if (!dateValue) return 'June 15th, 2024';
	try {
		const date = new Date(dateValue);
		if (isNaN(date.getTime())) return 'June 15th, 2024';
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'long' });
		const year = date.getFullYear();
		const suffix = (d) => {
			if (d > 3 && d < 21) return 'th';
			switch (d % 10) {
				case 1: return 'st';
				case 2: return 'nd';
				case 3: return 'rd';
				default: return 'th';
			}
		};
		return `${month} ${day}${suffix(day)}, ${year}`;
	} catch {
		return 'June 15th, 2024';
	}
}

function BlogTags({ tags }) {
	if (!Array.isArray(tags) || tags.length === 0) {
		return null;
	}

	return (
		<div className="blog-tags">
			{ tags.map((tag, index) => (
				<span className="tag-pill" key={index}>{ tag }</span>
			)) }
		</div>
	);
}

function BlogMedia({ blog }) {
	const videoUrl = blog?.videoUrl || blog?.video || null;
	const hasVideo = typeof videoUrl === 'string' && videoUrl.trim().length > 0;
	const isEmbeddedVideo = hasVideo && /youtube|youtu\.be|vimeo/i.test(videoUrl);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		setImageError(false);
	}, [blog?.image]);

	const hasImage = Boolean(blog?.image) && !imageError;

	return (
		<div className="blog-media">
			{ hasVideo ? (
				<div className="video-container">
					{ isEmbeddedVideo ? (
						<iframe
							src={videoUrl}
							title={blog.title || 'Embedded blog video'}
							loading="lazy"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					) : (
						<video src={videoUrl} controls preload="metadata" />
					) }
				</div>
			) : (
				<div className="image-container">
					{ hasImage ? (
						<img
							src={blog.image}
							alt={blog.title || 'Blog cover image'}
							onError={() => setImageError(true)}
							loading="lazy"
						/>
					) : (
						<div className="image-placeholder">
							<ArticleRoundedIcon className="placeholder-icon" />
							<p className="placeholder-text">Story Cover • {blog?.title || 'Featured Article'}</p>
						</div>
					) }

					<div className="author-badge">
						<span className="author-name">{ blog?.author || 'Jane Doe' }</span>
					</div>
				</div>
			) }
		</div>
	);
}

function BlogRatingCard() {
	const [selectedRating, setSelectedRating] = useState(4);
	const [hoverRating, setHoverRating] = useState(null);
	const [submitted, setSubmitted] = useState(false);

	const currentRating = hoverRating !== null ? hoverRating : selectedRating;

	const handleRatingClick = (rate) => {
		setSelectedRating(rate);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
		setTimeout(() => setSubmitted(false), 3000);
	};

	return (
		<section className="blog-rating-card" aria-label="Portfolio rating preview">
			<h4 className="rating-heading">How Would Your Rate Your Experience?</h4>

			<div
				className="rating-stars"
				role="radiogroup"
				aria-label={`Rating: ${selectedRating} out of 5 stars`}
				onMouseLeave={() => setHoverRating(null)}
			>
				{ [1, 2, 3, 4, 5].map((starValue) => {
					const isFilled = starValue <= currentRating;
					return (
						<button
							key={starValue}
							type="button"
							className={`star-btn ${isFilled ? 'filled' : 'empty'}`}
							onClick={() => handleRatingClick(starValue)}
							onMouseEnter={() => setHoverRating(starValue)}
							aria-label={`${starValue} star`}
						>
							{ isFilled ? (
								<StarRoundedIcon className="star-icon" />
							) : (
								<StarOutlineRoundedIcon className="star-icon" />
							) }
						</button>
					);
				}) }
			</div>

			<p className="rating-subtitle">
				{ submitted ? 'Thank you for your feedback!' : 'Your feedback matters!' }
			</p>

			<hr className="rating-divider" />

			<button
				type="button"
				className={`rating-submit-btn ${submitted ? 'submitted' : ''}`}
				onClick={handleSubmit}
			>
				{ submitted ? 'Feedback Submitted ✓' : 'Submit Feedback' }
			</button>
		</section>
	);
}

function BlogContent({ blog }) {
	if (!blog) {
		return null;
	}

	const subtitle = blog.subtitle || blog.intro || 'Thoughts from the build process';
	const paragraphs = (blog.content || blog.description || '').split(/\n+/).filter(Boolean);
	const links = Array.isArray(blog.links) ? blog.links : [];

	return (
		<div className="blog-content">
			<h2 className="article-title">{ blog.title }</h2>

			<p className="article-highlight">{ subtitle }</p>

			<p className="article-date">{ formatFeaturedDate(blog.createdAt) }</p>

			<BlogTags tags={blog.tags} />

			<div className="article-description">
				{ paragraphs.length > 0
					? paragraphs.map((paragraph, index) => (<p key={index}>{ paragraph }</p>))
					: <p>This article explores ideas, architecture, and technology innovations shaping our industry.</p> }
			</div>

			{ links.length > 0 ? (
				<div className="article-actions">
					{ links.map((link, index) => (
						<a
							href={link.url}
							target="_blank"
							rel="noreferrer"
							key={index}
							className={`btn-action ${index === 0 ? 'btn-primary' : 'btn-secondary'}`}
						>
							{ link.title }
						</a>
					)) }
				</div>
			) : (
				<div className="article-actions">
					<button type="button" className="btn-action btn-primary">
						Read Article
					</button>
					<button type="button" className="btn-action btn-secondary">
						Explore More
					</button>
				</div>
			) }
		</div>
	);
}

function PreviousBlogCard({ blog, onSelect, focused }) {
	const [thumbError, setThumbError] = useState(false);

	useEffect(() => {
		setThumbError(false);
	}, [blog.image]);

	const hasThumb = Boolean(blog.image) && !thumbError;
	const tags = Array.isArray(blog.tags) ? blog.tags.slice(0, 3) : ['AI', 'Technology', 'Future'];

	return (
		<button
			type="button"
			className={`recent-story-card ${focused ? 'focused' : ''}`}
			onClick={onSelect}
			aria-label={`Select blog: ${blog.title}`}
		>
			<div className="story-thumbnail">
				{ hasThumb ? (
					<img
						src={blog.image}
						alt={blog.title || 'Blog thumbnail'}
						onError={() => setThumbError(true)}
						loading="lazy"
					/>
				) : (
					<div className="thumbnail-fallback">
						<MenuBookRoundedIcon className="fallback-icon" />
					</div>
				) }
			</div>

			<div className="story-info">
				<p className="story-title">{ blog.title }</p>

				<div className="story-tags">
					{ tags.map((tag, index) => (
						<span className="story-tag" key={index}>{ tag }</span>
					)) }
				</div>

				<div className="story-meta">
					<span className="author-avatar">{ getInitials(blog.author) }</span>
					<span className="author-name">{ blog.author || 'Jonna' }</span>
					<span className="meta-dot">•</span>
					<span className="story-date">{ formatStoryDate(blog.createdAt) }</span>
				</div>
			</div>
		</button>
	);
}

function BlogSection() {
	const { state } = useBlogReducer();
	const [blogs, setBlogs] = useState(state.blogs);
	const [selectedBlogId, setSelectedBlogId] = useState(state.blogs[0]?._id || null);
	const [sidebarStart, setSidebarStart] = useState(0);
	const [isRotating, setIsRotating] = useState(false);

	useEffect(() => {
		setBlogs(state.blogs);
		setSelectedBlogId((currentSelectedBlogId) => {
			if (state.blogs.some((blog) => blog._id === currentSelectedBlogId)) {
				return currentSelectedBlogId;
			}

			return state.blogs[0]?._id || null;
		});
		setSidebarStart(0);
	}, [state.blogs]);

	const selectedBlog = useMemo(
		() => blogs.find((blog) => blog._id === selectedBlogId) || blogs[0] || null,
		[blogs, selectedBlogId]
	);

	const previousBlogs = useMemo(
		() => blogs.filter((blog) => blog._id !== selectedBlog?._id),
		[blogs, selectedBlog]
	);

	const visiblePreviousBlogs = useMemo(() => {
		if (previousBlogs.length === 0) {
			return [];
		}

		const cardsToShow = Math.min(previousBlogs.length, 3);
		return Array.from({ length: cardsToShow }, (_, index) => {
			const rotatedIndex = (sidebarStart + index) % previousBlogs.length;
			return previousBlogs[rotatedIndex];
		});
	}, [previousBlogs, sidebarStart]);

	useEffect(() => {
		if (previousBlogs.length < 2) {
			return undefined;
		}

		const intervalId = window.setInterval(() => {
			setIsRotating(true);

			window.setTimeout(() => {
				setSidebarStart((currentStart) => (currentStart + 1) % previousBlogs.length);
				setIsRotating(false);
			}, 220);
		}, 30000);

		return () => window.clearInterval(intervalId);
	}, [previousBlogs.length]);

	return (
		<section className="blog-section" id="blogs">
			<div className="main-title">
				<p>Featured Stories</p>
			</div>

			<div className="blog-message">
				<p>Field Notes From Shipping Products and Ideas</p>
			</div>

			<div className="blog-layout">
				<article className="main-blog">
					<BlogMedia blog={selectedBlog} />
					<BlogContent blog={selectedBlog} />
				</article>

				<aside className="blog-sidebar">
					<div className="sidebar-header">
						<h3 className="sidebar-title">Recent Stories</h3>
					</div>

					<div className={`previous-blogs ${isRotating ? 'rotating' : ''}`}>
						{ visiblePreviousBlogs.map((blog, index) => (
							<PreviousBlogCard
								key={blog._id || index}
								blog={blog}
								onSelect={() => setSelectedBlogId(blog._id)}
								focused={selectedBlogId === blog._id}
							/>
						)) }
					</div>

					<BlogRatingCard />
				</aside>
			</div>
		</section>
	);
}

export default BlogSection;