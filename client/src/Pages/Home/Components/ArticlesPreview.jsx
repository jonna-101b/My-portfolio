import { Link } from 'react-router-dom';
import { articles } from './Trial';
import GoToIcon from '../../../assets/Icons/Home/right-arrow with a line.png';
import '../Styles/ArticlesPreview.css';


function Article({ article }) {
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
                <div className="article">
                        <div className="main-content">
                                <div className="title">
                                        <p>{ article.title }</p>
                                </div>

                                <div className="intro-text">
                                        <p>{ article.introText }</p>
                                </div>

                                <div className="tags">
                                        { article.tags.map((tag, index) => (<p className="tag" style={{color: colors[index]}}>{ tag }</p>))}
                                </div>

                                <div className="description">
                                        <p>{ article.description }</p>
                                </div>

                                <div className="links">
                                        { article.links.map((link, index) => (<button className="link">{ link.title }</button>)) }
                                </div>
                        </div>

                        <div className="sub-content">
                                <p className='image'>
                                        <img src={ article.image } alt="Article image" />
                                </p>

                                <div className="info">
                                        <p className="author">
                                                Author: { article.author }
                                        </p>

                                        <p className="date">
                                                Date: { article.datePublished }
                                        </p>
                                </div>
                        </div>
                </div>
        );
}

function ArticlesPreview() {
        return (
                <div className="articles-preview">
                        <div className="main-title">
                                <p>Featured articles</p>
                        </div>

                        <div className="articles-message">
                                <p>Collected thoughts on work, creativity and beyond!</p>
                        </div>

                        <div className="articles">
                                { articles.map((article) => (<Article article={ article }/>)) }
                        </div>

                        <div className="more">
                                <Link className="button" to="/articles">
                                        View more articles
                                        <img src={ GoToIcon } alt="Go to icon" />
                                </Link>
                        </div>
                </div>
        );
}

export default ArticlesPreview;