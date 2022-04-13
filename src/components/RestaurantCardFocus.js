import { useParams } from "react-router-dom";
// import { getRestaurant } from "../dummydata";
import { Link } from "react-router-dom";
import {
  Typography,
  Rating,
  Box,
  Stack,
  Card,
  TextField,
  Button,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRestaurants } from "../contexts/RestaurantsContext";
import EditRestaurantModal from "./actions/EditRestaurantModal";

//shows in-depth look at the restaurant
//top 3 dishes, menu(pop open), top-voted description, more reviews
//pass props again all the way down from RestaurantCardsList to get all info (use redux to stop prop drilling)

//TO-DO:
//if review exists -> Your review:, else Add review
//get ratings
//get reviews

function RestaurantCardFocus() {
  const [showAddReview, setShowAddReview] = useState(false);

  const [reviews, setReviews] = useState([]);
  const { restaurants } = useRestaurants();
  const [restaurant, setRestaurant] = useState({});
  const params = useParams();

  //open close add-review box
  const handleShowAddReview = () => {
    setShowAddReview((prev) => !prev);
    console.log(restaurants);
    console.log(params.restaurantId);
    console.log(restaurant?.id);
    console.log(reviews);
  };

  useEffect(() => {
    if (restaurants) {
      const restaurantObj = restaurants.find(
        (element) => element.name === params.restaurantId
      );
      setRestaurant(restaurantObj);
    }
    handleGetReviews();
  }, [restaurants]);

  //fetch GET reviews
  const handleGetReviews = () => {
    fetch(`http://localhost:3000/api/v1/restaurants/${restaurant?.id}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmitReview = () => {
    handleAddReview();
    console.log("Submitting review...");
  };

  //fetch POST reviews
  const handleAddReview = () => {
    // fetch() POST and send object
    //user id
    //review content
    //useParams -> restaurant ID
  };

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
      <Stack>
        {reviews.map((review, index) => (
          <Card key={index} sx={{ maxWidth: 3 / 4, height: "150px" }}>
            <CardActionArea>
              <CardContent>
                <Typography>User: {review.user_id}</Typography>
                <Typography>{review.content}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
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
