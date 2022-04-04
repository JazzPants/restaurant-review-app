import PersistentDrawerLeft from "./NavBar";
import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <PersistentDrawerLeft></PersistentDrawerLeft>
      <Link to="/styletest">Style Test</Link> <Outlet />
    </>
  );
}
