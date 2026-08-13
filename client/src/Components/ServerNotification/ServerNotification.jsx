import { useContext, useState, useEffect } from "react";
import { ProjectsContext } from "../../Contexts/ProjectsContext";
import { ProfileContext } from "../../Contexts/ProfileContext";
import { TechnicalSkillsContext } from "../../Contexts/TechnicalSkillsContext";
import { ConceptualSkillsContext } from "../../Contexts/ConceptualSkillsContext";
import { QualificationsContext } from "../../Contexts/QualificationsContext";
import { TestimonialsContext } from "../../Contexts/TestimonialsContext";
import { BlogContext } from "../../Contexts/BlogContext";
import "./ServerNotification.css";

function ServerNotification() {
        const projectsState = useContext(ProjectsContext)?.state;
        const profileState = useContext(ProfileContext)?.state;
        const technicalSkillsState = useContext(TechnicalSkillsContext)?.state;
        const conceptualSkillsState = useContext(ConceptualSkillsContext)?.state;
        const qualificationsState = useContext(QualificationsContext)?.state;
        const testimonialsState = useContext(TestimonialsContext)?.state;
        const blogState = useContext(BlogContext)?.state;

        const [dismissed, setDismissed] = useState(false);

        // Find any active error from public contexts
        const activeError = 
                projectsState?.error ||
                profileState?.error ||
                technicalSkillsState?.error ||
                conceptualSkillsState?.error ||
                qualificationsState?.error ||
                testimonialsState?.error ||
                blogState?.error;

        // Reset dismissed flag if a new error occurs
        useEffect(() => {
                if (activeError) {
                        setDismissed(false);
                }
        }, [activeError]);

        if (!activeError || dismissed) {
                return null;
        }

        const errorMessage = typeof activeError === "object" && activeError?.message
                ? activeError.message
                : "Unable to connect to the backend server. Displaying cached portfolio content.";

        return (
                <aside 
                        className="server-notification"
                        role="alert"
                        aria-live="polite"
                >
                        <div className="server-notification-content">
                                <div className="server-notification-icon" aria-hidden="true">
                                        ⚠️
                                </div>
                                <div className="server-notification-text">
                                        <p className="server-notification-title">Server Connection Notice</p>
                                        <p className="server-notification-desc">{errorMessage}</p>
                                </div>
                        </div>
                        <button 
                                className="server-notification-dismiss"
                                onClick={() => setDismissed(true)}
                                aria-label="Dismiss server notification"
                                type="button"
                        >
                                ✕
                        </button>
                </aside>
        );
}

export default ServerNotification;
