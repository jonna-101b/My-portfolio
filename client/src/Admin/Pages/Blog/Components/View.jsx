import { useContext } from 'react';
import { ViewContext } from '../Contexts/ViewContext';
import '../Styles/View.css';


function Wrapper({ blog }) {
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
                <div className="wrapper" onClick={(e) => { e.stopPropagation() }}>
                        <div className="container">
                                <p className="title">{ blog.title }</p>
 
                                <div className="image">
                                        <img src={ blog.image } alt="Blog image" />
                                        <p className="author">{ blog.author }</p>
                                </div>

                                <div className="tags">
                                        { blog.tags.map((tag, index) => (<p key={index} style={{ color: colors[index % colors.length] }}>{ tag }</p>)) }
                                </div>
 
                                <p className="intro">{ blog.intro }</p>

                                <p className="description">{ blog.description }</p>

                                <div className="links">
                                        { blog.links.map((link, index) => (<button key={index} >{ link.title }</button>)) }
                                </div>
                        </div>
                </div>
        );
}

function isEmptyObject(obj) {
        if (typeof obj !== "object" || obj === null) return false;
  
        return Object.keys(obj).length === 0;
}

function View() {
        const { view, setView } = useContext(ViewContext);

        const handleDisplay = () => {
                setView({});
        };

        return (
                <div className={`view ${isEmptyObject(view) ?  "" : "active" }`} onClick={handleDisplay} >
                        { isEmptyObject(view) ? "" : <Wrapper blog={view} /> }      
                </div>
        );
}

export default View;