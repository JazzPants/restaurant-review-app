import { useRestaurants } from "../contexts/RestaurantsContext";
import {
  Stack,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { common } from "@mui/material/colors";

export default function ReviewsCardsList() {
  const [reviews, setReviews] = useState([]);
  const { restaurants } = useRestaurants();
  const [restaurant, setRestaurant] = useState({});
  const params = useParams();

  useEffect(() => {
    if (restaurants) {
      const restaurantObj = restaurants.find(
        (element) => element.name === params.restaurantId
      );
      setRestaurant(restaurantObj);
    }
  }, [params.restaurantId, restaurants]);

  useEffect(() => {
    //fetch GET reviews
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
  }, [restaurants, restaurant?.id]);

  //TODO: execute a new fetch when we switch restaurants
  return (
    <>
      {" "}
      <Stack>
        {reviews.length === 0 ? (
          <Typography>No reviews exist for this restaurant yet!</Typography>
        ) : (
          <p>Loading...</p>
          // reviews.map((review, index) => (
          //   <Card key={index} sx={{ maxWidth: 3 / 4, height: "150px" }}>
          //     <CardActionArea>
          //       <CardContent>
          //         <Typography>User: {review.user_id}</Typography>
          //         <Typography>{review.content}</Typography>
          //       </CardContent>
          //     </CardActionArea>
          //   </Card>
          // ))
        )}
      </Stack>
    </>
  );
}
