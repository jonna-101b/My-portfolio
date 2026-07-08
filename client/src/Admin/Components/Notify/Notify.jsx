import { useState, useContext, useEffect } from "react";
import './Notify.css';


function isEmptyObject(obj) {
        if (typeof obj !== "object" || obj === null) return false;

        return Object.keys(obj).length === 0;
}

function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
}

function Notify({ NotifyContext }) {
        const { action, setAction } = useContext(NotifyContext);
        const [ message, setMessage ] = useState("");
        const [ color, setColor ] = useState("");
        const [ component, setComponent ] = useState("");

        const actions = {
                "add": { message: (component) => ( `You have successfully added a ${component}!` ), color: "#c6ff00"},
                "edit": { message: (component) => ( `You have successfully edited a ${component}!` ), color: "#3861BE"},
                "delete": { message: (component) => ( `${capitalizeFirstLetter(component)} is moved to trash!` ), color: "#ff3d00"},
        };

        useEffect(() => {
                if (!isEmptyObject(action)) {
                        setMessage(actions[action.type].message(action.component));
                        setColor(actions[action.type].color);
                        setComponent(action.component);

                        const timer = setTimeout(() => {
                                setAction({});
                        }, 3000);
                        return () => clearTimeout(timer);
                }
        }, [action]);

        return (
                <div className={`notify ${isEmptyObject(action) ? "" : "active"}`} style={{ backgroundColor: color}} >
                        { message }
                </div>
        );
}

export default Notify;