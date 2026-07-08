import useProfileReducer from '../../../../Hooks/useProfileReducer';
import TextInput from '../Forms/Components/TextInput';
import DateInput from '../Forms/Components/DateInput';
import SelectInput from '../Forms/Components/SelectInput';
import '../Styles/BasicInfo.css';


function BasicInfo() {
        const { profile } = useProfileReducer();
        const { firstName, lastName, nickName, birthDate, gender } = profile;

        const info = [
                { name: "firstName", label: "First name", value: firstName, type: "text", inputType: "text" },
                { name: "lastName", label: "Last name", value: lastName, type: "text", inputType: "text" },
                { name: "nickName", label: "Nick name", value: nickName, type: "text", inputType: "text" },
                { name: "birthDate", label: "Birth date", value: birthDate, type: "date", inputType: "date" },
                { name: "gender", label: "Gender", value: gender, options: ["Male", "Female", "Other"], inputType: "select" },
        ];

        return (
                <div className="basic-info">
                        <p className="title">Basic info</p>

                        <div className="info">
                                <TextInput text={info[0]} />
                                <TextInput text={info[1]} />
                                <TextInput text={info[2]} />
                                <DateInput date={info[3]} />
                                <SelectInput select={info[4]}  />
                        </div>

                </div>
        );
}

export default BasicInfo;