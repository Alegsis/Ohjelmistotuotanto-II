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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateBankAcc() {
  const classes = useStyles();
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
  /*
  const handleAccountTypeChange = (event) => {
    setaccountType(event.target.value);
  };
*/
  const baseUrl = "http://localhost:3001/user/register";
  const handleSignUp = () => {
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
        <DialogTitle>Save</DialogTitle>
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
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <TextField
              id="select-account-type"
              select
              label="Account Type"
              value={accountType}
              onChange={(event) => {
                setaccountType(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              SelectProps={{
                displayEmpty: true,
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="checking">Checking</MenuItem>
              <MenuItem value="savings">Savings Account</MenuItem>
              <MenuItem value="credit">Credit Card</MenuItem>
              <MenuItem value="loan">Loan</MenuItem>
            </TextField>
          </FormControl>
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
        </DialogContent>
        <DialogActions>
          <Register></Register>
          <Button onClick={handleClose} className="cancel-button">
            Cancel
          </Button>
          <Button onClick={handleClose} className="Save-button">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
