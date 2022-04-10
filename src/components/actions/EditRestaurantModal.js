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
import { useParams } from "react-router-dom";
import { useRestaurants } from "../../contexts/RestaurantsContext";

export default function EditRestaurantModal() {
  //get values for current restaurant and prefill form
  const { restaurants } = useRestaurants();
  const [restaurant, setRestaurant] = useState();
  const params = useParams();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const locationRef = useRef();
  const pricingRef = useRef();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log(`Restaurant id is: ${restaurant.id}`);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("close modal");
  };

  useEffect(() => {
    if (restaurants) {
      const restaurantObj = restaurants.find(
        (element) => element.name === params.restaurantId
      );
      setRestaurant(restaurantObj);
    }
  }, [restaurants]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEditRestaurant();
    //TODO: submission succesful message
    console.log("submitting restaurant...");
    handleClose();
  };

  // useEffect(() => {
  //   handleAddRestaurant();
  // }, []);

  const handleEditRestaurant = () => {
    //fetch PATCH object of current restaurant ID
    fetch(`http://localhost:3000/api/v1/restaurants/${restaurant.id}`, {
      method: "PATCH",
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
        Edit Restaurant
      </Button>
      <Dialog open={open}>
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <h2>Edit this Restaurant</h2>
              <div>
                <Typography>Restaurant</Typography>
                {/* <input></input> */}
                <TextField
                  inputRef={nameRef}
                  name="restaurant[name]"
                  defaultValue={restaurant?.name}
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
                  InputProps={{ style: { fontSize: 14 } }}
                  name="restaurant[description]"
                  defaultValue={restaurant?.description}
                  multiline
                  rows={3}
                  required
                />
              </div>
              <div>
                <Typography>Category</Typography>
                <TextField
                  inputRef={categoryRef}
                  defaultValue={restaurant?.category}
                  name="restaurant[category]"
                  required
                />
              </div>
              <div>
                <Typography>Location</Typography>
                <TextField
                  inputRef={locationRef}
                  name="restaurant[location]"
                  defaultValue={restaurant?.location}
                  required
                />
              </div>
              <div>
                <Typography>Pricing</Typography>
                <TextField
                  inputRef={pricingRef}
                  name="restaurant[pricing]"
                  defaultValue={restaurant?.pricing}
                  helperText="$,$$,$$$"
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
