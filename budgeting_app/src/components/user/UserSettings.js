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
import Axios from "axios";

const UserSettings = () => {
    const [open, setOpen] = React.useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');

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


    const handleChangePassword = () => {
        const baseUrl = "http://localhost:3001/user/change-password";
        const userID = localStorage.getItem('UserID')
        if (password === rePassword && password !== oldPassword && 8 <= password.length) {
                Axios.post(baseUrl, {
                    oldPassword: oldPassword,
                    newPassword: password,
                    userID: userID
                }).then(response => {
                    alert(response.data)
                    setOpen(false);
                    setPassword('');
                    setRePassword('');
                    setOldPassword('')
                }).catch(response => {
                    alert(response.response.data)
                })
            } else {
                alert("Input of data doesn't meet requirements.")
            }
        }

    const handleDelete = () => {
        console.log('delete')
    }
    const handleChangeEmail = () => {
        console.log('email')
    }
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
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                        variant="filled"
                        fullWidth
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
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                        variant="filled"
                        fullWidth
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
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}

                        variant="filled"
                        fullWidth
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
                    <Button onClick={handleChangePassword} style={{float: "right"}}>Update Password</Button>
                    <hr style={{width: "100%", height: "2px"}}></hr>
                    <DialogContentText>
                        Here you can change your email
                    </DialogContentText>
                    <TextField
                        autoFocus
                        disabled
                        margin="dense"
                        id="current-email"
                        label="Current email"
                        inputProps={{maxLength: 60 }}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                        variant="filled"
                        fullWidth
                        onChange={(event) => {
                            setCurrentEmail(event.target.value)
                        }}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="first-email"
                        label="New email"
                        inputProps={{maxLength: 60 }}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                        variant="filled"
                        fullWidth
                        onChange={(event) => {
                            setNewEmail(event.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions style={{justifyContent: "space-between"}}>
                    <Button onClick={handleDelete} style={{ color: "red", backgroundColor: "#ffebee" }}>Delete Account</Button>
                    <div>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleChangeEmail}>Update Email</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UserSettings