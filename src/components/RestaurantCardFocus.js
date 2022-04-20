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
  const [reviews, setReviews] = useState([]);
  const [openReviews, setOpenReviews] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [userReview, setUserReview] = useState(false);

  const { userStatus } = useUser();
  const { userNames } = useUser();

  const { restaurants } = useRestaurants();
  const [restaurant, setRestaurant] = useState({});

  const [ratings, setRatings] = useState([]);
  const [openRatings, setOpenRatings] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

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
    console.log(ratings);
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
    console.log(userRating);
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

  //get ratings
  useEffect(() => {
    const handleGetRatings = () => {
      fetch(
        `http://localhost:3000/api/v1/restaurants/${restaurant?.id}/ratings`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRatings(data);
        })
        .catch((error) => console.log(error));
    };
    handleGetRatings();
  }, [restaurant]);

  //average rating
  useEffect(() => {
    const handleGetAverageRating = () => {
      const ratingsArray = ratings.map((rating) => rating.value);
      const sum = ratingsArray.reduce((a, b) => a + b, 0);
      setAverageRating(sum / ratingsArray.length);
      console.log(ratingsArray);
    };
    handleGetAverageRating();
  }, [ratings]);

  //user rating
  useEffect(() => {
    const handleGetUserRating = () => {
      const ratingObj = ratings.find(
        (rating) => rating.user_id === userStatus.user.id
      );
      console.log(ratingObj);
      if (ratingObj) {
        setUserRating(ratingObj.value);
      } else {
        setUserRating(0);
      }
    };
    handleGetUserRating();
  }, [ratings, userStatus]);

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

      <Rating name="read-only" value={averageRating} precision={0.5} readOnly />
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
              <Card
                key={index}
                sx={{ maxWidth: 3 / 4, height: "200px", bgcolor: "#e3f2fd" }}
              >
                <CardActionArea>
                  <CardContent>
                    {/* TODO: get user names based on user_id -> need a GET on users */}
                    <Typography>
                      User:{" "}
                      {
                        userNames.find((user) => user.id === review.user_id)
                          .name
                      }
                    </Typography>
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
          <Typography sx={{ p: 1 }}>Your review: </Typography>
          <Card sx={{ p: 2, height: "200px" }}>
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
            <Typography>You must be logged in to add a review!</Typography>
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

      <Typography>Your current rating:</Typography>
      {userStatus.loggedInStatus === "NOT_LOGGED_IN" ? (
        <Box>
          <Typography>You must be logged in to give a rating!</Typography>
          <Rating value={0} precision={0.5}></Rating>
        </Box>
      ) : (
        <Box>
          <Rating value={userRating} precision={0.5}></Rating>
        </Box>
      )}

      {userStatus.loggedInStatus === "NOT_LOGGED_IN" && (
        <Typography>You must be logged in to edit this Restaurant!</Typography>
      )}

      <EditRestaurantModal></EditRestaurantModal>
      <Link to="/">Home</Link>
    </>
  );
}

export default RestaurantCardFocus;
