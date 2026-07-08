import { useContext } from 'react';
import { ViewContext } from '../Contexts/ViewContext';
import '../Styles/View.css';


function Wrapper({ testimonial }) {
        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation() }}>
                        <div className="container">
                                <div className="info">
                                        <div className="image">
                                                <img src={ testimonial.picture } alt="" />
                                        </div>

                                        <div className="details">
                                                <p className="name">{ testimonial.name }</p>

                                                <p className="position">{ testimonial.company ? `${testimonial.position} at ` + testimonial.company : testimonial.position}</p>
                                        </div>
                                </div>

                                <div className="testimony">
                                        <p>{ testimonial.testimony }</p>
                                </div>  

                                <div className="email" >
                                        { testimonial.email }
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
                        { isEmptyObject(view) ? "" : <Wrapper testimonial={view} /> }      
                </div>
        );
}

export default View;