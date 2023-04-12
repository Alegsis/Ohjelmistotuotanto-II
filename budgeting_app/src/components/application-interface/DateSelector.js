import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const moment = require('moment')

const DateSelector = ({ setAddDashboardSuccess }) => {
    const [date, setDate] = useState(moment());

    useEffect(() => {
        localStorage.setItem("Month", date.format("MM"));
        localStorage.setItem("Year", date.format("YYYY"));
    }, [date]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setAddDashboardSuccess(true);
    };

    const handlePrevMonthClick = () => {
        const newDate = date.clone().subtract(1, "month");
        setDate(newDate);
        handleDateChange(newDate);
    };

    const handleNextMonthClick = () => {
        const newDate = date.clone().add(1, "month");
        setDate(newDate);
        handleDateChange(newDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                className="monthYearPicker"
                label="Date"
                inputFormat="MMMM YYYY"
                value={date}
                onChange={handleDateChange}
                renderInput={(params: TextFieldProps) => (
                    <div className="dateSelector"
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <IconButton size="medium" sx={{color: "#FFFFFF"}} onClick={handlePrevMonthClick}>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <TextField
                            variant="outlined"
                            size="small"
                            {...params}
                            sx={{
                                svg: { color: "#fff" },
                                input: { color: "#fff" },
                                legend: { display: "none" },
                                label: { display: "none" },
                            }}
                        />
                        <IconButton size="medium" sx={{color: "#FFFFFF"}} onClick={handleNextMonthClick}>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </div>
                )}
                views={["month", "year"]}
                showDaysOutsideCurrentMonth
            />
        </LocalizationProvider>
    );
};

export default DateSelector;