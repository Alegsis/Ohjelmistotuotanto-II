import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import Axios from "axios";
import ValidateEmail from "../../utils/email";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Register = () => {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUsername('');
        setPassword('');
        setRePassword('');
        setEmail('');
    };

    const handleSignUp = () => {
        const baseUrl = "http://localhost:3001/user/register";
        if(ValidateEmail(email)){
            if (password === rePassword && 8 <= password.length && 3 <= username.length) {
                Axios.post(baseUrl, {
                    username: username,
                    password: password,
                    email: email
                }).then(() => {
                    alert("successful insert")
                    setOpen(false);
                    setUsername('');
                    setPassword('');
                    setRePassword('');
                    setEmail('');
                }).catch(response => {
                    if (response.response.status === 409) {
                        alert('Username ' + username + ' is taken')
                    }
                })
            } else {
                alert("Input of data doesn't meet requirements.")
            }
        } else {
            alert('Email-address does not meet requirements.')
        }
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
                        inputProps={{maxLength: 30}}
                        variant="filled"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="password-first"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        inputProps={{maxLength: 30}}
                        fullWidth
                        variant="filled"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="password-again"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        inputProps={{maxLength: 30 }}
                        fullWidth
                        variant="filled"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) => {
                            setRePassword(event.target.value)
                        }}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        inputProps={{maxLength: 60}}
                        variant="filled"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
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

export default Register
