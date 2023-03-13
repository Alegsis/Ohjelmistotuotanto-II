import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import {Select} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import {useState} from 'react';
import Axios from 'axios';
import moment from 'moment';

const AddBudget = () => {

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0.00);
  const [fromSubCategory, setFromSubCategory] = useState('');
  const [toSubCategory, setToSubCategory] = useState('');
  const [subCategoryList, setSubCategoryList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFromSubCategory('');
    setToSubCategory('');
  };

  const getUserSubcategories = () => {
    const userID = localStorage.getItem('UserID');
    const baseUrl = `http://localhost:3001/subcategory/${userID}/subcategory-name-and-balance`;
    const updatedArray = [];
    Axios.get(baseUrl,
    ).then(((response) => {
      for (let x = 0; x < response.data.length; x++) {
        const subCategoryName = response.data[x].SubCategoryName;
        const subCategoryBalance = response.data[x].Balance;
        updatedArray.push(
            {
              name: subCategoryName,
              balance: subCategoryBalance,
            },
        );
      }
      setSubCategoryList([]);
      setSubCategoryList(updatedArray);
    })).catch((response) => {
      console.log(response);
      alert('Something went wrong');
    });
  };

  const addBudget = () => {
    const userID = parseInt(localStorage.getItem('UserID'));
    const baseUrl = `http://localhost:3001/budget/new-budget`;
    Axios.post(baseUrl,
        {
          Amount: amount,
          //Todo tähän tulee päivämäärä, joka on headerissa!!!!!!!!!!! kunhan se on luotuna headeriin
          BudgetDate: moment().format('YYYY-MM-DD'),
          FromSubCategory: fromSubCategory,
          ToSubCategory: toSubCategory,
          UserID: userID,
        }).then(() => {
      alert('Successful budgeting!');

      setOpen(false);
      setFromSubCategory('');
      setToSubCategory('');
      setAmount(0.00);
    }).catch(response => {
      console.log(response);
      alert('Something went wrong');
    });
  };

  return (
      <div>
        <Button onClick={handleClickOpen}> (+) Budget </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Budget</DialogTitle>
          <DialogContent>
            <div className="budget-selects">
              <div className="subcategory-dropmenu">
                <InputLabel id="account">From Sub Category *</InputLabel>
                <Select
                    style={{height: '50px', width: '300px'}}
                    id="fromSubcategory"
                    labelId="account"
                    fullWidth
                    onOpen={getUserSubcategories}
                    value={fromSubCategory}
                    onChange={(event) => {
                      setFromSubCategory(event.target.value);
                    }}
                >
                  {subCategoryList.filter(
                      subcategory => subcategory.name.toString() !==
                          toSubCategory.toString()).map((subcategory) => (
                      <MenuItem key={subcategory.name} value={subcategory.name}>
                        {subcategory.name} {subcategory.balance}
                      </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="subcategory-dropmenu">
                <InputLabel id="category">To Sub Category *</InputLabel>
                <Select
                    style={{height: '50px', width: '300px'}}
                    id="subcategory-name"
                    labelId="category"
                    fullWidth
                    onOpen={getUserSubcategories}
                    value={toSubCategory}
                    onChange={(event) => {
                      setToSubCategory(event.target.value);
                    }}
                >
                  {subCategoryList.filter(
                      subcategory => subcategory.name.toString() !==
                          fromSubCategory.toString()).map((subcategory) => (
                      <MenuItem key={subcategory.name}
                                value={subcategory.name}>
                        {subcategory.name} {subcategory.balance}
                      </MenuItem>
                  ))}
                  >
                </Select>
              </div>
            </div>
            <TextField
                style={{height: '50px', width: '300px', background: 'white'}}
                required
                autoFocus
                margin="dense"
                id="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="filled"
                onChange={(event) => {
                  setAmount(parseFloat(event.target.value));
                }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}
                    className="cancel-button">Cancel</Button>
            <Button className="add-transaction" onClick={addBudget}>Make
              budgeting</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

export default AddBudget