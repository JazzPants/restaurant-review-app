import RestaurantCard from "./RestaurantCard";
import { Grid } from "@mui/material";

//map over data fetched from Rails API and display the Restaurants as Cards in a Grid
export default function RestaurantCardsList() {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <RestaurantCard></RestaurantCard>
      </Grid>
      <Grid item xs={6}>
        <RestaurantCard></RestaurantCard>
      </Grid>
      <Grid item xs={6}>
        <RestaurantCard></RestaurantCard>
      </Grid>
      <Grid item xs={6}>
        <RestaurantCard></RestaurantCard>
      </Grid>
    </Grid>
  );
}
