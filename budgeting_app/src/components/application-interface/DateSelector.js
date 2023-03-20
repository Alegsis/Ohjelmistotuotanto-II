import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
const moment = require('moment')

const DateSelector = () =>{
    const [date, setDate] = useState();

       useEffect( () => {
           if(date !== undefined){
               const separatedDate = date.format('MM/YYYY').split("/");
               const Month = separatedDate[0];
               const Year = separatedDate[1];
               const saveToStorage = async (Month,Year) =>{
                   await localStorage.setItem("Month", Month);
                   await localStorage.setItem("Year", Year);
                   setDate(date)
               }
               saveToStorage(Month,Year)

           }
       }, [date]);

       useEffect( () =>{
           setDate(moment())
       }, [])

        useEffect( () =>{
        setDate(moment())
        }, )


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Date"
                inputFormat="MM/YYYY"
                value={date}
                onChange={date => setDate(date)}
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