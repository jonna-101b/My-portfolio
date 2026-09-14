import { useEffect, useState, useRef } from "react";
import useProfileReducer from "../../../../../Hooks/useProfileReducer";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import "react-datepicker/dist/react-datepicker.css";
import '../Styles/DateInput.css';

function SingleDatePicker({ value, handleDisplay, handleChange }) {
        const initialDate = value ? new Date(value) : new Date();
        const [selectedDate, setSelectedDate] = useState(initialDate);

        const handleDateChange = (date) => {
                setSelectedDate(date);
        };

        const handleCancel = () => {
                handleDisplay();
        };

        const handleDone = () => {
                handleChange(selectedDate);
                handleDisplay();
        };

        return (
                <div className="date-picker-popup">
                        <div className="popup-header">
                                <span className="popup-title">Pick a Date</span>
                                <button type="button" className="popup-close-btn" onClick={handleCancel}>
                                        <CloseRoundedIcon style={{ fontSize: '1.1rem' }} />
                                </button>
                        </div>

                        <div className="calendar-container">
                                <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select a date"
                                        className="calendar-input"
                                        calendarClassName="custom-dark-calendar"
                                        inline
                                />
                        </div>

                        <div className="popup-actions">
                                <button type="button" className="popup-btn-cancel" onClick={handleCancel}>
                                        <CloseRoundedIcon style={{ fontSize: '1rem' }} />
                                        <span>Cancel</span>
                                </button>

                                <button type="button" className="popup-btn-done" onClick={handleDone}>
                                        <CheckRoundedIcon style={{ fontSize: '1rem' }} />
                                        <span>Done</span>
                                </button>
                        </div>
                </div>
        );
}

function DateInput({ date }) {
        const { updateProfile } = useProfileReducer();
        const parsedDate = date.value ? new Date(date.value) : new Date();
        const [dateValue, setDateValue] = useState(parsedDate);
        const [display, setDisplay] = useState(false);
        const popupRef = useRef(null);

        const handleDisplay = () => {
                setDisplay(prev => !prev);
        };

        const handleChange = (newDate) => {
                setDateValue(newDate);
                updateProfile({ [date.name]: newDate });
        };

        useEffect(() => {
                if (date.value) {
                        setDateValue(new Date(date.value));
                }
        }, [date.value]);

        // Handle click outside to close popup
        useEffect(() => {
                const handleClickOutside = (e) => {
                        if (popupRef.current && !popupRef.current.contains(e.target)) {
                                setDisplay(false);
                        }
                };
                if (display) {
                        document.addEventListener("mousedown", handleClickOutside);
                }
                return () => {
                        document.removeEventListener("mousedown", handleClickOutside);
                };
        }, [display]);

        const formattedDate = dateValue && !isNaN(dateValue.getTime()) 
                ? format(dateValue, "MMMM do, yyyy") 
                : "Not set";

        return (
                <div className="profile-date-row" ref={popupRef}>
                        <span className="row-label">
                                {date.label}
                        </span>

                        <div className="row-input-wrapper">
                                <span className="date-display-value">
                                        {formattedDate}
                                </span>
                        </div>

                        <div className="row-actions">
                                <button
                                        type="button"
                                        className={`row-action-btn ${display ? "active-toggle" : ""}`}
                                        onClick={handleDisplay}
                                        aria-label={`Change ${date.label}`}
                                >
                                        <span>{display ? "cancel" : "change"}</span>
                                        {display ? (
                                                <CloseRoundedIcon style={{ fontSize: '0.95rem' }} />
                                        ) : (
                                                <CalendarMonthOutlinedIcon style={{ fontSize: '0.95rem' }} />
                                        )}
                                </button>
                        </div>

                        {display && (
                                <SingleDatePicker
                                        value={dateValue}
                                        handleChange={handleChange}
                                        handleDisplay={handleDisplay}
                                />
                        )}
                </div>
        );
}

export default DateInput;