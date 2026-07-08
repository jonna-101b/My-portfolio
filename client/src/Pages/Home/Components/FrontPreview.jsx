import useProfileReducer from "../../../Hooks/useProfileReducer";
import CoolGuyCoding from "../../../assets/Images/Home/Cool guy coding.svg";
import CodeIcon from "../../../assets/Icons/Home/is-less-than.png";
import SlashIcon from "../../../assets/Icons/Home/slash.png";
import BriefcaseIcon from '../../../assets/Icons/Home/briefcase.png';
import DownloadIcon from '../../../assets/Icons/Home/downloads.png';
import '../Styles/FrontPreview.css';


function Profession( profession ) {
        const parts = profession.profession.split(" ");
        const result = 
                <p>
                        { `${parts.slice(0, parts.length - 1).join(" ") } `}
                        <span>{ parts[parts.length - 1] }</span>
                        { profession.more ? "|" : null }
                </p>

        return result;
};

function FrontPage() {
        const { profile } = useProfileReducer();
        const { firstName, lastName, professions, bio, availability, hireMe, resumeLink } = profile;

        return (
                <div className="front-preview">
                        <div className="name">
                                <img src={CodeIcon} alt="" className="code-open" />

                                <p>
                                        Hi, my name is <span>{ `${firstName} ${lastName}` }</span>
                                </p>

                                <img src={SlashIcon} alt="" className="slash" />
                                
                                <img src={CodeIcon} alt="" className="code-close" />
                        </div>

                        <div className="professions">
                                { professions.map((profession, index) => (
                                        <Profession key={index} profession={profession} more={index !== professions.length-1  } />
                                )) }
                        </div>

                        <div className="hero-text">
                                <p>{ bio }</p>
                        </div>

                        <div className="links">
                                { availability ?
                                        <a className="hire-me" href={hireMe} target="_blank" >
                                                Hire me
                                                <img src={ BriefcaseIcon } alt="Briefcase" />
                                        </a>
                                        :
                                        null
                                }

                                <a className="resume" href={resumeLink} download={`${firstName}'s resume`} >
                                        Download resume
                                        <img src={ DownloadIcon } alt="DownloadIcon" />
                                </a>
                        </div>

                        <div className="front-image">
                                <img src={CoolGuyCoding} alt="A cool guy coding" />
                        </div>
                </div>
        );
}

export default FrontPage;