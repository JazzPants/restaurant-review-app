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
import { useState, useEffect, useRef } from "react";
import { useRestaurants } from "../contexts/RestaurantsContext";
import EditRestaurantModal from "./actions/EditRestaurantModal";
import ReviewsCardsList from "./ReviewsCardsList";
import { useUser } from "../contexts/UserContext";

//shows in-depth look at the restaurant
//top 3 dishes, menu(pop open), top-voted description, more reviews
//pass props again all the way down from RestaurantCardsList to get all info (use redux to stop prop drilling)

//TO-DO:
//if review exists -> Your review:, else Add review
//get ratings
//get reviews

function RestaurantCardFocus() {
  const [showAddReview, setShowAddReview] = useState(false);
  const [userReview, setUserReview] = useState(false);

  const { userStatus } = useUser();

  const [reviews, setReviews] = useState([]);
  const [openReviews, setOpenReviews] = useState(false);
  const { restaurants } = useRestaurants();
  const [restaurant, setRestaurant] = useState({});
  const params = useParams();
  const reviewRef = useRef();
  // const [params, setParams] = useState(useParams());

  //open close add-review box
  const handleShowAddReview = () => {
    setShowAddReview((prev) => !prev);
    // console.log(restaurants);
    console.log(params.restaurantId);
    console.log(`restaurant id is: ${restaurant?.id}`);
    console.log(`user id is: ${userStatus.user.id}`);
  };

  useEffect(() => {
    if (restaurants) {
      const restaurantObj = restaurants.find(
        (element) => element.name === params.restaurantId
      );
      setRestaurant(restaurantObj);
    }
  }, [params.restaurantId, restaurants]); //whenever restaurants object changes, e.g. on fetch, re-render component

  //fetch GET reviews

  useEffect(() => {
    const handleGetReviews = () => {
      fetch(
        `http://localhost:3000/api/v1/restaurants/${restaurant?.id}/reviews`
      )
        .then((response) => response.json())
        .then((data) => {
          setReviews(data);
        })
        .catch((error) => console.log(error));
    };
    handleGetReviews();
  }, [restaurant]);

  useEffect(() => {
    const handleGetUserReview = () => {
      setUserReview(
        reviews.find((review) => review.user_id === userStatus.user.id)
      );
    };
    handleGetUserReview();
  }, [reviews, userStatus]);

  const handleShowReviews = () => {
    setOpenReviews(!openReviews);
    console.log(reviews);
  };

  //TODO: get content from textfield for review
  //fetch POST reviews
  const handleAddReview = () => {
    fetch(
      `http://localhost:3000/api/v1/restaurants/${restaurant?.id}/reviews`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: {
            content: reviewRef.current.value,
            user_id: userStatus.user.id,
            restaurant_id: restaurant?.id,
          },
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    // fetch() POST and send object
    //user id
    //review content
    //restaurantObj -> restaurant ID
  };

  const handleSubmitReview = (event) => {
    handleAddReview();
    console.log("Submitting review...");
    event.preventDefault();
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
      <Button variant="outlined" onClick={handleShowReviews}>
        Show
      </Button>
      {openReviews && (
        <div>
          {reviews.length === 0 ? (
            <Typography>No reviews exist for this restaurant yet!</Typography>
          ) : (
            reviews.map((review, index) => (
              <Card key={index} sx={{ maxWidth: 3 / 4, height: "150px" }}>
                <CardActionArea>
                  <CardContent>
                    <Typography>User: {review.user_id}</Typography>
                    <Typography>{review.content}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </div>
      )}
      <p>Gallery:</p>
      {/* if review exists for user, display their review, AND exclude the review box */}
      {userReview ? (
        <Box sx={{ border: 2, borderColor: "secondary.main", minHeight: 200 }}>
          <p>Your review: </p>
          <Card sx={{ maxWidth: 3 / 4, height: "150px" }}>
            {" "}
            <CardActionArea>
              <CardContent>
                <Typography>{userReview?.content}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ) : (
        <Box sx={{ border: 2, borderColor: "secondary.main", minHeight: 200 }}>
          <p>Add Review:</p>
          {userStatus.loggedInStatus === "NOT_LOGGED_IN" ? (
            showAddReview && (
              <Typography>You must be logged in to add a review!</Typography>
            )
          ) : (
            <div>
              {" "}
              {showAddReview && (
                <form>
                  <Stack>
                    {" "}
                    <TextField
                      inputRef={reviewRef}
                      label="Review content"
                      InputProps={{ style: { fontSize: 14 } }}
                      name="restaurant[review]"
                      multiline
                      rows={3}
                      required
                    />
                  </Stack>
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={handleSubmitReview}
                  >
                    Submit Review
                  </Button>
                </form>
              )}
            </div>
          )}
          <Button variant="outlined" onClick={handleShowAddReview}>
            +
          </Button>
        </Box>
      )}

      <p>Give Rating:</p>
      <EditRestaurantModal></EditRestaurantModal>
      <Link to="/">Home</Link>
    </>
  );
}

export default RestaurantCardFocus;
