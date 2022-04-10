import { useParams } from "react-router-dom";
// import { getRestaurant } from "../dummydata";
import { Link } from "react-router-dom";
import {
  Typography,
  Rating,
  Box,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useRestaurants } from "../contexts/RestaurantsContext";
import EditRestaurantModal from "./actions/EditRestaurantModal";

//shows in-depth look at the restaurant
//top 3 dishes, menu(pop open), top-voted description, more reviews
//pass props again all the way down from RestaurantCardsList to get all info (use redux to stop prop drilling)
function RestaurantCardFocus() {
  const [showAddReview, setShowAddReview] = useState(false);

  const handleShowAddReview = () => {
    setShowAddReview((prev) => !prev);
  };
  //use params in "find" method for Restaurants Array Context
  //useState
  //restaurant, SetRestaurant
  //params, SetParams

  // const [restaurant, SetRestaurant] = useState();
  const { restaurants } = useRestaurants();
  const [restaurant, setRestaurant] = useState({});
  const params = useParams();
  console.log(restaurants);
  console.log(params.restaurantId);

  useEffect(() => {
    if (restaurants) {
      const restaurantObj = restaurants.find(
        (element) => element.name === params.restaurantId
      );
      setRestaurant(restaurantObj);
    }
  }, [restaurants]);

  const handleSubmitReview = () => {
    handleAddReview();
    console.log("Submitting review...");
  };

  const handleAddReview = () => {
    // fetch();
  };

  // const restaurantsObj = useRestaurants();
  // const restaurants = restaurantsObj.restaurants;
  // console.log(restaurants);

  // console.log(restaurant);

  //get ratings
  //get reviews
  // let restaurant = getRestaurant(params.restaurantId);
  //conditional rendering to wait for data to be retrieved (band-aid fix?)
  //&& and ?.
  //modify context to wait for fetch (Loading...)
  return (
    <>
      <h1>Restaurant: {restaurant?.name}</h1>
      <p>Category: {restaurant?.category}</p>
      <h2>{restaurant?.name}</h2>
      <p>{restaurant?.description}</p>
      <Typography>Average Rating:</Typography>
      <Rating name="read-only" value={restaurant?.rating} readOnly />
      <p>Location: {restaurant?.location}</p>
      <p>Pricing: {restaurant?.pricing}</p>
      <p>Reviews:</p>
      <p>Gallery:</p>
      <Box>
        <p>Add Review:</p>
        <Button variant="outlined" onClick={handleShowAddReview}>
          +
        </Button>
        {showAddReview && (
          <form>
            <Stack>
              {" "}
              <TextField
                // inputRef={reviewRef}
                label="Review content"
                InputProps={{ style: { fontSize: 14 } }}
                name="restaurant[review]"
                multiline
                rows={3}
                required
              />
            </Stack>
            <Button variant="outlined">Submit Review</Button>
          </form>
        )}
      </Box>
      <p>Give Rating:</p>
      <EditRestaurantModal></EditRestaurantModal>
      <Link to="/">Home</Link>
    </>
  );
}

export default RestaurantCardFocus;
