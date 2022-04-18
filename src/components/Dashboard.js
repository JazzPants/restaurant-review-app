import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";

export default function Dashboard() {
  const { userStatus } = useUser();

  return (
    <>
      <div>THE Dashboard</div>
      <div>Status: {userStatus.loggedInStatus}</div>
      <div>Favourite Restaurants</div>
      <div>Your Reviews</div>
      <div>Your Ratings</div>
      <div>Account Information:</div>
      <div>Username: {userStatus.user?.name}</div>
    </>
  );
}
