import TornTape from '../../../assets/Icons/About/torn-.png';
import useProfileReducer from '../../../Hooks/useProfileReducer';
import '../Styles/MainSection.css';

function MainSection() {
        const { profile } = useProfileReducer();
        const { picture, firstName, lastName, nickName, description } = profile;

        return (
                <div className="main-section">
                        <div className="picture">
                                <p className="tape">
                                        <img src={TornTape} alt="Torn tape" />
                                </p>

                                <p className="profile-picture">
                                        <img src={ picture } alt="Profile picture" />
                                </p>

                                <p className="name">{ `${firstName} ${lastName}` }</p>
                        </div>

                        <div className="description">
                                <p className="intro">{ `Hi there! ${nickName} here` }</p>

                                <p className="details">{ description.detailed }</p>
                        </div>

                </div>
        );
}

export default MainSection;