import RestaurantCard from "./RestaurantCard";
import { Grid } from "@mui/material";
import { getRestaurants } from "../dummydata";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

//map over data fetched from Rails API and display the Restaurants as Cards in a Grid
//pass fetched data as props into RestaurantCard(e.g. name, rating, description, reviews etc.)
//render those in RestaurantCard and RestaurantCardFocus
export default function RestaurantCardsList() {
  // let restaurants = getRestaurants();
  //useState
  const [restaurants, setRestaurants] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);

  //useEffect
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data));
  }, []);

  //fetch ratings

  // const getRestaurants = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/v1/restaurants");
  //     const data = await response.json();
  //     console.log(data);
  //     return setRestaurants(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <Link to="/">Home</Link>
      <div>Random Restaurants!</div>
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
              <div>Hello {restaurant.name}</div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
