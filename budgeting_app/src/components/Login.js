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
    const [userID, setUserID] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Käytetään vaihtamaan UserName login-buttonin tilalle.
    const [show, setShow] = React.useState('Login');
    const [loggedIn, setLogin] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /*
    * Tallentaa cacheen Username, UserID ToDo Axios.
    */
    const handleCloseAndLogin = () => {
        const baseUrl = "http://localhost:3001/user/login"
        Axios.post(baseUrl, {
            username: username,
            password: password
        }).then((function (response){
            console.log(response.data.toString())
            setUserID(response.data.toString());
        }))
        localStorage.setItem("UserID", userID);
        localStorage.setItem("Username", username);
        setOpen(false);
        console.log(localStorage.getItem("Username"));
        setShow(username)
        setLogin(true)
    };

    /*
    Tervehdys
     */
    const handleClickLoggedIn = () => {
        if (loggedIn) {
            return (
                'Hello! '
            )
        }

    };

    return (
        <div className='primary-button'>
            <p> <b> {handleClickLoggedIn()} </b>
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
