import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Axios from "axios";

export default function AddCategory() {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategory("");
  };

  const baseUrl = "http://localhost:3001/category/new-category";

  const handleAddCategory = () => {
    //Pitää tarkastaa aikavyöhyke oikein
    const today = new Date().toISOString().slice(0, 10);
    const userID = localStorage.getItem("UserID");
    console.log(today);
    console.log(userID);

    Axios.post(baseUrl, {
      CategoryName: category,
      UserID: userID,
    }).then((response) => {
      alert("successful insert");

      setOpen(false);
      setCategory("");
    });
  };

  return (
    <div className="category-button">
      <Button id="category-button-1" onClick={handleClickOpen}>
        (+) New Category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a category, type it in the text field
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            fullWidth
            inputProps={{ maxLength: 50 }}
            value={category}
            variant="filled"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="cancel-button">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} className="Save-button">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
