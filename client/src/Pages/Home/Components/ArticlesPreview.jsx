import { Link } from 'react-router-dom';
import useBlogReducer from '../../../Hooks/useBlogReducer';
import GoToIcon from '../../../assets/Icons/Home/right-arrow with a line.png';
import { getAssetUrl } from '../../../Utils/assetUtils';
import '../Styles/ArticlesPreview.css';

function Blog({ blog }) {
        const colors = [
        "#33FFF5", // aqua
        "#FF5733", // fiery red-orange
        "#FFD733", // gold
        "#33FF57", // bright green
        "#FF3380", // rose pink
        "#FF3333", // bright red
        "#3357FF", // vivid blue
        "#A133FF", // purple
        "#FF8633", // orange
        "#8DFF33", // lime green
        "#FF33A1", // hot pink
        "#33FFB5", // mint
        "#33A1FF", // sky blue
        "#FFB533", // amber
        "#DA33FF", // magenta
        "#33FF8A", // seafoam
        "#3366FF", // bold blue
        "#B8FF33", // neon yellow-green
        "#FF9933", // tangerine
        "#33D4FF"  // electric cyan
        ];

        const tags = Array.isArray(blog?.tags) ? blog.tags : [];
        const links = Array.isArray(blog?.links) ? blog.links : [];

        return (
                <div className="blog">
                        <div className="main-content">
                                <div className="title">
                                        <p>{ blog?.title }</p>
                                </div>

                                <div className="intro-text">
                                        <p>{ blog?.introText || blog?.subtitle || blog?.intro }</p>
                                </div>

                                <div className="tags">
                                        { tags.map((tag, index) => (
                                                <p key={index} className="tag" style={{ color: colors[index % colors.length] }}>
                                                        { tag }
                                                </p>
                                        )) }
                                </div>

                                <div className="description">
                                        <p>{ blog?.description || blog?.content }</p>
                                </div>

                                <div className="links">
                                        { links.map((link, index) => (
                                                <button key={index} className="link" type="button">
                                                        { link.title }
                                                </button>
                                        )) }
                                </div>
                        </div>

                        <div className="sub-content">
                                { blog?.image && (
                                        <p className="image">
                                                <img src={ getAssetUrl(blog.image) } alt={ blog.title || "Blog cover" } />
                                        </p>
                                ) }

                                <div className="info">
                                        <p className="author">
                                                Author: { blog?.author || 'Author' }
                                        </p>

                                        { blog?.createdAt && (
                                                <p className="date">
                                                        Date: { new Date(blog.createdAt).toLocaleDateString() }
                                                </p>
                                        ) }
                                </div>
                        </div>
                </div>
        );
}

function BlogsPreview() {
        const { state } = useBlogReducer();
        const blogs = state?.blogs || [];

        if (!blogs.length) return null;

        return (
                <div className="blogs-preview">
                        <div className="main-title">
                                <p>Featured blogs</p>
                        </div>

                        <div className="blogs-message">
                                <p>Collected thoughts on work, creativity and beyond!</p>
                        </div>

                        <div className="blogs">
                                { blogs.map((blog, index) => (
                                        <Blog key={blog._id || index} blog={ blog }/>
                                )) }
                        </div>

                        <div className="more">
                                <Link className="button" to="/blogs">
                                        View more blogs
                                        <img src={ GoToIcon } alt="Go to icon" />
                                </Link>
                        </div>
                </div>
        );
}

export default BlogsPreview;