import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import useActivitiesReducer from "../../../../Hooks/useActivitiesReducer";
import { AdminActivitySkeleton } from "../../../../Components/Skeletons/AdminSkeletons";

// MUI Icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

import "../Styles/RecentActivitySection.css";

function RecentActivitySection() {
        const { state } = useActivitiesReducer();
        const loading = state?.loading;
        const rawActivities = state?.activities || [];

        // Predefined or mapped actions matching design style
        const recentActions = useMemo(() => {
                if (rawActivities.length > 0) {
                        return rawActivities.slice(0, 5).map((act, index) => {
                                let icon = <EditOutlinedIcon fontSize="small" />;
                                let highlight = act.destination || "Portfolio";
                                let actionType = act.action || "Updated";

                                const lower = (actionType + " " + highlight).toLowerCase();
                                if (lower.includes("blog") || lower.includes("article")) {
                                        icon = <ArticleOutlinedIcon fontSize="small" />;
                                } else if (lower.includes("skill")) {
                                        icon = <StarOutlineOutlinedIcon fontSize="small" />;
                                } else if (lower.includes("contact") || lower.includes("testimonial") || lower.includes("user")) {
                                        icon = <PersonAddOutlinedIcon fontSize="small" />;
                                } else if (lower.includes("system") || lower.includes("setting")) {
                                        icon = <AutorenewOutlinedIcon fontSize="small" />;
                                }

                                let timeAgo = "Recently";
                                try {
                                        if (act.date) {
                                                timeAgo = formatDistanceToNow(new Date(act.date), { addSuffix: true }).toUpperCase();
                                        }
                                } catch {
                                        timeAgo = "RECENTLY";
                                }

                                return {
                                        id: act._id || index,
                                        actionType: actionType.charAt(0).toUpperCase() + actionType.slice(1),
                                        highlight: `"${highlight}"`,
                                        suffix: "content",
                                        time: timeAgo,
                                        icon
                                };
                        });
                }

                return [];
        }, [rawActivities]);

        if (loading) {
                return <AdminActivitySkeleton />;
        }

        return (
                <div className="recent-actions-card">
                        <div className="recent-actions-header">
                                <h3 className="recent-actions-title">Recent actions</h3>
                        </div>

                        <div className="actions-list">
                                {recentActions.length > 0 ? (
                                        recentActions.map((action) => (
                                                <div key={action.id} className="action-row">
                                                        <div className="action-icon-circle">
                                                                {action.icon}
                                                        </div>

                                                        <div className="action-details">
                                                                <p className="action-text">
                                                                        <span className="action-verb">{action.actionType} </span>
                                                                        {action.highlight && (
                                                                                <span className="action-highlight">{action.highlight} </span>
                                                                        )}
                                                                        {action.suffix && (
                                                                                <span className="action-suffix">{action.suffix}</span>
                                                                        )}
                                                                </p>
                                                                <span className="action-timestamp">{action.time}</span>
                                                        </div>
                                                </div>
                                        ))
                                ) : (
                                        <p style={{ color: "var(--admin-text-dim)", fontSize: "0.85rem", padding: "16px 0", textAlign: "center" }}>
                                                No recent activity recorded yet.
                                        </p>
                                )}
                        </div>

                        <button 
                                type="button" 
                                className="view-all-activity-btn"
                                onClick={() => window.dispatchEvent(new CustomEvent('open-admin-activities'))}
                        >
                                VIEW ALL ACTIVITY
                        </button>
                </div>
        );
}

export default RecentActivitySection;
