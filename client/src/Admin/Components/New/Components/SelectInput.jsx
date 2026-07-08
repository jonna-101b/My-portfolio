import '../Styles/SelectInput.css';


function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
}

function SelectInput({ select, value, handleValueChange, added, handleAdd }) {
        const handleChange = (event) => {
                handleValueChange(select.name, select.inputType, event.target.value);
                if (select.required) handleAdd(select.name, true);
        }

        return (
                <div className="select-input">
                        <p className="label">
                                { select.label }
                                { select.required ? <span className={`add-state ${added ? "added" : ""}`}></span> : null }
                        </p>

                        <select name={select.name} id={select.name} value={ value } onChange={handleChange}>
                                { select.options.map((option, index) => (
                                        <option value={option.value} key={index} >{ capitalizeFirstLetter(option.label) }</option>
                                )) }
                        </select>
                </div>
        );
}

export default SelectInput;