import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { Typography } from "@mui/material";

export default function Dashboard() {
  const { userStatus } = useUser();

  return (
    <>
      <Typography>User Dashboard</Typography>
      <Typography>Your Reviews and Ratings</Typography>
      <Typography>Account Information:</Typography>
      <Typography>Username: {userStatus.user?.name}</Typography>
    </>
  );
}
