import React, {useEffect, useState} from "react";
import {Alert, Collapse, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({ message, effectOpen}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 5000);
    }, [effectOpen]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Collapse in={open}>
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            handleClose()
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {message}
            </Alert>
        </Collapse>
    );
};

export default CustomAlert;

