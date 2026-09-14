import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewContext } from '../../../Components/New/Context/NewContext';
import { technicalForm } from '../../Skills/Components/Form';
import qualificationsForm from '../../Qualifications/Components/Form';
import projectsForm from '../../Projects/Components/Form';
import blogForm from '../../Blog/Components/Form';

// MUI Icons
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

import '../Styles/QuickActionsSection.css';

function QuickActionsSection() {
        const { setNew } = useContext(NewContext);
        const navigate = useNavigate();

        const actions = [
                {
                        id: 'project',
                        title: 'New Project',
                        route: 'projects',
                        form: projectsForm,
                        icon: <AddBoxOutlinedIcon className="action-mui-icon" />
                },
                {
                        id: 'blog',
                        title: 'Write Blog',
                        route: 'blog',
                        form: blogForm,
                        icon: <EditNoteOutlinedIcon className="action-mui-icon" />
                },
                {
                        id: 'skill',
                        title: 'New Skill',
                        route: 'skills',
                        form: technicalForm,
                        icon: <InsightsOutlinedIcon className="action-mui-icon" />
                },
                {
                        id: 'qualification',
                        title: 'Add Qualification',
                        route: 'qualifications',
                        form: qualificationsForm,
                        icon: <SchoolOutlinedIcon className="action-mui-icon" />
                }
        ];

        const handleActionClick = (action) => {
                navigate(`/admin/${action.route}`);
                setTimeout(() => {
                        if (typeof action.form === 'function') {
                                setNew(action.form());
                        }
                }, 400);
        };

        return (
                <div className="quick-actions-container">
                        <h3 className="quick-actions-heading">Quick actions</h3>

                        <div className="quick-actions-grid">
                                {actions.map((action) => (
                                        <button
                                                key={action.id}
                                                type="button"
                                                className="quick-action-card"
                                                onClick={() => handleActionClick(action)}
                                        >
                                                <div className="action-icon-box">
                                                        {action.icon}
                                                </div>
                                                <span className="action-label">{action.title}</span>
                                        </button>
                                ))}
                        </div>
                </div>
        );
}

export default QuickActionsSection;