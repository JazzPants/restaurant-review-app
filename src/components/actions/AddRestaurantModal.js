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
// import { useRestaurants } from "../contexts/RestaurantsContext";

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

  //make Restaurant object with useRefs
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddRestaurant();
    //TODO: submission succesful message
    console.log("submitted?");
    handleClose();
  };

  // useEffect(() => {
  //   handleAddRestaurant();
  // }, []);

  const handleAddRestaurant = () => {
    //fetch POST with object containing restaurant refs
    fetch("http://localhost:3000/api/v1/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //restaurant object here
      body: JSON.stringify({
        user_id: 1,
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
        location: locationRef.current.value,
        pricing: pricingRef.current.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
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
              <h2>Add a Restaurant</h2>
              <div>
                <Typography>Restaurant</Typography>
                {/* <input></input> */}
                <TextField
                  inputRef={nameRef}
                  label="restaurant name"
                  name="restaurant[name]"
                  helperText="helper text!!"
                  required
                  // placeholder="What is the restaurant name?"
                />
              </div>
              <div>
                {/* <Typography>Description</Typography> */}
                {/* <TextareaAutosize minRows={3} name="restaurant" /> */}
                <Typography>Description</Typography>
                <TextField
                  inputRef={descriptionRef}
                  label="description"
                  InputProps={{ style: { fontSize: 40 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  name="restaurant[description]"
                  multiline
                  rows={3}
                  required
                />
              </div>
              <div>
                <Typography>Category</Typography>
                <TextField
                  inputRef={categoryRef}
                  label="food category"
                  name="restaurant[category]"
                  required
                />
              </div>
              <div>
                <Typography>Location</Typography>
                <TextField
                  inputRef={locationRef}
                  label="location"
                  name="restaurant[location]"
                  required
                />
              </div>
              <div>
                <Typography>Pricing</Typography>
                <TextField
                  inputRef={pricingRef}
                  label="dish pricing"
                  name="restaurant[pricing]"
                  placeholder="low, average or high?"
                  required
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
