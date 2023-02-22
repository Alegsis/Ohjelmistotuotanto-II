import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import { Select } from "@mui/material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { Box } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { SidebarData } from "./SidebarData";
import { useEffect, useState } from "react";

export default function CreateBankAcc() {
  const [open, setOpen] = React.useState(false);
  const [accountType, setaccountType] = React.useState("");
  const [accountName, setaccountName] = React.useState("");
  const [accountBalance, setaccountBalance] = React.useState("");
  const [sidebarData, setSidebarData] = useState(SidebarData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setaccountType("");
    setaccountName("");
    setaccountBalance("");
  };

  const baseUrl = "http://localhost:3001/account/new-account";

  const handleCreateAcc = () => {
    //Pitää tarkastaa aikavyöhyke oikein
    const today = new Date().toISOString().slice(0, 10);
    const userID = localStorage.getItem("UserID");
    console.log(today);
    console.log(userID);

    Axios.post(baseUrl, {
      AccountName: accountName,
      AccountType: accountType,
      Balance: accountBalance,
      BalanceDate: today,
      UserID: userID,
    }).then((response) => {
      alert("successful insert");

      const newSubmenu = {
        title: accountName,
        path: "/accounts/" + response.data.id,
        icon: <AccountBalanceIcon />,
      };

      setSidebarData((prevSidebarData) => {
        const newSidebarData = [...prevSidebarData]; // make a copy of the previous state
        newSidebarData[1].subNavi.concat(newSubmenu); // update the subNavi array
        return newSidebarData; // return the new state
      });

      setOpen(false);
      setaccountType("");
      setaccountName("");
      setaccountBalance("");
    });
  };

  return (
    <div className="bank-button">
      <Button id="bank-button-1" onClick={handleClickOpen}>
        <Box mr={1}>
          <AddCircleOutline />
        </Box>
        <Box mr={2}></Box>
        Add Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Bank Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a bank account you must add your account name, select the
            type of account you want to open and type in your balance for the
            account.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="account-name"
            label="Account Name"
            fullWidth
            inputProps={{maxLength: 30}}
            value={accountName}
            variant="filled"
            onChange={(event) => {
              setaccountName(event.target.value);
            }}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="account-balance"
            label="Account Balance"
            fullWidth
            inputProps={{maxLength: 11}}
            value={accountBalance}
            variant="filled"
            onChange={(event) => {
              setaccountBalance(event.target.value);
            }}
          />
          <FormControl required margin="dense">
            <InputLabel id="account-type-label">Account Type</InputLabel>
            <Select
              style={{ height: "50px", width: "200px" }}
              labelId="account-type-label"
              id="account-type"
              fullWidth
              value={accountType}
              onChange={(event) => {
                setaccountType(event.target.value);
              }}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Checking">Checking</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Loan">Loan</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="cancel-button">
            Cancel
          </Button>
          <Button onClick={handleCreateAcc} className="Save-button">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
