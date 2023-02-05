import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import sendData from "../axios/user";
import Axios from "axios";

export default function Register() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const baseUrl = "http://localhost:3001/user/register";
    const handleSignUp = () => {
        Axios.post(baseUrl, {
            username : name,
            password : password,
            email : email
        }).then(() => {
            alert("successful insert")
        });
        setOpen(false);
    };

    return (
        <div className='secondary-button'>
            <Button variant="outlined" onClick={handleClickOpen} id='signup-button'>
                Sign Up
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To register, please fill out your desired username, password and email.
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        fullWidth
                        variant="filled"
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="password-first"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="password-again"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="filled"
                        value={password}
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="filled"
                        value={email}
                        onChange={(event) => {setEmail(event.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSignUp}>Sign up</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
