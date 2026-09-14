import { getYear } from 'date-fns';
import useQualificationsReducer from '../../../Hooks/useQualificationsReducer';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import '../Styles/QualificationsSection.css';

function Qualification({ qualification }) {
        let IconComponent;

        if (qualification.type === "education") {
                IconComponent = qualification.active ? MenuBookRoundedIcon : SchoolRoundedIcon;
        }
        else {
                IconComponent = qualification.active ? WorkRoundedIcon : WorkspacePremiumRoundedIcon;
        }

        return (
                <div className="qualification">
                        <div className="info">
                                <div className="details">
                                        <p className="discipline">{ qualification.discipline }</p>

                                        <p className="organization">{ qualification.organization }</p>
                                </div>

                                <div className="duration">
                                        <p className="duration">{ `${getYear(qualification.duration.from)} - ${getYear(qualification.duration.to)}` }</p>
                                </div>
                        </div>

                        <div className="description">
                                <p>{ qualification.description }</p>
                        </div>

                        <p className="icon">
                                <IconComponent className="qualification-icon" />
                        </p>
                </div>
        );
}

function QualificationsSection() {
        const { state } = useQualificationsReducer();
        const { qualifications } = state;

        return (
                <div className="qualifications-section">
                        <div className="title">
                                <p>Qualifications</p>
                        </div>

                        <div className="qualifications-message">
                                <p>Here's how my education and experience come together</p>
                        </div>

                        <div className="qualifications">
                                { qualifications.map((qualification) => (<Qualification key={qualification._id} qualification={ qualification } />)) }
                        </div>
                </div>
        );
}

export default QualificationsSection;