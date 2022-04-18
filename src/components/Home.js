import PersistentDrawerLeft from "./NavBar";
import { Outlet, Link } from "react-router-dom";
import AddRestaurantModal from "./actions/AddRestaurantModal";
import { Box, Typography, Button } from "@mui/material";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

export default function Home() {
  const { userStatus } = useUser();
  const { loggedInStatus, user } = userStatus;
  const { checkLoginStatus } = useUser();
  const { handleLogout } = useUser();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);
  // const { name } = user;

  const handleLogoutClick = () => {
    fetch("http://localhost:3000/api/v1/logout", {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        console.log("log out api response", response);
      })
      .then((data) => {
        console.log("data response", data);
        handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };
  return (
    <>
      <Box p={5}>
        {/* {console.log(data)} */}
        <PersistentDrawerLeft></PersistentDrawerLeft>
        {loggedInStatus === "LOGGED_IN" ? (
          <Typography>Welcome, {userStatus.user?.name}</Typography>
        ) : (
          <Typography>Welcome, Guest</Typography>
        )}
        <Link to="/login">Login</Link> <Link to="/register">Register</Link>{" "}
        <Link to="/dashboard">Dashboard</Link>{" "}
        <Link to="/restaurants">Random Restaurants</Link>{" "}
        <Link to="/styletest">Style Test</Link> <Outlet />
        {userStatus.loggedInStatus === "NOT_LOGGED_IN" ? (
          <Button type="Button" disabled>
            Logout
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleLogoutClick}>
            Logout
          </Button>
        )}
        <AddRestaurantModal></AddRestaurantModal>
      </Box>
    </>
  );
}
