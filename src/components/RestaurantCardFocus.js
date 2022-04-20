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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  const [openEditReview, setOpenEditReview] = useState(false);

  const { userStatus } = useUser();
  const { userNames } = useUser();

  const { restaurants } = useRestaurants();
  const [restaurant, setRestaurant] = useState({});

  const [ratings, setRatings] = useState([]);
  const [openRatings, setOpenRatings] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [openEditRating, setOpenEditRating] = useState(false);
  const [openEditRatingConfirmation, setOpenEditRatingConfirmation] =
    useState(false);
  const [ratingConfirmation, setRatingConfirmation] = useState("NO");
  const [editRatingValue, setEditRatingValue] = useState(0);

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

  //set restaurant card focus object
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

  //handleGetUserReviews
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
    console.log(`Guest's or ${userStatus.user.name}'s rating:`, userRating);
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
  //#
  //TODO: handleEditReview
  //handleSubmitEditReview
  //#

  //TODO: handleEditRating
  //get user rating object
  //PATCH to database based on user rating object id (goes at the end of the URL) NOT user_id or restaurant_id
  //handleSubmitEditRating
  //submit and prevent default
  const handleEditRating = (event) => {
    setOpenEditRatingConfirmation(true);
    setEditRatingValue(Number(event.target.value));
    console.log(userStatus);
    console.log(event.target.value);
  };

  const handleOpenEditRatingConfirmation = () => {
    setOpenEditRatingConfirmation(true);
  };

  const handleCloseEditRatingConfirmation = () => {
    setOpenEditRatingConfirmation(false);
    setRatingConfirmation("NO");
    console.log(editRatingValue);
  };

  const handleSubmitEditRating = () => {
    setOpenEditRatingConfirmation(false);
    setRatingConfirmation("YES");
    const ratingObj = ratings.find(
      (rating) => rating.user_id === userStatus.user.id
    );
    console.log(ratingObj);
    const ratingId = ratingObj.id;
    console.log(ratingId);
    console.log("sending...");
    //fetch PATCH
    //ratingValue
    fetch(
      `http://localhost:3000/api/v1/restaurants/${restaurant.id}/ratings/${ratingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        //restaurant object here
        body: JSON.stringify({
          rating: {
            value: editRatingValue,
          },
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  //GET ratings fetch
  useEffect(() => {
    const handleGetRatings = () => {
      fetch(
        `http://localhost:3000/api/v1/restaurants/${restaurant?.id}/ratings`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("ratings data", data);
          setRatings(data);
        })
        .catch((error) => console.log(error));
    };
    handleGetRatings();
  }, [restaurant]);

  //average rating
  //material ui Rating component will handle the rounding!
  useEffect(() => {
    const handleGetAverageRating = () => {
      const ratingsArray = ratings.map((rating) => rating.value);
      const sum = ratingsArray.reduce((a, b) => a + b, 0);
      setAverageRating(sum / ratingsArray.length);
    };
    handleGetAverageRating();
  }, [ratings]);

  //single user rating find
  useEffect(() => {
    const handleGetUserRating = () => {
      const ratingObj = ratings.find(
        (rating) => rating.user_id === userStatus.user.id
      );
      // console.log("rating object undefined if user not logged in", ratingObj);
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
      <Box sx={{ p: 3, border: 2, borderColor: "secondary.main" }}>
        <Box>
          <h1>Restaurant: {restaurant?.name}</h1>
          <p>Category: {restaurant?.category}</p>
          <h2>{restaurant?.name}</h2>
          <p>{restaurant?.description}</p>
          <Typography>Average Rating:</Typography>

          <Rating
            name="read-only"
            value={averageRating}
            precision={0.5}
            readOnly
          />
          <p>Location: {restaurant?.location}</p>
          {/* <p>Pricing: {restaurant?.pricing}</p> */}
        </Box>
        <p>Reviews:</p>
        <Button variant="outlined" onClick={handleShowReviews}>
          Show
        </Button>
        {openReviews && (
          <Box>
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
                      {/* if rating exists show users rating, else render "That user hasn't rated this restaurant yet" */}
                      <Typography>
                        Rating:{" "}
                        {/* {
                        ratings.find(
                          (rating) => rating.user_id === review.user_id
                        ).value
                      } */}
                        {/* {console.log(ratings)} */}
                        {ratings.find(
                          (rating) => rating.user_id === review.user_id
                        ) ? (
                          <Rating
                            name="read-only"
                            value={
                              ratings.find(
                                (rating) => rating.user_id === review.user_id
                              ).value
                            }
                            precision={0.5}
                            readOnly
                          />
                        ) : (
                          <span>User has not rated this restaurant yet!</span>
                        )}
                        {/* {ratings.map(
                        (rating) => rating.user_id === review.user_id
                      )} */}
                      </Typography>
                      <Typography>{review.content}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            )}
          </Box>
        )}
        <p>Gallery:</p>
        <p>Gallery:</p>
        <p>Gallery:</p>
        {/* if review exists for user, display their review, AND exclude the review box */}
        {userReview ? (
          <Box
            sx={{ border: 2, borderColor: "secondary.main", minHeight: 200 }}
          >
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
          <Box
            sx={{
              paddingLeft: 2,
              border: 2,
              borderColor: "secondary.main",
              minHeight: 200,
            }}
          >
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

        <Box id="rating-box" sx={{ p: 2 }}>
          <Typography>Your Rating:</Typography>
          {userStatus.loggedInStatus === "NOT_LOGGED_IN" ? (
            <Box>
              <Typography>You must be logged in to give a rating!</Typography>
              <Rating value={0} precision={0.5}></Rating>
            </Box>
          ) : (
            <Box>
              <Typography>Your current rating:</Typography>
              <Rating value={userRating} precision={0.5}></Rating>
            </Box>
          )}
          {/* logged in to show edit rating box */}
          <Stack justifyContent="center" alignItems="center">
            <Typography>Edit Rating:</Typography>
            {userStatus.loggedInStatus === "NOT_LOGGED_IN" ? (
              <Stack justifyContent="center" alignItems="center">
                <Rating disabled></Rating>
                <Typography>
                  You must be logged in to edit your rating!
                </Typography>
              </Stack>
            ) : (
              <Box>
                <Rating
                  size="large"
                  value={editRatingValue}
                  precision={0.5}
                  onChange={handleEditRating}
                ></Rating>
                <Dialog
                  open={openEditRatingConfirmation}
                  onClose={handleCloseEditRatingConfirmation}
                >
                  <DialogTitle>Edit Rating:</DialogTitle>
                  <DialogContent>
                    Change your rating to {editRatingValue} stars?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleSubmitEditRating}>Yes</Button>
                    <Button onClick={handleCloseEditRatingConfirmation}>
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </Stack>
        </Box>

        {userStatus.loggedInStatus === "NOT_LOGGED_IN" && (
          <Typography>
            You must be logged in to edit this Restaurant!
          </Typography>
        )}

        <EditRestaurantModal></EditRestaurantModal>
        <Link to="/">Home</Link>
      </Box>
    </>
  );
}

export default RestaurantCardFocus;
