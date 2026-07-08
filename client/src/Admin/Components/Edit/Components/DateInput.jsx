import { useState } from "react";
import DatePicker from "react-datepicker";
import { isSameDay, format, getYear } from "date-fns";
import CancelBlackIcon from '../../../../assets/Icons/Admin/Common/Edit/cancel-black.png';
import CheckBlackIcon from '../../../../assets/Icons/Admin/Common/Edit/checkmark-black.png';
import CalendarIcon from '../../../../assets/Icons/Admin/Common/Edit/calendar.png';
import CalendarActiveIcon from '../../../../assets/Icons/Admin/Common/Edit/calendar-active.png';
import "react-datepicker/dist/react-datepicker.css";
import '../Styles/DateInput.css';


function SingleDatePicker({ value, handleDisplay, handleChange }) {
        const [selectedDate, setSelectedDate] = useState(value);

        const handleDateChange = (date) => {
                setSelectedDate(date);
        };
        
        const handleCancel = () => {
                setSelectedDate(null);
                handleDisplay();
        };
        
        const handleDone = () => {
                handleChange(selectedDate);
                setSelectedDate(null);
                handleDisplay();
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

function YearDurationPicker({ from, to, handleDisplay, handleChange }) {
        const [startDate, setStartDate] = useState(from);
        const [endDate, setEndDate] = useState(to);

        const handleDurationChange = (dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
        };
        
        const handleCancel = () => {
                setStartDate(null);
                setEndDate(null);
                handleDisplay();
        };
        
        const handleDone = () => {
                handleChange({ from: startDate, to: endDate});
                setStartDate(null);
                setEndDate(null);
                handleDisplay();
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

function DateInput({ date, value, handleValueChange, edited, handleEdit }) {
        const [ displayCalendar, setDisplayCalendar ] = useState(false);

        const handleDisplay = () => {
                setDisplayCalendar(prev => !prev);
        };

        const handleChange = (newValue) => {
                if ( date.type === "duration" ) {
                        if ( newValue.from !== date.value.from || newValue.to !== date.value.to ) {
                                handleEdit(date.name, true)
                        }
                        else {
                                handleEdit(date.name, false);
                        }
                        handleValueChange(date.name, date.inputType, { from: newValue.from, to: newValue.to });
                }
                else {
                        if (isSameDay(newValue, date.value)) {
                                handleEdit(date.name, false);
                        } else {
                                handleEdit(date.name, true);
                        }
                        handleValueChange(date.name, date.inputType, newValue);
                }
        };

        return (
                <div className="date-input">
                        <p className="label">
                                {date.label}
                                <span className={edited ? "edited" : ""}></span>
                        </p>

                        <div className="value">
                                { date.type === "duration" ? 
                                        <p className="input duration-value">
                                                <span>{ getYear(value.from) }</span>
                                                —
                                                <span>{ getYear(value.to) }</span>
                                        </p>
                                        :
                                        <p className="input date-value">
                                                <span>{ format(value, "MMMM do, yyyy") }</span>
                                        </p>
                                }

                                <p className={`edit-button ${displayCalendar ? "focused" : ""}`} onClick={handleDisplay} >
                                        <img src={CalendarIcon} alt="CalendarIcon" className="main" />
                                        <img src={CalendarActiveIcon} alt="CalendarIcon" className="active" />
                                </p>
                        </div>

                        { displayCalendar ? ( date.type === "duration" ? 
                                <YearDurationPicker  from={date.value.from} to={date.value.to} handleChange={handleChange} handleDisplay={handleDisplay}/> 
                                : 
                                <SingleDatePicker value={date.value} handleChange={handleChange} handleDisplay={handleDisplay} /> ) : null 
                        }
        </div>
    );
}

export default DateInput;