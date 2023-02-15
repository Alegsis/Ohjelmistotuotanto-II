import * as React from 'react';
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Register from './Register';
import Button from '@mui/material/Button';
import {Select} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Axios from 'axios';
import moment from 'moment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function AddTransaction(){
  const [open, setOpen] = React.useState(false);
  const [transactionName, setTransactionName] = React.useState('');
  const [recipient, setRecipient] = useState('');
  const [inflow, setInflow] = useState('');
  const [outflow, setOutflow] = useState('');
  const [transactionRepeat, setTransactionRepeat] = useState('');
  const [accounts, setAccounts] = useState([]);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getUserAccounts = () => {
    const userID = localStorage.getItem("UserID");
    const baseUrl = `http://localhost:3001/transaction/${userID}`
    const updatedArray = [];
    Axios.get(baseUrl
    ).then((function (response){
      for(let x = 0; x<response.data.length; x++){
        console.log(response)
        //updatedArray.push(response[x].AccountName)
        setAccounts([])
        setAccounts(updatedArray)
      }
    })).catch((response) => {
      alert(response);
    })

    return(
        <MenuItem value="creditcard">Credit Card</MenuItem>
    )
  };

  return (
      <div>
      <Button onClick={handleClickOpen}> Add transaction </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill all fields
          </DialogContentText>
          <TextField
              required
              autoFocus
              margin="dense"
              id="transactionName"
              label="Transaction Name"
              fullWidth
              variant="filled"
              onChange={(event) => {setTransactionName(event.target.value)}}
          />
          <TextField
              required
              autoFocus
              margin="dense"
              id="outflow"
              label="Outflow"
              fullWidth
              variant="filled"
              onChange={(event) => {setRecipient(event.target.value)}}
          />
          <TextField
              required
              autoFocus
              margin="dense"
              id="inflow"
              label="Inflow"
              fullWidth
              variant="filled"
              onChange={(event) => {setTransactionName(event.target.value)}}
          />
          <TextField
              required
              autoFocus
              margin="dense"
              id="payee"
              label="Payee"
              fullWidth
              variant="filled"
              onChange={(event) => {setTransactionName(event.target.value)}}
          />
          <TextField
              required
              autoFocus
              margin="dense"
              id="transactionRepeat"
              label="Transaction Repeat"
              fullWidth
              variant="filled"
              onChange={(event) => {setTransactionName(event.target.value)}}
          />
          <div className="transaction-selects">
            <div className="transaction-account">
          <InputLabel id="account">Account *</InputLabel>
            <Select
              style={{ height: "50px", width: "200px" }}
              id="account-name"
              labelId="account"
              fullWidth
          >
          </Select>
            </div>
            <div className="transaction-category">
            <InputLabel id="category">Category *</InputLabel>
            <Select
              style={{ height: "50px", width: "200px"}}
              id="subcategory-name"
              labelId="category"
              fullWidth>
          </Select>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="cancel-button">Cancel</Button>
          <Button  className="add-transaction">Add Transaction</Button>
        </DialogActions>
      </Dialog>
      </div>
  )
}