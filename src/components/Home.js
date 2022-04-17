import PersistentDrawerLeft from "./NavBar";
import { Outlet, Link } from "react-router-dom";
import AddRestaurantModal from "./actions/AddRestaurantModal";
import { Typography } from "@mui/material";
import { useUser } from "../contexts/UserContext";

export default function Home() {
  const { userStatus } = useUser();
  const { loggedInStatus, user } = userStatus;
  return (
    <>
      <PersistentDrawerLeft></PersistentDrawerLeft>
      <Typography>Welcome, Guest</Typography>
      <Typography>You are currently logged in as: {loggedInStatus}</Typography>
      <Link to="/login">Login</Link> <Link to="/register">Register</Link>{" "}
      <Link to="/dashboard">Dashboard</Link>{" "}
      <Link to="/restaurants">Random Restaurants</Link>{" "}
      <Link to="/styletest">Style Test</Link> <Outlet />
      <AddRestaurantModal></AddRestaurantModal>
    </>
  );
}
