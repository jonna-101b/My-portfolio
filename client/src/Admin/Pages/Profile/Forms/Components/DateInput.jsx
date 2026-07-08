import { useEffect, useState } from "react";
import useProfileReducer from "../../../../../Hooks/useProfileReducer";
import DatePicker from "react-datepicker";
import { isSameDay, format, getYear } from "date-fns";
import CancelIcon from '../../../../../assets/Icons/Admin/Common/Edit/cancel-hover.png';
import CancelBlackIcon from '../../../../../assets/Icons/Admin/Common/Edit/cancel-black.png';
import CheckBlackIcon from '../../../../../assets/Icons/Admin/Common/Edit/checkmark-black.png';
import CalendarIcon from '../../../../../assets/Icons/Admin/Common/Edit/calendar.png';
import "react-datepicker/dist/react-datepicker.css";
import '../Styles/DateInput.css';


function SingleDatePicker({ value, handleDisplay, handleChange, handleEdit }) {
        const [selectedDate, setSelectedDate] = useState(value);

        const handleDateChange = (date) => {
                setSelectedDate(date);
                if (isSameDay(date, value)) {
                        handleEdit(false);
                } else {
                        handleEdit(true);
                }
        };
        
        const handleCancel = () => {
                setSelectedDate(null);
                handleDisplay();
                handleEdit(false);
        };
        
        const handleDone = () => {
                handleChange(selectedDate);
                setSelectedDate(null);
                handleDisplay();
                handleEdit(false);
        };

        return (
                <div className="new-date date-picker">
                        <p className="label">Pick a Date</p>
                        
                        <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select a date"
                                className="calendar-input"             // styles the input box
                                calendarClassName="calendar"  
                                inline
                        />

                        <p className="cancel button" onClick={handleCancel}>
                                cancel
                                <span className="icon">
                                        <img src={CancelBlackIcon} alt="Cancel icon" />
                                </span>
                        </p>

                        <p className="done button" onClick={handleDone} >
                                done
                                <span className="icon">
                                        <img src={CheckBlackIcon} alt="Checkmark icon" />
                                </span>
                        </p>
                </div>
        );
}

function YearDurationPicker({ from, to, handleDisplay, handleChange, handleEdit }) {
        const [startDate, setStartDate] = useState(from);
        const [endDate, setEndDate] = useState(to);

        const handleDurationChange = (dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);

                if ( start !== from || end !== to ) {
                        handleEdit(true);
                }
                else {
                        handleEdit(false);
                }
        };
        
        const handleCancel = () => {
                setStartDate(null);
                setEndDate(null);
                handleDisplay();
                handleEdit(false);
        };
        
        const handleDone = () => {
                handleChange({ from: startDate, to: endDate});
                setStartDate(null);
                setEndDate(null);
                handleDisplay();
                handleEdit(false);
        };

        return (
                <div className="new-date duration-picker">
                        <p className="label">Pick Duration in Years</p>

                        <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleDurationChange}
                                placeholderText="Select start and end dates"
                                inline
                        />

                        <p className="cancel button" onClick={handleCancel}>
                                cancel
                                <span className="icon">
                                        <img src={CancelBlackIcon} alt="Cancel icon" />
                                </span>
                        </p>

                        <p className="done button" onClick={handleDone} >
                                done
                                <span className="icon">
                                        <img src={CheckBlackIcon} alt="Checkmark icon" />
                                </span>
                        </p>
                </div>
  );
}

function DateInput({ date }) {
        const { updateProfile } = useProfileReducer();
        const [ dateValue, setDateValue ] = useState(date.type === "duration" ? { from: date.value.from, to: date.value.to } : date.value);
        const [ display, setDisplay ] = useState(false);
        const [ edited, setEdited ] = useState(false);

        const handleDisplay = () => {
                setDisplay(prev => !prev);
        };

        const handleEdit = (bool) => {
                setEdited(bool);
        };

        const handleChange = (value) => {
                updateProfile({ [date.name]: value });
                handleEdit(false);
        };

        useEffect(() => {
                setDateValue(date.type === "duration" ? { from: date.value.from, to: date.value.to } : date.value);
        }, [date.value]);

        return (
                <div className="date-input input">
                        <p className="label">
                                {date.label}
                                <span className={edited ? "edited" : ""}></span>
                        </p>

                        <div className="value">
                                { date.type === "duration" ? 
                                        <p className="input duration-value">
                                                <input type="text" name={`${date.name}-from`} id={`${date.name}-from`} value={getYear(dateValue.from)} disabled={true} />
                                                —
                                                <input type="text" name={`${date.name}-to`} id={`${date.name}-from`} value={getYear(dateValue.to)} disabled={true} />
                                        </p>
                                        :
                                        <p className="input date-value">
                                                <input type="text" name={date.name} id={date.name} value={format(dateValue, "MMMM do, yyyy")} disabled={true} />
                                        </p>
                                }
                        </div>

                        <p className={`edit-button ${display ? "cancel" : ""}`} onClick={handleDisplay}>
                                {display ? 
                                        ( 
                                                <>
                                                        cancel
                                                        <span className="icon">
                                                                <img src={CancelIcon} alt="Cancel icon" />
                                                        </span>
                                                </>
                                        )
                                        :
                                        (
                                                <>
                                                        change
                                                        <span className="icon">
                                                                        <img src={CalendarIcon} alt="Edit icon" />
                                                        </span>
                                                </>
                                        ) 
                                }
                        </p>

                        { display ? 
                                ( date.type === "duration" ? 
                                        <YearDurationPicker  from={date.value.from} to={date.value.to} handleChange={handleChange} handleDisplay={handleDisplay} handleEdit={handleEdit} /> 
                                        : 
                                        <SingleDatePicker value={date.value} handleChange={handleChange} handleDisplay={handleDisplay} handleEdit={handleEdit} /> 
                                ) 
                                : null 
                        }
        </div>
    );
}

export default DateInput;