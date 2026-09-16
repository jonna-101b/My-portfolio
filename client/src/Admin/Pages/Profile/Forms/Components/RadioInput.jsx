import { useState } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import '../Styles/RadioInput.css';


function RadioInput({ radio, edited, handleEdit }) {
	const [ selected, setSelected ] = useState(radio.defaultValue);

	const handleChange = (value) => {
		if (value === radio.defaultValue) {
			handleEdit(radio.name, false);
		} else {
			handleEdit(radio.name, true);
		}
		setSelected(value);
	};

	return (
		<div className="radio-input">
			<p className="label">
				{radio.label}
				<span className={edited ? "edited" : ""}></span>
			</p>

			<div className="options">
				{radio.options.map((option, index) => (
					<p key={index} className={`option ${selected === option.value ? "checked" : ""}`} onClick={() => {handleChange(option.value)}} >
						<input
							type="radio"
							name={radio.name}                 // all radios in the group must share the same `name`
							value={option.value}
							checked={selected === option.value}
							onChange={() => {handleChange(option.value)}}
						/>

						<span className="icon">
							<CheckRoundedIcon sx={{ fontSize: '1.35vh', color: 'var(--admin-accent)' }} />
						</span>

						<span className="sub-label" >
							{ option.label }
						</span>
					</p>
				))}
			</div>

		</div>
	);
}

export default RadioInput;