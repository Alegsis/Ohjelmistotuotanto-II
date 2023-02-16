import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Register from './Register';
import Axios from "axios";

export default function Login() {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [Greet, setGreet] = React.useState('');
    // Käytetään vaihtamaan UserName login-buttonin tilalle.
    const [show, setShow] = React.useState('Login');
    const [loggedIn, setloggedIn] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setUsername('');
        setPassword('');

    };
    /*
    * Tallentaa cacheen Username, UserID
    */
    const handleCloseAndLogin = () => {
        const baseUrl = "http://localhost:3001/user/login"
        Axios.post(baseUrl, {
            username: username,
            password: password
        }).then((function (response){
            setShow(username)
            setUsername('');
            setPassword('');
            setGreet('Hello')
            setloggedIn(true)
            setOpen(false);
            localStorage.setItem("UserID", response.data.toString());
            localStorage.setItem("Username", username);
        })).catch(() => {
            alert('login failed')
        })
    };
    /*
    Tervehdys
     */
    return (
        <div className='primary-button'>
            <p> <b> {Greet} </b>
            <Button variant="outlined" onClick={handleClickOpen}>
                {show}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To login please enter your username and password. If you don't have account, press sign up.
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        inputProps={{maxLength: 30}}
                        fullWidth
                        variant="filled"
                        onChange={(event) => {setUsername(event.target.value)}}

                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="password-first"
                        label="Password"
                        type="password"
                        fullWidth
                        inputProps={{maxLength: 30}}
                        variant="filled"
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Register></Register>
                    <Button onClick={handleClose} className="cancel-button">Cancel</Button>
                    <Button onClick={handleCloseAndLogin} className="login-button">Login</Button>
                </DialogActions>
            </Dialog>
            </p>
        </div>
    );
}
