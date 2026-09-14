import useProfileReducer from '../../../../Hooks/useProfileReducer';
import TextInput from '../Forms/Components/TextInput';
import DateInput from '../Forms/Components/DateInput';
import SelectInput from '../Forms/Components/SelectInput';
import '../Styles/BasicInfo.css';

function BasicInfo() {
        const { profile } = useProfileReducer();
        const { firstName, lastName, nickName, birthDate, gender } = profile || {};

        const info = [
                { name: "firstName", label: "First name", value: firstName, type: "text" },
                { name: "lastName", label: "Last name", value: lastName, type: "text" },
                { name: "nickName", label: "Nick name", value: nickName, type: "text" },
                { name: "birthDate", label: "Birth date", value: birthDate, type: "date" },
                { name: "gender", label: "Gender", value: gender, options: ["Male", "Female", "Other"] },
        ];

        return (
                <div className="basic-info-card">
                        <h3 className="card-title">Basic Info</h3>

                        <div className="info-rows-list">
                                <TextInput text={info[0]} />
                                <TextInput text={info[1]} />
                                <TextInput text={info[2]} />
                                <DateInput date={info[3]} />
                                <SelectInput select={info[4]} />
                        </div>
                </div>
        );
}

export default BasicInfo;