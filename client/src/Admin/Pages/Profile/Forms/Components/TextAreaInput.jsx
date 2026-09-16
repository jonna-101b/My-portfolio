import { useEffect, useState } from 'react';
import useProfileReducer from '../../../../../Hooks/useProfileReducer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../Styles/TextAreaInput.css';


function SingleValue({ textarea }) {
	const { updateProfile } = useProfileReducer();
	const [disabled, setDisabled] = useState(true);
	const [input, setInput] = useState(textarea.defaultValue);
	const [ edited, setEdited ] = useState(false);

	const handleEdit = (bool) => {
		setEdited(bool);
	};

	const handleDisable = () => {
		setDisabled((prev) => !prev);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setInput(value);

		if ( value === textarea.defaultValue) {
			handleEdit(false)
		}
		else {
			handleEdit(true)
		}
	};

	const handleSave = () => {
		updateProfile({ [textarea.name]: input });
		handleDisable();
		handleEdit(false);
	};

	useEffect(() => {
		setInput(textarea.defaultValue);
	}, [textarea.defaultValue]);

	return (
		<div className="textarea-input single">
			<p className="label">
				{ textarea.label }
				<span className={ edited ? "edited" : "" } ></span>
			</p>

			<div className="value">
				<textarea
					name={textarea.name}
					disabled={disabled}
					maxLength={400}
					value={input}
					onChange={handleChange}
				/>

				<p className={`edit-button ${disabled ? "" : ( edited ? "save" : "cancel" )}`} onClick={edited ? handleSave : handleDisable}>
					{disabled ? (
						<>
							edit
							<span className="icon">
								<EditOutlinedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
							</span>
						</>
					) : ( edited ?
						<>
							done
							<span className="icon">
								<CheckRoundedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
							</span>
						</>
						:
						<>
							cancel
							<span className="icon">
								<CloseRoundedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
							</span>
						</>
					)}
				</p>

				
				<p className={`editing-text ${disabled ? "disabled" : ""}`}>
					Maximum 400 characters
				</p>
			</div>
		</div>
  );
}

function Options({ textarea }) {
	const { updateDescription } = useProfileReducer();
	const [type, setType] = useState("brief");
	const [disabled, setDisabled] = useState(true);
	const [descriptions, setDescriptions] = useState({
		"brief": textarea.defaultValue.brief,
		"detailed": textarea.defaultValue.detailed
	});
	const [ edited, setEdited ] = useState({ "brief": false, "detailed": false });

	const typeMap = { "brief": textarea.defaultValue.brief, "detailed": textarea.defaultValue.detailed };

	const handleDisable = () => {
		setDisabled((prev) => !prev);
	};

	const handleType = (newType) => {
		setType(newType);
		setDisabled(true);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setDescriptions((prev) => ({
			...prev,
			[name]: value,
		}));

		if ( value === typeMap[name]) {
			setEdited(prev => ({ ...prev, [name]: false }));
		}
		else {
			setEdited(prev => ({ ...prev, [name]: true }));
		}
	};

	const handleSave = () => {
		updateDescription(descriptions);
		handleDisable();
		setEdited({ "brief": false, "detailed": false });
	};

	useEffect(() => {
		setDescriptions({
			"brief": textarea.defaultValue.brief,
			"detailed": textarea.defaultValue.detailed
		});
	}, [textarea.defaultValue]);

	const optionsEdited = Object.values(edited).some(Boolean);

	return (
		<div className="textarea-input">
			<p className="label">
				{ textarea.label }
				<span className={ optionsEdited ? "edited" : "" } ></span>
			</p>

			<div className="value">
				<div className="type">
					<p className={`label ${type === "brief" ? "focused" : ""}`} onClick={() => handleType("brief")} >
						Brief
					</p>

					<p className={`label ${type === "detailed" ? "focused" : ""}`} onClick={() => handleType("detailed")} >
						Detailed
					</p>
				</div>

				<textarea
					name={type}
					disabled={disabled}
					maxLength={type === "brief" ? 200 : 10000000000}
					value={descriptions[type]}
					onChange={handleChange}
				/>

				<p className={`edit-button ${disabled ? "" : ( optionsEdited ? "save" : "cancel" )}`} onClick={optionsEdited ? handleSave : handleDisable}>
					{disabled ? (
						<>
							edit
							<span className="icon">
								<EditOutlinedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
							</span>
						</>
					) : ( optionsEdited ?
						<>
							done
							<span className="icon">
								<CheckRoundedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
							</span>
						</>
						:
						<>
							cancel
							<span className="icon">
								<CloseRoundedIcon sx={{ fontSize: '1.8vh', color: 'currentColor' }} />
							</span>
						</>
					)}
				</p>

				{type === "brief" ? (
					<p className={`editing-text ${disabled ? "disabled" : ""}`}>
						Maximum 200 characters
					</p>
				) : null}
			</div>
		</div>
  );
}

function TextAreaInput({ textarea }) {
        return textarea.type === "single" ? 
                <SingleValue textarea={textarea} /> 
                : 
                <Options textarea={textarea} />
        ;
}

export default TextAreaInput;