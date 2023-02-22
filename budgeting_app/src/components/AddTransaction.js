import * as React from 'react';
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {Select} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AddTransaction(){
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(dayjs(Date.now()));
  const [transactionName, setTransactionName] = React.useState('');
  const [recipient, setRecipient] = useState('');
  const [inflow, setInflow] = useState(0.00);
  const [outflow, setOutflow] = useState(0.00);
  const [transactionRepeat, setTransactionRepeat] = useState('');
  const [memo, setMemo] = useState('');
  const [account, setAccount] = useState('')
  const [accountsList, setAccountsList] = useState([]);
  const [subCategory, setSubCategory] = useState('')
  const [subCategoryList, setSubCategoryList] = useState([]);

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAccount('');
    setSubCategory('');
  };

  const getUserAccounts = () => {
    const userID = localStorage.getItem("UserID");
    const baseUrl = `http://localhost:3001/account/${userID}/account-name`
    const updatedArray = [];
    Axios.get(baseUrl
    ).then((function (response){
      for(let x = 0; x<response.data.length; x++){
        const account = response.data[x].AccountName
        updatedArray.push(
            { value : account }
        )
      }
      setAccountsList([])
      setAccountsList(updatedArray)

    })).catch((response) => {
      alert(response);
    })
  };

  const getUserSubcategories = () => {
    const userID = localStorage.getItem("UserID");
    const baseUrl = `http://localhost:3001/subcategory/${userID}/subcategory-name`
    const updatedArray2 = [];
    Axios.get(baseUrl
    ).then((function (response){
      for(let x = 0; x<response.data.length; x++){
        const subCategoryName = response.data[x].SubCategoryName
        updatedArray2.push(
            { value : subCategoryName }
        )
      }
      setSubCategoryList([])
      setSubCategoryList(updatedArray2)

    })).catch((response) => {
      alert(response);
    })
  };

  const addTransaction = () => {
    const userID = parseInt(localStorage.getItem("UserID"));
    const baseUrl = `http://localhost:3001/transaction/new-transaction`

    console.log(outflow)
    Axios.post(baseUrl,
        {
          TransactionName : transactionName,
          Outflow : outflow,
          Inflow : inflow,
          Recipient : recipient,
          TransactionRepeat : transactionRepeat,
          Memo : memo,
          TransactionDate : date,
          AccountName : account,
          SubCategoryName : subCategory,
          UserID : userID

        }).then(() => {
      alert("successful insert")
      setOpen(false);
      setAccount('');
      setSubCategory('');
      setInflow(0.00);
      setOutflow(0.00);

    }).catch(response => {
      alert(response)
    })
  }

  return (

      <div>
        <Button onClick={handleClickOpen}> Add transaction </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill all fields
            </DialogContentText>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="YYYY-MM-DD"
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
                type="number"
                autoFocus
                margin="dense"
                id="outflow"
                label="Outflow"
                fullWidth
                variant="filled"
                onChange={(event) => {setOutflow(parseFloat(event.target.value))}}
            />
            <TextField
                type="number"
                autoFocus
                margin="dense"
                id="inflow"
                label="Inflow"
                fullWidth
                variant="filled"
                onChange={(event) => {setInflow(parseFloat(event.target.value))}}
            />
            <TextField
                required
                autoFocus
                margin="dense"
                id="payee"
                label="Payee"
                fullWidth
                variant="filled"
                onChange={(event) => {setRecipient(event.target.value)}}
            />
            <TextField
                required
                autoFocus
                margin="dense"
                id="transactionRepeat"
                label="Transaction Repeat"
                fullWidth
                variant="filled"
                onChange={(event) => {setTransactionRepeat(event.target.value)}}
            />
            <TextField
                required
                autoFocus
                margin="dense"
                id="memo"
                label="Memo"
                fullWidth
                variant="filled"
                onChange={(event) => {setMemo(event.target.value)}}
            />
            <div className="transaction-selects">
              <div className="transaction-account">
                <InputLabel id="account">Account *</InputLabel>
                <Select
                    style={{ height: "50px", width: "200px" }}
                    id="account-name"
                    labelId="account"
                    fullWidth
                    onOpen={getUserAccounts}
                    value={account}
                    onChange={(event) => {
                      setAccount(event.target.value);
                    }}
                >
                  {accountsList.map((account) => (
                      <MenuItem key={account.value} value={account.value}>
                        {account.value}
                      </MenuItem>
                  ))}

                </Select>
              </div>
              <div className="transaction-category">
                <InputLabel id="category">SubCategory *</InputLabel>
                <Select
                    style={{ height: "50px", width: "200px"}}
                    id="subcategory-name"
                    labelId="category"
                    fullWidth
                    onOpen={getUserSubcategories}
                    value={subCategory}
                    onChange={(event) => {
                      setSubCategory(event.target.value);
                    }}
                >
                  {subCategoryList.map((subcategory) => (
                      <MenuItem key={subcategory.value} value={subcategory.value}>
                        {subcategory.value}
                      </MenuItem>
                  ))}
                  >
                </Select>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className="cancel-button">Cancel</Button>
            <Button  className="add-transaction" onClick={addTransaction}>Add Transaction</Button>
          </DialogActions>
        </Dialog>
      </div>
  )
}