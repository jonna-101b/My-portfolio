import { useMemo } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import useActivitiesReducer from "../../../../Hooks/useActivitiesReducer";

// MUI Icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';

import "../Styles/RecentActivitySection.css";

function RecentActivitySection() {
        const { state } = useActivitiesReducer();
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

                // Fallback realistic actions matching the reference design image
                return [
                        {
                                id: 1,
                                actionType: "Updated",
                                highlight: '"Cyberpunk Interface"',
                                suffix: "project",
                                time: "2 HOURS AGO",
                                icon: <EditOutlinedIcon fontSize="small" />
                        },
                        {
                                id: 2,
                                actionType: "Published blog post",
                                highlight: '"The Future of WebGL"',
                                suffix: "",
                                time: "YESTERDAY, 4:30 PM",
                                icon: <ArticleOutlinedIcon fontSize="small" />
                        },
                        {
                                id: 3,
                                actionType: "New inquiry from",
                                highlight: "SpaceX Design Team",
                                suffix: "",
                                time: "OCT 24, 2023",
                                icon: <PersonAddOutlinedIcon fontSize="small" />
                        },
                        {
                                id: 4,
                                actionType: "Added new skill",
                                highlight: '"Three.js Master"',
                                suffix: "",
                                time: "OCT 22, 2023",
                                icon: <StarOutlineOutlinedIcon fontSize="small" />
                        },
                        {
                                id: 5,
                                actionType: "System maintenance completed",
                                highlight: "",
                                suffix: "",
                                time: "OCT 20, 2023",
                                icon: <AutorenewOutlinedIcon fontSize="small" />
                        }
                ];
        }, [rawActivities]);

        return (
                <div className="recent-actions-card">
                        <div className="recent-actions-header">
                                <h3 className="recent-actions-title">Recent actions</h3>
                        </div>

                        <div className="actions-list">
                                {recentActions.map((action) => (
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
                                ))}
                        </div>

                        <Link to="/admin/settings/privacy-&-security" className="view-all-activity-btn">
                                VIEW ALL ACTIVITY
                        </Link>
                </div>
        );
}

export default RecentActivitySection;
