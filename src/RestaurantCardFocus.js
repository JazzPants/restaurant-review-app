import { useParams } from "react-router-dom";

//shows in-depth look at the restaurant
//top 3 dishes, menu(pop open), top-voted description, more reviews
//pass props again all the way down from RestaurantCardsList to get all info (use redux to stop prop drilling)
function RestaurantCardFocus() {
  let params = useParams();
  return (
    <>
      <h1>{params.restaurantId}</h1>
    </>
  );
}

export default RestaurantCardFocus;
