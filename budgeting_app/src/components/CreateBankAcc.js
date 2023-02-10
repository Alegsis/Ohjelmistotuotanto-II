import * as React from "react";
import { makeStyles } from "@mui/material/styles";
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
import Register from "./Register";
import Axios from "axios";
import { Select } from "@mui/material";
// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function CreateBankAcc() {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [accountType, setaccountType] = React.useState("");
  const [accountName, setaccountName] = React.useState("");
  const [accountbalance, setaccountBalance] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccountTypeChange = (event) => {
    setaccountType(event.target.value);
  };

  const baseUrl = "http://localhost:3001/user/createBankAcc";
  const handleCreateAcc = () => {
    Axios.post(baseUrl, {
      accountName: accountName,
      accountType: setaccountType,
      accountbalance: accountbalance,
    }).then(() => {
      alert("successful insert");
    });
    setOpen(false);
  };

  return (
    <div className="bank-button">
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Bank Account
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
            value={accountbalance}
            variant="filled"
            onChange={(event) => {
              setaccountBalance(event.target.value);
            }}
          />
          <FormControl required margin="dense">
            <InputLabel id="account-type-label">Account Type</InputLabel>
            <Select
              labelId="account-type-label"
              id="account-type"
              fullWidth
              value={accountType}
              onChange={handleAccountTypeChange}
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="checking">Checking</MenuItem>
              <MenuItem value="creditcard">Credit Card</MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="loan">Loan</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Register></Register>
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
