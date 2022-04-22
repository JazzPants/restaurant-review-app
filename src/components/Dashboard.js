import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { Typography } from "@mui/material";
import AddRestaurantModal from "./actions/AddRestaurantModal";

export default function Dashboard() {
  const { userStatus } = useUser();

  return (
    <>
      <Typography variant="h4">User Dashboard</Typography>
      {/* <Typography>Your Reviews and Ratings</Typography> */}
      <Typography>Account Information:</Typography>
      <Typography>Username: {userStatus.user?.name}</Typography>
      <AddRestaurantModal></AddRestaurantModal>
    </>
  );
}
