import { useEffect, useMemo, useState } from 'react';
import useBlogReducer from '../../Hooks/useBlogReducer';
import './Blog.css';


function BlogTags({ tags }) {
        if (!Array.isArray(tags) || tags.length === 0) {
                return null;
        }

        return (
                <div className="blog-tags">
                        { tags.map((tag, index) => (<p className="tag" key={index}>{ tag }</p>)) }
                </div>
        );
}

function BlogMedia({ blog }) {
        const videoUrl = blog?.videoUrl || blog?.video || null;
        const hasVideo = typeof videoUrl === 'string' && videoUrl.trim().length > 0;
        const isEmbeddedVideo = hasVideo && /youtube|youtu\.be|vimeo/i.test(videoUrl);

        return (
                <div className="blog-media">
                        <div className="hero-bar" aria-hidden="true">
                                <p className="hero-label">Celestial Blog Redesign</p>

                                <div className="hero-chips">
                                        <span>AI</span>
                                        <span>Dark Mode</span>
                                </div>
                        </div>

                        { blog?.image && (
                                <div className="image">
                                        <img src={blog.image} alt={blog.title || 'Blog cover image'} />

                                        <p className="author">
                                                { blog.author || 'Unknown author' }
                                        </p>
                                </div>
                        ) }

                        { hasVideo && (
                                <div className="video">
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
                        ) }
                </div>
        );
}

function BlogRatingCard() {
        const stars = [true, true, true, true, false];

        return (
                <section className="blog-rating-card" aria-label="Portfolio rating preview">
                        <p className="rating-kicker">Rate this Portfolio</p>

                        <p className="rating-copy">
                                Let me know what you think of my work. Your feedback helps me improve.
                        </p>

                        <div className="rating-stars" aria-label="Four out of five stars">
                                { stars.map((filled, index) => (
                                        <span key={index} aria-hidden="true" className={filled ? 'filled' : 'empty'}>
                                                {filled ? '★' : '☆'}
                                        </span>
                                )) }
                        </div>

                        <div className="rating-scale" aria-hidden="true">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                        </div>

                        <button type="button" className="rating-button">
                                Submit Feedback
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
                        <div className="header">
                                <p className="main-title">{ blog.title }</p>
                                <p className="subtitle">{ subtitle }</p>

                                <div className="meta">
                                        <p>{ blog.author || 'Unknown author' }</p>
                                        <p>{ new Date(blog.createdAt || Date.now()).toLocaleDateString() }</p>
                                </div>
                        </div>

                        <BlogTags tags={blog.tags} />

                        <div className="description">
                                { paragraphs.length > 0
                                        ? paragraphs.map((paragraph, index) => (<p key={index}>{ paragraph }</p>))
                                        : <p>No description available yet.</p> }
                        </div>

                        { links.length > 0 && (
                                <div className="links">
                                        { links.map((link, index) => (
                                                <a href={link.url} target="_blank" rel="noreferrer" key={index}>
                                                        { link.title }
                                                </a>
                                        )) }
                                </div>
                        ) }
                </div>
        );
}

function PreviousBlogCard({ blog, onSelect, focused }) {
        return (
                <button className={`blog-card ${focused ? 'focused' : ''}`} onClick={onSelect}>
                        <p className="image">
                                <img src={blog.image} alt={blog.title || 'Blog thumbnail'} />
                        </p>

                        <div className="content">
                                <p className="title">{ blog.title }</p>

                                <p className="date">{ new Date(blog.createdAt || Date.now()).toLocaleDateString() }</p>

                                <p className="preview">{ blog.intro || blog.subtitle || 'Open to read more.' }</p>
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

                const cardsToShow = Math.min(previousBlogs.length, 4);
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
                <section className="blog-section">
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
                                        <div className="sidebar-title">
                                                <p>Recent Stories</p>

                                                <p className="sidebar-action">See all</p>
                                        </div>

                                        <div className={`previous-blogs ${isRotating ? 'rotating' : ''}`}>
                                                { visiblePreviousBlogs.map((blog, index) => (
                                                        <PreviousBlogCard
                                                                key={blog._id || index}
                                                                blog={blog}
                                                                onSelect={() => setSelectedBlogId(blog._id)}
                                                                focused={index === 0}
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