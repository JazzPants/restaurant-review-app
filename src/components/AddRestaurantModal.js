import {
  Modal,
  Dialog,
  TextField,
  Box,
  Typography,
  FormHelperText,
  TextareaAutosize,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";

export default function AddRestaurantModal() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const locationRef = useRef();
  const pricingRef = useRef();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  const handleAddRestaurant = () => {
    //fetch POST with object containing restaurant refs
  };

  return (
    <div>
      <Button type="Button" onClick={handleOpen}>
        Add Restaurant
      </Button>
      <Dialog open={open}>
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <div>
                <Typography>Restaurant</Typography>
                {/* <input></input> */}
                <TextField
                  label="restaurant name"
                  name="restaurant[name]"
                  helperText="helper text!!"
                  // placeholder="What is the restaurant name?"
                />
              </div>
              <div>
                {/* <Typography>Description</Typography> */}
                {/* <TextareaAutosize minRows={3} name="restaurant" /> */}
                <Typography>Description</Typography>
                <TextField
                  label="description"
                  InputProps={{ style: { fontSize: 40 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  name="restaurant[description]"
                  multiline
                  rows={3}
                />
              </div>
              <div>
                <Typography>Category</Typography>
                <TextField label="food category" name="restaurant[category]" />
              </div>
              <div>
                <Typography>Location</Typography>
                <TextField label="location" name="restaurant[location]" />
              </div>
              <div>
                <Typography>Pricing</Typography>
                <TextField
                  label="dish pricing"
                  name="restaurant[pricing]"
                  placeholder="low, average or high?"
                />
              </div>
              <div>
                <Button variant="outlined" type="submit">
                  Submit
                </Button>
                <Button variant="outlined">Save</Button>
                <Button variant="outlined" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Stack>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}
