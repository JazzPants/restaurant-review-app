import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";

export default function Dashboard() {
  const { userStatus } = useUser();
  const { loggedInStatus, user } = userStatus;
  // useEffect(() => {
  //   console.log(userStatus);
  // }, [user]);
  return (
    <>
      <div>THE Dashboard</div>
      <div>Status: {loggedInStatus}</div>
      <div>Favourite Restaurants</div>
      <div>Your Reviews</div>
      <div>Your Ratings</div>
      <div>Account Information:</div>
      <div>Username</div>
    </>
  );
}
