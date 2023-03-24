import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
const moment = require('moment')

const DateSelector = (setAddDashboardSuccess) =>{
    const [date, setDate] = useState(moment());

    useEffect(() => {
        localStorage.setItem("Month", date.format("MM"));
        localStorage.setItem("Year", date.format("YYYY"));
    }, [date]);

    const handleDateChange = (newDate) => {
        setDate(newDate)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Date"
                inputFormat="MM/YYYY"
                value={date}
                onChange={handleDateChange}
                renderInput={(params: TextFieldProps) => {
                    return <TextField {...params}/>;
                }}
                views={["month", "year"]}
                showDaysOutsideCurrentMonth
            />
        </LocalizationProvider>
    );
}

export default DateSelector