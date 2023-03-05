import React, { useState } from 'react';
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
import {Select} from '@mui/material';

const MoveDeleteSubcategory = () => {
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
    const handleDelete = () => {


    };

    const handleEditSubCategory = () => {
        const userID = localStorage.getItem("UserID");

        const postUrl = "http://localhost:3001/subcategory/new-subcategory";
        const getUrl = `http://localhost:3001/category/user-${userID}/find-categoryid/categoryname-${selectedCategory}`

        Axios.get(getUrl)
            .then((response) => {
                const categoryID = response.data;

                Axios.post(postUrl, {
                    SubCategoryName: subCategory,
                    Balance: balance,
                    UserID: userID,
                    CategoryID: categoryID
                }).then((response) => {
                    alert("successful insert");
                })
                setOpen(false);
                setsubCategory("");
                setBalance("");
                setSelectedCategory("");
            }).catch((response) => {
            alert("Something went wrong");
            console.log(response);
        })
    };

    const getUserCategories = () => {
        const userID = localStorage.getItem("UserID");
        const baseUrl = `http://localhost:3001/category/${userID}`;
        const updatedArray = [];
        Axios.get(baseUrl)
            .then((response) => {
                for (let x = 0; x < response.data.length; x++) {
                    if(response.data[x].CategoryName.toString() !== 'Available'){
                        const category = response.data[x].CategoryName;
                        updatedArray.push({ value: category });
                    }
                }
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
                (+) edit subcategory
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit subcategory</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit a sub category, you need to select a subcategory. You can change category or subcategorys
                        name if it is needed. It is also possible to delete subcategory by pressing the delete button.
                    </DialogContentText>

                    <FormControl required margin="dense">
                        <InputLabel id="Category-type-label">SubCategory</InputLabel>
                        <Select
                            style={{ height: "50px", width: "200px" }}
                            labelId="Category-type-label"
                            id="Category"
                            fullWidth
                            value={selectedCategory}
                            onChange={(event) => {
                                setSelectedCategory(event.target.value);
                            }}
                        >
                        </Select>
                    </FormControl>

                    <FormControl required margin="dense">
                        <InputLabel id="Category-type-label">Category</InputLabel>
                        <Select
                            style={{ height: "50px", width: "200px" }}
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
                        label="Subcategory name"
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
                    <Button onClick={handleDelete} className="delete-button">
                        Delete
                    </Button>
                    <Button onClick={handleClose} className="cancel-button">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSubCategory} className="Save-button">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MoveDeleteSubcategory