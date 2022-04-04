import PersistentDrawerLeft from "./NavBar";
import { Outlet, Link } from "react-router-dom";
import RestaurantCardsList from "./RestaurantCardsList";

export default function Home() {
  return (
    <>
      <PersistentDrawerLeft></PersistentDrawerLeft>
      <Link to="/restaurants">Random Restaurants</Link>{" "}
      <Link to="/styletest">Style Test</Link> <Outlet />
    </>
  );
}
