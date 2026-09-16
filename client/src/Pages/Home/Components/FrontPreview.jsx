import { useContext } from "react";
import { ThemeContext } from "../../../Contexts/ThemeContext";
import useProfileReducer from "../../../Hooks/useProfileReducer";
import FrontPreviewSkeleton from "../../../Components/Skeletons/FrontPreviewSkeleton";
import CoolGuyCoding from "../../../assets/Images/Home/Cool guy coding.svg";
import CoolGuyCodingLight from "../../../assets/Images/Home/Cool guy coding-light.svg";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { createSvgIcon } from '@mui/material/utils';
import { getAssetUrl } from "../../../Utils/assetUtils";
import '../Styles/FrontPreview.css';

const SlashIcon = createSvgIcon(
	<path d="M7 21L14.9 3h2.1L9.1 21H7z" />,
	'Slash'
);

function Profession({ profession, more }) {
	const text = typeof profession === 'string' ? profession : (profession?.profession || '');
	const parts = text.split(" ");
	
	return (
		<p>
			{parts.length > 1 ? `${parts.slice(0, parts.length - 1).join(" ")} ` : ""}
			<span>{parts[parts.length - 1]}</span>
			{more ? " | " : null}
		</p>
	);
}

function FrontPage() {
	const { profile, loading } = useProfileReducer();
	const { firstName = '', lastName = '', professions = [], bio = '', availability, hireMe, resumeLink } = profile || {};
	const { theme } = useContext(ThemeContext);

	if (loading) {
		return <FrontPreviewSkeleton />;
	}

	const fullName = `${firstName} ${lastName}`.trim();

	return (
		<div className="front-preview">
			<div className="name">
				<NavigateBeforeRoundedIcon className="code-open" />

				<p>
					Hi, my name is <span>{fullName || "Portfolio"}</span>
				</p>

				<SlashIcon className="slash" />

				<NavigateBeforeRoundedIcon className="code-close" />
			</div>

			{professions && professions.length > 0 ? (
				<div className="professions">
					{professions.map((profession, index) => (
						<Profession key={index} profession={profession} more={index !== professions.length - 1} />
					))}
				</div>
			) : null}

			{bio ? (
				<div className="hero-text">
					<p>{bio}</p>
				</div>
			) : null}

			<div className="links">
				{availability && hireMe ? (
					<a className="hire-me" href={hireMe} target="_blank" rel="noopener noreferrer">
						Hire me
						<WorkRoundedIcon className="briefcase-icon" />
					</a>
				) : null}

				{resumeLink ? (
					<a className="resume" href={getAssetUrl(resumeLink)} download={`${firstName || 'my'}_resume`} target="_blank" rel="noopener noreferrer">
						Download resume
						<DownloadRoundedIcon className="download-icon" />
					</a>
				) : null}
			</div>

			<div className="front-image">
				<img src={theme === "dark" ? CoolGuyCoding : CoolGuyCodingLight } alt="A cool guy coding" />
			</div>
		</div>
	);
}

export default FrontPage;