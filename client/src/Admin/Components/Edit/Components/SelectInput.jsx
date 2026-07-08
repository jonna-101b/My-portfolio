import '../Styles/SelectInput.css';


function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
}

function SelectInput({ select, value, handleValueChange, edited, handleEdit }) {
        const handleChange = (event) => {
                handleValueChange(select.name, select.inputType, event.target.value);

                if (event.target.value === select.value ) {
                        handleEdit(select.name, false);
                }
                else {
                        handleEdit(select.name, true);
                }
        }

        return (
                <div className="select-input">
                        <p className="label">
                                { select.label }
                                <span className={edited ? "edited" : "" }></span>
                        </p>

                        <select name={select.name} id={select.name} value={value} onChange={handleChange}>
                                { select.options.map((option, index) => (
                                        <option value={option.value} key={index} >{ capitalizeFirstLetter(option.label) }</option>
                                )) }
                        </select>
                </div>
        );
}

export default SelectInput;