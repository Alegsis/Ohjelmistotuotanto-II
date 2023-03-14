import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {Select} from '@mui/material';
import moment from 'moment/moment';

const AddSubCategory = () => {
  const [open, setOpen] = React.useState(false);
  const [subCategory, setSubCategory] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubCategory('');
    setBalance(0);
    setSelectedCategory('');
  };

  const handleAddSubCategory = async () => {
    try {
      const userID = localStorage.getItem('UserID');
      let isFound = false;
      const checkCategoryNameUrl = `http://localhost:3001/category/${userID}`;
      const postUrl = 'http://localhost:3001/subcategory/new-subcategory';
      const getUrl = `http://localhost:3001/category/user-${userID}/find-categoryid/categoryname-${selectedCategory}`;
      const budgetUrl = `http://localhost:3001/budget/new-budget`;

      const getCategoryName = await Axios.get(checkCategoryNameUrl);
      for (let x = 0; x < getCategoryName.data.length; x++) {
        if (getCategoryName.data[x].CategoryName.toString() ===
            subCategory.toString()) {
          isFound = true;
          break;
        }
      }

      if (!isFound) {
        const getCategoryID = await Axios.get(getUrl); //.data
        await Axios.post(postUrl, {
          SubCategoryName: subCategory,
          Balance: 0,
          UserID: userID,
          CategoryID: getCategoryID.data,
        });

        if(balance > 0){
          await Axios.post(budgetUrl,
              {
                Amount: balance,
                BudgetDate: moment().format('YYYY-MM-DD'),
                FromSubCategory: 'AvailableFunds',
                ToSubCategory: subCategory,
                UserID: userID,
              });
        }
        setOpen(false);
        setSubCategory('');
        setBalance(0);
        setSelectedCategory('');
      } else {
        alert('Category name and Sub Category name can not be the same');
      }
    } catch (response) {
      alert(response.response.data);
    }
  };

  const getUserCategories = () => {
    const userID = localStorage.getItem('UserID');
    const baseUrl = `http://localhost:3001/category/${userID}`;
    const updatedArray = [];
    Axios.get(baseUrl).then((response) => {
      for (let x = 0; x < response.data.length; x++) {
        if (response.data[x].CategoryName.toString() !== 'Available') {
          const category = response.data[x].CategoryName;
          updatedArray.push({value: category});
        }
      }
      setCategoryList(updatedArray);
    }).catch((response) => {
      alert(response.response.data)
    });
  };

  React.useEffect(() => {
    getUserCategories();
  }, [open]);

  return (
      <div className="subcategory-button">
        <Button id="subcategory-button-1" onClick={handleClickOpen}>
          (+) Add subcategory
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create subcategory</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a subcategory, you need to select a category and input
              a
              subcategory name. Optionally You can also add a balance for the
              subcategory.
            </DialogContentText>

            <FormControl required margin="dense">
              <InputLabel id="Category-type-label">Category</InputLabel>
              <Select
                  style={{height: '50px', width: '200px'}}
                  labelId="Category-type-label"
                  id="Category"
                  fullWidth
                  value={selectedCategory}
                  onChange={(event) => {
                    setSelectedCategory(event.target.value);
                  }}
              >
                {categoryList.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.value}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>


            <TextField
                required
                autoFocus
                margin="dense"
                id="sub-category"
                label="Sub Category"
                fullWidth
                inputProps={{maxLength: 50}}
                value={subCategory}
                variant="filled"
                onChange={(event) => {
                  setSubCategory(event.target.value);
                }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="balance"
                label="Balance"
                type="number"
                fullWidth
                inputProps={{maxLength: 20}}
                value={balance}
                variant="filled"
                onChange={(event) => {
                  setBalance(event.target.value);
                }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className="cancel-button">
              Cancel
            </Button>
            <Button onClick={handleAddSubCategory} className="Save-button">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
};

export default AddSubCategory;
