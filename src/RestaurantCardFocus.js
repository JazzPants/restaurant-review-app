import { useParams } from "react-router-dom";
import { getRestaurant } from "./dummydata";
import { Link } from "react-router-dom";

//shows in-depth look at the restaurant
//top 3 dishes, menu(pop open), top-voted description, more reviews
//pass props again all the way down from RestaurantCardsList to get all info (use redux to stop prop drilling)
function RestaurantCardFocus() {
  let params = useParams();
  let restaurant = getRestaurant(params.restaurantId);
  return (
    <>
      <p>Category: {restaurant.category}</p>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <p>Rating: {restaurant.rating}</p>
      <p>Location: {restaurant.location}</p>
      <p>Pricing: {restaurant.pricing}</p>
      <Link to="/">Home</Link>
    </>
  );
}

export default RestaurantCardFocus;
