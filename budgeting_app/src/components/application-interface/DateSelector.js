import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import handleCloseAndLogin from '../user/Login';



const DateSelector = () =>{
    const [date, setDate] = useState(new Date());

    const handleChange = (date) => {
        setDate(date);
        const separatedDate = date.format('MM/YYYY').split("/");
        const Month = separatedDate[0];
        const Year = separatedDate[1];
        localStorage.setItem("Month", Month);
        localStorage.setItem("Year", Year);

    };
    //TODO Päivitä localStorageen date kirjautumisen yhteydessä

     // useEffect(() => {
     //    handleChange();
     // }, [handleCloseAndLogin]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Date"
                inputFormat="MM/YYYY"
                value={date}
                onChange={handleChange}
                renderInput={(params: TextFieldProps) => {
                    return <TextField {...params} />;
                }}
                views={["month", "year"]}
            />
        </LocalizationProvider>
    );
}

export default DateSelector