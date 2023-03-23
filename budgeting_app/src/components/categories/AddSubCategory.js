import React, {useState, useEffect} from 'react';
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
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Select, Switch,
  TextFieldProps,
} from '@mui/material';
import moment from 'moment/moment';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';

const AddSubCategory = () => {
  const [open, setOpen] = React.useState(false);
  const [subCategory, setSubCategory] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [goalsList, setgoalsList] = useState([]);

  //budget goal variables
  const [showGoal, setShowGoal] = useState(false);
  const [budgetGoal, setBudgetGoal] = useState('');
  const [budgetGoalType, setBudgetGoalType] = useState('1');
  const [budgetGoalDate, setBudgetGoalDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowGoal(false);
    setSubCategory('');
    setBalance(0);
    setSelectedCategory('');
  };

  //TODO add budget goal things here

  const insertBudgetGoal = () => {
    const userID = localStorage.getItem('UserID');
    const postUrl = 'http://localhost:3001/goal/new-goal';
    //console.log(budgetGoalType, budgetGoalDate, budgetGoal, selectedSubCategory, userID);
    Axios.post(postUrl, {
      Type: budgetGoalType,
      Date: budgetGoalDate,
      Amount: budgetGoal,
      SubCategoryName: subCategory,
      UserID: userID,
    }).then(() => {
      alert('Budget addition successful');
      setShowGoal(false);
      setOpen(false);
      setBudgetGoalDate(new Date())
      setBudgetGoal('0');
      setBudgetGoalType('1');
    }).catch((response) => {
      setShowGoal(false);
      alert(response.response.data);
    });
  }

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
        if (subCategory.length > 2) {
          const getCategoryID = await Axios.get(getUrl); //.data
          await Axios.post(postUrl, {
            SubCategoryName: subCategory,
            Balance: 0,
            UserID: userID,
            CategoryID: getCategoryID.data,
          });

          if (balance > 0) {
            await Axios.post(budgetUrl,
                {
                  Amount: balance,
                  BudgetDate: moment().format('YYYY-MM-DD'),
                  FromSubCategory: 'AvailableFunds',
                  ToSubCategory: subCategory,
                  UserID: userID,
                });
          }
          if (budgetGoalType !== '' && budgetGoal > 0 || showGoal === false) {
            insertBudgetGoal();
          };
          setOpen(false);
          setSubCategory('');
          setBalance(0);
          setSelectedCategory('');
        } else {
          alert('The subcategory name must be at least three characters long');
        }
      } else {
        alert('Category name and Sub Category name can not be the same');
      }
    } catch (response) {
      alert(response.response.data);
    }
  };

  const getUserGoals = () => {
    const userID = localStorage.getItem('UserID');
    const baseUrl = `http://localhost:3001/goal/${userID}/get-goal-amounts`;
    const updatedArray = [];
    Axios.get(baseUrl).then((response) => {
      for (let x = 0; x < response.data.length; x++) {
        const budgetGoal = response.data[x].Amount;
        //const budgeType = response.data[x].Type;
       // const budgetDate = response.data[x].Date;
          const subCategory = response.data[x].SubCategoryName;
        updatedArray.push({
          value: subCategory,
          budgetGoal: budgetGoal,
        });
        }
      setgoalsList(updatedArray);
    }).catch((response) => {
      alert(response.response.data);
    });
  }

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
      alert(response.response.data);
    });
  };

  useEffect(() => {
    getUserGoals();
  }, [open]);

  React.useEffect(() => {
    getUserCategories();
  }, [open]);

  return (
      <div className="subcategory-button">
        <Button id="subcategory-button-1" onClick={handleClickOpen}>
          <AddCircleOutline/> Add subcategory
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

            <FormControlLabel control={<Switch default/>}
                              label="Add a budget goal?"
                              value="true"
                              onChange={(e) => setShowGoal(!showGoal)}/>

            {showGoal && (
                <div>

                  <DialogContentText>
                    (Optional) Here you can set a budget goal for a subcategory.
                    You
                    can
                    select a single
                    time goal, a monthly amount to save or assign a future
                    date as a
                    deadline for amount saved.
                  </DialogContentText>


                  <RadioGroup name="select-budget-goal-type"
                              defaultValue="single"
                              aria-labelledby="subcategory-button-1"
                              onChange={(e) => setBudgetGoalType(e.target.value)}>

                    <FormControlLabel control={<Radio/>}
                                      label="Monthly Saving Goal"
                                      value="1"/>
                    <FormControlLabel control={<Radio/>} label="Save by Date"
                                      value="2"/>
                    {budgetGoalType === '2' && (
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="MM/YYYY"
                                value={budgetGoalDate}
                                onChange={date => setBudgetGoalDate(date)}
                                renderInput={(params: TextFieldProps) => {
                                  return <TextField {...params}/>;
                                }}
                                views={['month', 'year']}
                                showDaysOutsideCurrentMonth
                            />
                          </LocalizationProvider>
                        </div>

                    )}
                    <FormControlLabel control={<Radio/>}
                                      label="Target Balance"
                                      value="3"/>

                  </RadioGroup>


                  <TextField
                      autoFocus
                      margin="dense"
                      id="budgetGoal"
                      label="Budget goal amount"
                      fullWidth
                      inputProps={{maxLength: 20}}
                      value={budgetGoal}
                      variant="filled"
                      onChange={(event) => {
                        setBudgetGoal(event.target.value);
                      }}
                  />
                </div>)}
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
