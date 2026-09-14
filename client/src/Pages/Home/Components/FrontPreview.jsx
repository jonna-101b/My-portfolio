import { useContext } from "react";
import { ThemeContext } from "../../../Contexts/ThemeContext";
import useProfileReducer from "../../../Hooks/useProfileReducer";
import CoolGuyCoding from "../../../assets/Images/Home/Cool guy coding.svg";
import CoolGuyCodingLight from "../../../assets/Images/Home/Cool guy coding-light.svg";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { createSvgIcon } from '@mui/material/utils';
import '../Styles/FrontPreview.css';

const SlashIcon = createSvgIcon(
        <path d="M7 21L14.9 3h2.1L9.1 21H7z" />,
        'Slash'
);


function Profession(profession) {
        const parts = profession.profession.split(" ");
        const result =
                <p>
                        {`${parts.slice(0, parts.length - 1).join(" ")} `}
                        <span>{parts[parts.length - 1]}</span>
                        {profession.more ? "|" : null}
                </p>

        return result;
};

function FrontPage() {
        const { profile } = useProfileReducer();
        const { firstName, lastName, professions, bio, availability, hireMe, resumeLink } = profile;
        const { theme, toggleTheme } = useContext(ThemeContext);

        return (
                <div className="front-preview">
                        <div className="name">
                                <NavigateBeforeRoundedIcon className="code-open" />

                                <p>
                                        Hi, my name is <span>{`${firstName} ${lastName}`}</span>
                                </p>

                                <SlashIcon className="slash" />

                                <NavigateBeforeRoundedIcon className="code-close" />
                        </div>

                        <div className="professions">
                                {professions.map((profession, index) => (
                                        <Profession key={index} profession={profession} more={index !== professions.length - 1} />
                                ))}
                        </div>

                        <div className="hero-text">
                                <p>{bio}</p>
                        </div>

                        <div className="links">
                                {availability ?
                                        <a className="hire-me" href={hireMe} target="_blank" >
                                                Hire me
                                                <WorkRoundedIcon className="briefcase-icon" />
                                        </a>
                                        :
                                        null
                                }

                                <a className="resume" href={resumeLink} download={`${firstName}'s resume`} >
                                        Download resume
                                        <DownloadRoundedIcon className="download-icon" />
                                </a>
                        </div>

                        <div className="front-image">
                                <img src={theme === "dark" ? CoolGuyCoding : CoolGuyCodingLight } alt="A cool guy coding" />
                        </div>
                </div>
        );
}

export default FrontPage;