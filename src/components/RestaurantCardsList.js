import RestaurantCard from "./RestaurantCard";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getRestaurants } from "../dummydata";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRestaurants } from "../contexts/RestaurantsContext";
import { Typography } from "@mui/material";

//map over data fetched from Rails API and display the Restaurants as Cards in a Grid
//pass fetched data as props into RestaurantCard(e.g. name, rating, description, reviews etc.)
//render those in RestaurantCard and RestaurantCardFocus
export default function RestaurantCardsList() {
  const { restaurants } = useRestaurants();
  const [categorisedRestaurants, setcategorisedRestaurants] = useState([]);
  //categories array for dropdown
  const [restaurantCategories, setRestaurantCategories] = useState(["All"]);
  //category to render
  const [restaurantCategory, setRestaurantCategory] = useState("");
  // console.log(restaurants);

  //handleRestaurantCategory = (event) => {
  // event.target.value

  // }
  useEffect(() => {
    const arrayWithDuplicateCategories = restaurants.map(
      (restaurant) => restaurant.category
    );
    const arrayWithUniqueCategories = [
      ...new Set(arrayWithDuplicateCategories),
    ];
    const arrayTest = ["hello"];
    console.log(restaurantCategories);
    // console.log(arrayWithDuplicateCategories);
    console.log(arrayWithUniqueCategories);
    setRestaurantCategories((prevState) => [
      ...prevState,
      ...arrayWithUniqueCategories,
    ]);
  }, [restaurants]);

  const handleRestaurantCategory = (event) => {
    setRestaurantCategory(event.target.value);
    console.log(event.target.value);
    console.log(restaurantCategories);
  };
  //render dropdown
  //all
  //random
  //ramen
  //pizza
  //burgers
  //pasta
  //coffee
  //   {/* {arrayWithUniqueCategories.map((restaurant, index) => (
  //   <MenuItem key={index} value={restaurant.category}>
  //     {restaurant.category}
  //   </MenuItem>
  // ))} */}
  return (
    <>
      {/* {console.log(restaurantCategory)} */}
      <Link to="/">Home</Link>
      <Typography variant="h4">Find Restaurants</Typography>
      <FormControl sx={{ m: 1, minWidth: 1 / 4 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={restaurantCategory}
          label="Category"
          onChange={handleRestaurantCategory}
          // value is "out of control", need to handle value "category"
        >
          {restaurantCategories &&
            restaurantCategories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {restaurants.map((restaurant, index) => (
          <Grid key={index} item xs={6}>
            <Link
              to={`/restaurant/${restaurant.name}`}
              style={{ textDecoration: "none" }}
            >
              <RestaurantCard
                name={restaurant.name}
                description={restaurant.description}
                category={restaurant.category}
                rating={restaurant.rating}
                location={restaurant.location}
                pricing={restaurant.pricing}
              ></RestaurantCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
