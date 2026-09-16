import useProfileReducer from '../../../../Hooks/useProfileReducer';
import ImageInput from '../Forms/Components/ImageInput';
import TextAreaInput from '../Forms/Components/TextAreaInput';
import SelectInput from '../Forms/Components/SelectInput';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import '../Styles/MoreInfo.css';

function MoreInfo() {
	const { profile } = useProfileReducer();
	const { logo, professions, bio, description, availability } = profile;

	const info = [
		{ name: "logo", label: "Logo", image: logo, backup: "hello.png", type: "icon", inputType: "image" },
		{ name: "availability", label: "Availability", value: availability, options: ["true", "false"], inputType: "select" },
		{ name: "professions", label: "Professions", subLabel: "profession", value: professions, type: "text", icon: WorkOutlineRoundedIcon, inputType: "tag" },
		{ name: "bio", label: "Bio", defaultValue: bio, type: "single", inputType: "textarea" }, 
		{ name: "about", label: "About", defaultValue: description, type: "option", inputType: "textarea" }
	];
        
        return (
                <div className="more-info info">
                        <p className="title">More info</p>

                        <ImageInput image={info[0]} />

                        <SelectInput select={info[1]} />

                        <TagInput tag={info[2]} values={professions} />

                        <TextAreaInput textarea={info[3]} />

                        <TextAreaInput textarea={info[4]} />
                </div>
        );
}

export default MoreInfo;