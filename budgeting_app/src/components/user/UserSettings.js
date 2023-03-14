import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {IconButton, InputAdornment, MenuItem} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const UserSettings = () => {
    const [open, setOpen] = React.useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
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
        setOldPassword('')
        setPassword('');
        setRePassword('');
    };

    /**
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
**/
    return (
        <div className='secondary-button'>
            <MenuItem onClick={handleClickOpen}>Profile</MenuItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>User Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can change your password
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="old-password"
                        label="Old Password"
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
                            setOldPassword(event.target.value)
                        }}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="password-first"
                        label="New Password"
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
                        label="New Password"
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button>Change</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UserSettings