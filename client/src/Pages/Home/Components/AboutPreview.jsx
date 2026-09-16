import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../Contexts/ThemeContext';
import useProfileReducer from '../../../Hooks/useProfileReducer';
import AboutPreviewSkeleton from '../../../Components/Skeletons/AboutPreviewSkeleton';
import MaleIllustration from '../../../assets/Icons/Home/man.png';
import MaleLightIllustration from '../../../assets/Icons/Home/man-light.png';
import FemaleIllustration from '../../../assets/Icons/Home/pharmacist.png';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { getAssetUrl } from '../../../Utils/assetUtils';
import '../Styles/AboutPreview.css';

function AboutPreview() {
	const { profile, loading } = useProfileReducer();
	const { firstName = '', lastName = '', description = {}, picture, availability, gender = 'male' } = profile || {};
	const { theme } = useContext(ThemeContext);

	if (loading) {
		return <AboutPreviewSkeleton />;
	}

	const isMale = (gender || 'male').toLowerCase() === 'male';
	const illustrationSrc = isMale
		? (theme === 'dark' ? MaleIllustration : MaleLightIllustration)
		: FemaleIllustration;

	return (
		<div className="about-preview">
			<div className="title">
				<p>About Me</p>
			</div>

			<div className="intro-text">
				<p>Here's a Little About Who I Am and What I Do</p>
			</div>

			<div className="main-content">
				<div className="top">
					{picture ? (
						<p className="profile-picture">
							<img src={ getAssetUrl(picture) } alt="Profile picture" />
						</p>
					) : null}

					<div className="right">
						{(firstName || lastName) ? (
							<p className="name">
								{ `${firstName} ${lastName}`.trim() }
							</p>
						) : null}

						<p className={`availability ${ availability ? "available" : "not-available" }`}>
							<span>{ availability ? "Available for work" : "Not available for work" }</span>
						</p>
					</div>

					<div className="shadow">
						<img src={ illustrationSrc } alt="Profile illustration" />
					</div>
				</div>

				{description?.brief ? (
					<p className="description">
						{ description.brief }
					</p>
				) : null}
			</div>

			<div className="more">
				<Link className="button" to="/about">
					Learn more
					<ArrowForwardRoundedIcon className="goto-icon" />
				</Link>
			</div>
		</div>
	);
}

export default AboutPreview;