import { useState, useContext, useEffect } from "react";
import './Notify.css';

function isEmptyObject(obj) {
        if (typeof obj !== "object" || obj === null) return false;
        return Object.keys(obj).length === 0;
}

function capitalizeFirstLetter(str) {
        if (!str || typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
}

function Notify({ NotifyContext }) {
        const { action, setAction } = useContext(NotifyContext);
        const [message, setMessage] = useState("");
        const [color, setColor] = useState("");
        const [textColor, setTextColor] = useState("#0b0d0e");

        const actions = {
                "add": { 
                        message: (comp, msg) => msg || `You have successfully added a ${comp}!`, 
                        color: "var(--admin-accent)",
                        textColor: "var(--admin-text-ink)"
                },
                "edit": { 
                        message: (comp, msg) => msg || `You have successfully edited a ${comp}!`, 
                        color: "var(--admin-info)",
                        textColor: "var(--admin-text-white)"
                },
                "delete": { 
                        message: (comp, msg) => msg || `${capitalizeFirstLetter(comp)} is moved to trash!`, 
                        color: "var(--admin-danger)",
                        textColor: "var(--admin-text-white)"
                },
                "error": { 
                        message: (comp, msg) => msg || `Failed to process ${comp || 'request'}. Server issue occurred!`, 
                        color: "var(--admin-danger-bright)",
                        textColor: "var(--admin-text-white)"
                },
        };

        useEffect(() => {
                if (!isEmptyObject(action) && action.type) {
                        const actionConfig = actions[action.type] || actions["error"];
                        const resolvedMessage = typeof action.message === "string" && action.message.length > 0
                                ? action.message
                                : (typeof actionConfig.message === "function" ? actionConfig.message(action.component, action.message) : "Notification");

                        setMessage(resolvedMessage);
                        setColor(action.color || actionConfig.color);
                        setTextColor(action.textColor || actionConfig.textColor || "#ffffff");

                        const timer = setTimeout(() => {
                                setAction({});
                        }, 4000);
                        return () => clearTimeout(timer);
                }
        }, [action, setAction]);

        return (
                <div 
                        className={`notify ${isEmptyObject(action) ? "" : "active"}`} 
                        style={{ backgroundColor: color, color: textColor }}
                        role="alert"
                        aria-live="polite"
                >
                        {message}
                </div>
        );
}

export default Notify;