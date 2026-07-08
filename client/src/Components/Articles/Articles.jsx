import { useState, useEffect, use } from 'react';
import useArticlesReducer from '../../Hooks/useArticlesReducer';
import './Articles.css';


function PreviewedArticle({ article, ref }) {
        return (
                <div className="previewed-article" ref={ref} >
                        <div className='image'>
                                <img src={ article.image } alt="Article image" />

                                <p className="author">
                                        { article.author }
                                </p>
                        </div>

                        <div className="main-content">
                                <div className="title">
                                        <p>{ article.title }</p>
                                </div>

                                <div className="intro">
                                        <p>{ article.intro }</p>
                                </div>

                                <div className="tags">
                                        { article.tags.map((tag, index) => (<p className="tag" key={index} >{ tag }</p>))}
                                </div>

                                <div className="description">
                                        <p>{ article.description }</p>
                                </div>

                                <div className="links">
                                        { article.links.map((link, index) => (<a href={link.url} target="_blank" key={index} >{ link.title }</a>)) }
                                </div>
                        </div>
                </div>
        );
}

function ArticleCard({ article }) {
        return (
                <div className="article-card">
                        <p className="image">
                                <img src={ article.image } alt="Article image" />
                        </p>

                        <div className="content">
                                <p className="title">{ article.title }</p>

                                <p className="intro">{ article.intro }</p>

                                <div className="tags">
                                        { article.tags.map((tag, index) => (<p className="tag" key={index} >{ tag }</p>))}
                                </div>
                                
                                <p className="author">{ article.author }</p>
                        </div>
                </div>
        );
}

function ArticlesSection() {
        const { state } = useArticlesReducer();
        const [ articles, setArticles ] = useState(state.articles);
        const [ previewedArticle, setPreviewedArticle ] = useState(state.articles[0] || null);
        const previewedArticleRef = useState(null);
        const [ height, setHeight ] = useState(0);

        useEffect(() => {
                setArticles(state.articles);
                setPreviewedArticle(state.articles[0] || null);

                if (previewedArticleRef.current) {
                        setHeight(previewedArticleRef.current.scrollHeight);
                }
        }, [state.articles]);

        return (
                <div className="articles-section">
                        <div className="main-title">
                                <p>Featured articles</p>
                        </div>

                        <div className="articles-message">
                                <p>Collected thoughts on work, creativity and beyond!</p>
                        </div>

                        <div className="articles" >
                                <PreviewedArticle article={ previewedArticle } ref={previewedArticleRef} />

                                <div className="more-articles" style={{ height: `calc(${height}px)` }} >
                                        { articles.map((article, index) => (<ArticleCard key={index} article={article} />)) }
                                </div>
                        </div>

                </div>
        );
}

export default ArticlesSection;