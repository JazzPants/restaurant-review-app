import { useParams } from "react-router-dom";
// import { getRestaurant } from "../dummydata";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { useContext } from "react";
import { useRestaurants } from "../contexts/RestaurantsContext";

//shows in-depth look at the restaurant
//top 3 dishes, menu(pop open), top-voted description, more reviews
//pass props again all the way down from RestaurantCardsList to get all info (use redux to stop prop drilling)
function RestaurantCardFocus() {
  //use params in "find" method for Restaurants Array Context
  let params = useParams();
  console.log(params.restaurantId);
  const restaurantsObj = useRestaurants();
  const restaurants = restaurantsObj.restaurants;
  console.log(restaurants);
  const restaurant = restaurants.find(
    (element) => element.name === params.restaurantId
  );
  console.log(restaurant);

  //get ratings
  //get reviews
  // let restaurant = getRestaurant(params.restaurantId);
  return (
    <>
      <h1>Restaurant: {restaurant.name}</h1>
      <p>Category: {restaurant.category}</p>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <Typography>Rating:</Typography>
      <Rating name="read-only" value={restaurant.rating} readOnly />
      <p>Location: {restaurant.location}</p>
      <p>Pricing: {restaurant.pricing}</p>
      <Link to="/">Home</Link>
    </>
  );
}

export default RestaurantCardFocus;
