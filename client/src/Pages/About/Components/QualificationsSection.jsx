import { getYear } from 'date-fns';
import useQualificationsReducer from '../../../Hooks/useQualificationsReducer';
import BookIcon from '../../../assets/Icons/About/open-book.png';
import BookHoverIcon from '../../../assets/Icons/About/open-book-hover.png';
import MortarboardIcon from '../../../assets/Icons/About/mortarboard.png';
import MortarboardHoverIcon from '../../../assets/Icons/About/mortarboard-hover.png';
import BriefcaseIcon from '../../../assets/Icons/About/briefcase.png';
import BriefcaseHoverIcon from '../../../assets/Icons/About/briefcase-hover.png';
import ExpertiseIcon from '../../../assets/Icons/About/certificate.png';
import ExpertiseHoverIcon from '../../../assets/Icons/About/certificate-hover.png';
import '../Styles/QualificationsSection.css';

function Qualification({ qualification }) {
        let icon, hoverIcon;

        if (qualification.type === "education") {
                [ icon, hoverIcon ] = qualification.active ? [ BookIcon, BookHoverIcon ] : [ MortarboardIcon, MortarboardHoverIcon];
        }
        else {
                [ icon, hoverIcon ] = qualification.active ? [ BriefcaseIcon, BriefcaseHoverIcon ] : [ ExpertiseIcon, ExpertiseHoverIcon ];
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
                                <img src={ icon } alt="Qualifications icon" />
                                <img src={ hoverIcon } alt="Qualifications icon" className="hover" />
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