import { Link } from 'react-router-dom';
import { blogs } from './Trial';
import GoToIcon from '../../../assets/Icons/Home/right-arrow with a line.png';
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

        return (
                <div className="blog">
                        <div className="main-content">
                                <div className="title">
                                        <p>{ blog.title }</p>
                                </div>

                                <div className="intro-text">
                                        <p>{ blog.introText }</p>
                                </div>

                                <div className="tags">
                                        { blog.tags.map((tag, index) => (<p className="tag" style={{color: colors[index]}}>{ tag }</p>))}
                                </div>

                                <div className="description">
                                        <p>{ blog.description }</p>
                                </div>

                                <div className="links">
                                        { blog.links.map((link, index) => (<button className="link">{ link.title }</button>)) }
                                </div>
                        </div>

                        <div className="sub-content">
                                <p className='image'>
                                        <img src={ blog.image } alt="Blog image" />
                                </p>

                                <div className="info">
                                        <p className="author">
                                                Author: { blog.author }
                                        </p>

                                        <p className="date">
                                                Date: { blog.datePublished }
                                        </p>
                                </div>
                        </div>
                </div>
        );
}

function BlogsPreview() {
        return (
                <div className="blogs-preview">
                        <div className="main-title">
                                <p>Featured blogs</p>
                        </div>

                        <div className="blogs-message">
                                <p>Collected thoughts on work, creativity and beyond!</p>
                        </div>

                        <div className="blogs">
                                { blogs.map((blog) => (<Blog blog={ blog }/>)) }
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