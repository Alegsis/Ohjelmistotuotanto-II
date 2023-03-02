import React, { useState, Select } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function AddSubCategory() {
  const [open, setOpen] = React.useState(false);
  const [subCategory, setsubCategory] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setsubCategory("");
    setBalance("");
    setSelectedCategory("");
  };

  const baseUrl = "http://localhost:3001/subcategory/new-subcategory";

  const handleAddSubCategory = () => {
    //Pitää tarkastaa aikavyöhyke oikein
    const today = new Date().toISOString().slice(0, 10);
    const userID = localStorage.getItem("UserID");
    console.log(today);
    console.log(userID);

    Axios.post(baseUrl, {
      SubCategoryName: subCategory,
      Balance: balance,
      UserID: userID,
    }).then((response) => {
      alert("successful insert");

      setOpen(false);
      setsubCategory("");
      setBalance("");
      setSelectedCategory("");
    });
  };

  const getUserCategories = () => {
    const userID = localStorage.getItem("UserID");
    const baseUrl = `http://localhost:3001/category/${userID}`;
    const updatedArray = [];
    Axios.get(baseUrl)
      .then(function (response) {
        for (let x = 0; x < response.data.length; x++) {
          const category = response.data[x].CategoryName;
          updatedArray.push({ value: category });
        }
        setCategoryList([]);
        setCategoryList(updatedArray);
      
        
      })
  

      .catch((response) => {
        console.log(response);
      });
  };


  React.useEffect(() => {
    getUserCategories();
  }, []);

  return (
    <div className="subcategory-button">
      <Button id="subcategory-button-1" onClick={handleClickOpen}>
        (+) Add sub category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create sub category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a sub category, you need to select a category and input a
            sub category name. Optionally You can also add a balance for the
            subcategory.
          </DialogContentText>

          <FormControl required margin="dense">
            <InputLabel id="SubCategory-type-label">Sub Category</InputLabel>
            <Select
              style={{ height: "50px", width: "200px" }}
              labelId="SubCategory-type-label"
              id="SubCategory"
              fullWidth
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(event.target.value);
              }}
            >
             
             {categoryList.map((category) => {
  console.log(category.value);
  return (
    <MenuItem key={category.value} value={category.value}>
      {category.value}
    </MenuItem>
  );
})}
            </Select>
          </FormControl>
          
          <TextField
            required
            autoFocus
            margin="dense"
            id="sub-category"
            label="Sub Category"
            fullWidth
            inputProps={{ maxLength: 50 }}
            value={subCategory}
            variant="filled"
            onChange={(event) => {
              setsubCategory(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="balance"
            label="Balance"
            fullWidth
            inputProps={{ maxLength: 20 }}
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
}
