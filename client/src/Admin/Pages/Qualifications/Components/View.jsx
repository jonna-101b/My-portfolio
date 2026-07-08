import { useContext } from 'react';
import { ViewContext } from '../Contexts/ViewContext';
import { getYear } from 'date-fns';
import '../Styles/View.css';


function Wrapper({ qualification }) {
        return (
                <div className="wrapper" onClick={(e) => { e.stopPropagation() }}>
                        <div className="container">
                                <div className="info">
                                        <div className="details">
                                                <p className="discipline">
                                                        { qualification.discipline }
                                                        <span className="type">
                                                                { qualification.type }
                                                        </span>
                                                </p>

                                                <p className="organization">{ qualification.organization }</p>
                                        </div>

                                        <div className="duration">{ `${getYear(qualification.duration.from)} - ${getYear(qualification.duration.to)}` }</div>
                                </div>

                                <div className="description">
                                        <p>{ qualification.description }</p>
                                </div>

                                { qualification.active ? <p className="active">Active</p> : "" }
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
                        { isEmptyObject(view) ? "" : <Wrapper qualification={view} /> }      
                </div>
        );
}

export default View;