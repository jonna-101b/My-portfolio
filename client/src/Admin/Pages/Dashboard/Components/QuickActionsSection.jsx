import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewContext } from '../../../Components/New/Context/NewContext';
import { technicalForm, conceptualForm  } from '../../Skills/Components/Form';
import qualificationsForm from '../../Qualifications/Components/Form';
import projectsForm from '../../Projects/Components/Form';
import testimonialsForm from '../../Testimonials/Components/Form';
import articlesForm from '../../Articles/Components/Form';
import AddIcon from '../../../../assets/Icons/Admin/Common/add.png';
import '../Styles/QuickActionsSection.css';


const Action = ({ action, color }) => {
        const { setNew } = useContext(NewContext);
        const navigate = useNavigate();

        const handleClick = () => {
                navigate(`/admin/${action.route}`);
                setTimeout(() => {
                        setNew(action.form());
                }, 500);
        };

        return (
                <div className="action" onClick={handleClick} >
                        <p className="icon"  >
                                <img src={AddIcon} alt="Add icon" />
                        </p>

                        <p className="text">New {action.name}</p>
                </div>
        );
};

function QuickActionsSection() {
        const actions = [
                { name: "tech skill", form: technicalForm, route: "skills" }, 
                { name: "concept skill", form: conceptualForm, route: "skills" }, 
                { name: "qualification", form: qualificationsForm, route: "qualifications" }, 
                { name: "project", form: projectsForm, route: "projects" }, 
                { name: "testimonial", form: testimonialsForm, route: "testimonials" }, 
                { name: "article", form: articlesForm, route: "articles" }, 
        ];
        
        const colors = [
                "#B64687", // magenta-pink
                "#FF9257", // peach-orange
                "#66FA72", // neon green
                "#51A3A3", // teal
                "#6C5DD3", // soft indigo-violet
                "#FCD34D",  // soft yellow
                "#4DD0E1", // sky cyan
                "#FF6B81", // coral red
                "#A3E635", // lime chartreuse
                "#38BDF8", // light blue
        ];

        return (
                <div className="quick-actions-section">
                        <p className="title">Quick actions</p>
                        
                        {actions.map((action, index) => (
                                <Action key={index} action={action} color={colors[index % 8]} />
                        ))}
                </div>
        );
}

export default QuickActionsSection;